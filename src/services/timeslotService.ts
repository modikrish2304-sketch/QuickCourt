import { TimeSlot, SlotStatus, Booking } from '../types';
import { SEED_COURTS } from '../data/seedData';

const STORAGE_BLOCKED_SLOTS_KEY = 'quickcourt_blocked_slots';
const STORAGE_COURTS_KEY = 'quickcourt_courts';
const STORAGE_BOOKINGS_KEY = 'quickcourt_bookings';

export interface BlockedSlotRecord {
  id: string;
  courtId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "06:00" or "06:00 AM"
  endTime: string; // "07:00" or "07:00 AM"
  status: 'maintenance' | 'blocked';
  reason: string;
  createdAt: string;
}

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.trim();
  const isPM = /pm/i.test(clean);
  const isAM = /am/i.test(clean);
  const numPart = clean.replace(/[^0-9:]/g, '');
  const parts = numPart.split(':');
  let hours = parseInt(parts[0] || '0', 10);
  const minutes = parseInt(parts[1] || '0', 10);

  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

export function formatMinutesToTime(totalMins: number): string {
  const normMins = Math.max(0, Math.min(1439, totalMins));
  const h24 = Math.floor(normMins / 60);
  const m = normMins % 60;
  const period = h24 >= 12 && h24 < 24 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  const hStr = h12 < 10 ? `0${h12}` : `${h12}`;
  const mStr = m < 10 ? `0${m}` : `${m}`;
  return `${hStr}:${mStr} ${period}`;
}

export function notifyRealtimeSlotUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('quickcourt_slots_updated', {
        detail: { timestamp: Date.now() },
      })
    );
  }
}

function getStoredBlockedSlots(): BlockedSlotRecord[] {
  const raw = localStorage.getItem(STORAGE_BLOCKED_SLOTS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // ignore
    }
  }
  // Default demo maintenance slot for Court 02 tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const initialBlocks: BlockedSlotRecord[] = [
    {
      id: 'blk_demo_1',
      courtId: 'crt_1_2',
      date: tomorrowStr,
      startTime: '14:00',
      endTime: '16:00',
      status: 'maintenance',
      reason: 'Surface Resurfacing & Line Recalibration',
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_BLOCKED_SLOTS_KEY, JSON.stringify(initialBlocks));
  return initialBlocks;
}

