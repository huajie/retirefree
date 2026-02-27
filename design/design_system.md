# RetireFree Design System

## Overview
A comprehensive design system built for senior users (65-70+) with emphasis on clarity, trust, and accessibility.

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#2563EB` (Blue 600)
  - Usage: Primary CTAs, links, active states
  - WCAG AA compliant on white backgrounds

- **Trust Green**: `#059669` (Emerald 600)
  - Usage: Success states, positive indicators, secure elements
  - Conveys growth and stability

- **Calm Navy**: `#1E3A8A` (Blue 900)
  - Usage: Headers, important text, navigation
  - High contrast, professional

### Neutral Colors
- **Text Primary**: `#111827` (Gray 900)
  - Body text, headings
  - Contrast ratio: 16:1 on white

- **Text Secondary**: `#4B5563` (Gray 600)
  - Supporting text, labels
  - Contrast ratio: 7:1 on white

- **Background**: `#FFFFFF` (White)
  - Primary background

- **Background Secondary**: `#F9FAFB` (Gray 50)
  - Cards, sections, alternating rows

- **Border**: `#D1D5DB` (Gray 300)
  - Dividers, input borders

### Semantic Colors
- **Success**: `#059669` (Emerald 600)
  - Positive results, confirmations

- **Warning**: `#D97706` (Amber 600)
  - Caution states, important notices

- **Error**: `#DC2626` (Red 600)
  - Errors, critical warnings

- **Info**: `#0284C7` (Sky 600)
  - Informational messages, tips

### Accessibility Notes
- All color combinations tested for WCAG AA compliance (4.5:1 minimum)
- Never rely on color alone; always pair with icons or text labels
- High contrast mode support built-in

---

## Typography

### Font Families

**Primary Font**: System UI Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;
```
- **Rationale**: No web font loading = faster, familiar to users
- **Fallback**: Works across all devices without network dependency

**Monospace Font**: For numerical data
```css
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono',
             'Courier New', monospace;
```
- Usage: Financial figures, calculations, data tables

### Type Scale (Mobile-First)

#### Mobile (320px - 767px)
- **H1**: 32px / 2rem, Bold (700), Line-height: 1.2
- **H2**: 28px / 1.75rem, Bold (700), Line-height: 1.3
- **H3**: 24px / 1.5rem, Semibold (600), Line-height: 1.4
- **H4**: 20px / 1.25rem, Semibold (600), Line-height: 1.4
- **Body Large**: 20px / 1.25rem, Regular (400), Line-height: 1.6
- **Body**: 18px / 1.125rem, Regular (400), Line-height: 1.6
- **Body Small**: 16px / 1rem, Regular (400), Line-height: 1.5
- **Caption**: 14px / 0.875rem, Regular (400), Line-height: 1.5

#### Tablet (768px - 1023px)
- **H1**: 40px / 2.5rem, Bold (700), Line-height: 1.2
- **H2**: 32px / 2rem, Bold (700), Line-height: 1.3
- **H3**: 28px / 1.75rem, Semibold (600), Line-height: 1.4
- **H4**: 22px / 1.375rem, Semibold (600), Line-height: 1.4
- **Body Large**: 20px / 1.25rem, Regular (400), Line-height: 1.6
- **Body**: 18px / 1.125rem, Regular (400), Line-height: 1.6
- **Body Small**: 16px / 1rem, Regular (400), Line-height: 1.5

#### Desktop (1024px+)
- **H1**: 48px / 3rem, Bold (700), Line-height: 1.2
- **H2**: 36px / 2.25rem, Bold (700), Line-height: 1.3
- **H3**: 30px / 1.875rem, Semibold (600), Line-height: 1.4
- **H4**: 24px / 1.5rem, Semibold (600), Line-height: 1.4
- **Body Large**: 20px / 1.25rem, Regular (400), Line-height: 1.6
- **Body**: 18px / 1.125rem, Regular (400), Line-height: 1.6
- **Body Small**: 16px / 1rem, Regular (400), Line-height: 1.5

### Typography Rules
- **Minimum body text**: 18px (never smaller)
- **Line height**: 1.5 minimum for readability
- **Paragraph spacing**: 1.5em between paragraphs
- **Line length**: 60-75 characters maximum per line
- **Letter spacing**: Default (avoid tight spacing)

---

## Spacing System

### Base Unit: 4px

**Spacing Scale**:
- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)
- `3xl`: 64px (4rem)
- `4xl`: 96px (6rem)

### Component Spacing

**Buttons**:
- Padding: 16px (vertical) × 32px (horizontal)
- Minimum height: 48px
- Gap between buttons: 16px

**Form Fields**:
- Padding: 16px
- Minimum height: 56px
- Label margin-bottom: 8px
- Field margin-bottom: 24px

**Cards**:
- Padding: 24px (mobile), 32px (desktop)
- Gap between cards: 24px
- Border-radius: 12px

**Sections**:
- Vertical padding: 48px (mobile), 64px (tablet), 96px (desktop)
- Horizontal padding: 16px (mobile), 24px (tablet), 32px (desktop)

### Layout Grid
- **Mobile**: 16px margins, 16px gutters
- **Tablet**: 24px margins, 24px gutters
- **Desktop**: 12-column grid, 24px gutters, max-width 1280px

---

## Component Library

### Buttons

**Primary Button**
```
Background: #2563EB (Primary Blue)
Text: #FFFFFF (White)
Padding: 16px 32px
Border-radius: 8px
Font-size: 18px
Font-weight: 600
Min-height: 48px
Min-width: 44px (touch target)

