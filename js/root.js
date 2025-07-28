function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    const themeIcon = document.getElementById('theme-icon');

    if (isDark) {
        // Sun icon for dark mode
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
    } else {
        // Moon icon for light mode
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
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

function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    const isDark = document.documentElement.classList.contains('dark-mode');
    const themeIcon = document.getElementById('theme-icon');

    if (isDark) {
        // Sun icon for dark mode
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
    } else {
        // Moon icon for light mode
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
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

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburgerToggle');

    if (!sidebar.classList.contains(e.target) && !hamburger.classList.contains(e.target) && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// Handle collapsible nav items
document.querySelectorAll('.nav-item.has-children > .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const parentItem = this.closest('.nav-item');
        parentItem.classList.toggle('expanded');
    });
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