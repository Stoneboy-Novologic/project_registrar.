/* prisma/seed-additional.ts */
import { PrismaClient } from '@prisma/client';
import { ReportTemplate, TemplateField } from '../lib/types';

const prisma = new PrismaClient();

// Template generator for creating placeholder templates
function generateTemplate(
  pageId: string,
  title: string,
  category: string,
  fields: TemplateField[]
): ReportTemplate {
  return {
    pageId,
    title,
    fields
  };
}

// Generate 25 additional templates (report-026 through report-050)
export function generateAdditionalTemplates(): ReportTemplate[] {
  return [
    // Phase 1: Advanced Project Management (026-030)
    generateTemplate("report-026", "Project Schedule Update", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Update Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "schedule.original", label: "Original Schedule", type: "text", placeholder: "2024-06-30", required: true },
      { id: "schedule.current", label: "Current Schedule", type: "text", placeholder: "2024-07-15", required: true },
      { id: "schedule.changes", label: "Schedule Changes", type: "multiline", placeholder: "Description of schedule changes and reasons", required: true },
      { id: "schedule.impact", label: "Impact Analysis", type: "multiline", placeholder: "Impact on project timeline and milestones", required: true },
      { id: "schedule.mitigation", label: "Mitigation Plans", type: "multiline", placeholder: "Plans to recover schedule delays", required: false },
      { id: "schedule.preparer", label: "Prepared By", type: "text", placeholder: "Project Manager", required: true }
    ]),

    generateTemplate("report-027", "Risk Assessment Register", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Assessment Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "risk.identified", label: "Identified Risks", type: "multiline", placeholder: "List of identified risks", required: true },
      { id: "risk.probability", label: "Probability Assessment", type: "multiline", placeholder: "Probability of risk occurrence", required: true },
      { id: "risk.impact", label: "Impact Assessment", type: "multiline", placeholder: "Potential impact on project", required: true },
      { id: "risk.mitigation", label: "Mitigation Strategies", type: "multiline", placeholder: "Strategies to mitigate risks", required: true },
      { id: "risk.owner", label: "Risk Owner", type: "text", placeholder: "Risk Manager", required: true },
      { id: "risk.status", label: "Risk Status", type: "text", placeholder: "Active/Mitigated/Closed", required: true }
    ]),

    generateTemplate("report-028", "Stakeholder Communication Log", "project-documentation", [
      { id: "header.date", label: "Communication Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "communication.stakeholder", label: "Stakeholder", type: "text", placeholder: "City Council", required: true },
      { id: "communication.method", label: "Communication Method", type: "text", placeholder: "Email/Meeting/Phone", required: true },
      { id: "communication.subject", label: "Subject", type: "text", placeholder: "Project Update", required: true },
      { id: "communication.content", label: "Communication Content", type: "multiline", placeholder: "Details of communication", required: true },
      { id: "communication.response", label: "Stakeholder Response", type: "multiline", placeholder: "Response from stakeholder", required: false },
      { id: "communication.followup", label: "Follow-up Actions", type: "multiline", placeholder: "Required follow-up actions", required: false },
      { id: "communication.initiator", label: "Initiated By", type: "text", placeholder: "Project Manager", required: true }
    ]),

    generateTemplate("report-029", "Project Milestone Report", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "milestone.name", label: "Milestone Name", type: "text", placeholder: "Phase 1 Completion", required: true },
      { id: "milestone.planned", label: "Planned Date", type: "date", placeholder: "2024-03-15", required: true },
      { id: "milestone.actual", label: "Actual Date", type: "date", placeholder: "2024-03-20", required: false },
      { id: "milestone.status", label: "Milestone Status", type: "text", placeholder: "Completed/In Progress/Delayed", required: true },
      { id: "milestone.description", label: "Milestone Description", type: "multiline", placeholder: "Details of milestone achievement", required: true },
      { id: "milestone.achievements", label: "Key Achievements", type: "multiline", placeholder: "Major achievements for this milestone", required: true },
      { id: "milestone.issues", label: "Issues Encountered", type: "multiline", placeholder: "Any issues affecting milestone", required: false }
    ]),

    generateTemplate("report-030", "Resource Allocation Summary", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.period", label: "Reporting Period", type: "text", placeholder: "January 2024", required: true },
      { id: "resource.labor", label: "Labor Allocation", type: "multiline", placeholder: "Labor resources allocated", required: true },
      { id: "resource.equipment", label: "Equipment Allocation", type: "multiline", placeholder: "Equipment resources allocated", required: true },
      { id: "resource.materials", label: "Material Allocation", type: "multiline", placeholder: "Material resources allocated", required: true },
      { id: "resource.utilization", label: "Resource Utilization", type: "multiline", placeholder: "Resource utilization rates", required: true },
      { id: "resource.shortages", label: "Resource Shortages", type: "multiline", placeholder: "Any resource shortages identified", required: false },
      { id: "resource.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for resource optimization", required: false }
    ]),

    // Phase 2: Safety & Compliance (031-035)
    generateTemplate("report-031", "Safety Training Record", "safety", [
      { id: "header.date", label: "Training Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "training.type", label: "Training Type", type: "text", placeholder: "Fall Protection/First Aid/etc.", required: true },
      { id: "training.instructor", label: "Instructor", type: "text", placeholder: "Safety Trainer Name", required: true },
      { id: "training.attendees", label: "Attendees", type: "multiline", placeholder: "List of training attendees", required: true },
      { id: "training.content", label: "Training Content", type: "multiline", placeholder: "Topics covered in training", required: true },
      { id: "training.duration", label: "Training Duration", type: "text", placeholder: "4 hours", required: true },
      { id: "training.certification", label: "Certification Issued", type: "text", placeholder: "Yes/No", required: true },
      { id: "training.notes", label: "Additional Notes", type: "multiline", placeholder: "Any additional training notes", required: false }
    ]),

    generateTemplate("report-032", "Toolbox Talk Documentation", "safety", [
      { id: "header.date", label: "Talk Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.location", label: "Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "talk.topic", label: "Topic", type: "text", placeholder: "Excavation Safety", required: true },
      { id: "talk.facilitator", label: "Facilitator", type: "text", placeholder: "Site Supervisor", required: true },
      { id: "talk.attendees", label: "Attendees", type: "multiline", placeholder: "List of attendees", required: true },
      { id: "talk.content", label: "Talk Content", type: "multiline", placeholder: "Key points discussed", required: true },
      { id: "talk.questions", label: "Questions Asked", type: "multiline", placeholder: "Questions from attendees", required: false },
      { id: "talk.actionItems", label: "Action Items", type: "multiline", placeholder: "Action items from the talk", required: false }
    ]),

    generateTemplate("report-033", "Safety Equipment Inspection", "safety", [
      { id: "header.date", label: "Inspection Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.inspector", label: "Inspector Name", type: "text", placeholder: "Safety Officer", required: true },
      { id: "equipment.type", label: "Equipment Type", type: "text", placeholder: "Hard Hats/Safety Glasses/Fall Protection", required: true },
      { id: "equipment.quantity", label: "Quantity Inspected", type: "text", placeholder: "50 units", required: true },
      { id: "equipment.condition", label: "Equipment Condition", type: "multiline", placeholder: "Condition assessment", required: true },
      { id: "equipment.defects", label: "Defects Found", type: "multiline", placeholder: "Any defects or damage found", required: false },
      { id: "equipment.action", label: "Corrective Actions", type: "multiline", placeholder: "Actions taken for defective equipment", required: false },
      { id: "equipment.nextInspection", label: "Next Inspection Date", type: "date", placeholder: "2024-02-15", required: true }
    ]),

    generateTemplate("report-034", "Emergency Response Plan", "safety", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Plan Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "emergency.types", label: "Emergency Types", type: "multiline", placeholder: "Types of emergencies covered", required: true },
      { id: "emergency.procedures", label: "Emergency Procedures", type: "multiline", placeholder: "Detailed emergency response procedures", required: true },
      { id: "emergency.contacts", label: "Emergency Contacts", type: "multiline", placeholder: "List of emergency contacts", required: true },
      { id: "emergency.equipment", label: "Emergency Equipment", type: "multiline", placeholder: "Available emergency equipment", required: true },
      { id: "emergency.assembly", label: "Assembly Points", type: "multiline", placeholder: "Emergency assembly points", required: true },
      { id: "emergency.review", label: "Review Date", type: "date", placeholder: "2024-04-15", required: true }
    ]),

    generateTemplate("report-035", "Safety Audit Report", "safety", [
      { id: "header.date", label: "Audit Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "audit.auditor", label: "Auditor Name", type: "text", placeholder: "Safety Auditor", required: true },
      { id: "audit.scope", label: "Audit Scope", type: "multiline", placeholder: "Scope of the safety audit", required: true },
      { id: "audit.findings", label: "Audit Findings", type: "multiline", placeholder: "Findings from the audit", required: true },
      { id: "audit.nonCompliance", label: "Non-Compliance Issues", type: "multiline", placeholder: "Any non-compliance issues found", required: false },
      { id: "audit.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for improvement", required: true },
      { id: "audit.actionPlan", label: "Action Plan", type: "multiline", placeholder: "Action plan to address findings", required: true },
      { id: "audit.followup", label: "Follow-up Date", type: "date", placeholder: "2024-02-15", required: true }
    ]),

    // Phase 3: Financial & Procurement (036-040)
    generateTemplate("report-036", "Purchase Order Log", "financial", [
      { id: "header.date", label: "Order Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "po.number", label: "PO Number", type: "text", placeholder: "PO-2024-001", required: true },
      { id: "po.vendor", label: "Vendor", type: "text", placeholder: "ABC Materials Inc.", required: true },
      { id: "po.description", label: "Description", type: "multiline", placeholder: "Description of items ordered", required: true },
      { id: "po.amount", label: "Order Amount", type: "text", placeholder: "$25,000", required: true },
      { id: "po.status", label: "PO Status", type: "text", placeholder: "Pending/Approved/Received", required: true },
      { id: "po.expectedDelivery", label: "Expected Delivery", type: "date", placeholder: "2024-01-30", required: true },
      { id: "po.notes", label: "Notes", type: "multiline", placeholder: "Additional notes", required: false }
    ]),

    generateTemplate("report-037", "Invoice Tracking", "financial", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.period", label: "Reporting Period", type: "text", placeholder: "January 2024", required: true },
      { id: "invoice.number", label: "Invoice Number", type: "text", placeholder: "INV-2024-001", required: true },
      { id: "invoice.vendor", label: "Vendor", type: "text", placeholder: "ABC Materials Inc.", required: true },
      { id: "invoice.amount", label: "Invoice Amount", type: "text", placeholder: "$25,000", required: true },
      { id: "invoice.date", label: "Invoice Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "invoice.status", label: "Payment Status", type: "text", placeholder: "Pending/Paid/Overdue", required: true },
      { id: "invoice.dueDate", label: "Due Date", type: "date", placeholder: "2024-02-15", required: true },
      { id: "invoice.description", label: "Invoice Description", type: "multiline", placeholder: "Description of invoice items", required: true }
    ]),

    generateTemplate("report-038", "Cost Variance Analysis", "financial", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.period", label: "Reporting Period", type: "text", placeholder: "January 2024", required: true },
      { id: "variance.budgeted", label: "Budgeted Cost", type: "text", placeholder: "$2,500,000", required: true },
      { id: "variance.actual", label: "Actual Cost", type: "text", placeholder: "$2,650,000", required: true },
      { id: "variance.variance", label: "Cost Variance", type: "text", placeholder: "$150,000", required: true },
      { id: "variance.analysis", label: "Variance Analysis", type: "multiline", placeholder: "Analysis of cost variances", required: true },
      { id: "variance.reasons", label: "Reasons for Variance", type: "multiline", placeholder: "Reasons contributing to variance", required: true },
      { id: "variance.actions", label: "Corrective Actions", type: "multiline", placeholder: "Actions to control costs", required: false }
    ]),

    generateTemplate("report-039", "Payment Application", "financial", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Application Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "payment.period", label: "Payment Period", type: "text", placeholder: "January 2024", required: true },
      { id: "payment.contractor", label: "Contractor", type: "text", placeholder: "ABC Construction Ltd.", required: true },
      { id: "payment.amount", label: "Application Amount", type: "text", placeholder: "$150,000", required: true },
      { id: "payment.workCompleted", label: "Work Completed", type: "multiline", placeholder: "Description of work completed", required: true },
      { id: "payment.retention", label: "Retention", type: "text", placeholder: "$7,500", required: true },
      { id: "payment.previousPayments", label: "Previous Payments", type: "text", placeholder: "$1,200,000", required: true },
      { id: "payment.totalDue", label: "Total Amount Due", type: "text", placeholder: "$142,500", required: true }
    ]),

    generateTemplate("report-040", "Vendor Performance Review", "financial", [
      { id: "header.date", label: "Review Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.vendor", label: "Vendor Name", type: "text", placeholder: "ABC Materials Inc.", required: true },
      { id: "performance.quality", label: "Quality Rating", type: "text", placeholder: "Excellent/Good/Fair/Poor", required: true },
      { id: "performance.delivery", label: "Delivery Performance", type: "text", placeholder: "On Time/Delayed", required: true },
      { id: "performance.pricing", label: "Pricing Competitiveness", type: "text", placeholder: "Competitive/Above Market", required: true },
      { id: "performance.communication", label: "Communication", type: "text", placeholder: "Excellent/Good/Fair/Poor", required: true },
      { id: "performance.issues", label: "Issues Encountered", type: "multiline", placeholder: "Any issues with vendor", required: false },
      { id: "performance.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for future engagement", required: false }
    ]),

    // Phase 4: Quality & Technical (041-045)
    generateTemplate("report-041", "Material Testing Report", "technical", [
      { id: "header.date", label: "Test Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "test.material", label: "Material Tested", type: "text", placeholder: "Concrete/Steel/Soil", required: true },
      { id: "test.sample", label: "Sample ID", type: "text", placeholder: "SAMPLE-001", required: true },
      { id: "test.location", label: "Test Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "test.type", label: "Test Type", type: "text", placeholder: "Compression/Slump/Penetration", required: true },
      { id: "test.results", label: "Test Results", type: "multiline", placeholder: "Detailed test results", required: true },
      { id: "test.specification", label: "Specification Requirements", type: "multiline", placeholder: "Required specifications", required: true },
      { id: "test.compliance", label: "Compliance Status", type: "text", placeholder: "Pass/Fail", required: true },
      { id: "test.tester", label: "Tested By", type: "text", placeholder: "Lab Technician", required: true }
    ]),

    generateTemplate("report-042", "Non-Conformance Report (NCR)", "quality-control", [
      { id: "header.date", label: "NCR Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "ncr.number", label: "NCR Number", type: "text", placeholder: "NCR-2024-001", required: true },
      { id: "ncr.location", label: "Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "ncr.description", label: "Non-Conformance Description", type: "multiline", placeholder: "Detailed description of non-conformance", required: true },
      { id: "ncr.severity", label: "Severity", type: "text", placeholder: "Critical/Major/Minor", required: true },
      { id: "ncr.cause", label: "Root Cause", type: "multiline", placeholder: "Root cause analysis", required: true },
      { id: "ncr.corrective", label: "Corrective Action", type: "multiline", placeholder: "Corrective actions taken", required: true },
      { id: "ncr.preventive", label: "Preventive Action", type: "multiline", placeholder: "Preventive measures", required: false },
      { id: "ncr.status", label: "NCR Status", type: "text", placeholder: "Open/Closed", required: true }
    ]),

    generateTemplate("report-043", "Commissioning Checklist", "technical", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Commissioning Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "commission.system", label: "System/Equipment", type: "text", placeholder: "Water Pump System", required: true },
      { id: "commission.preStart", label: "Pre-Start Checks", type: "multiline", placeholder: "Pre-start commissioning checks", required: true },
      { id: "commission.operational", label: "Operational Tests", type: "multiline", placeholder: "Operational testing results", required: true },
      { id: "commission.performance", label: "Performance Verification", type: "multiline", placeholder: "Performance verification results", required: true },
      { id: "commission.issues", label: "Issues Found", type: "multiline", placeholder: "Any issues during commissioning", required: false },
      { id: "commission.signoff", label: "Commissioning Sign-off", type: "text", placeholder: "Approved/Not Approved", required: true },
      { id: "commission.commissioner", label: "Commissioned By", type: "text", placeholder: "Commissioning Engineer", required: true }
    ]),

    generateTemplate("report-044", "System Performance Test", "technical", [
      { id: "header.date", label: "Test Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "test.system", label: "System Tested", type: "text", placeholder: "Water Distribution System", required: true },
      { id: "test.objective", label: "Test Objective", type: "multiline", placeholder: "Objective of the performance test", required: true },
      { id: "test.parameters", label: "Test Parameters", type: "multiline", placeholder: "Parameters tested", required: true },
      { id: "test.results", label: "Test Results", type: "multiline", placeholder: "Detailed test results", required: true },
      { id: "test.performance", label: "Performance Assessment", type: "multiline", placeholder: "Performance assessment", required: true },
      { id: "test.compliance", label: "Compliance with Specifications", type: "text", placeholder: "Compliant/Non-Compliant", required: true },
      { id: "test.tester", label: "Tested By", type: "text", placeholder: "Test Engineer", required: true }
    ]),

    generateTemplate("report-045", "Technical Specification Review", "technical", [
      { id: "header.date", label: "Review Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "spec.document", label: "Specification Document", type: "text", placeholder: "Spec-001", required: true },
      { id: "spec.revision", label: "Revision Number", type: "text", placeholder: "Rev. 2.0", required: true },
      { id: "spec.reviewer", label: "Reviewer", type: "text", placeholder: "Technical Engineer", required: true },
      { id: "spec.summary", label: "Review Summary", type: "multiline", placeholder: "Summary of specification review", required: true },
      { id: "spec.issues", label: "Issues Identified", type: "multiline", placeholder: "Any issues with specifications", required: false },
      { id: "spec.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for specification updates", required: false },
      { id: "spec.approval", label: "Approval Status", type: "text", placeholder: "Approved/Pending/Rejected", required: true }
    ]),

    // Phase 5: Documentation & Communication (046-050)
    generateTemplate("report-046", "Correspondence Log", "project-documentation", [
      { id: "header.date", label: "Correspondence Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "correspondence.ref", label: "Reference Number", type: "text", placeholder: "CORR-2024-001", required: true },
      { id: "correspondence.from", label: "From", type: "text", placeholder: "Client Name", required: true },
      { id: "correspondence.to", label: "To", type: "text", placeholder: "Contractor Name", required: true },
      { id: "correspondence.subject", label: "Subject", type: "text", placeholder: "Project Update Request", required: true },
      { id: "correspondence.content", label: "Correspondence Content", type: "multiline", placeholder: "Content of correspondence", required: true },
      { id: "correspondence.response", label: "Response Required", type: "text", placeholder: "Yes/No", required: true },
      { id: "correspondence.responseDate", label: "Response Date", type: "date", placeholder: "2024-01-22", required: false }
    ]),

    generateTemplate("report-047", "Drawing Revision Log", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Revision Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "drawing.number", label: "Drawing Number", type: "text", placeholder: "DWG-001", required: true },
      { id: "drawing.title", label: "Drawing Title", type: "text", placeholder: "Site Layout", required: true },
      { id: "drawing.revision", label: "Revision Number", type: "text", placeholder: "Rev. 3", required: true },
      { id: "drawing.reason", label: "Revision Reason", type: "multiline", placeholder: "Reason for revision", required: true },
      { id: "drawing.changes", label: "Changes Made", type: "multiline", placeholder: "Detailed description of changes", required: true },
      { id: "drawing.approved", label: "Approved By", type: "text", placeholder: "Project Engineer", required: true },
      { id: "drawing.status", label: "Status", type: "text", placeholder: "Issued for Construction", required: true }
    ]),

    generateTemplate("report-048", "Permit Status Report", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "permit.type", label: "Permit Type", type: "text", placeholder: "Building/Excavation/Environmental", required: true },
      { id: "permit.number", label: "Permit Number", type: "text", placeholder: "PER-2024-001", required: true },
      { id: "permit.issuingAuthority", label: "Issuing Authority", type: "text", placeholder: "City Building Department", required: true },
      { id: "permit.issueDate", label: "Issue Date", type: "date", placeholder: "2024-01-10", required: true },
      { id: "permit.expiryDate", label: "Expiry Date", type: "date", placeholder: "2024-12-31", required: true },
      { id: "permit.status", label: "Permit Status", type: "text", placeholder: "Active/Expired/Pending", required: true },
      { id: "permit.conditions", label: "Permit Conditions", type: "multiline", placeholder: "Conditions of the permit", required: false }
    ]),

    generateTemplate("report-049", "Warranty Documentation", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Documentation Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "warranty.item", label: "Warranted Item", type: "text", placeholder: "Water Pump System", required: true },
      { id: "warranty.vendor", label: "Vendor/Manufacturer", type: "text", placeholder: "ABC Equipment Inc.", required: true },
      { id: "warranty.startDate", label: "Warranty Start Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "warranty.duration", label: "Warranty Duration", type: "text", placeholder: "2 years", required: true },
      { id: "warranty.coverage", label: "Warranty Coverage", type: "multiline", placeholder: "What is covered under warranty", required: true },
      { id: "warranty.terms", label: "Warranty Terms", type: "multiline", placeholder: "Terms and conditions", required: true },
      { id: "warranty.contact", label: "Warranty Contact", type: "text", placeholder: "Contact information for warranty claims", required: true }
    ]),

    generateTemplate("report-050", "Lessons Learned Report", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "lessons.phase", label: "Project Phase", type: "text", placeholder: "Phase 1/Completion/etc.", required: true },
      { id: "lessons.successes", label: "Successes", type: "multiline", placeholder: "What went well", required: true },
      { id: "lessons.challenges", label: "Challenges", type: "multiline", placeholder: "Challenges encountered", required: true },
      { id: "lessons.lessons", label: "Lessons Learned", type: "multiline", placeholder: "Key lessons learned", required: true },
      { id: "lessons.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for future projects", required: true },
      { id: "lessons.team", label: "Contributing Team Members", type: "multiline", placeholder: "Team members who contributed", required: false },
      { id: "lessons.preparedBy", label: "Prepared By", type: "text", placeholder: "Project Manager", required: true }
    ])
  ];
}

