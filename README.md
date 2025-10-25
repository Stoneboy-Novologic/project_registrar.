# Scalable Multi-Report Editor System

A comprehensive construction project report management system built with Next.js, PostgreSQL, and Prisma. This system supports 100+ report templates with dynamic rendering, multi-report management, and real-time collaboration features.

## 🚀 Features

### Core Functionality
- **Multi-Report Management**: Create, edit, and manage multiple report instances
- **100+ Template Support**: Dynamic template system supporting unlimited report types
- **Real-time Preview**: Live preview of reports as you edit
- **Auto-save**: Automatic saving with debounced updates
- **Database Persistence**: PostgreSQL with Prisma ORM for reliable data storage

### Report Templates
- **Project Documentation**: Project registers, table of contents, overviews
- **Safety & Quality**: Inspection checklists, quality control, punch lists
- **Financial**: Budget summaries, change orders, cost tracking
- **Technical**: Equipment reports, environmental compliance, as-built docs

### User Interface
- **Modern Dashboard**: Clean, professional interface with construction industry theming
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use sidebar with template browser
- **Search & Filter**: Find templates and reports quickly

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Validation**: Zod

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │    │   Zustand Store │    │   API Routes    │
│   Components    │◄──►│   State Mgmt    │◄──►│   Business Logic│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │   PostgreSQL    │
                                               │   Database      │
                                               └─────────────────┘
```

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── templates/          # Template management
│   │   ├── reports/            # Report management
│   │   └── export/            # Export functionality
│   ├── components/
│   │   ├── editor/            # Editor components
│   │   ├── reports/           # Report management UI
│   │   ├── report-pages/      # Template components
│   │   └── report-primitives/ # Reusable UI components
│   ├── reports/               # Report pages
│   └── data/templates/        # Template definitions
├── lib/
│   ├── api/                   # API client functions
│   ├── prisma.ts              # Database client
│   ├── store.ts               # Zustand store
│   ├── types.ts               # TypeScript types
│   └── validation.ts          # Zod schemas
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
└── docs/
    └── architecture/          # System documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd editor-test
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Update .env with your PostgreSQL connection string
   DATABASE_URL="postgresql://username:password@localhost:5432/report_editor"
   
   # Push the schema to the database
   pnpm db:push
   
   # Seed the database with templates
   pnpm db:seed
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Core Models

- **ReportTemplate**: Template definitions with field schemas
- **Report**: User-created report instances
- **ReportPage**: Individual pages within reports
- **ReportExport**: Export history and file management

### Key Features
- JSON fields for flexible data storage
- Cascade deletes for data integrity
- Optimized indexes for performance
- Support for template versioning

## 🔧 API Documentation

### Template Management
- `GET /api/templates` - List templates with pagination
- `GET /api/templates/[id]` - Get single template
- `POST /api/templates` - Create new template
- `PUT /api/templates/[id]` - Update template
- `DELETE /api/templates/[id]` - Delete template

### Report Management
- `GET /api/reports` - List reports with search
- `GET /api/reports/[id]` - Get report with pages
- `POST /api/reports` - Create new report
- `PUT /api/reports/[id]` - Update report metadata
- `DELETE /api/reports/[id]` - Delete report

### Page Management
- `GET /api/reports/[id]/pages` - List report pages
- `POST /api/reports/[id]/pages` - Add page to report
- `PUT /api/reports/[id]/pages/[pageId]` - Update page values
- `DELETE /api/reports/[id]/pages/[pageId]` - Remove page

## 🎨 Template System

### Custom Templates (Reports 1-5)
- Full control over layout and styling
- Optimized for specific use cases
- Complex interactions and animations

### Generic Templates (Reports 6+)
- Automatic rendering based on field definitions
- Consistent styling and behavior
- Scales to unlimited templates

### Supported Field Types
- `text` - Plain text input
- `multiline` - Rich text with HTML support
- `link` - URL input with validation
- `date` - Date picker
- `badge` - Styled badge display
- `image` - Image upload and display
- `attachments` - File attachment lists
- `authors` - Author information
- `contents` - Table of contents

## 🔄 Data Flow

1. **User Action** → Component dispatches action
2. **Store Update** → Zustand store updates state
3. **API Call** → Client function calls API route
4. **Database Update** → Prisma updates PostgreSQL
5. **Response** → Data flows back through the chain
6. **UI Update** → Component re-renders with new data

### Auto-save Flow
- User types → Update local state immediately
- Start 2-second debounce timer
- After inactivity → Save to database
- Show saving indicator during API call

## 🛠️ Development

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed database with templates
pnpm db:reset     # Reset and seed database
```

### Code Organization
- **Components**: Reusable UI components
- **Pages**: Next.js page components
- **API Routes**: Server-side business logic
- **Lib**: Shared utilities and configurations
- **Types**: TypeScript type definitions

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Database Schema](docs/architecture/database-schema.md)
- [API Endpoints](docs/architecture/api-endpoints.md)
- [Data Flow](docs/architecture/data-flow.md)
- [Template System](docs/architecture/template-system.md)

## 🚀 Deployment

### Environment Variables
```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

### Production Build
```bash
pnpm build
pnpm start
```

### Database Setup
```bash
# In production
pnpm db:push
pnpm db:seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Zod for validation
- Add comprehensive error handling
- Include console logging for debugging
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `docs/`
- Review the API documentation

## 🔮 Future Enhancements

### Planned Features
- User authentication and authorization
- Real-time collaboration
- Advanced template builder
- PDF export with Playwright
- Mobile app support
- API rate limiting
- Webhook support

### Performance Improvements
- Server-side rendering
- Template compilation
- Advanced caching strategies
- Bundle optimization
- CDN integration

---

Built with ❤️ for the construction industry