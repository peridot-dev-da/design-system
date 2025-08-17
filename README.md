# Peridot Design System

A modern, lightweight design system built with vanilla HTML, CSS, and JavaScript. No build tools required.

## 🚀 Live Demo

Visit the live design system documentation: **[https://peridot-dev-da.github.io/peridot-design-system](https://peridot-dev-da.github.io/peridot-design-system)**

## ✨ Features

- **🎨 Design Tokens** - Consistent colors, typography, and spacing with CSS custom properties
- **📱 Responsive Layout** - Mobile-first dashboard layouts with collapsible navigation
- **🌙 Dark Mode** - Built-in theme switching with seamless transitions
- **♿ Accessible** - WCAG compliant components with proper ARIA attributes
- **📦 Zero Dependencies** - Pure HTML, CSS, and JavaScript
- **⚡ Fast Loading** - Optimized for performance with minimal footprint

## 🏗️ Architecture

### Technology Stack
- **HTML5** - Semantic markup with accessibility attributes
- **CSS Custom Properties** - Modern CSS variables for theming
- **Vanilla JavaScript** - No framework dependencies
- **SVG Icons** - Scalable vector graphics for crisp icons

### Component Categories
- **Foundation** - Design tokens, utilities, and base styles
- **Layout** - Dashboard, grid, and container systems
- **Navigation** - Sidebar, breadcrumbs, and menu components
- **Forms** - Input fields, validation, and form controls
- **Buttons** - Various button styles, sizes, and states
- **Content** - Cards, panels, and data display components

## 🚀 Quick Start

### CDN Usage
Include the CSS and JavaScript files in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://peridot-dev-da.github.io/peridot-design-system/css/root.css">
    <script src="https://peridot-dev-da.github.io/peridot-design-system/js/root.js"></script>
</head>
<body>
    <!-- Your content using PDS classes -->
    <button class="btn btn-primary">Primary Button</button>
</body>
</html>
```

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/peridot-design-system.git
   cd peridot-design-system
   ```

2. Open any HTML file in your browser:
   ```bash
   open index.html
   # or
   python dev_server.py PORT_NO  # Then visit http://localhost:PORT_NO
   ```

## 📖 Documentation

### Component Pages
- **[Foundation](foundation.html)** - Design tokens and utilities
- **[Layout System](layout.html)** - Dashboard and grid layouts
- **[Buttons](buttons.html)** - Button components and variants
- **[Forms](forms.html)** - Form controls and validation
- **[Templates](template.html)** - Complete page examples

### Basic Usage Examples

#### Button System
```html
<!-- Primary button -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline button -->
<button class="btn btn-outline-primary">Outline</button>

<!-- Loading state -->
<button class="btn btn-primary btn-loading">Loading...</button>
```

#### Dashboard Layout
```html
<div class="dashboard-layout">
    <div class="sidebar">
        <!-- Sidebar content -->
    </div>
    <div class="main-content">
        <!-- Main content -->
    </div>
</div>
```

#### Theme Toggle
```javascript
// Toggle between light and dark themes
toggleTheme();
```

## 🎨 Customization

### CSS Custom Properties
All design tokens use CSS custom properties and can be easily customized:

```css
:root {
    --pds-primary-500: #3b82f6;
    --pds-primary-600: #2563eb;
    --pds-spacing-md: 1rem;
    --pds-border-radius: 0.375rem;
}
```

### Dark Mode
Dark mode is automatically handled with CSS custom properties:

```css
.dark-mode {
    --pds-background: #1f2937;
    --pds-text-primary: #f9fafb;
}
```

## 📁 Project Structure

```
peridot-design-system/
├── css/
│   ├── root.css          # Main stylesheet with all components
│   ├── layout.css        # Layout utilities
│   └── old-layout.css    # Legacy styles (deprecated)
├── js/
│   └── root.js           # JavaScript for interactions
├── fonts/
│   └── Montserrat/       # Font files
├── images/
│   └── samples/          # Sample images
├── *.html                # Component documentation pages
├── index.html            # Main landing page
├── README.md             # This file
└── CLAUDE.md             # Development guidance
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Modal and overlay components
- [ ] Toast notification system
- [ ] Data table components
- [ ] Calendar and date picker
- [ ] Advanced form validation
- [ ] Animation system
- [ ] Chart components
- [ ] Mobile-specific components

## 💬 Support

- 📧 Create an issue on GitHub
- 💬 Start a discussion in the repository
- 📖 Check the documentation pages