export const timeslotService = {
  getBlockedSlots(): BlockedSlotRecord[] {
    return getStoredBlockedSlots();
  },

  getSlotsForCourt(courtId: string, date: string): TimeSlot[] {
    const blockedSlots = getStoredBlockedSlots().filter(
      (b) => b.courtId === courtId && b.date === date
    );

    // Retrieve active bookings from localStorage
    let bookings: Booking[] = [];
    try {
      const rawBookings = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (rawBookings) {
        bookings = JSON.parse(rawBookings).filter(
          (b: Booking) =>
            b.courtId === courtId &&
            b.date === date &&
            b.status !== 'cancelled'
        );
      }
    } catch {
      // ignore
    }

    // Standard 1-hour hourly intervals from 06:00 AM to 11:00 PM (closing)
    const timeRanges = [
      { id: '06:00', startTime: '06:00 AM', endTime: '07:00 AM', rawStart: '06:00', rawEnd: '07:00' },
      { id: '07:00', startTime: '07:00 AM', endTime: '08:00 AM', rawStart: '07:00', rawEnd: '08:00' },
      { id: '08:00', startTime: '08:00 AM', endTime: '09:00 AM', rawStart: '08:00', rawEnd: '09:00' },
      { id: '09:00', startTime: '09:00 AM', endTime: '10:00 AM', rawStart: '09:00', rawEnd: '10:00' },
      { id: '10:00', startTime: '10:00 AM', endTime: '11:00 AM', rawStart: '10:00', rawEnd: '11:00' },
      { id: '11:00', startTime: '11:00 AM', endTime: '12:00 PM', rawStart: '11:00', rawEnd: '12:00' },
      { id: '12:00', startTime: '12:00 PM', endTime: '01:00 PM', rawStart: '12:00', rawEnd: '13:00' },
      { id: '13:00', startTime: '01:00 PM', endTime: '02:00 PM', rawStart: '13:00', rawEnd: '14:00' },
      { id: '14:00', startTime: '02:00 PM', endTime: '03:00 PM', rawStart: '14:00', rawEnd: '15:00' },
      { id: '15:00', startTime: '03:00 PM', endTime: '04:00 PM', rawStart: '15:00', rawEnd: '16:00' },
      { id: '16:00', startTime: '04:00 PM', endTime: '05:00 PM', rawStart: '16:00', rawEnd: '17:00' },
      { id: '17:00', startTime: '05:00 PM', endTime: '06:00 PM', rawStart: '17:00', rawEnd: '18:00' },
      { id: '18:00', startTime: '06:00 PM', endTime: '07:00 PM', rawStart: '18:00', rawEnd: '19:00' },
      { id: '19:00', startTime: '07:00 PM', endTime: '08:00 PM', rawStart: '19:00', rawEnd: '20:00' },
      { id: '20:00', startTime: '08:00 PM', endTime: '09:00 PM', rawStart: '20:00', rawEnd: '21:00' },
      { id: '21:00', startTime: '09:00 PM', endTime: '10:00 PM', rawStart: '21:00', rawEnd: '22:00' },
      { id: '22:00', startTime: '10:00 PM', endTime: '11:00 PM', rawStart: '22:00', rawEnd: '23:00' },
    ];

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = date === todayStr;
    const isPastDate = date < todayStr;
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    // First pass: build base slots
    const rawSlots: TimeSlot[] = timeRanges.map((range) => {
      const slotStartMins = parseTimeToMinutes(range.startTime);
      const slotEndMins = parseTimeToMinutes(range.endTime);

      // Check maintenance block overlap
      const block = blockedSlots.find((b) => {
        const bStart = parseTimeToMinutes(b.startTime);
        const bEnd = parseTimeToMinutes(b.endTime);
        return Math.max(slotStartMins, bStart) < Math.min(slotEndMins, bEnd);
      });

      if (block) {
        return {
          id: range.id,
          courtId,
          date,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: false,
          status: 'maintenance' as SlotStatus,
          liveStatusLabel: 'Maintenance / Blocked',
          blockReason: block.reason,
          blockId: block.id,
        };
      }

      // Check active booking overlap
      const booking = bookings.find((bk) => {
        const bkStart = parseTimeToMinutes(bk.startTime);
        const bkEnd = parseTimeToMinutes(bk.endTime);
        return Math.max(slotStartMins, bkStart) < Math.min(slotEndMins, bkEnd);
      });

      // 1. Entire past date
      if (isPastDate) {
        return {
          id: range.id,
          courtId,
          date,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: false,
          status: 'completed' as SlotStatus,
          liveStatusLabel: 'Completed',
          bookingId: booking?.id,
          bookedBy: booking?.userName,
        };
      }

      // 2. Today's date with real-time clock checks
      if (isToday) {
        if (booking) {
          const bkStart = parseTimeToMinutes(booking.startTime);
          const bkEnd = parseTimeToMinutes(booking.endTime);

          if (currentMins >= bkStart && currentMins < bkEnd) {
            // Currently within match duration
            return {
              id: range.id,
              courtId,
              date,
              startTime: range.startTime,
              endTime: range.endTime,
              rawStart: range.rawStart,
              rawEnd: range.rawEnd,
              available: false,
              status: 'in_progress' as SlotStatus,
              liveStatusLabel: 'In Progress — currently being played',
              bookingId: booking.id,
              bookedBy: booking.userName || 'Player Match',
            };
          } else if (currentMins >= slotEndMins) {
            // End time has passed
            return {
              id: range.id,
              courtId,
              date,
              startTime: range.startTime,
              endTime: range.endTime,
              rawStart: range.rawStart,
              rawEnd: range.rawEnd,
              available: false,
              status: 'completed' as SlotStatus,
              liveStatusLabel: 'Completed',
              bookingId: booking.id,
              bookedBy: booking.userName,
            };
          } else {
            // Confirmed upcoming booking later today
            return {
              id: range.id,
              courtId,
              date,
              startTime: range.startTime,
              endTime: range.endTime,
              rawStart: range.rawStart,
              rawEnd: range.rawEnd,
              available: false,
              status: 'booked' as SlotStatus,
              liveStatusLabel: 'Booked',
              bookingId: booking.id,
              bookedBy: booking.userName || 'Reserved',
            };
          }
        }

        // No booking for this slot today:
        if (currentMins >= slotStartMins) {
          // Already passed or partially underway
          return {
            id: range.id,
            courtId,
            date,
            startTime: range.startTime,
            endTime: range.endTime,
            rawStart: range.rawStart,
            rawEnd: range.rawEnd,
            available: false,
            status: 'completed' as SlotStatus,
            liveStatusLabel: 'Completed',
          };
        }

        // Future slot today
        return {
          id: range.id,
          courtId,
          date,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: true,
          status: 'available' as SlotStatus,
          liveStatusLabel: 'Available',
        };
      }

      // 3. Future dates
      if (booking) {
        return {
          id: range.id,
          courtId,
          date,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: false,
          status: 'booked' as SlotStatus,
          liveStatusLabel: 'Booked',
          bookingId: booking.id,
          bookedBy: booking.userName || 'Reserved',
        };
      }

      return {
        id: range.id,
        courtId,
        date,
        startTime: range.startTime,
        endTime: range.endTime,
        rawStart: range.rawStart,
        rawEnd: range.rawEnd,
        available: true,
        status: 'available' as SlotStatus,
        liveStatusLabel: 'Available',
      };
    });

    // Second pass: attach contextual nextAvailableTime (e.g. "Available after 7:00 PM")
    return rawSlots.map((slot, idx) => {
      if (!slot.available && (slot.status === 'booked' || slot.status === 'in_progress')) {
        // Look forward for the next available slot
        for (let i = idx + 1; i < rawSlots.length; i++) {
          if (rawSlots[i].available) {
            return {
              ...slot,
              nextAvailableTime: `Available after ${rawSlots[i].startTime}`,
            };
          }
        }
      }
      return slot;
    });
  },

  validateSlotAvailability(
    courtId: string,
    date: string,
    startTime: string,
    endTime: string
  ): { valid: boolean; reason?: string } {
    const todayStr = new Date().toISOString().split('T')[0];
    if (date < todayStr) {
      return { valid: false, reason: 'Selected date has already passed.' };
    }

    const startMins = parseTimeToMinutes(startTime);
    const endMins = parseTimeToMinutes(endTime);

    if (startMins >= endMins) {
      return { valid: false, reason: 'Invalid slot time window.' };
    }

    // Check if slot has passed today
    if (date === todayStr) {
      const now = new Date();
      const currentMins = now.getHours() * 60 + now.getMinutes();
      if (startMins <= currentMins) {
        return { valid: false, reason: 'This time slot has already started or passed.' };
      }
    }

    // Check maintenance blocks
    const blockedSlots = getStoredBlockedSlots().filter(
      (b) => b.courtId === courtId && b.date === date
    );
    for (const b of blockedSlots) {
      const bStart = parseTimeToMinutes(b.startTime);
      const bEnd = parseTimeToMinutes(b.endTime);
      if (Math.max(startMins, bStart) < Math.min(endMins, bEnd)) {
        return { valid: false, reason: `Court is scheduled for maintenance (${b.reason}).` };
      }
    }

    // Check confirmed bookings
    let bookings: Booking[] = [];
    try {
      const rawBookings = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (rawBookings) {
        bookings = JSON.parse(rawBookings).filter(
          (b: Booking) =>
            b.courtId === courtId &&
            b.date === date &&
            b.status !== 'cancelled'
        );
      }
    } catch {
      // ignore
    }

    for (const bk of bookings) {
      const bkStart = parseTimeToMinutes(bk.startTime);
      const bkEnd = parseTimeToMinutes(bk.endTime);
      if (Math.max(startMins, bkStart) < Math.min(endMins, bkEnd)) {
        return {
          valid: false,
          reason: `Slot from ${startTime} to ${endTime} overlaps with an existing confirmed reservation (#${bk.id}).`,
        };
      }
    }

    return { valid: true };
  },

  async blockSlot(payload: {
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }): Promise<BlockedSlotRecord> {
    const blocks = getStoredBlockedSlots();
    const newBlock: BlockedSlotRecord = {
      id: `blk_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      courtId: payload.courtId,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: 'maintenance',
      reason: payload.reason || 'Scheduled Maintenance',
      createdAt: new Date().toISOString(),
    };
    blocks.push(newBlock);
    localStorage.setItem(STORAGE_BLOCKED_SLOTS_KEY, JSON.stringify(blocks));
    notifyRealtimeSlotUpdate();
    return newBlock;
  },

  async unblockSlot(blockId: string): Promise<boolean> {
    const blocks = getStoredBlockedSlots();
    const filtered = blocks.filter((b) => b.id !== blockId);
    localStorage.setItem(STORAGE_BLOCKED_SLOTS_KEY, JSON.stringify(filtered));
    notifyRealtimeSlotUpdate();
    return true;
  },

  async unblockSlotByCourtDateTime(
    courtId: string,
    date: string,
    rawStart: string
  ): Promise<boolean> {
    const blocks = getStoredBlockedSlots();
    const slotHour = parseInt(rawStart.replace(':', ''), 10);
    const filtered = blocks.filter((b) => {
      if (b.courtId === courtId && b.date === date) {
        const bStart = parseInt(b.startTime.replace(':', ''), 10);
        const bEnd = parseInt(b.endTime.replace(':', ''), 10);
        if (slotHour >= bStart && slotHour < bEnd) {
          return false; // Remove this block
        }
      }
      return true;
    });
    localStorage.setItem(STORAGE_BLOCKED_SLOTS_KEY, JSON.stringify(filtered));
    notifyRealtimeSlotUpdate();
    return true;
  },

  async bulkBlockSlots(payload: {
    courtId: string;
    date: string;
    startTime: string;
    endTime: string;
    reason: string;
  }): Promise<BlockedSlotRecord> {
    return this.blockSlot(payload);
  },
};
