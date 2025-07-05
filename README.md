# Panna Combs Showcase

A premium hair combs product showcase and admin panel built with React, Firebase, and Firestore.

## Project Overview

This project is a modern web application for Panna Combs, featuring:
- A public-facing product showcase website
- An admin panel for managing products and images
- Integration with Firebase Firestore and Storage for data and image hosting

## Features

- **Product Listing:** Browse products by category, view product details, and images
- **Admin Panel:** Add, edit, and delete products with image uploads
- **Category Filtering:** Products are shown in their correct categories
- **Firebase Integration:** Uses Firestore for product data and Storage for images
- **Responsive Design:** Works on desktop and mobile

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Custom components, Tailwind CSS
- **Backend/Data:** Firebase Firestore, Firebase Storage
- **Hosting:** Vercel/Netlify (static frontend), Firebase (data/images)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Firebase project (with Firestore and Storage enabled)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/panna-combs-showcase.git
   cd panna-combs-showcase
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure Firebase:
   - Copy your Firebase config to `src/lib/firebase.ts`.
   - Make sure your Firestore and Storage rules allow the required access.

### Running Locally
```bash
npm run dev
# or
yarn dev
```
- Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```
- The output will be in the `dist/` folder.

### Deploying
- Deploy the `dist/` folder to Vercel, Netlify, or your preferred static hosting.
- Set up your custom domain (e.g., pannacombs.com).

## Admin Panel
- Visit `/admin` on your deployed site.
- Use the admin password (set in code or via environment variable) to log in.
- Add, edit, or delete products and images.

## Troubleshooting
- **Blank page or errors:** Check the browser console for errors and ensure your Firebase config is correct.
- **Products not showing:** Make sure Firestore rules allow public reads and your frontend is using the correct Firebase project.
- **Image upload issues:** Check Storage rules and CORS settings.
- **Category filter not working:** Ensure product `category` fields in Firestore match the display names in your frontend.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
