# 🌌 MichaelSoft | Next-Gen Digital Infrastructure

Welcome to the future of digital architecture. **MichaelSoft** is a high-performance web application built with a premium aesthetic and enterprise-grade security, designed to serve as the gateway to the next generation of infrastructure.

> [!IMPORTANT]
> This platform is currently in a "Coming Soon" phase, under active development to ensure the highest standards of reliability and design.

---

## ✨ Features

- **🚀 State-of-the-art Design**: A curated, atmospheric UI with dynamic background orbs, glassmorphism, and smooth animations using Tailwind CSS 4.
- **🛡️ Secure Admin Portal**: A dedicated admin subdomain (`admin.michaelsoft.co.ke`) protected by native Supabase authentication.
- **⚡ Performance-First Architecture**: Built on **Next.js 16 (Turbopack)** for lightning-fast compilation and optimized production builds.
- **🏗️ Multi-Subdomain Routing**: Intelligent proxy routing for subdomains like `admin`, `status`, `docs`, and `procurement`.
- **🗃️ Real-time Database**: Integrated with **Supabase** for persistent project management and secure user identity.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (React 19) |
| **Styling** | Vanilla CSS + Tailwind CSS 4 |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Native & Auth SDK |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- npm or pnpm
- Supabase Account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mmmyykkeee/michaelsoft.git
   cd michaelsoft_coming_soon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file with the following keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_role_key
   NEXT_PUBLIC_ROOT_DOMAIN=michaelsoft.co.ke
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Access the main page at `http://localhost:3000` or the admin portal at `http://admin.localhost:3000`.

---

## 🔐 Admin Access

The admin portal is protected via native Supabase Auth. To log in with the hardcoded credentials:

- **Email**: `admin@michaelsoft.co.ke`
- **Password**: `Arsenal123*`

> [!TIP]
> To create new administrative users, you can use the provided script:
> ```bash
> node scripts/insert_user.js
> ```

---

## 📂 Project Structure

```bash
├── src/
│   ├── app/           # Next.js App Router (Main & Subdomains)
│   ├── components/    # Reusable UI components (LoginForm, ProjectCard)
│   ├── lib/           # Shared logic (Supabase client, Auth)
│   └── proxy.ts       # Advanced subdomain routing logic
├── scripts/           # Management scripts (User insertion, storage init)
└── supabase/          # SQL migration and initialization files
```

---

## 🏗️ Deployment

To build the application for production:

```bash
npm run build
```

This project is optimized for deployment on **Vercel** with automatic subdomain detection.

---

© 2026 MichaelSoft. All rights reserved. Architecting the next generation of digital infrastructure.