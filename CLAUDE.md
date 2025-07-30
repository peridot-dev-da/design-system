# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Viewing the Design System
- `open index.html` - View the main design system interface with HTMX-powered navigation
- Content is dynamically loaded from the `./content/` folder using HTMX
- `open content/buttons.html` - View button component examples in isolation
- `open content/forms.html` - View form component examples in isolation
- `open content/foundation.html` - View design tokens and utilities in isolation
- `open content/modals.html` - View modal component examples in isolation

### No Build System Required
This design system uses vanilla HTML, CSS, and JavaScript with HTMX for dynamic content loading. No build pipeline or package manager dependencies are required. The main `index.html` file can be opened directly in a browser for development and testing using a basic HTTP server such as Python's http.server.

```bash
python -m http.Server 3000
```

## Architecture Overview

### Technology Stack
- **HTML5**: Semantic markup with accessibility attributes
- **HTMX**: Dynamic content loading for single-page application experience
- **CSS Custom Properties**: Modern CSS variables for theming and design tokens
- **Vanilla JavaScript**: No framework dependencies, plain JS for interactions
- **SVG Icons**: Inline SVG icons for scalability and theming

### Project Structure
```
peridot-design-system/
├── index.html            # Main template with dashboard layout
├── sidebar.html          # Navigation sidebar template
├── css/
│   ├── root.css          # Main stylesheet with all components and design tokens
│   ├── old-layout.css    # Legacy styles (deprecated)
│   └── layout.css        # Additional layout utilities
├── js/
│   ├── root.js           # JavaScript for interactions, theme switching, and modals
│   ├── htmx-override.js  # HTMX configuration and extensions
│   └── alert.js          # Alert/notification system
├── content/              # HTMX-loaded content pages
│   ├── index.html        # Landing/welcome page
│   ├── foundation.html   # Design tokens and utilities
│   ├── buttons.html      # Button component examples
│   ├── forms.html        # Form component examples
│   ├── modals.html       # Modal component examples
│   └── layout.html       # Layout system examples
├── fonts/
│   └── Montserrat/       # Font family files and licensing
├── images/
│   └── samples/          # Sample images for component examples
└── design-system-elements.md  # Component planning document
```

### Design System Architecture

#### Foundation Layer
- **Design Tokens**: CSS custom properties for colors, typography, spacing, shadows
- **Utility Classes**: Flexbox, spacing, display, and text utilities following atomic design principles

#### Component Categories
The design system is organized into logical component groups with HTMX-powered navigation:

1. **Layout System** (`index.html`, `content/layout.html`)
   - Dashboard layout: `.dashboard-layout` with persistent sidebar and dynamic content area
   - Sidebar navigation: `.sidebar` with HTMX-powered content loading
   - Main content area: `.main-content` with header and dynamically loaded content zones
   - Responsive breakpoints and mobile overlay system

2. **Navigation Components** (`sidebar.html`)
   - Hierarchical sidebar with `.nav-section` groupings
   - HTMX boost for seamless page navigation
   - Expandable submenus with `.has-children` and `.nav-submenu`
   - Active state management with `.active` classes
   - Dynamic content loading with `hx-get` attributes

3. **Form Components** (`content/forms.html`)
   - Input fields with validation states
   - Input groups with icons and labels
   - Custom select dropdowns
   - File upload components with progress indicators
   - Toggle switches and form validation feedback

4. **Button System** (`content/buttons.html`)
   - Primary, secondary, outline, and text button variants
   - Size variations: small, medium, large
   - Icon buttons and button groups
   - Loading states and disabled states

5. **Modal System** (`content/modals.html`)
   - Comprehensive modal component with header, body, footer sections
   - Responsive size variants using CSS custom properties: `--pds-modal-width-sm/md/lg/xl`
   - Multiple size variants: small, medium, large, extra-large with responsive breakpoints
   - JavaScript API with `pds.modal` class and global functions
   - Static backdrop support and focus management
   - Event system with custom events and context passing

6. **Toast Notifications** (`content/toasts.html`)
   - Toast notifications with multiple variants: success, error, warning, info
   - Flexible positioning: top/bottom and left/center/right combinations
   - Auto-dismiss with configurable timing
   - In-page alerts for static content notifications
   - Compatible with existing `js/alert.js` system

7. **Dropdown Menus** (`content/dropdowns.html`)
   - Interactive dropdown menus with click/hover triggers
   - Multiple positioning options: left/right alignment, drop-up/down
   - Icon support and grouped menu items with headers
   - Split button dropdowns and context menus
   - Full keyboard navigation and accessibility support

