function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    const themeIcon = document.getElementById('theme-icon');

    if (isDark) {
        // Sun icon for dark mode
        localStorage.setItem('theme', 'dark');
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
    } else {
        // Moon icon for light mode
        localStorage.setItem('theme', 'light');
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && systemPrefersDark)) {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'dark');
    }
}

function showAlert(message) {
    alert(message);
}

function simulateLoading(button) {
    const originalText = button.innerHTML;
    button.classList.add('btn-loading');
    button.disabled = true;
    button.innerHTML = 'Saving...';

    setTimeout(() => {
        button.classList.remove('btn-loading');
        button.disabled = false;
        button.innerHTML = originalText;
        showAlert('Saved successfully!');
    }, 2000);
}

function confirmAction() {
    if (confirm('Are you sure you want to proceed?')) {
        showAlert('Action confirmed!');
    }
}

// Button group functionality
document.querySelectorAll('.btn-group').forEach(group => {
    group.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            group.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.getElementById('hamburgerToggle');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function expandNavSection() {
    const navItems = document.querySelectorAll('.nav-item.has-children');
    navItems.forEach(item => {
        item.classList.toggle('expanded');
    });
}

function simulateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Randomly activate a nav link
    const randomIndex = Math.floor(Math.random() * navLinks.length);
    navLinks[randomIndex].classList.add('active');
}

const pds = {
    modal: class {
        /**
         * @param {HTMLElement|string} modal - A DOM element or a selector string
         * @param {object} options - Optional settings for initialization
         * @param {object} context - Optional context data
         * @returns {void}
         * 
         * let m = new pds.Modal(ID, options)
         * options can be:
         *  - backdrop: static
         *  - etc..
         *
         * The options above may also be set directly on the HTML
         * elment with the `modal` class using the syntax
         * `data-pds-modal-[option-name]=value` attribute.
         *
         * One can also pass a context to the modal through
         * the data-pds-modal-context attribute which accepts a
         * JSON-formatted string such as data-pds-modal-context='{"serviceUuid":"555"}'
         * which then becomes accessinble through modal.context
         */
        constructor(modal, options = {}, context = {}) {
            if (modal instanceof HTMLElement) {
                this.elementId = modal.id
                this.element = modal
            } else {
                this.element = document.getElementById(modal);
                this.elementId = modal;
            }

            if (!this.element) {
                console.error(`Modal with ID "${modal}" not found`);
                return;
            }

            this.options = {
                backdrop: "", // true, false, or 'static'
                focus: true,    // Auto focus modal when opened
                ...Object.keys(this.element.dataset).filter(k => k.indexOf("pdsModal") != -1).reduce((acc, k) => {
                    acc[k.replace("pdsModal", "").toLowerCase()] = this.element.dataset[k];
                    return acc
                }, {}),
                ...options // top-predence option override
            };

            let existingAttrOptions = Object(this.element.dataset).keys || []
            Object.keys(this.options).forEach(option => {
                if (existingAttrOptions.indexOf(option) == -1) {
                    this.element.setAttribute(`data-pds-modal-${option}`, this.options[option])
                }
            })

            this.context = context
            this.dialog = this.element.querySelector('.modal-dialog') || undefined;
            this.content = this.element.querySelector('.modal-content') || undefined;
            this.header = this.element.querySelector('.modal-header') || undefined;
            this.body = this.element.querySelector('.modal-body') || undefined;
            this.footer = this.element.querySelector('.modal-footer') || undefined;
            this.isOpen = this.element.classList.contains("show");
            this.originalFocus = null;

            // Set focus trap
            this.setupFocusTrap();
        }

        show() {
            if (this.isOpen) return;

            // Store current focus
            this.originalFocus = document.activeElement;

            // Trigger before show event
            const beforeShowEvent = HTMXOverride.makeEvent('modal.before.show', { modal: this });
            this.element.dispatchEvent(beforeShowEvent);

            if (beforeShowEvent.defaultPrevented) return;

            // Show modal
            this.element.classList.add('show');
            document.body.classList.add('modal-open');
            this.isOpen = true;

            // Focus management
            if (this.options.focus) {
                setTimeout(() => {
                    const focusTarget = this.element.querySelector('[autofocus]') ||
                        this.element.querySelector('.modal-close') ||
                        this.content;
                    if (focusTarget) focusTarget.focus();
                }, 150);
            }

            // Trigger shown event
            setTimeout(() => {
                const shownEvent = HTMXOverride.makeEvent('modal.shown', { modal: this });
                this.element.dispatchEvent(shownEvent);
            }, 300);
        }

        hide() {
            if (!this.isOpen) return;

            // Trigger before hide event
            const beforeHideEvent = HTMXOverride.makeEvent('modal.before.hide', { modal: this });
            this.element.dispatchEvent(beforeHideEvent);

            if (beforeHideEvent.defaultPrevented) return;

            // Hide modal
            this.element.classList.remove('show');
            document.body.classList.remove('modal-open');
            this.isOpen = false;

            // Restore focus
            if (this.originalFocus) {
                this.originalFocus.focus();
            }

            // Trigger hidden event
            setTimeout(() => {
                const hiddenEvent = HTMXOverride.makeEvent('modal.hidden', { modal: this });
                this.element.dispatchEvent(hiddenEvent);
            }, 300);
        }

        toggle() {
            this.isOpen ? this.hide() : this.show();
        }

        shake() {
            this.element.classList.add('static-backdrop');
            setTimeout(() => {
                this.element.classList.remove('static-backdrop');
            }, 300);
        }

        setTitle(title, force = false) {
            if (!this.title) {
                if (force) {
                    this.content.insertAdjacentHTML("afterBegin", `<div class="modal-title"></div>`)
                    this.title = this.element.querySelector('.modal-title')
                }
                else return
            }
            const titleElement = this.element.querySelector('.modal-title');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }

        setBody(content, force = false) {
            if (!this.body) {
                if (force) {
                    let ref = this.title || this.content
                    let location = this.title ? "afterend" : "afterbegin"
                    ref.insertAdjacentHTML(location, `<div class="modal-body"></div>`)
                    this.body = this.element.querySelector('.modal-body')
                }
                else return
            }
            if (typeof content === 'string') {
                this.body.innerHTML = content;
            } else if (content instanceof Element) {
                this.body.innerHTML = '';
                this.body.appendChild(content);
            }
        }

        setFooter(content, force = false) {
            if (!this.footer) {
                if (force) {
                    this.content.insertAdjacentHTML("beforeend", `<div class="modal-footer"></div>`)
                    this.footer = this.element.querySelector('.modal-footer')
                }
                else return
            }
            if (typeof content === 'string') {
                this.footer.innerHTML = content;
            } else if (content instanceof Element) {
                this.footer.innerHTML = '';
                this.footer.appendChild(content);
            }
        }

        setupFocusTrap() {
            const focusableElements = this.element.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );

            if (focusableElements.length === 0) return;

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            this.element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && this.isOpen) {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }

        // Static Methods
        static getInstance(elementId, options = {}, context = {}) {
            return new this(elementId, options, context);
        }

        static show(elementId, options = {}, context = {}) {
            const modal = this.getInstance(elementId, options, context);
            if (modal) modal.show();
            return modal;
        }

        static hide(elementId) {
            const modal = this.getInstance(elementId);
            if (modal) modal.hide();
            return modal;
        }

        static toggle(elementId, options = {}) {
            const modal = this.getInstance(elementId, options);
            if (modal) modal.toggle();
            return modal;
        }

        static hideAll() {
            console.error("Not Implemented")
        }
    },

    dropdown: class {
        constructor(element, options = {}) {
            if (typeof element === 'string') {
                this.element = document.querySelector(element);
            } else {
                this.element = element;
            }

            if (!this.element) {
                console.error('Dropdown element not found');
                return;
            }

            this.options = {
                autoClose: true,
                ...options
            };

            this.toggleButton = this.element.querySelector('.dropdown-toggle');
            this.menu = this.element.querySelector('.dropdown-menu');
            this.isOpen = this.element.classList.contains('show');

            this.setupEventListeners();
        }

        setupEventListeners() {
            // Don't add individual event listeners here since we handle it globally in init()

            // Close on item click if autoClose is enabled
            if (this.menu && this.options.autoClose) {
                this.menu.addEventListener('click', (e) => {
                    if (e.target.classList.contains('dropdown-item') && !e.target.classList.contains('disabled')) {
                        this.hide();
                    }
                });
            }
        }

        show() {
            if (this.isOpen) return;

            // Hide other open dropdowns
            pds.dropdown.hideAll();

            const showEvent = HTMXOverride.makeEvent('dropdown.show', { dropdown: this });
            this.element.dispatchEvent(showEvent);

            if (showEvent.defaultPrevented) return;

            this.element.classList.add('show');
            this.isOpen = true;

            const shownEvent = HTMXOverride.makeEvent('dropdown.shown', { dropdown: this });
            this.element.dispatchEvent(shownEvent);
        }

        hide() {
            if (!this.isOpen) return;

            const hideEvent = HTMXOverride.makeEvent('dropdown.hide', { dropdown: this });
            this.element.dispatchEvent(hideEvent);

            if (hideEvent.defaultPrevented) return;

            this.element.classList.remove('show');
            this.isOpen = false;

            const hiddenEvent = HTMXOverride.makeEvent('dropdown.hidden', { dropdown: this });
            this.element.dispatchEvent(hiddenEvent);
        }

        toggle() {
            this.isOpen ? this.hide() : this.show();
        }

        static getInstance(element) {
            return new this(element);
        }

        static show(element) {
            const dropdown = this.getInstance(element);
            if (dropdown) dropdown.show();
            return dropdown;
        }

        static hide(element) {
            const dropdown = this.getInstance(element);
            if (dropdown) dropdown.hide();
            return dropdown;
        }

        static toggle(element) {
            const dropdown = this.getInstance(element);
            if (dropdown) dropdown.toggle();
            return dropdown;
        }

        static hideAll() {
            document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    },
    init() {
        document.addEventListener("click", (e) => {
            /*  Use the `data-pds-modal-context` attribute to pass context
                to a modal by setting this attribute on an
                element that's suposed to trigger a modal. Value
                must be a valid JSON string.
            */
            if (e.target.hasAttribute("data-pds-modal-target")) {
                const id = e.target.dataset.pdsModalTarget
                this.modal.show(id, {}, context = e.target.dataset.pdsModalContext ? JSON.parse(e.target.dataset.pdsModalContext) : {})
            }
            else if (e.target.closest("[data-pds-modal-dismiss]")) {
                const modal = new this.modal(e.target.closest(".modal"))
                modal.hide()
            }
            else if (e.target.classList.contains("modal") && e.target.classList.contains("show")) {
                const modal = new this.modal(e.target)
                if (modal.options.backdrop == "static") { modal.shake() }
                else { modal.hide() }
            }
            // Handle dropdown toggles
            else if (e.target.classList.contains("dropdown-toggle") || e.target.closest(".dropdown-toggle")) {
                e.preventDefault();
                const dropdown = e.target.closest(".dropdown");
                if (dropdown) {
                    const instance = new this.dropdown(dropdown);
                    instance.toggle();
                }
            }
            // Close dropdowns when clicking outside
            else if (!e.target.closest(".dropdown")) {
                this.dropdown.hideAll();
            }
        })
    }
}

document.addEventListener('click', function (e) {
    // Close sidebar when clicking outside on mobile
    const sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains(e.target) && !e.target.closest("#hamburgerToggle") && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
    // Clicks on nav items
    if (e.target.closest('.nav-item.has-children > .nav-link')) {
        link = e.target.closest('.nav-item.has-children > .nav-link')
        e.preventDefault();
        const parentItem = link.closest('.nav-item');
        parentItem.classList.toggle('expanded');
    }
});


// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Set active nav item based on current page
    const currentPage = window.location.hash || '#layout-system';
    const activeLink = document.querySelector(`a[href="${currentPage}"]`);
    if (activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
});

// Listen to device theme change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
    }
});

pds.init()
