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

/* ================================
   MODAL FUNCTIONALITY
   ================================ */

const pds = {
    Modal: class {
        /**
         * @param {HTMLElement|string} modal - A DOM element or a selector string
         * @param {object} options - Optional settings for initialization
         * @returns {void}
         */
        constructor(modal, options = {}) {
            if (modal instanceof HTMLElement) {
                this.modalId = modal.id
                this.modal = modal
            } else {
                this.modal = document.getElementById(modal);
                this.modalId = modal;
            }
            this.options = {
                backdrop: true, // true, false, or 'static'
                keyboard: true, // Allow ESC key to close
                focus: true,    // Auto focus modal when opened
                ...options
            };

            if (!this.modal) {
                console.error(`Modal with ID "${modal}" not found`);
                return;
            }

            this.dialog = this.modal.querySelector('.modal-dialog') || undefined;
            this.content = this.modal.querySelector('.modal-content') || undefined;
            this.header = this.modal.querySelector('.modal-header') || undefined;
            this.body = this.modal.querySelector('.modal-body') || undefined;
            this.footer = this.modal.querySelector('.modal-footer') || undefined;

            this.isOpen = false;
            this.originalFocus = null;

            // Set focus trap
            this.setupFocusTrap();
        }

        show() {
            if (this.isOpen) return;

            // Store current focus
            this.originalFocus = document.activeElement;

            // Trigger before show event
            const beforeShowEvent = new CustomEvent('modal.before.show', {
                detail: { modal: this }
            });
            this.modal.dispatchEvent(beforeShowEvent);

            if (beforeShowEvent.defaultPrevented) return;

            // Show modal
            this.modal.classList.add('show');
            document.body.classList.add('modal-open');
            this.isOpen = true;

            // Focus management
            if (this.options.focus) {
                setTimeout(() => {
                    const focusTarget = this.modal.querySelector('[autofocus]') ||
                        this.modal.querySelector('.modal-close') ||
                        this.content;
                    if (focusTarget) focusTarget.focus();
                }, 150);
            }

            // Trigger shown event
            setTimeout(() => {
                const shownEvent = new CustomEvent('modal.shown', {
                    detail: { modal: this }
                });
                this.modal.dispatchEvent(shownEvent);
            }, 300);
        }

        hide() {
            if (!this.isOpen) return;

            // Trigger before hide event
            const beforeHideEvent = new CustomEvent('modal.before.hide', {
                detail: { modal: this }
            });
            this.modal.dispatchEvent(beforeHideEvent);

            if (beforeHideEvent.defaultPrevented) return;

            // Hide modal
            this.modal.classList.remove('show');
            document.body.classList.remove('modal-open');
            this.isOpen = false;

            // Restore focus
            if (this.originalFocus) {
                this.originalFocus.focus();
            }

            // Trigger hidden event
            setTimeout(() => {
                const hiddenEvent = new CustomEvent('modal.hidden', {
                    detail: { modal: this }
                });
                this.modal.dispatchEvent(hiddenEvent);
            }, 300);
        }

        toggle() {
            this.isOpen ? this.hide() : this.show();
        }

        shake() {
            this.modal.classList.add('static-backdrop');
            setTimeout(() => {
                this.modal.classList.remove('static-backdrop');
            }, 300);
        }

        setTitle(title) {
            const titleElement = this.modal.querySelector('.modal-title');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }

        setBody(content) {
            if (this.body) {
                if (typeof content === 'string') {
                    this.body.innerHTML = content;
                } else if (content instanceof Element) {
                    this.body.innerHTML = '';
                    this.body.appendChild(content);
                }
            }
        }

        setFooter(content) {
            if (this.footer) {
                if (typeof content === 'string') {
                    this.footer.innerHTML = content;
                } else if (content instanceof Element) {
                    this.footer.innerHTML = '';
                    this.footer.appendChild(content);
                }
            }
        }

        setupFocusTrap() {
            const focusableElements = this.modal.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );

            if (focusableElements.length === 0) return;

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            this.modal.addEventListener('keydown', (e) => {
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

        static init() {
            // Set up close button event
            // const closeBtn = this.modal.querySelector('.modal-close');
            // if (closeBtn) {
            //     closeBtn.addEventListener('click', () => this.hide());
            // }

            // Set up backdrop click
            document.addEventListener('click', (e) => {
                if (e.target.closest(".modal-close")) {
                    const modal = new this(e.target.closest(".modal"))
                    modal.hide()
                }
                else if (e.target.hasAttribute("data-pds-modal-target")) {
                    const id = e.target.dataset.pdsModalTarget
                    /*  Use the `data-pds-modal-context` attribute to pass context
                        to a modal by setting this attribute on an element that's 
                        suposed to trigger a modal. Value must be a valid JSON string.
                    */
                   this.show(id)
                }
                // TODO: fix backdrop closing
                // if (e.target.closest(".modal") && this.options.backdrop !== 'static') {
                //     if (this.options.backdrop === true) {
                //         this.hide();
                //     }
                // } else if (e.target === this.modal && this.options.backdrop === 'static') {
                //     this.shake();
                // }
            });

            // TODO: fix this
            // Set up keyboard events
            // if (this.options.keyboard) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.querySelector(".modal.active")) {
                    new this(document.querySelector(".modal.active")).hide()
                }
            });
            // }
        }

        // Create or get modal instance
        static getInstance(modalId, options = {}) {
            return new this(modalId, options);
        }

        // Show modal
        static show(modalId, options = {}) {
            const modal = this.getInstance(modalId, options);
            if (modal) modal.show();
            return modal;
        }

        // Hide modal
        static hide(modalId) {
            const modal = this.getInstance(modalId);
            if (modal) modal.hide();
            return modal;
        }

        // Toggle modal
        static toggle(modalId, options = {}) {
            const modal = this.getInstance(modalId, options);
            if (modal) modal.toggle();
            return modal;
        }

        // Hide all open modals
        static hideAll() {
            console.error("Not Implemented")
        }
    }

}

pds.Modal.init()

// Convenience functions for global access
function showModal(modalId, options = {}) {
    return pds.Modal.show(modalId, options);
}

function hideModal(modalId) {
    return pds.Modal.hide(modalId);
}

function toggleModal(modalId, options = {}) {
    return pds.Modal.toggle(modalId, options);
}

// Auto-initialize modals on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize modals with data attributes
    document.querySelectorAll('[data-pds-modal-target]').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-pds-modal-target');
            const backdrop = this.getAttribute('data-modal-backdrop') || true;
            const keyboard = this.getAttribute('data-modal-keyboard') !== 'false';

            showModal(modalId, { backdrop, keyboard });
        });
    });

    // Initialize close buttons
    document.querySelectorAll('[data-modal-dismiss]').forEach(closeBtn => {
        closeBtn.addEventListener('click', function (e) {
            const modal = this.closest('.modal');
            if (modal) {
                hideModal(modal.id);
            }
        });
    });
});