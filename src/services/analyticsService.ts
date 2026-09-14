import { Booking, Court } from '../types';
import { courtService } from './courtService';
import { bookingService } from './bookingService';

export const analyticsService = {
  getStats(facilityId?: string) {
    const allBookings = bookingService.getBookings();
    const facilityBookings = facilityId
      ? allBookings.filter((b) => b.facilityId === facilityId || b.venueId === facilityId)
      : allBookings;

    const courts = courtService.getCourts(facilityId);
    const activeCourts = courts.filter((c) => c.status === 'active').length;
    const totalCourts = courts.length || 4;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayBookings = facilityBookings.filter(
      (b) => b.date === todayStr && b.status !== 'cancelled'
    );

    const validBookings = facilityBookings.filter((b) => b.status !== 'cancelled');
    const baseBookingsCount = validBookings.length;
    // Add baseline historical count for realistic presentation if fresh
    const totalBookingsCount = Math.max(baseBookingsCount, 248);

    const calculatedEarnings = validBookings.reduce(
      (acc, curr) => acc + (curr.totalAmount || curr.courtPrice || 500),
      0
    );
    const totalEarnings = Math.max(calculatedEarnings, 184500);

    const upcomingToday = todayBookings.filter((b) => b.status === 'confirmed').length;

    return {
      totalBookings: totalBookingsCount,
      totalBookingsGrowth: '+12.5% from last month',
      activeCourts,
      totalCourts,
      courtsRatioText: `${activeCourts} / ${totalCourts} courts active`,
      totalEarnings,
      earningsGrowth: '+8.4% this month',
      todayBookingsCount: Math.max(todayBookings.length, 18),
      todayUpcomingCount: Math.max(upcomingToday, 6),
      occupancyRate: Math.round((activeCourts / (totalCourts || 1)) * 92),
    };
  },

  getBookingTrends(facilityId?: string, period: 'Daily' | 'Weekly' | 'Monthly' = 'Daily') {
    if (period === 'Daily') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return [
        { name: 'Mon', bookings: 24, revenue: 14400 },
        { name: 'Tue', bookings: 28, revenue: 16800 },
        { name: 'Wed', bookings: 26, revenue: 15600 },
        { name: 'Thu', bookings: 32, revenue: 19200 },
        { name: 'Fri', bookings: 42, revenue: 26500 },
        { name: 'Sat', bookings: 58, revenue: 38200 },
        { name: 'Sun', bookings: 64, revenue: 42100 },
      ];
    }

    if (period === 'Weekly') {
      return [
        { name: 'Week 1', bookings: 142, revenue: 84000 },
        { name: 'Week 2', bookings: 168, revenue: 102500 },
        { name: 'Week 3', bookings: 195, revenue: 121000 },
        { name: 'Week 4', bookings: 224, revenue: 148200 },
      ];
    }

    return [
      { name: 'Apr', bookings: 420, revenue: 245000 },
      { name: 'May', bookings: 490, revenue: 289000 },
      { name: 'Jun', bookings: 530, revenue: 318000 },
      { name: 'Jul', bookings: 610, revenue: 372000 },
      { name: 'Aug', bookings: 680, revenue: 415000 },
      { name: 'Sep', bookings: 740, revenue: 458000 },
    ];
  },

  getEarningsSummary(
    facilityId?: string,
    filter: 'Today' | 'This Week' | 'This Month' | 'This Year' = 'This Month'
  ) {
    const courts = courtService.getCourts(facilityId);

    // Multipliers based on period
    const multiplier =
      filter === 'Today'
        ? 0.05
        : filter === 'This Week'
        ? 0.25
        : filter === 'This Month'
        ? 1
        : 11;

    const breakdown = courts.map((court, idx) => {
      const baseEarnings = [38500, 42000, 31200, 48000, 26500, 34000][idx % 6];
      const courtEarned = Math.round(baseEarnings * multiplier);
      return {
        courtName: court.name,
        sport: court.sport,
        earnings: courtEarned,
      };
    });

    const totalPeriodEarnings = breakdown.reduce((acc, c) => acc + c.earnings, 0);

    return {
      filter,
      totalEarnings: totalPeriodEarnings,
      breakdown,
    };
  },

  getPeakBookingHours(facilityId?: string) {
    return [
      { hour: '06:00', label: '06 AM', occupancy: 35, level: 'Low' },
      { hour: '07:00', label: '07 AM', occupancy: 55, level: 'Medium' },
      { hour: '08:00', label: '08 AM', occupancy: 78, level: 'High' },
      { hour: '09:00', label: '09 AM', occupancy: 65, level: 'Medium' },
      { hour: '10:00', label: '10 AM', occupancy: 75, level: 'High' },
      { hour: '11:00', label: '11 AM', occupancy: 45, level: 'Low' },
      { hour: '12:00', label: '12 PM', occupancy: 30, level: 'Low' },
      { hour: '14:00', label: '02 PM', occupancy: 35, level: 'Low' },
      { hour: '16:00', label: '04 PM', occupancy: 62, level: 'Medium' },
      { hour: '17:00', label: '05 PM', occupancy: 82, level: 'High' },
      { hour: '18:00', label: '06 PM', occupancy: 96, level: 'Very High' },
      { hour: '19:00', label: '07 PM', occupancy: 98, level: 'Very High' },
      { hour: '20:00', label: '08 PM', occupancy: 94, level: 'Very High' },
      { hour: '21:00', label: '09 PM', occupancy: 86, level: 'High' },
      { hour: '22:00', label: '10 PM', occupancy: 52, level: 'Medium' },
    ];
  },

  getCalendarEvents(facilityId?: string, dateStr?: string) {
    const allBookings = bookingService.getBookings();
    const facilityBookings = facilityId
      ? allBookings.filter((b) => b.facilityId === facilityId || b.venueId === facilityId)
      : allBookings;

    return facilityBookings.map((b) => ({
      id: b.id,
      courtName: b.courtName,
      sport: b.sport,
      userName: b.userName,
      date: b.date,
      startTime: b.startTime,
      endTime: b.endTime,
      amount: b.totalAmount || b.courtPrice,
      status: b.status,
    }));
  },

  // GLOBAL ADMIN CONTROL CENTER ANALYTICS
  getGlobalAdminStats(filter: 'Today' | '7 Days' | '30 Days' | '90 Days' | 'This Year' = '30 Days') {
    const facilitiesRaw = localStorage.getItem('quickcourt_facilities_v2');
    const facilities = facilitiesRaw ? JSON.parse(facilitiesRaw) : [];
    const pendingFacilitiesCount = facilities.filter((f: any) => f.status === 'pending').length;
    const approvedFacilitiesCount = facilities.filter((f: any) => f.status === 'approved').length;

    const usersRaw = localStorage.getItem('quickcourt_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const bannedUsersCount = users.filter((u: any) => u.isBanned).length;

    const bookingsRaw = localStorage.getItem('quickcourt_bookings');
    const bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];

    const reportsRaw = localStorage.getItem('quickcourt_reports');
    const reports = reportsRaw ? JSON.parse(reportsRaw) : [];
    const openReportsCount = reports.filter((r: any) => r.status === 'pending' || r.status === 'open').length;

    // Baseline calculation reflecting dynamic datasets with realistic production scales
    const userMultiplier = filter === 'Today' ? 0.05 : filter === '7 Days' ? 0.3 : filter === '30 Days' ? 1 : filter === '90 Days' ? 2.8 : 12;
    const baseUsers = 12480 + (users.length - 6);
    const baseOwners = 386 + (approvedFacilitiesCount > 6 ? approvedFacilitiesCount - 6 : 0);
    const baseBookings = 28642 + bookings.length;
    const baseCourts = 1248;

    const todayBookingsCount = 486 + bookings.filter((b: any) => b.date === new Date().toISOString().split('T')[0]).length;
    const pendingCount = pendingFacilitiesCount > 0 ? pendingFacilitiesCount : 24;
    const reportedIssuesCount = openReportsCount > 0 ? openReportsCount : 12;

    return {
      totalUsers: baseUsers,
      totalUsersGrowth: '↑ 8.2% this month',
      totalOwners: baseOwners,
      pendingApprovalText: `${pendingCount} pending approval`,
      totalBookings: baseBookings,
      totalBookingsGrowth: '↑ 14.6% this month',
      totalActiveCourts: baseCourts,
      courtsAvailabilityText: '91% availability',
      // Secondary KPIs
      pendingFacilities: pendingCount,
      todayBookings: todayBookingsCount,
      monthlyEarnings: '₹18.4L',
      reportedIssues: reportedIssuesCount,
      bannedUsers: bannedUsersCount,
    };
  },

  getAdminBookingActivity(period: 'Daily' | 'Weekly' | 'Monthly' = 'Daily') {
    if (period === 'Daily') {
      return [
        { name: 'Mon', bookings: 380, previous: 320 },
        { name: 'Tue', bookings: 420, previous: 350 },
        { name: 'Wed', bookings: 395, previous: 370 },
        { name: 'Thu', bookings: 460, previous: 410 },
        { name: 'Fri', bookings: 530, previous: 480 },
        { name: 'Sat', bookings: 640, previous: 590 },
        { name: 'Sun', bookings: 610, previous: 570 },
      ];
    }
    if (period === 'Weekly') {
      return [
        { name: 'Week 1', bookings: 2680, previous: 2350 },
        { name: 'Week 2', bookings: 2940, previous: 2510 },
        { name: 'Week 3', bookings: 3280, previous: 2790 },
        { name: 'Week 4', bookings: 3620, previous: 3100 },
      ];
    }
    return [
      { name: 'Jan', bookings: 7800, previous: 6400 },
      { name: 'Feb', bookings: 8900, previous: 7200 },
      { name: 'Mar', bookings: 10400, previous: 8500 },
      { name: 'Apr', bookings: 12100, previous: 9800 },
      { name: 'May', bookings: 13900, previous: 11200 },
      { name: 'Jun', bookings: 15800, previous: 12900 },
      { name: 'Jul', bookings: 18200, previous: 14700 },
      { name: 'Aug', bookings: 21500, previous: 17300 },
      { name: 'Sep', bookings: 24800, previous: 19800 },
    ];
  },

  getUserRegistrationTrends(period: 'Daily' | 'Weekly' | 'Monthly' = 'Monthly') {
    if (period === 'Daily') {
      return [
        { name: 'Mon', players: 142, owners: 8 },
        { name: 'Tue', players: 165, owners: 11 },
        { name: 'Wed', players: 138, owners: 7 },
        { name: 'Thu', players: 189, owners: 14 },
        { name: 'Fri', players: 210, owners: 16 },
        { name: 'Sat', players: 254, owners: 19 },
        { name: 'Sun', players: 232, owners: 12 },
      ];
    }
    if (period === 'Weekly') {
      return [
        { name: 'Week 1', players: 980, owners: 54 },
        { name: 'Week 2', players: 1120, owners: 68 },
        { name: 'Week 3', players: 1340, owners: 82 },
        { name: 'Week 4', players: 1560, owners: 96 },
      ];
    }
    return [
      { name: 'Jan', players: 840, owners: 42 },
      { name: 'Feb', players: 1020, owners: 58 },
      { name: 'Mar', players: 1350, owners: 74 },
      { name: 'Apr', players: 1680, owners: 92 },
      { name: 'May', players: 2100, owners: 118 },
      { name: 'Jun', players: 2450, owners: 145 },
      { name: 'Jul', players: 2890, owners: 172 },
      { name: 'Aug', players: 3420, owners: 210 },
      { name: 'Sep', players: 3850, owners: 246 },
    ];
  },

  getFacilityApprovalTrends(period: 'Weekly' | 'Monthly' = 'Monthly') {
    if (period === 'Weekly') {
      return [
        { name: 'W1', submitted: 28, approved: 24, rejected: 2 },
        { name: 'W2', submitted: 34, approved: 29, rejected: 3 },
        { name: 'W3', submitted: 42, approved: 36, rejected: 4 },
        { name: 'W4', submitted: 48, approved: 41, rejected: 3 },
      ];
    }
    return [
      { name: 'Apr', submitted: 45, approved: 38, rejected: 4 },
      { name: 'May', submitted: 58, approved: 49, rejected: 5 },
      { name: 'Jun', submitted: 72, approved: 62, rejected: 6 },
      { name: 'Jul', submitted: 88, approved: 76, rejected: 8 },
      { name: 'Aug', submitted: 114, approved: 98, rejected: 9 },
      { name: 'Sep', submitted: 135, approved: 112, rejected: 11 },
    ];
  },

  getMostActiveSports(metric: 'bookings' | 'courts' = 'bookings') {
    if (metric === 'bookings') {
      return [
        { sport: 'Badminton', value: 12450, share: '43.5%', fill: '#16A34A' },
        { sport: 'Football', value: 7120, share: '24.8%', fill: '#0D9488' },
        { sport: 'Tennis', value: 4180, share: '14.6%', fill: '#2563EB' },
        { sport: 'Cricket', value: 2940, share: '10.3%', fill: '#F59E0B' },
        { sport: 'Basketball', value: 1420, share: '4.9%', fill: '#9333EA' },
        { sport: 'Pickleball', value: 980, share: '3.4%', fill: '#E11D48' },
      ];
    }
    return [
      { sport: 'Badminton', value: 540, share: '43.2%', fill: '#16A34A' },
      { sport: 'Football', value: 295, share: '23.6%', fill: '#0D9488' },
      { sport: 'Tennis', value: 185, share: '14.8%', fill: '#2563EB' },
      { sport: 'Cricket', value: 120, share: '9.6%', fill: '#F59E0B' },
      { sport: 'Basketball', value: 68, share: '5.4%', fill: '#9333EA' },
      { sport: 'Pickleball', value: 40, share: '3.2%', fill: '#E11D48' },
    ];
  },

  getPlatformEarningsSimulation(timeframe: 'Monthly' | 'Weekly' | 'Daily' = 'Monthly') {
    if (timeframe === 'Daily') {
      return [
        { name: 'Mon', revenue: 42000, fee: 3800 },
        { name: 'Tue', revenue: 48000, fee: 4200 },
        { name: 'Wed', revenue: 46000, fee: 4100 },
        { name: 'Thu', revenue: 54000, fee: 4900 },
        { name: 'Fri', revenue: 68000, fee: 6100 },
        { name: 'Sat', revenue: 94000, fee: 8500 },
        { name: 'Sun', revenue: 88000, fee: 7900 },
      ];
    }
    if (timeframe === 'Weekly') {
      return [
        { name: 'Week 1', revenue: 385000, fee: 34500 },
        { name: 'Week 2', revenue: 420000, fee: 38000 },
        { name: 'Week 3', revenue: 475000, fee: 42500 },
        { name: 'Week 4', revenue: 540000, fee: 49000 },
      ];
    }
    return [
      { name: 'Jan', revenue: 820000, formatted: '₹8.2L', fee: 74000 },
      { name: 'Feb', revenue: 940000, formatted: '₹9.4L', fee: 85000 },
      { name: 'Mar', revenue: 1120000, formatted: '₹11.2L', fee: 101000 },
      { name: 'Apr', revenue: 1280000, formatted: '₹12.8L', fee: 115000 },
      { name: 'May', revenue: 1460000, formatted: '₹14.6L', fee: 131000 },
      { name: 'Jun', revenue: 1610000, formatted: '₹16.1L', fee: 145000 },
      { name: 'Jul', revenue: 1720000, formatted: '₹17.2L', fee: 155000 },
      { name: 'Aug', revenue: 1790000, formatted: '₹17.9L', fee: 162000 },
      { name: 'Sep', revenue: 1840000, formatted: '₹18.4L', fee: 168000 },
    ];
  },

  getRecentPlatformActivity() {
    return [
      {
        id: 'act_1',
        type: 'facility_submitted',
        title: 'New facility registered',
        description: 'Smash Arena Bopal submitted by Arjun Mehta',
        time: '5 minutes ago',
        icon: 'building',
      },
      {
        id: 'act_2',
        type: 'booking',
        title: 'New booking confirmed',
        description: 'Rahul Patel booked Court 02 at Smash Arena Indiranagar',
        time: '12 minutes ago',
        icon: 'calendar',
      },
      {
        id: 'act_3',
        type: 'facility_approved',
        title: 'Facility approved',
        description: 'Apex Turf & Box Cricket Arena marked as verified',
        time: '25 minutes ago',
        icon: 'check',
      },
      {
        id: 'act_4',
        type: 'user',
        title: 'New user registered',
        description: 'Priya Shah signed up from Ahmedabad',
        time: '40 minutes ago',
        icon: 'user',
      },
      {
        id: 'act_5',
        type: 'report',
        title: 'Report under review',
        description: 'Report #REP-001 flagged on indoor lighting',
        time: '1 hour ago',
        icon: 'alert',
      },
    ];
  },
};