States:
- Hover: Background #1D4ED8 (Blue 700)
- Active: Background #1E40AF (Blue 800)
- Focus: 3px solid outline #93C5FD (Blue 300)
- Disabled: Background #D1D5DB, Text #9CA3AF
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid #2563EB
Text: #2563EB
Padding: 14px 30px (adjusted for border)
Other properties: Same as Primary

States:
- Hover: Background #EFF6FF (Blue 50)
- Active: Background #DBEAFE (Blue 100)
- Focus: 3px solid outline #93C5FD
```

**Text Button**
```
Background: Transparent
Text: #2563EB
Padding: 16px
Underline on hover
Font-weight: 600
```

### Form Inputs

**Text Input**
```
Background: #FFFFFF
Border: 2px solid #D1D5DB
Border-radius: 8px
Padding: 16px
Font-size: 18px
Min-height: 56px

States:
- Focus: Border #2563EB, Outline 3px solid #93C5FD
- Error: Border #DC2626, Outline 3px solid #FCA5A5
- Disabled: Background #F3F4F6, Border #E5E7EB
```

**Label**
```
Font-size: 16px
Font-weight: 600
Color: #111827
Margin-bottom: 8px
```

**Helper Text**
```
Font-size: 14px
Color: #6B7280
Margin-top: 8px
```

**Error Message**
```
Font-size: 14px
Color: #DC2626
Margin-top: 8px
Icon: ⚠ before text
```

### Cards

**Standard Card**
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 12px
Padding: 24px (mobile), 32px (desktop)
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

Hover (if interactive):
Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
```

**Result Card** (for calculator results)
```
Background: #EFF6FF (Blue 50)
Border: 2px solid #2563EB
Border-radius: 12px
Padding: 32px
```

### Navigation

**Top Navigation**
```
Background: #FFFFFF
Border-bottom: 1px solid #E5E7EB
Height: 72px
Padding: 0 16px (mobile), 0 24px (desktop)
Logo height: 40px
```

**Footer**
```
Background: #F9FAFB
Border-top: 1px solid #E5E7EB
Padding: 48px 16px
Font-size: 16px
```

### Icons

**Size Scale**:
- Small: 20px
- Medium: 24px (default)
- Large: 32px
- Extra Large: 48px

**Usage**:
- Always pair with text labels
- Use outline style for better clarity
- Source: Heroicons (free, open-source)
- Color: Match surrounding text or use Primary Blue

### Loading States

**Spinner**
```
Size: 48px
Color: #2563EB
Stroke-width: 4px
Centered in container
With text: "Loading..." below
```

**Skeleton Screens**
```
Background: Linear gradient animation
Base color: #F3F4F6
Highlight color: #E5E7EB
Animation: Shimmer effect, 1.5s duration
```

---

## Elevation & Shadows

**Shadow Scale**:
- `shadow-sm`: 0 1px 2px rgba(0, 0, 0, 0.05)
  - Usage: Subtle elevation

- `shadow-md`: 0 4px 6px rgba(0, 0, 0, 0.1)
  - Usage: Cards, dropdowns

- `shadow-lg`: 0 10px 15px rgba(0, 0, 0, 0.1)
  - Usage: Modals, popovers

- `shadow-xl`: 0 20px 25px rgba(0, 0, 0, 0.1)
  - Usage: Important overlays

**Elevation Rules**:
- Use sparingly to establish hierarchy
- Maximum 3 elevation levels per screen
- Subtle shadows preferred for senior-friendly design

---

## Border Radius

**Scale**:
- `rounded-sm`: 4px - Small elements
- `rounded-md`: 8px - Buttons, inputs (default)
- `rounded-lg`: 12px - Cards
- `rounded-xl`: 16px - Large containers
- `rounded-full`: 9999px - Circular elements, pills

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
/* xs: 320px - 479px (default, no media query) */
/* sm: 480px - 767px */
@media (min-width: 480px) { ... }

/* md: 768px - 1023px (Tablet) */
@media (min-width: 768px) { ... }

/* lg: 1024px - 1279px (Desktop) */
@media (min-width: 1024px) { ... }

/* xl: 1280px+ (Large Desktop) */
@media (min-width: 1280px) { ... }
```

---

## Motion & Animation

**Duration**:
- Micro-interactions: 150ms
- Transitions: 250ms
- Complex animations: 400ms

**Easing**:
- Standard: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Entrance: `cubic-bezier(0.0, 0.0, 0.2, 1)`
- Exit: `cubic-bezier(0.4, 0.0, 1, 1)`

**Usage**:
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` setting
- No auto-playing animations

---

## Implementation Notes

### Free Resources
- **Icons**: Heroicons (https://heroicons.com) - Free, MIT license
- **Illustrations**: unDraw (https://undraw.co) - Free, customizable
- **Stock Photos**: Unsplash (https://unsplash.com) - Free, high quality

### CSS Framework Recommendation
- **Tailwind CSS** - Utility-first, easy customization, small bundle size
- Configure with RetireFree design tokens
- Alternative: Plain CSS with CSS variables

### Accessibility Testing
- **WAVE**: Browser extension for accessibility testing
- **Lighthouse**: Built into Chrome DevTools
- **Color contrast**: Use WebAIM Contrast Checker

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-trust: #059669;
  --color-navy: #1E3A8A;

  --color-text-primary: #111827;
  --color-text-secondary: #4B5563;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-border: #D1D5DB;

  --color-success: #059669;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #0284C7;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Typography */
  --font-size-base: 18px;
  --font-weight-normal: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
```
