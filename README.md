Sure! Here's a polished, complete README for your project including setup instructions, usage, plus notes about the new Report and KPIs pages with placeholders. It guides users on what to do next after cloning.

---

````markdown
# 📊 Business Intelligence Dashboard – BrandDrive Assessment

This is a **3-page business intelligence web application** built with **React** and **TypeScript**. The app provides a clean and responsive interface to visualize business metrics and manage user data. It was developed as part of the BrandDrive Frontend Assessment.

---

## 🧩 Project Structure

This project consists of the following **three core pages**:

1. **Dashboard Page** – Displays key business metrics using interactive charts like Signups, Revenue Sources, and Sales Trends.
2. **Users Page** – Shows a list of users with summary data.
3. **User Summary Page** – Provides a detailed view of a selected user's profile, metrics, and activity logs.

Additionally, the app contains **Report** and **KPIs** pages with animated placeholders as temporary content.

---

## 📌 Features

- 🔒 **Authentication-Ready Architecture**  
  Uses React Context (`AuthContext`) to simulate authentication flow.
  
- 📱 **Fully Responsive Design**  
  Optimized for desktop, tablet, and mobile views using Tailwind CSS breakpoints.
  
- 🎯 **Multi-Page Layout**  
  Seamless navigation between Dashboard, Users, User Summary, Reports, and KPIs pages.

- 📈 **Interactive Charts**  
  Includes visual components like Signups, Revenue Source, and Sales Line charts.

- 🧠 **Context API Usage**  
  Global state management for authentication and shared data.

- ⚡ **Mocked Data Handling**  
  Mocked JSON data simulates real API responses for development/testing.

- 🧱 **Reusable Components**  
  Cleanly separated components for better scalability and maintenance.

- 🌙 **Dark-Ready Base Styles**  
  Easily extendable to support dark mode in future enhancements.

- ✨ **Animated Placeholders**  
  Reports and KPIs pages include engaging animations as placeholders during development.

---

## 🖱️ How to Use the App

- Navigate to the **Users Page**.
- Click on any user card to **view the full summary** of that user.
- Explore the **Dashboard** for business metrics and charts.
- Visit **Reports** and **KPIs** pages to see animated placeholders for upcoming features.

---

## 🛠️ Setup Instructions

To run this project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/EmmanuelOhore/business_intelligence.git
cd business_intelligence
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser

Navigate to `http://localhost:3000` to access the app.

---

## 🚀 Next Steps After Cloning

1. **Explore the Codebase**
   Familiarize yourself with the `/src` directory structure, focusing on:

   * `pages/` — for routing and page components.
   * `components/` — reusable UI components.
   * `context/` — authentication and global state.

2. **Develop Reports and KPIs Pages**
   The current Reports and KPIs pages contain animated placeholders. You can start implementing real business logic and data visualization by replacing these placeholders.

3. **Integrate Real APIs**
   Replace mocked data in `/mocks` with actual API calls once backend services are available.

4. **Add Authentication Logic**
   Enhance the simulated auth flow in `AuthContext` to integrate real authentication providers.

5. **Improve UI/UX**
   Consider adding dark mode support, accessibility improvements, and performance optimizations.

---

## 📝 Notes on Reports and KPIs Pages

* Both pages currently feature animated placeholders to maintain user engagement while under development.
* Reports page is intended to display downloadable or interactive business reports.
* KPIs page will focus on presenting key performance indicators in a concise dashboard view.
* Feel free to customize the placeholders or replace them with actual content during your development.

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repo, create branches for features or fixes, and submit pull requests.