8. **Tables & Data Display** (`content/tables.html`)
   - Basic table styling with consistent padding and borders
   - Enhanced data tables with search, filtering, and pagination
   - Status badges and role badges for data visualization
   - User info components with avatars and details
   - Responsive table wrappers for mobile compatibility
   - Professional styling inspired by enterprise applications
   - Loading states and interactive features

9. **Content Components**
   - Card system: `.card` with header, body, footer sections
   - Status badges and progress indicators
   - Foundation elements and design tokens (`content/foundation.html`)

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
- `toggleTheme()` - Switches between light and dark modes with localStorage persistence
- `toggleSidebar()` - Mobile sidebar toggle with overlay
- `expandNavSection()` - Expands/collapses navigation sections
- Button group selection and loading state management

#### Modal System JavaScript API
- `pds.modal` class - modal management with full lifecycle control and static methods
- `pds.modal.show(id, options, context)` - Show modal with configuration options and context
- `pds.modal.hide(id)` - Hide specific modal
- `pds.modal.toggle(id, options)` - Toggle modal visibility
- Modal events: `modal.before.show`, `modal.shown`, `modal.before.hide`, `modal.hidden`
- Focus trap implementation and keyboard navigation
- Static backdrop support with shake animation
- Context passing via `data-pds-modal-context` attribute

#### Toast Notification JavaScript API
- `window.showAlert(options)` - Core alert/toast function with full configuration
- `window.notify(message, type)` - Quick toast notification function
- Toast types: `success`, `error`, `warning`, `info`, `primary`, `secondary`, `neutral`
- Positioning: `top-right`, `top-center`, `top-left`, `bottom-right`, `bottom-center`, `bottom-left`
- Auto-dismiss with configurable delay and manual close options
- In-page alerts for static content notifications

#### Dropdown Menu JavaScript API
- `pds.dropdown` class - dropdown management with lifecycle control and static methods
- `pds.dropdown.show(element)` - Show dropdown menu
- `pds.dropdown.hide(element)` - Hide dropdown menu
- `pds.dropdown.toggle(element)` - Toggle dropdown visibility
- `pds.dropdown.hideAll()` - Hide all open dropdown menus
- Dropdown events: `dropdown.show`, `dropdown.shown`, `dropdown.hide`, `dropdown.hidden`
- Automatic positioning and collision detection
- Context menu support with right-click triggers

#### HTMX Integration
- Automatic content loading from `./content/` directory
- Sidebar navigation with `hx-boost` for seamless transitions
- Content area updates using `hx-get`, `hx-swap`, and `hx-select`
- Custom HTMX overrides in `js/htmx-override.js`
- Alert system integration with `js/alert.js`

#### Event Handling
- Click outside to close sidebar on mobile
- Keyboard navigation support for accessibility (including modal focus traps)
- Automatic active state management for navigation
- Theme persistence with system preference detection
- Collapsible navigation sections with click delegation

### Development Guidelines

#### Adding New Components
1. Add component styles to `css/root.css` following existing patterns
2. Use CSS custom properties for all values that might need theming
3. Include both light and dark mode variants
4. Create content page in `./content/` directory for component documentation
5. Add navigation link to `sidebar.html` with appropriate HTMX attributes
6. Follow the established class naming conventions
7. Ensure HTMX compatibility for dynamic loading

#### Component Documentation
Each content HTML file serves as both documentation and interactive demo:
- Live examples with copy-paste code snippets
- Interactive buttons to test component behavior
- Comprehensive usage instructions and variations
- HTMX-compatible markup for seamless navigation
- Self-contained content that works both in isolation and within the main interface

#### HTMX Development Workflow
1. **Main Template**: `index.html` provides the persistent layout structure
2. **Navigation**: `sidebar.html` contains all navigation links with HTMX boost
3. **Content Pages**: Individual files in `./content/` for each component/section
4. **Dynamic Loading**: Content is loaded into `.content-area` using HTMX
5. **Isolation Testing**: Content pages can be opened directly for isolated testing

### Browser Compatibility
- Modern browsers supporting CSS Custom Properties (IE11+)
- CSS Grid and Flexbox support required
- No polyfills or transpilation needed

## Important Development Notes

### Repository Structure
- We are no longer using the `content` folder due to GitHub Pages requirements
- All templates are now placed in the root directory
- Manually updated to simplify link structures for GitHub Pages

### Template Considerations
- The `tables.html` demo template does not follow the same HTML structure pattern as other templates
- Ensure consistency in future template implementations