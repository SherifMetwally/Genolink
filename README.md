# GenoLink Landing Page

A modern, responsive single-page landing page for GenoLink - Bridging Global Genomics to the Middle East.

## Features

- 🎨 Modern design with dark red background and gold accents
- ✨ Smooth animations and transitions using Framer Motion
- 📱 Fully responsive mobile-first design
- 🧬 Animated DNA helix logo
- 🎯 Smooth scroll navigation with active section highlighting
- ⚡ Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
genolink/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About Us section
│   ├── Services.tsx     # Services section
│   ├── ForPhysicians.tsx
│   ├── ForPatients.tsx
│   ├── Partners.tsx
│   ├── Collaboration.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts         # Utility functions
└── public/
    └── logo.png         # GenoLink logo (add your logo here)
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Customization

### Colors

The color scheme is defined in `tailwind.config.ts`:
- Dark Red: `#6B0F1A` (primary background)
- Gold: `#D4AF37` (primary accent)

### Logo

Place your GenoLink logo in the `public/` directory as `logo.png`.

## Build

```bash
npm run build
```

## License

Private project for GenoLink.

