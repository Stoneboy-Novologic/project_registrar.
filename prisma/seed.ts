/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import { ReportTemplate, TemplateField } from '../lib/types';

const prisma = new PrismaClient();

// Import existing templates
import template01 from '../app/data/templates/default-v1/report-01.json';
import template02 from '../app/data/templates/default-v1/report-02.json';
import template03 from '../app/data/templates/default-v1/report-03.json';
import template04 from '../app/data/templates/default-v1/report-04.json';
import template05 from '../app/data/templates/default-v1/report-05.json';

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

// Generate 20+ placeholder templates
function generatePlaceholderTemplates(): ReportTemplate[] {
  return [
    // Safety & Quality Templates
    generateTemplate("report-006", "Safety Inspection Checklist", "safety", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain Project", required: true },
      { id: "header.date", label: "Inspection Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.inspector", label: "Inspector Name", type: "text", placeholder: "John Smith", required: true },
      { id: "safety.hazards", label: "Identified Hazards", type: "multiline", placeholder: "List any safety hazards observed during inspection", required: true },
      { id: "safety.equipment", label: "Safety Equipment Check", type: "multiline", placeholder: "Status of safety equipment and PPE compliance", required: true },
      { id: "safety.corrective", label: "Corrective Actions", type: "multiline", placeholder: "Actions taken to address safety concerns", required: false },
      { id: "safety.signatures", label: "Inspector Signature", type: "text", placeholder: "Inspector signature and date", required: true }
    ]),

    generateTemplate("report-007", "Daily Progress Report", "project-documentation", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "progress.weather", label: "Weather Conditions", type: "text", placeholder: "Clear, 15°C", required: true },
      { id: "progress.workCompleted", label: "Work Completed", type: "multiline", placeholder: "Description of work completed today", required: true },
      { id: "progress.workPlanned", label: "Work Planned", type: "multiline", placeholder: "Work planned for tomorrow", required: true },
      { id: "progress.issues", label: "Issues/Concerns", type: "multiline", placeholder: "Any issues or concerns encountered", required: false },
      { id: "progress.materials", label: "Materials Used", type: "multiline", placeholder: "Materials delivered and used", required: false },
      { id: "progress.labor", label: "Labor Hours", type: "text", placeholder: "Total labor hours worked", required: true }
    ]),

    generateTemplate("report-008", "Material Delivery Log", "project-documentation", [
      { id: "header.date", label: "Delivery Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.supplier", label: "Supplier", type: "text", placeholder: "ABC Materials Inc.", required: true },
      { id: "material.type", label: "Material Type", type: "text", placeholder: "Concrete Pipe", required: true },
      { id: "material.quantity", label: "Quantity", type: "text", placeholder: "50 units", required: true },
      { id: "material.specifications", label: "Specifications", type: "multiline", placeholder: "Material specifications and quality requirements", required: true },
      { id: "delivery.location", label: "Delivery Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "delivery.time", label: "Delivery Time", type: "text", placeholder: "09:30 AM", required: true },
      { id: "quality.inspection", label: "Quality Inspection", type: "multiline", placeholder: "Results of quality inspection", required: true },
      { id: "delivery.driver", label: "Driver Name", type: "text", placeholder: "Mike Johnson", required: false },
      { id: "delivery.vehicle", label: "Vehicle ID", type: "text", placeholder: "TRK-001", required: false }
    ]),

    generateTemplate("report-009", "Equipment Usage Report", "technical", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "equipment.excavator", label: "Excavator Hours", type: "text", placeholder: "8.5 hours", required: true },
      { id: "equipment.crane", label: "Crane Hours", type: "text", placeholder: "6.0 hours", required: true },
      { id: "equipment.compactor", label: "Compactor Hours", type: "text", placeholder: "4.0 hours", required: true },
      { id: "equipment.generator", label: "Generator Hours", type: "text", placeholder: "12.0 hours", required: true },
      { id: "equipment.maintenance", label: "Maintenance Performed", type: "multiline", placeholder: "Daily maintenance and inspections", required: true },
      { id: "equipment.issues", label: "Equipment Issues", type: "multiline", placeholder: "Any equipment problems or repairs needed", required: false },
      { id: "equipment.fuel", label: "Fuel Consumption", type: "text", placeholder: "150 liters", required: true },
      { id: "equipment.operator", label: "Primary Operator", type: "text", placeholder: "Sarah Wilson", required: true }
    ]),

    generateTemplate("report-010", "Quality Control Checklist", "quality-control", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.location", label: "Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "header.date", label: "Inspection Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "qc.concrete", label: "Concrete Quality", type: "multiline", placeholder: "Concrete strength, slump, temperature measurements", required: true },
      { id: "qc.reinforcement", label: "Reinforcement Check", type: "multiline", placeholder: "Rebar placement, spacing, and coverage", required: true },
      { id: "qc.dimensions", label: "Dimensional Accuracy", type: "multiline", placeholder: "Measurements and tolerances", required: true },
      { id: "qc.finish", label: "Surface Finish", type: "multiline", placeholder: "Surface quality and appearance", required: true },
      { id: "qc.testing", label: "Test Results", type: "multiline", placeholder: "Compression tests, slump tests, etc.", required: true },
      { id: "qc.nonConformances", label: "Non-Conformances", type: "multiline", placeholder: "Any quality issues identified", required: false },
      { id: "qc.corrective", label: "Corrective Actions", type: "multiline", placeholder: "Actions taken to address issues", required: false },
      { id: "qc.inspector", label: "QC Inspector", type: "text", placeholder: "Robert Chen", required: true }
    ]),

    // Financial Templates
    generateTemplate("report-011", "Budget Summary", "financial", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.period", label: "Reporting Period", type: "text", placeholder: "January 2024", required: true },
      { id: "budget.original", label: "Original Budget", type: "text", placeholder: "$2,500,000", required: true },
      { id: "budget.approved", label: "Approved Changes", type: "text", placeholder: "$150,000", required: true },
      { id: "budget.current", label: "Current Budget", type: "text", placeholder: "$2,650,000", required: true },
      { id: "budget.spent", label: "Amount Spent", type: "text", placeholder: "$1,200,000", required: true },
      { id: "budget.remaining", label: "Remaining Budget", type: "text", placeholder: "$1,450,000", required: true },
      { id: "budget.variance", label: "Budget Variance", type: "text", placeholder: "+$50,000", required: true },
      { id: "budget.forecast", label: "Forecast Completion", type: "text", placeholder: "$2,600,000", required: true },
      { id: "budget.notes", label: "Budget Notes", type: "multiline", placeholder: "Additional budget considerations and notes", required: false }
    ]),

    generateTemplate("report-012", "Change Order Request", "financial", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "Request Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.number", label: "Change Order #", type: "text", placeholder: "CO-001", required: true },
      { id: "change.description", label: "Change Description", type: "multiline", placeholder: "Detailed description of the requested change", required: true },
      { id: "change.reason", label: "Reason for Change", type: "multiline", placeholder: "Why this change is necessary", required: true },
      { id: "change.impact", label: "Schedule Impact", type: "multiline", placeholder: "Impact on project schedule", required: true },
      { id: "change.cost", label: "Cost Impact", type: "text", placeholder: "+$25,000", required: true },
      { id: "change.approval", label: "Approval Required", type: "text", placeholder: "Client approval required", required: true },
      { id: "change.requestor", label: "Requested By", type: "text", placeholder: "Project Manager", required: true }
    ]),

    // Technical Templates
    generateTemplate("report-013", "Site Photos Documentation", "technical", [
      { id: "header.date", label: "Photo Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.location", label: "Site Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "photos.progress", label: "Progress Photos", type: "image", placeholder: "Upload progress photos", required: true },
      { id: "photos.quality", label: "Quality Photos", type: "image", placeholder: "Upload quality inspection photos", required: true },
      { id: "photos.issues", label: "Issue Photos", type: "image", placeholder: "Upload photos of any issues", required: false },
      { id: "photos.description", label: "Photo Descriptions", type: "multiline", placeholder: "Describe what each photo shows", required: true },
      { id: "photos.photographer", label: "Photographer", type: "text", placeholder: "Site Engineer", required: true }
    ]),

    generateTemplate("report-014", "Meeting Minutes", "project-documentation", [
      { id: "header.date", label: "Meeting Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.time", label: "Meeting Time", type: "text", placeholder: "2:00 PM - 3:30 PM", required: true },
      { id: "header.location", label: "Meeting Location", type: "text", placeholder: "Site Office", required: true },
      { id: "attendees.list", label: "Attendees", type: "multiline", placeholder: "List all meeting attendees", required: true },
      { id: "agenda.items", label: "Agenda Items", type: "multiline", placeholder: "Items discussed in the meeting", required: true },
      { id: "decisions.made", label: "Decisions Made", type: "multiline", placeholder: "Key decisions and outcomes", required: true },
      { id: "action.items", label: "Action Items", type: "multiline", placeholder: "Action items with responsible parties", required: true },
      { id: "next.meeting", label: "Next Meeting", type: "text", placeholder: "January 22, 2024 at 2:00 PM", required: false },
      { id: "minutes.recorder", label: "Minutes Recorder", type: "text", placeholder: "Project Coordinator", required: true }
    ]),

    generateTemplate("report-015", "RFI (Request for Information)", "technical", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.date", label: "RFI Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.number", label: "RFI Number", type: "text", placeholder: "RFI-001", required: true },
      { id: "rfi.question", label: "Question/Issue", type: "multiline", placeholder: "Detailed description of the question or issue", required: true },
      { id: "rfi.context", label: "Context/Background", type: "multiline", placeholder: "Background information and context", required: true },
      { id: "rfi.impact", label: "Project Impact", type: "multiline", placeholder: "Potential impact on project if not resolved", required: true },
      { id: "rfi.urgency", label: "Urgency Level", type: "text", placeholder: "High/Medium/Low", required: true },
      { id: "rfi.requestor", label: "Requested By", type: "text", placeholder: "Site Engineer", required: true },
      { id: "rfi.response", label: "Response Required By", type: "date", placeholder: "2024-01-20", required: true }
    ]),

    // Additional templates for variety
    generateTemplate("report-016", "Submittal Log", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "submittal.number", label: "Submittal Number", type: "text", placeholder: "SUB-001", required: true },
      { id: "submittal.date", label: "Submittal Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "submittal.type", label: "Submittal Type", type: "text", placeholder: "Material Sample", required: true },
      { id: "submittal.description", label: "Description", type: "multiline", placeholder: "Detailed description of submittal", required: true },
      { id: "submittal.status", label: "Status", type: "text", placeholder: "Under Review", required: true },
      { id: "submittal.response", label: "Response Date", type: "date", placeholder: "2024-01-22", required: false },
      { id: "submittal.approved", label: "Approved By", type: "text", placeholder: "Client Representative", required: false }
    ]),

    generateTemplate("report-017", "Punch List", "quality-control", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.location", label: "Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "header.date", label: "Punch List Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "punch.item1", label: "Item 1", type: "multiline", placeholder: "First punch list item", required: true },
      { id: "punch.item2", label: "Item 2", type: "multiline", placeholder: "Second punch list item", required: true },
      { id: "punch.item3", label: "Item 3", type: "multiline", placeholder: "Third punch list item", required: true },
      { id: "punch.item4", label: "Item 4", type: "multiline", placeholder: "Fourth punch list item", required: false },
      { id: "punch.item5", label: "Item 5", type: "multiline", placeholder: "Fifth punch list item", required: false },
      { id: "punch.responsible", label: "Responsible Party", type: "text", placeholder: "Subcontractor", required: true },
      { id: "punch.dueDate", label: "Due Date", type: "date", placeholder: "2024-01-25", required: true }
    ]),

    generateTemplate("report-018", "Weather Report", "technical", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "weather.temperature", label: "Temperature", type: "text", placeholder: "15°C", required: true },
      { id: "weather.conditions", label: "Weather Conditions", type: "text", placeholder: "Clear skies", required: true },
      { id: "weather.wind", label: "Wind Speed", type: "text", placeholder: "10 km/h", required: true },
      { id: "weather.precipitation", label: "Precipitation", type: "text", placeholder: "None", required: true },
      { id: "weather.visibility", label: "Visibility", type: "text", placeholder: "10 km", required: true },
      { id: "weather.impact", label: "Work Impact", type: "multiline", placeholder: "Weather impact on construction activities", required: true }
    ]),

    generateTemplate("report-019", "Labor Hours Tracking", "project-documentation", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "labor.carpenters", label: "Carpenters", type: "text", placeholder: "4 workers x 8 hours = 32 hours", required: true },
      { id: "labor.electricians", label: "Electricians", type: "text", placeholder: "2 workers x 8 hours = 16 hours", required: true },
      { id: "labor.plumbers", label: "Plumbers", type: "text", placeholder: "3 workers x 8 hours = 24 hours", required: true },
      { id: "labor.laborers", label: "General Laborers", type: "text", placeholder: "6 workers x 8 hours = 48 hours", required: true },
      { id: "labor.total", label: "Total Hours", type: "text", placeholder: "120 hours", required: true },
      { id: "labor.overtime", label: "Overtime Hours", type: "text", placeholder: "8 hours", required: false },
      { id: "labor.notes", label: "Notes", type: "multiline", placeholder: "Additional labor notes", required: false }
    ]),

    generateTemplate("report-020", "Incident Report", "safety", [
      { id: "header.date", label: "Incident Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.time", label: "Incident Time", type: "text", placeholder: "2:30 PM", required: true },
      { id: "header.location", label: "Incident Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "incident.type", label: "Incident Type", type: "text", placeholder: "Near Miss", required: true },
      { id: "incident.description", label: "Incident Description", type: "multiline", placeholder: "Detailed description of what happened", required: true },
      { id: "incident.cause", label: "Root Cause", type: "multiline", placeholder: "Analysis of root cause", required: true },
      { id: "incident.injuries", label: "Injuries", type: "multiline", placeholder: "Description of any injuries", required: false },
      { id: "incident.action", label: "Corrective Action", type: "multiline", placeholder: "Actions taken to prevent recurrence", required: true },
      { id: "incident.reporter", label: "Reported By", type: "text", placeholder: "Site Supervisor", required: true }
    ]),

    generateTemplate("report-021", "Environmental Compliance", "technical", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "env.noise", label: "Noise Levels", type: "text", placeholder: "Within acceptable limits", required: true },
      { id: "env.dust", label: "Dust Control", type: "multiline", placeholder: "Dust control measures implemented", required: true },
      { id: "env.water", label: "Water Management", type: "multiline", placeholder: "Water runoff and management", required: true },
      { id: "env.waste", label: "Waste Management", type: "multiline", placeholder: "Waste disposal and recycling", required: true },
      { id: "env.wildlife", label: "Wildlife Impact", type: "multiline", placeholder: "Impact on local wildlife", required: false },
      { id: "env.compliance", label: "Compliance Status", type: "text", placeholder: "In Compliance", required: true }
    ]),

    generateTemplate("report-022", "Subcontractor Performance", "project-documentation", [
      { id: "header.date", label: "Report Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.subcontractor", label: "Subcontractor", type: "text", placeholder: "ABC Construction Ltd.", required: true },
      { id: "perf.workQuality", label: "Work Quality", type: "text", placeholder: "Excellent", required: true },
      { id: "perf.schedule", label: "Schedule Adherence", type: "text", placeholder: "On Time", required: true },
      { id: "perf.safety", label: "Safety Performance", type: "text", placeholder: "Good", required: true },
      { id: "perf.communication", label: "Communication", type: "text", placeholder: "Excellent", required: true },
      { id: "perf.issues", label: "Issues/Concerns", type: "multiline", placeholder: "Any performance issues", required: false },
      { id: "perf.recommendations", label: "Recommendations", type: "multiline", placeholder: "Recommendations for improvement", required: false }
    ]),

    generateTemplate("report-023", "Inspection Request", "quality-control", [
      { id: "header.date", label: "Request Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "inspection.type", label: "Inspection Type", type: "text", placeholder: "Concrete Placement", required: true },
      { id: "inspection.location", label: "Inspection Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "inspection.scheduled", label: "Scheduled Date", type: "date", placeholder: "2024-01-16", required: true },
      { id: "inspection.time", label: "Scheduled Time", type: "text", placeholder: "9:00 AM", required: true },
      { id: "inspection.inspector", label: "Inspector", type: "text", placeholder: "City Inspector", required: true },
      { id: "inspection.work", label: "Work to be Inspected", type: "multiline", placeholder: "Description of work ready for inspection", required: true },
      { id: "inspection.requestor", label: "Requested By", type: "text", placeholder: "Site Engineer", required: true }
    ]),

    generateTemplate("report-024", "As-Built Documentation", "technical", [
      { id: "header.date", label: "Documentation Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "asbuilt.location", label: "Location", type: "text", placeholder: "Site 6 - Dixie Road", required: true },
      { id: "asbuilt.work", label: "Work Completed", type: "multiline", placeholder: "Description of work completed", required: true },
      { id: "asbuilt.dimensions", label: "Actual Dimensions", type: "multiline", placeholder: "Actual measurements and dimensions", required: true },
      { id: "asbuilt.materials", label: "Materials Used", type: "multiline", placeholder: "Actual materials installed", required: true },
      { id: "asbuilt.deviations", label: "Deviations from Plans", type: "multiline", placeholder: "Any deviations from original plans", required: false },
      { id: "asbuilt.photos", label: "As-Built Photos", type: "image", placeholder: "Upload as-built photos", required: true },
      { id: "asbuilt.documenter", label: "Documented By", type: "text", placeholder: "Site Engineer", required: true }
    ]),

    generateTemplate("report-025", "Project Closeout Checklist", "project-documentation", [
      { id: "header.project", label: "Project Name", type: "text", placeholder: "East Brampton Watermain", required: true },
      { id: "header.completion", label: "Completion Date", type: "date", placeholder: "2024-01-15", required: true },
      { id: "closeout.punchList", label: "Punch List Complete", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.testing", label: "Testing Complete", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.documentation", label: "Documentation Complete", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.warranties", label: "Warranties Submitted", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.permits", label: "Permits Closed", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.cleanup", label: "Site Cleanup", type: "text", placeholder: "Yes", required: true },
      { id: "closeout.finalInspection", label: "Final Inspection", type: "text", placeholder: "Passed", required: true },
      { id: "closeout.clientAcceptance", label: "Client Acceptance", type: "text", placeholder: "Accepted", required: true },
      { id: "closeout.notes", label: "Closeout Notes", type: "multiline", placeholder: "Additional closeout notes", required: false }
    ])
  ];
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.reportPage.deleteMany();
  await prisma.reportExport.deleteMany();
  await prisma.report.deleteMany();
  await prisma.reportTemplate.deleteMany();

  // Seed existing templates (report-01 to report-05)
  const existingTemplates = [
    template01 as ReportTemplate,
    template02 as ReportTemplate,
    template03 as ReportTemplate,
    template04 as ReportTemplate,
    template05 as ReportTemplate
  ];

  for (const template of existingTemplates) {
    const fieldCount = template.fields.length;
    const complexity = fieldCount <= 10 ? 'simple' : fieldCount <= 20 ? 'intermediate' : 'complex';
    
    await prisma.reportTemplate.create({
      data: {
        pageId: template.pageId,
        title: template.title,
        category: 'project-documentation',
        version: '1.0.0',
        fieldsJson: template.fields,
        metadata: {
          fieldCount,
          complexity,
          description: `Original template ${template.pageId}`
        }
      }
    });
    console.log(`✅ Seeded template: ${template.pageId}`);
  }

  // Seed placeholder templates (report-006 to report-025)
  const placeholderTemplates = generatePlaceholderTemplates();
  
  for (const template of placeholderTemplates) {
    const fieldCount = template.fields.length;
    const complexity = fieldCount <= 10 ? 'simple' : fieldCount <= 20 ? 'intermediate' : 'complex';
    
    // Determine category based on template title
    let category = 'project-documentation';
    if (template.title.includes('Safety') || template.title.includes('Incident')) {
      category = 'safety';
    } else if (template.title.includes('Budget') || template.title.includes('Change Order')) {
      category = 'financial';
    } else if (template.title.includes('Quality') || template.title.includes('Punch List') || template.title.includes('Inspection')) {
      category = 'quality-control';
    } else if (template.title.includes('Equipment') || template.title.includes('Environmental') || template.title.includes('As-Built')) {
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
          description: `Generated placeholder template for ${template.title}`
        }
      }
    });
    console.log(`✅ Seeded template: ${template.pageId}`);
  }

  console.log('🎉 Database seed completed successfully!');
  console.log(`📊 Total templates seeded: ${existingTemplates.length + placeholderTemplates.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