// Main function to seed additional templates
export async function seedAdditionalTemplates() {
  console.log('🌱 Starting additional templates seed (report-026 through report-050)...');

  const additionalTemplates = generateAdditionalTemplates();

  for (const template of additionalTemplates) {
    const fieldCount = template.fields.length;
    const complexity = fieldCount <= 10 ? 'simple' : fieldCount <= 20 ? 'intermediate' : 'complex';

    // Determine category
    let category = 'project-documentation';
    if (template.title.includes('Safety') || template.title.includes('Emergency') || template.title.includes('Training') || template.title.includes('Toolbox') || template.title.includes('Audit')) {
      category = 'safety';
    } else if (template.title.includes('Purchase') || template.title.includes('Invoice') || template.title.includes('Cost') || template.title.includes('Payment') || template.title.includes('Vendor') || template.title.includes('Financial')) {
      category = 'financial';
    } else if (template.title.includes('Quality') || template.title.includes('Non-Conformance') || template.title.includes('NCR') || template.title.includes('Commissioning')) {
      category = 'quality-control';
    } else if (template.title.includes('Testing') || template.title.includes('Technical') || template.title.includes('System') || template.title.includes('Performance') || template.title.includes('Material')) {
      category = 'technical';
    }

    await prisma.reportTemplate.create({
      data: {
        pageId: template.pageId,
        title: template.title,
        category,
        version: '1.0.0',
        fieldsJson: template.fields,
        metadata: {
          fieldCount,
          complexity,
          description: `Additional template for ${template.title}`
        }
      }
    });
    console.log(`✅ Seeded template: ${template.pageId}`);
  }

  console.log('🎉 Additional templates seed completed successfully!');
  console.log(`📊 Total additional templates seeded: ${additionalTemplates.length}`);
}

// Run seed if called directly
if (require.main === module) {
  seedAdditionalTemplates()
    .catch((e) => {
      console.error('❌ Additional seed failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

