# Blockchain Supply Chain Transparency System

A comprehensive supply chain transparency platform built on Internet Computer Protocol (ICP) blockchain, providing secure and transparent tracking of products from origin to consumer. Now featuring modern animations, dark/light themes, and enhanced user experience.

## 🌟 New Features

### 🎨 Modern UI/UX
- **Framer Motion Animations**: Smooth page transitions, button animations, and interactive elements
- **Dark/Light Theme Toggle**: Seamless theme switching with system preference detection
- **Toast Notifications**: Real-time feedback with react-hot-toast
- **Loading States**: Beautiful spinners and skeleton loaders
- **Responsive Design**: Optimized for all device sizes

### 🔧 Enhanced Functionality
- **QR Code Generation**: Generate QR codes for each product with sharing options
- **PDF Export**: Download complete supply chain journey reports
- **Advanced Search**: Filter products by ID, name, status, and location
- **User Profiles**: Comprehensive user management with activity tracking
- **Real-time Updates**: Live dashboard with animated statistics

### 🎯 Core Features
- **Product Registration**: Producers can register new products with unique IDs and metadata
- **Provenance Tracking**: Complete product journey tracking with immutable blockchain records
- **Data Transparency**: All supply chain events visible to authorized participants
- **User Roles**: Different access levels for producers, distributors, retailers, and consumers
- **Tamper-proof Records**: Blockchain immutability prevents data tampering and fraud

## 🛠️ Tech Stack

- **Backend**: Rust (Canisters/Smart Contracts on ICP)
- **Frontend**: React with JavaScript and Next.js
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with shadcn/ui components
- **Notifications**: React Hot Toast
- **QR Codes**: qrcode.react
- **PDF Generation**: jsPDF
- **Blockchain**: Internet Computer Protocol (ICP)
- **Tooling**: DFINITY SDK (dfx)

## 🚀 Quick Start

### Prerequisites

1. Install [DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
2. Install [Node.js](https://nodejs.org/) (v18 or higher)
3. Install [Rust](https://rustup.rs/)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd icp-supply-chain
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start local ICP replica**
   \`\`\`bash
   dfx start --background --clean
   \`\`\`

4. **Deploy canisters**
   \`\`\`bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   \`\`\`

5. **Access the application**
   - Open your browser and navigate to the frontend canister URL
   - The URL will be displayed after successful deployment

## 📖 Usage

### 🏠 Landing Pages

Each feature now has its own dedicated landing page with detailed information and functionality:

- **Product Registration** (`/register-product`): Complete product registration interface with benefits and process explanation
- **Product Tracking** (`/track-product`): Advanced tracking with QR codes, PDF export, and journey visualization  
- **Supply Chain Events** (`/supply-events`): Event management with real-time updates and blockchain recording
- **User Registration** (`/user-registration`): User onboarding with role-based access control
- **QR Code Generator** (`/qr-generator`): Generate, download, and share QR codes for products
- **PDF Reports** (`/pdf-reports`): Comprehensive report generation with multiple formats
- **Search & Analytics** (`/search-analytics`): Advanced search, filtering, and data analytics
- **User Profiles** (`/user-profiles`): Complete user management and activity tracking

### 🎨 Navigation

- **Home Page**: Overview of all features with direct navigation to each landing page
- **Dashboard**: Centralized control panel with all functionality in tabs
- **Individual Pages**: Dedicated pages for each feature with detailed interfaces
# SupplyHero
