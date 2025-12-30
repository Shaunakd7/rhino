# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Overview

This is a cinematic, single-page brand showcase website for RHINO. The site features:

- **Smooth scrolling** powered by Lenis
- **Scroll-triggered animations** using Framer Motion
- **Advanced animations** with GSAP
- **Responsive design** with Tailwind CSS
- **Dark, premium aesthetic** aligned with brand identity

## Key Features

### Sections

1. **Hero** - Full-screen introduction with animated title
2. **Brand Philosophy** - Scroll-revealed manifesto lines
3. **K-Series Intro** - Split layout showcasing Korean engineering
4. **Finishes Showcase** - Full-screen hero moments for 5 finishes
5. **Technology Features** - Visual feature explanations
6. **Installation Philosophy** - Premium craftsmanship messaging
7. **Closing Statement** - Brand statement and footer

### Animation Philosophy

- Animations trigger when sections enter viewport
- Smooth, performance-conscious transitions
- Parallax effects on scroll
- Grain texture overlay for premium feel
- Light sweep effects on finish sections

## Customization

### Colors & Gradients

Edit finish colors in `components/sections/FinishesShowcase.tsx`:
- Modify `gradient` and `textColor` properties
- Adjust background effects per finish

### Typography

Font sizes and weights can be adjusted in:
- `app/globals.css` - Global typography settings
- Individual section components - Section-specific typography

### Animations

Animation timing and effects can be customized in:
- `app/page.tsx` - Lenis smooth scroll settings
- Individual section components - Framer Motion animations

## Production Build

```bash
npm run build
npm start
```

## Notes

- No e-commerce functionality (by design)
- Optimized for modern browsers
- Mobile-responsive design
- Performance-focused animations

