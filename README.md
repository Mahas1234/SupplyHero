# SupplyHero

A decentralized supply chain transparency platform powered by the Internet Computer Protocol (ICP). Securely track products from origin to consumer with an immutable, auditable, and transparent system.

## ✨ Overview

SupplyHero is a comprehensive solution designed to bring trust and transparency to supply chains. By leveraging the power of the Internet Computer's blockchain, it provides a tamper-proof ledger for all product movements and events. This platform empowers producers, distributors, retailers, and consumers with verifiable data, reducing fraud and enhancing product integrity.

The revamped interface includes modern animations, dark/light themes, and a seamless user experience, making supply chain management more intuitive than ever.

## 🌟 Key Features

### 🎨 Modern UI/UX

  - **Framer Motion Animations**: Enjoy smooth page transitions, button animations, and interactive elements that enhance usability.
  - **Dark/Light Theme**: Switch between themes seamlessly, with automatic detection of your system preferences.
  - **Toast Notifications**: Get real-time, non-intrusive feedback for your actions with `react-hot-toast`.
  - **Responsive Design**: Access the full functionality of the platform on any device, from desktop to mobile.
  - **Loading States**: Experience beautiful spinners and skeleton loaders that provide clear visual feedback during data fetching.

### 🔧 Robust Functionality

  - **QR Code Generation**: Instantly generate and share unique QR codes for any product, linking directly to its provenance data.
  - **PDF Export**: Download comprehensive supply chain journey reports in PDF format for auditing and record-keeping.
  - **Advanced Search & Filtering**: Quickly find products by ID, name, status, or location with a powerful search interface.
  - **User Profiles & Management**: Manage user roles, permissions, and track activity across the platform.
  - **Real-time Dashboard**: Monitor the supply chain at a glance with a live dashboard featuring animated statistics and key metrics.

### 🎯 Core Blockchain Features

  - **Product Registration**: Producers can easily register new products, creating a unique digital identity on the blockchain.
  - **Immutable Provenance Tracking**: Follow a product's complete journey through every stage, with each step recorded as an immutable transaction.
  - **Data Transparency**: All supply chain events are visible to authorized participants, fostering trust and accountability.
  - **Role-Based Access Control**: Different access levels for producers, distributors, retailers, and consumers ensure data security and relevance.
  - **Tamper-Proof Records**: The inherent immutability of the blockchain prevents data tampering, ensuring the integrity of supply chain records.

## 🛠️ Tech Stack

  - **Backend**: **Rust** (Canisters/Smart Contracts on ICP)
  - **Frontend**: **React**, **Next.js**, **JavaScript**
  - **Blockchain**: **Internet Computer Protocol (ICP)**
  - **Styling**: **Tailwind CSS** with **shadcn/ui** components
  - **Animations**: **Framer Motion**
  - **Notifications**: **React Hot Toast**
  - **QR Codes**: `qrcode.react`
  - **PDF Generation**: `jsPDF`
  - **Tooling**: **DFINITY SDK (dfx)**

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

1.  **DFINITY SDK**: [Installation Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
2.  **Node.js**: `v18` or higher ([Download](https://nodejs.org/))
3.  **Rust**: [Installation Guide](https://rustup.rs/)

### Installation & Deployment

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd icp-supply-chain
    ```

2.  **Install frontend dependencies:**

    ```bash
    npm install
    ```

3.  **Start the local ICP replica:**
    Run this command in a new terminal window to start a local, clean instance of the Internet Computer.

    ```bash
    dfx start --background --clean
    ```

4.  **Deploy the canisters (smart contracts):**
    This script makes the deployment file executable and runs it.

    ```bash
    chmod +x scripts/deploy.sh
    ./scripts/deploy.sh
    ```

5.  **Access the Application:**
    Once the deployment is successful, the terminal will output the URL for the frontend canister. Open this URL in your browser to start using SupplyHero.

## 📖 Usage

SupplyHero is organized into several core modules, each with a dedicated interface for managing different aspects of the supply chain.

  - **🏠 Home Page**: Get an overview of all features with quick navigation to each module.
  - **📊 Dashboard**: A centralized control panel providing access to all major functionalities in a tabbed interface.
  - **📦 Product Registration** (`/register-product`): A complete interface for producers to register new products with detailed metadata.
  - **🔍 Product Tracking** (`/track-product`): Track a product's journey with QR codes, view its history on an interactive timeline, and export journey reports as PDFs.
  - **🚚 Supply Chain Events** (`/supply-events`): Manage and record key events (e.g., shipping, receiving, inspection) on the blockchain in real-time.
  - **👥 User Registration** (`/user-registration`): Onboard new users and assign roles (Producer, Distributor, etc.) with specific permissions.
  - **📈 Search & Analytics** (`/search-analytics`): Utilize advanced search, filtering, and data analytics to gain insights into supply chain operations.
  - **👤 User Profiles** (`/user-profiles`): View and manage user profiles, permissions, and activity logs.
