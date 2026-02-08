# Listify - Todo Application

## Project Overview

Listify is a modern, full-stack todo application built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL. The application features user authentication, task management, and a responsive UI with smooth animations. It uses Drizzle ORM for database operations and Better Auth for authentication.

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (with App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: GSAP, Motion, Lenis
- **State Management**: React Hooks
- **UI Components**: Custom-built reusable components

### Backend & Database
- **Database**: PostgreSQL (hosted on Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **API**: RESTful API endpoints

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Database Migration**: Drizzle Kit

## Project Structure

```
frontend/
├── .gitignore
├── drizzle.config.ts           # Drizzle ORM configuration
├── eslint.config.mjs          # ESLint configuration
├── middleware.ts              # Next.js middleware for route protection
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies and scripts
├── pnpm-lock.yaml             # pnpm lock file
├── pnpm-workspace.yaml        # pnpm workspace configuration
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # Project documentation
├── tsconfig.json              # TypeScript configuration
├── types.ts                   # Global TypeScript types
├── .next/                     # Next.js build output (git-ignored)
├── app/                       # Next.js App Router pages
│   ├── (dashboard)/           # Dashboard routes group
│   │   ├── dashboard/         # Dashboard page
│   │   │   └── page.tsx
│   │   ├── todos/             # Todos page
│   │   │   └── page.tsx
│   │   └── layout.tsx         # Dashboard layout wrapper
│   ├── (public)/              # Public routes group
│   │   ├── login/             # Login page
│   │   └── page.tsx           # Landing page
│   ├── api/                   # API routes
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── manifest.json          # Web app manifest
├── components/                # Reusable React components
│   ├── auth/                  # Authentication components
│   ├── navbar.tsx             # Navigation bar
│   ├── footer.tsx             # Footer component
│   ├── lenis.tsx              # Smooth scrolling component
│   ├── TaskForm.tsx           # Task creation/editing form
│   ├── TaskItem.tsx           # Individual task display component
│   ├── TaskList.tsx           # Task list container
│   └── ...                    # Other UI components
├── data/                      # Static data files
│   ├── faqs.ts                # FAQ data
│   ├── features.ts            # Feature section data
│   ├── icons.ts               # Icon mappings
│   ├── links.ts               # Navigation links
│   └── ...                    # Other static data
├── db/                        # Database configuration
│   ├── index.ts               # Database connection
│   └── schema.ts              # Database schema definitions
├── drizzle/                   # Drizzle migration files (git-ignored)
├── hooks/                     # Custom React hooks
│   └── useTasks.js            # Task management hook
├── lib/                       # Utility functions
│   ├── auth.ts                # Authentication utilities
│   └── auth-client.ts         # Client-side auth utilities
├── public/                    # Static assets (images, icons, etc.)
├── sections/                  # Landing page sections
│   ├── faq-section.tsx        # FAQ section component
│   ├── features-section.tsx   # Features section component
│   ├── hero-section.tsx       # Hero section component
│   └── ...                    # Other landing page sections
└── services/                  # API service functions
    └── api.js                 # Task API service functions
```

## Key Features

### Authentication
- Social login (GitHub, Google)
- Session management
- Protected routes using Next.js middleware
- Secure session cookies

### Task Management
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Real-time updates with optimistic UI
- Loading states for all operations
- Error handling and user feedback

### UI/UX Features
- Responsive design for all screen sizes
- Smooth animations and transitions
- Clean, modern interface
- Intuitive user experience
- Loading indicators and empty states
- Form validation

## Environment Variables

The application requires the following environment variables:

```env
DATABASE_URL=your_postgresql_database_url
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_BACKEND_URL=your_backend_api_url
NEXT_PUBLIC_USER_ID=default_user_id_for_demo
```

## Database Schema

The application uses PostgreSQL with the following tables defined in `db/schema.ts`:

- **users**: Stores user information (id, name, email, etc.)
- **sessions**: Manages user sessions
- **accounts**: Stores social authentication provider info
- **verification**: Handles email verification tokens

## API Endpoints

The application communicates with a backend API for task operations:

- `GET /api/{userId}/tasks` - Fetch all tasks for a user
- `POST /api/{userId}/tasks` - Create a new task
- `PUT /api/{userId}/tasks/{taskId}` - Update a task
- `DELETE /api/{userId}/tasks/{taskId}` - Delete a task
- `PATCH /api/{userId}/tasks/{taskId}/complete` - Toggle task completion

## Components Architecture

### Task Management Components
- **useTasks Hook**: Custom hook managing all task-related state and API calls
- **TaskForm**: Component for creating and editing tasks with validation
- **TaskItem**: Individual task display with edit/delete functionality
- **TaskList**: Container component for displaying multiple tasks

### UI Components
- **Navbar**: Navigation bar with authentication links
- **Footer**: Site footer with additional links
- **AnimatedContent**: Component for animated content sections
- **CustomIcon**: Reusable icon component with directional options
- **SectionTitle**: Consistent section heading component

### Authentication Components
- **SignOutButton**: Button to handle user logout
- **Auth Providers**: Components for social login buttons

## Data Management

Static data for the landing page is organized in the `/data` directory:
- Features list with icons and descriptions
- FAQ entries
- Navigation links

## Styling Approach

The application uses Tailwind CSS for styling with:
- A consistent color palette
- Responsive utility classes
- Custom gradients and shadows
- Smooth transitions and animations
- Mobile-first responsive design

## Development Scripts

The following npm scripts are available:

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Deployment

The application is built with Next.js and can be deployed to platforms like Vercel, Netlify, or any hosting service that supports Next.js applications. Remember to configure the required environment variables in your deployment environment.

## Security Considerations

- Authentication handled by Better Auth with secure session management
- Database operations sanitized through Drizzle ORM
- Input validation on forms
- Protected routes using Next.js middleware
- Secure API communication

## Performance Optimizations

- Client-side rendering for dynamic content
- Optimistic UI updates for better perceived performance
- Efficient state management
- Lazy loading where appropriate
- Proper error boundaries and fallbacks