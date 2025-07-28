# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Viewing the Design System
- Open any HTML file directly in a browser to view components
- `open base.html` - View the complete layout system template
- `open buttons.html` - View button component examples  
- `open forms.html` - View form component examples
- `open foundation.html` - View design tokens and utilities

### No Build System Required
This design system uses vanilla HTML, CSS, and JavaScript with no build pipeline or package manager dependencies. All files can be opened directly in a browser for development and testing.

## Architecture Overview

### Technology Stack
- **HTML5**: Semantic markup with accessibility attributes
- **CSS Custom Properties**: Modern CSS variables for theming and design tokens
- **Vanilla JavaScript**: No framework dependencies, plain JS for interactions
- **SVG Icons**: Inline SVG icons for scalability and theming

### Project Structure
```
peridot-design-system/
├── css/
│   ├── root.css          # Main stylesheet with all components and design tokens
│   ├── old-layout.css    # Legacy styles (deprecated)
│   └── layout.css        # Additional layout utilities
├── js/
│   └── root.js           # JavaScript for interactions and theme switching
├── fonts/
│   └── Montserrat/       # Font family files and licensing
├── images/
│   └── samples/          # Sample images for component examples
├── *.html                # Component documentation and examples
└── design-system-elements.md  # Component planning document
```

### Design System Architecture

#### Foundation Layer
- **Design Tokens**: CSS custom properties for colors, typography, spacing, shadows
- **Utility Classes**: Flexbox, spacing, display, and text utilities following atomic design principles

#### Component Categories
The design system is organized into logical component groups:

1. **Layout System** (`base.html`, `layout.html`)
   - Dashboard layout: `.dashboard-layout`
   - Sidebar navigation: `.sidebar` with collapsible sections
   - Main content area: `.main-content` with header and content zones
   - Responsive breakpoints and mobile overlay system

2. **Navigation Components**
   - Hierarchical sidebar with `.nav-section` groupings
   - Expandable submenus with `.has-children` and `.nav-submenu`
   - Breadcrumb navigation: `.breadcrumb`
   - Active state management with `.active` classes

3. **Form Components** (`forms.html`)
   - Input fields with validation states
   - Input groups with icons and labels
   - Custom select dropdowns
   - File upload components with progress indicators
   - Toggle switches and form validation feedback

4. **Button System** (`buttons.html`)
   - Primary, secondary, outline, and text button variants
   - Size variations: small, medium, large
   - Icon buttons and button groups
   - Loading states and disabled states

5. **Content Components**
   - Card system: `.card` with header, body, footer sections
   - Status badges and progress indicators
   - Alert banners and toast notifications
   - Modal dialogs and dropdown menus

#### Theme System
- **Dark Mode Support**: Toggle via `.dark-mode` class on `html` element
- **CSS Custom Properties**: All colors and values use CSS variables for easy theming
- **Theme Toggle**: JavaScript function `toggleTheme()` switches between light/dark modes

### Key CSS Architecture Patterns

#### Custom Properties (CSS Variables)
All design tokens use CSS custom properties with the `--pds-` prefix:
```css
--pds-primary-500: #3b82f6;
--pds-neutral-grey-100: #f8fafc;
--pds-spacing-md: 1rem;
```

#### Component Class Naming
- Base component classes: `.btn`, `.card`, `.nav-link`
- Modifier classes: `.btn-primary`, `.btn-outline-secondary`, `.card-header`
- State classes: `.active`, `.disabled`, `.expanded`
- Utility classes: `.flex`, `.d-none`, `.text-center`

#### Responsive Design
- Mobile-first approach with min-width media queries
- Sidebar collapses to overlay on mobile (< 768px)
- Flexible grid system using CSS Grid and Flexbox

### Interactive JavaScript Features

#### Core Functions (`js/root.js`)
- `toggleTheme()` - Switches between light and dark modes
- `toggleSidebar()` - Mobile sidebar toggle with overlay
- `expandNavSection()` - Expands/collapses navigation sections
- Button group selection and loading state management

#### Event Handling
- Click outside to close sidebar on mobile
- Keyboard navigation support for accessibility
- Automatic active state management based on URL hash

### Development Guidelines

#### Adding New Components
1. Add component styles to `css/root.css` following existing patterns
2. Use CSS custom properties for all values that might need theming
3. Include both light and dark mode variants
4. Add interactive demo to appropriate HTML file
5. Follow the established class naming conventions

#### Component Documentation
Each HTML file serves as both documentation and interactive demo:
- Live examples with copy-paste code snippets
- Interactive buttons to test component behavior
- Comprehensive usage instructions and variations

### Browser Compatibility
- Modern browsers supporting CSS Custom Properties (IE11+)
- CSS Grid and Flexbox support required
- No polyfills or transpilation needed