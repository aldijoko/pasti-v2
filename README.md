# PASTI SvelteKit Dashboard

A modern, responsive dashboard application built with SvelteKit and Tailwind CSS, designed to replicate the PASTI system structure without backend dependencies.

## 🚀 Features

- **Modern UI/UX**: Built with SvelteKit and Tailwind CSS for a beautiful, responsive interface
- **Dashboard Layout**: Comprehensive dashboard with sidebar navigation
- **Multiple Modules**: 
  - Dashboard overview with statistics
  - BDI (Basis Data Informasi) - Information database search
  - Laporan Informasi - Information reporting system
  - User management
  - Archive management
  - Report generation
  - System logs monitoring
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript Support**: Full TypeScript integration for better development experience
- **No Backend Required**: Pure frontend application that can be easily connected to any backend API

## 🛠️ Technology Stack

- **Frontend Framework**: [SvelteKit](https://svelte.dev/kit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: Yarn

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **Yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd pasti-sveltekit
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
yarn build
```

### 5. Preview Production Build

```bash
yarn preview
```

## 📁 Project Structure

```
pasti-sveltekit/
├── src/
│   ├── routes/                 # SvelteKit routes (pages)
│   │   ├── dashboard/         # Dashboard main page
│   │   ├── bdi/              # BDI module
│   │   ├── bsi/              # BSI module
│   │   ├── lapinfo/          # Laporan Informasi module
│   │   ├── users/            # User management
│   │   ├── archive/          # Archive management
│   │   ├── report/           # Report generation
│   │   ├── logs/             # System logs
│   │   └── +page.svelte      # Root page (redirects to dashboard)
│   ├── layouts/               # Layout components
│   │   └── DashboardLayout.svelte  # Main dashboard layout
│   ├── components/            # Reusable components
│   ├── assets/                # Static assets (images, icons, etc.)
│   ├── app.html              # HTML template
│   ├── app.css               # Global styles
│   └── app.d.ts              # TypeScript declarations
├── static/                    # Public static files
├── package.json              # Dependencies and scripts
├── svelte.config.js          # SvelteKit configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎯 Available Routes

- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard overview
- `/bdi` - Basis Data Informasi (Information Database)
- `/bsi` - Basis Data Sistem Informasi (System Information Database)
- `/lapinfo` - Laporan Informasi (Information Reports)
- `/users` - User management
- `/archive` - Archive management
- `/report` - Report generation
- `/logs` - System logs

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js`
- Updating color schemes in the components
- Adding custom CSS in `src/app.css`

### Adding New Modules
To add a new module:

1. Create a new directory in `src/routes/`
2. Add a `+page.svelte` file
3. Update the navigation in `src/layouts/DashboardLayout.svelte`
4. Import and use the `DashboardLayout` component

### Connecting to Backend
To connect this frontend to a backend API:

1. Create API service files in `src/services/`
2. Update the data fetching logic in components
3. Replace mock data with actual API calls
4. Add authentication and authorization logic

## 🔧 Development Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn check` - Type-check the project
- `yarn lint` - Lint the code
- `yarn format` - Format the code

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Collapsible sidebar for mobile devices
- Responsive tables and grids
- Touch-friendly interface elements

## 🎯 Key Components

### DashboardLayout
The main layout component that provides:
- Sidebar navigation
- Top navigation bar
- Responsive design
- User profile section

### Dashboard
Main dashboard with:
- Statistics cards
- Quick action buttons
- Recent activities timeline
- Overview of system status

### BDI Module
Information database search with:
- Search functionality
- Category filtering
- Results table
- Export capabilities

### Laporan Informasi
Information reporting system with:
- Add new reports
- Report management
- Status tracking
- Priority management

## 🚀 Deployment

### Static Site Deployment
This SvelteKit application can be deployed as a static site:

1. Build the application: `yarn build`
2. Deploy the `build` directory to your hosting service
3. Configure your hosting service for SPA routing

### Server Deployment
For server-side rendering:

1. Build the application: `yarn build`
2. Deploy to a Node.js server
3. Configure environment variables as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [SvelteKit documentation](https://svelte.dev/docs/kit)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
- Open an issue in the repository

## 🔄 Updates and Maintenance

To keep the project up to date:

1. Regularly update dependencies: `yarn upgrade`
2. Check for SvelteKit updates
3. Update Tailwind CSS to latest version
4. Review and update TypeScript configurations

---

**Built with ❤️ using SvelteKit and Tailwind CSS**
