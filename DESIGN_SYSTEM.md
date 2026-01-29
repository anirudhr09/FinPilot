/* MyFinancialAnalyst - Enhanced UI Color Scheme & Design System */

/* ============================================
   COLOR PALETTE
   ============================================ */

Primary Gradient: #667eea → #764ba2
  - Used for: Buttons, active states, accents, avatars

Secondary Colors:
  - Success (Income): #10b981
  - Warning (Caution): #f59e0b
  - Danger (Expense): #ef4444

Neutral Colors:
  - Background: #f0f4f8
  - Card Background: #ffffff
  - Text Primary: #0f172a
  - Text Muted: #64748b
  - Border: #e2e8f0

/* ============================================
   SHADOW SYSTEM
   ============================================ */

Small Shadow:   0 2px 4px rgba(0, 0, 0, 0.08)
Medium Shadow:  0 4px 12px rgba(0, 0, 0, 0.1)
Large Shadow:   0 8px 24px rgba(0, 0, 0, 0.12)

Gradient Shadow Examples:
  - Button Gradient: 0 4px 15px rgba(102, 126, 234, 0.4)
  - On Hover: 0 6px 20px rgba(102, 126, 234, 0.6)

/* ============================================
   BORDER RADIUS SYSTEM
   ============================================ */

Small Inputs: 8px
Medium Inputs: 10px
Large Cards: 12px → 14px
Fully Rounded: 999px (badges, avatars)

/* ============================================
   TYPOGRAPHY IMPROVEMENTS
   ============================================ */

Font Family: "Inter", system-ui, sans-serif

Font Weights:
  - Regular: 400
  - Medium: 500
  - Semi-bold: 600
  - Bold: 700

Letter Spacing:
  - Labels: 0.5px (for uppercase text)
  - Badges: 0.3px
  - Headers: -0.5px (for large text)

Line Heights:
  - Body Text: 1.6
  - Chat Messages: 1.5

/* ============================================
   SPACING SCALE
   ============================================ */

8px  - Minimal spacing
12px - Small elements
14px - Form labels, badges
16px - Standard padding
20px - Card padding, section breaks
24px - Page content, large gaps
28px - Header gaps
32px - Top bar padding
40px - Auth card padding

/* ============================================
   COMPONENT IMPROVEMENTS
   ============================================ */

BUTTONS:
  - Primary: Gradient background with shadow
  - Hover: Transform up 2px, enhanced shadow
  - Active: Return to original position
  - Padding: 12-14px with better visual weight

CARDS:
  - Padding: 24px (improved from 20px)
  - Border: 1px solid var(--border)
  - Shadow: Subtle with hover enhancement
  - Hover: Lift 4px + shadow increase

FORMS:
  - Input borders: 2px (improved visibility)
  - Focus state: Colored shadow + border change
  - Background: Light gray on unfocused
  - Transitions: All 0.3s cubic-bezier

GRADIENTS:
  - All gradients use: 135deg angle
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)

/* ============================================
   LAYOUT IMPROVEMENTS
   ============================================ */

Sidebar Width:
  - Desktop: 260px (improved from 240px)
  - Tablet: 220px
  - Mobile: 70px (with collapsed nav)

Topbar Height:
  - Desktop: 70px (improved from 64px)
  - Mobile: 60px (auto on mobile)

Content Padding:
  - Desktop: 32px (improved from 24px)
  - Tablet: 24px
  - Mobile: 16px

/* ============================================
   TRANSITIONS & ANIMATIONS
   ============================================ */

Standard Transition:
  all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

Progress Bar Animation:
  width 0.4s cubic-bezier(0.4, 0, 0.2, 1)

Form Step Fade-in:
  From: opacity 0, translateY 10px
  To: opacity 1, translateY 0
  Duration: 0.3s ease-in

Hover Lift Effect:
  transform: translateY(-2px to -4px)
  Applies to: Cards, buttons, strategy items

/* ============================================
   RESPONSIVE BREAKPOINTS
   ============================================ */

Large Screens: 1024px ↑
  - Full sidebar with labels
  - 2-column layouts
  - Full spacing

Tablets: 768px - 1023px
  - Sidebar width: 220px
  - Grid adjustments
  - Content padding: 24px

Mobile: 480px - 767px
  - Collapsed sidebar (70px)
  - Single column layouts
  - Optimized spacing
  - Stacked forms

Small Devices: < 480px
  - Auth cards: 24px padding
  - All elements single column
  - Message max-width: 85%
  - Buttons full width

/* ============================================
   BEST PRACTICES IMPLEMENTED
   ============================================ */

✓ Semantic color usage (success, warning, danger)
✓ Consistent shadow hierarchy
✓ Clear visual feedback (hover, focus, active)
✓ Smooth animations for all interactions
✓ Accessible contrast ratios
✓ Mobile-first responsive design
✓ Performance-optimized animations (transform, opacity)
✓ Consistent spacing scale
✓ Better typography hierarchy
✓ Glass-morphism effects on auth page
✓ Gradient overlays for visual depth
✓ Smooth transitions between states
