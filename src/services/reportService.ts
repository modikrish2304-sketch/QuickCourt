import { Report } from '../types';
import { adminService } from './adminService';

export interface ReportQueryParams {
  status?: 'all' | 'pending' | 'resolved' | 'dismissed';
  targetType?: 'all' | 'facility' | 'user' | 'review';
  search?: string;
  sortBy?: 'newest' | 'oldest';
  page?: number;
  limit?: number;
}

export const reportService = {
  getReports(params: ReportQueryParams = {}) {
    let reports = adminService.getReports();

    if (params.status && params.status !== 'all') {
      reports = reports.filter((r) => r.status === params.status);
    }

    if (params.targetType && params.targetType !== 'all') {
      reports = reports.filter((r) => r.targetType === params.targetType);
    }

    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      reports = reports.filter(
        (r) =>
          r.targetName.toLowerCase().includes(q) ||
          r.reporterName.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }

    if (params.sortBy === 'oldest') {
      reports.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else {
      reports.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const total = reports.length;
    const page = Math.max(1, params.page || 1);
    const limit = params.limit || 8;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;
    const paginated = reports.slice(offset, offset + limit);

    return {
      reports: paginated,
      total,
      page,
      totalPages,
      limit,
    };
  },

  getReportCounts() {
    const all = adminService.getReports();
    return {
      all: all.length,
      pending: all.filter((r) => r.status === 'pending').length,
      resolved: all.filter((r) => r.status === 'resolved').length,
      dismissed: all.filter((r) => r.status === 'dismissed').length,
    };
  },

  resolveReport(reportId: string, actionTaken: string): Report {
    return adminService.updateReportStatus(reportId, 'resolved', actionTaken);
  },

  dismissReport(reportId: string, note?: string): Report {
    return adminService.updateReportStatus(
      reportId,
      'dismissed',
      note || 'Dismissed by administrator after review.'
    );
  },
};
