import { TimeSlot, SlotStatus } from '../types';
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

  getSlotsForCourt(courtId: string, date: string) {
    const blockedSlots = getStoredBlockedSlots().filter(
      (b) => b.courtId === courtId && b.date === date
    );

    // Also check bookings from localStorage
    let bookings: any[] = [];
    try {
      const rawBookings = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (rawBookings) {
        bookings = JSON.parse(rawBookings).filter(
          (b: any) =>
            b.courtId === courtId &&
            b.date === date &&
            b.status !== 'cancelled'
        );
      }
    } catch {
      // ignore
    }

    // Standard 1-hour slots from 06:00 to 23:00
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

    return timeRanges.map((range) => {
      // Check if blocked
      const block = blockedSlots.find((b) => {
        const blockStart = parseInt(b.startTime.replace(':', ''), 10);
        const blockEnd = parseInt(b.endTime.replace(':', ''), 10);
        const slotStart = parseInt(range.rawStart.replace(':', ''), 10);
        return slotStart >= blockStart && slotStart < blockEnd;
      });

      if (block) {
        return {
          id: range.id,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: false,
          status: 'maintenance' as SlotStatus,
          blockReason: block.reason,
          blockId: block.id,
        };
      }

      // Check if booked by a player
      const booking = bookings.find((bk) => {
        return (
          bk.startTime === range.startTime ||
          bk.startTime === range.rawStart ||
          bk.startTime?.startsWith(range.rawStart)
        );
      });

      if (booking) {
        return {
          id: range.id,
          startTime: range.startTime,
          endTime: range.endTime,
          rawStart: range.rawStart,
          rawEnd: range.rawEnd,
          available: false,
          status: 'booked' as SlotStatus,
          bookedBy: booking.userName || 'Player Reserved',
          bookingId: booking.id,
        };
      }

      return {
        id: range.id,
        startTime: range.startTime,
        endTime: range.endTime,
        rawStart: range.rawStart,
        rawEnd: range.rawEnd,
        available: true,
        status: 'available' as SlotStatus,
      };
    });
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
    return newBlock;
  },

  async unblockSlot(blockId: string): Promise<boolean> {
    const blocks = getStoredBlockedSlots();
    const filtered = blocks.filter((b) => b.id !== blockId);
    localStorage.setItem(STORAGE_BLOCKED_SLOTS_KEY, JSON.stringify(filtered));
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
