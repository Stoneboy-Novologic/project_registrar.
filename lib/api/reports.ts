/* lib/api/reports.ts */
// API client functions for report management
import { ReportDB, ReportPageDB } from '@/lib/types';

export interface ReportListResponse {
  reports: ReportDB[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ReportListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ReportWithPages extends ReportDB {
  pages: ReportPageDB[];
  exports: any[];
}

// Fetch all reports with pagination and filtering
export async function fetchReports(params: ReportListParams = {}): Promise<ReportListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.search) searchParams.set('search', params.search);
  
  const response = await fetch(`/api/reports?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch reports: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch single report with all pages
export async function fetchReport(reportId: string): Promise<ReportWithPages> {
  const response = await fetch(`/api/reports/${reportId}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Report not found');
    }
    throw new Error(`Failed to fetch report: ${response.statusText}`);
  }
  
  return response.json();
}

// Create new report
export async function createReport(data: {
  name: string;
  description?: string;
}): Promise<ReportDB> {
  const response = await fetch('/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to create report: ${response.statusText}`);
  }
  
  return response.json();
}

// Update report metadata
export async function updateReport(reportId: string, data: {
  name?: string;
  description?: string;
}): Promise<ReportDB> {
  const response = await fetch(`/api/reports/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to update report: ${response.statusText}`);
  }
  
  return response.json();
}

// Delete report
export async function deleteReport(reportId: string): Promise<void> {
  const response = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to delete report: ${response.statusText}`);
  }
}

// Add page to report
export async function addPageToReport(reportId: string, templateId: string): Promise<ReportPageDB> {
  const response = await fetch(`/api/reports/${reportId}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ templateId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to add page to report: ${response.statusText}`);
  }
  
  return response.json();
}

// Update page values
export async function updatePageValues(reportId: string, pageId: string, values: Record<string, string>): Promise<ReportPageDB> {
  const response = await fetch(`/api/reports/${reportId}/pages/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ valuesJson: values }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to update page values: ${response.statusText}`);
  }
  
  return response.json();
}

// Remove page from report
export async function removePageFromReport(reportId: string, pageId: string): Promise<void> {
  const response = await fetch(`/api/reports/${reportId}/pages/${pageId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to remove page from report: ${response.statusText}`);
  }
}

// Reorder pages in report
export async function reorderPages(reportId: string, pageIds: string[]): Promise<void> {
  const response = await fetch(`/api/reports/${reportId}/pages/reorder`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageIds }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to reorder pages: ${response.statusText}`);
  }
}
