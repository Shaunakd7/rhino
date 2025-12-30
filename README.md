# RHINO Brand Showcase Website

A cinematic, single-page scroll-based brand showcase website for RHINO, a premium automotive Paint Protection Film (PPF) and Sunfilm brand.

## Overview

This website is designed as a **brand storytelling experience**, not an e-commerce platform. It establishes RHINO as a high-end, aspirational, technologically advanced protection brand through:

- Cinematic visuals
- Bold typography
- Motion design
- Immersive storytelling

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Lenis** - Smooth scrolling

## Features

### Sections

1. **Hero Section** - Full-screen cinematic introduction with:
   - 3D tilt effects on mouse movement
   - Animated particles
   - Floating geometric shapes
   - Letter-by-letter animations
   - Parallax scroll effects
   - Custom cursor follower

2. **Brand Philosophy** - Scroll-revealed manifesto lines with:
   - Staggered animations
   - Hover effects with shadow duplicates
   - Animated underlines
   - Floating background elements

3. **K-Series Introduction** - Split layout showcasing Korean engineering with:
   - 3D card effects with perspective
   - Parallax scrolling
   - Animated K letter with rotation
   - Floating particles

4. **Finishes Showcase** - Full-screen hero moments for each finish:
   - AURA — Deep Gloss (10 mil, Full specifications from catalogue)
   - LUMO — Performance Gloss (8 mil)
   - PRISM — Ultra Gloss (8 mil)
   - DUSK — Matte Stealth (8 mil)
   - HAZE — Satin Matte (8 mil)
   - Product specifications grid (Finish, Thickness, Topcoat, Adhesive, Warranty)
   - Image support (place images in `/public/images/products/`)
   - Hover animations with letter-by-letter effects
   - Light sweep effects
   - Animated orbs matching product colors

5. **Technology & Features** - Visual explanations with:
   - 3D card rotations on hover
   - Animated icons with rotation
   - Gradient backgrounds per feature
   - Floating particles
   - Scale and lift effects

6. **Installation Philosophy** - Premium craftsmanship section
7. **Closing Statement** - Brand statement with footer

### Design Principles

- **Dark, premium aesthetic** - Black, graphite, metallic tones
- **Minimal text, maximum impact** - Visual storytelling over copy
- **Smooth scroll animations** - Parallax, fade-ins, scale effects
- **Mobile responsive** - Optimized for all screen sizes
- **Performance-conscious** - Smooth animations without gimmicks

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
RHINO/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with smooth scroll setup
│   └── globals.css         # Global styles and utilities
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── BrandPhilosophy.tsx
│   │   ├── KSeriesIntro.tsx
│   │   ├── FinishesShowcase.tsx
│   │   ├── TechnologyFeatures.tsx
│   │   ├── InstallationPhilosophy.tsx
│   │   └── ClosingStatement.tsx
│   └── utils/
│       └── ScrollReveal.tsx
├── public/
│   └── images/
│       └── products/       # Place product images here
│           ├── aura.jpg
│           ├── lumo.jpg
│           ├── prism.jpg
│           ├── dusk.jpg
│           └── haze.jpg
└── package.json
```

## Brand Guidelines

### Key Phrases

- "Crafted for Cars That Deserve More"
- "A New Class of Paint Defense"
- "Modern Finishes. Armoured Surfaces."
- "Touch the surface. Not the damage."
- "Made to Protect What Matters."

### Tone

- Engineered
- Protective
- Modern
- Aggressive yet refined
- Minimal copy, maximum impact

## Constraints

- ❌ No pricing
- ❌ No cart
- ❌ No checkout
- ❌ No marketplace behavior
- ✅ Brand storytelling only
- ✅ Glamour, aspiration, and authority

## Performance

The website is optimized for performance with:

- Smooth scroll using Lenis
- Optimized animations with Framer Motion
- Lazy loading and viewport-based animations
- Minimal JavaScript bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for RHINO brand.

