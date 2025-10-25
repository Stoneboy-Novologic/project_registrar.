/* lib/api/templates.ts */
// API client functions for template management
import { ReportTemplateDB } from '@/lib/types';

export interface TemplateListResponse {
  templates: ReportTemplateDB[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TemplateListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

// Fetch all templates with pagination and filtering
export async function fetchTemplates(params: TemplateListParams = {}): Promise<TemplateListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.category) searchParams.set('category', params.category);
  if (params.search) searchParams.set('search', params.search);
  
  const response = await fetch(`/api/templates?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch single template by pageId
export async function fetchTemplate(pageId: string): Promise<ReportTemplateDB> {
  const response = await fetch(`/api/templates/${pageId}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Template not found');
    }
    throw new Error(`Failed to fetch template: ${response.statusText}`);
  }
  
  return response.json();
}

// Create new template
export async function createTemplate(data: {
  pageId: string;
  title: string;
  category: string;
  version?: string;
  fieldsJson: any;
  metadata: any;
}): Promise<ReportTemplateDB> {
  const response = await fetch('/api/templates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to create template: ${response.statusText}`);
  }
  
  return response.json();
}

// Update template
export async function updateTemplate(pageId: string, data: Partial<{
  pageId: string;
  title: string;
  category: string;
  version: string;
  fieldsJson: any;
  metadata: any;
}>): Promise<ReportTemplateDB> {
  const response = await fetch(`/api/templates/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to update template: ${response.statusText}`);
  }
  
  return response.json();
}

// Delete template
export async function deleteTemplate(pageId: string): Promise<void> {
  const response = await fetch(`/api/templates/${pageId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Failed to delete template: ${response.statusText}`);
  }
}
