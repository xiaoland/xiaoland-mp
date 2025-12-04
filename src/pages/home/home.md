# Home Page

This page serves as the personal introduction page for 袁翊闳 (Yuan Yihong).

## Design Philosophy

The redesigned home page follows a **minimalist editorial** approach:

- **No rounded corners**: Sharp, clean edges for a modern, decisive look
- **No shadows**: Uses borders and solid colors for depth and separation
- **Strong typography**: Large, bold headlines with careful letter-spacing
- **Micro-interactions**: Subtle but delightful touch feedback on all interactive elements

## Structure

### Hero Section
- Status bar spacer for custom navigation
- Greeting text with uppercase styling
- Large name display (48px, weight 800)
- Interactive title switcher with auto-cycling (3 titles rotate every 3s)
- Avatar with press feedback (scale + border color change)
- Geometric divider (lines with rotated square)

### About Section (01)
- Personal philosophy and approach to coding
- Pull quote with left border accent
- Typography-focused design

### Tech Stack Section (02)
- Expandable accordion list
- Plus/minus toggle animation
- Four categories: Frontend, Cross-platform, Backend, Tools

### Projects Section (03)
- Card-based layout with index letters (A, B, C)
- Full background color inversion on press
- Arrow indicator with slide animation

### Contact Section (04)
- Simple call-to-action text
- Full-width button with bottom line reveal animation
- Inverts to primary color on press

### Footer
- Minimalist branding
- Geometric line separator
- "crafted with passion" tagline
- Year display

## Interactive States

| Element | Interaction | Feedback |
|---------|-------------|----------|
| Title items | Tap | Toggle active state with marker expansion |
| Avatar | Touch | Scale down to 0.95, border turns primary |
| Tech items | Tap | Expand/collapse with plus→minus animation |
| Project cards | Touch | Background inverts to dark, arrow slides left |
| Contact button | Touch | Background turns primary, bottom line reveals |

## Color Palette

- Background: Pure white (#FFFFFF)
- Primary text: Near black ($gray-900)
- Secondary text: $gray-600
- Accent: $primary (blue)
- Borders: $gray-200

## Typography Scale

- Hero name: 48px / 800 weight
- Section labels: 24px / 700 weight
- Body text: 15px / 400 weight
- Section numbers: 12px / monospace
- Micro text: 11-12px / uppercase