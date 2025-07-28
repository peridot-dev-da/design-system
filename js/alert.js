document.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-close")) {
        const alert = e.target.closest('.alert');

        if (alert.classList.contains('toast')) {
            alert.classList.add('toast-exit');
            setTimeout(() => {
                alert.remove();
            }, 300);
        } else {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }
    }
})

window.showAlert = function (options) {
    const defaults = {
        type: 'primary', // primary, secondary, success, warning, error, info, neutral
        title: null,
        message: 'Alert message',
        icon: true,
        closable: true,
        autoClose: false,
        autoCloseDelay: 5000,
        size: 'default', // sm, default, lg
        accent: false,
        toast: false,
        position: 'top-right' // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
    };

    const settings = { ...defaults, ...options };
    if(settings.type == "danger") settings.type = "error"
    const alert = document.createElement('div');
    alert.className = `alert alert-${settings.type}`;
    if (settings.size === 'sm') alert.classList.add('alert-sm');
    if (settings.size === 'lg') alert.classList.add('alert-lg');
    if (settings.accent) alert.classList.add('alert-accent');
    if (settings.toast) {
        alert.classList.add('toast');
        alert.classList.add(`toast-${settings.position}`);
    }
    let iconSVG = '';
    switch (settings.type) {
        case 'success':
            iconSVG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9 11.5858L6.70711 9.29289C6.31658 8.90237 5.68342 8.90237 5.29289 9.29289C4.90237 9.68342 4.90237 10.3166 5.29289 10.7071L8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071L14.7071 8.70711Z" fill="currentColor"/></svg>';
            break;
        case 'error':
            iconSVG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z" fill="currentColor"/></svg>';
            break;
        case 'warning':
            iconSVG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25694 3.09882C9.02154 1.73952 10.9786 1.73952 11.7432 3.09882L17.3235 13.2526C18.0735 14.5898 17.111 16.25 15.5804 16.25H4.41978C2.88927 16.25 1.92675 14.5898 2.67672 13.2526L8.25694 3.09882ZM10 6C10.5523 6 11 6.44772 11 7V10C11 10.5523 10.5523 11 10 11C9.44772 11 9 10.5523 9 10V7C9 6.44772 9.44772 6 10 6ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13Z" fill="currentColor"/></svg>';
            break;
        default:
            iconSVG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 7C10.5523 7 11 7.44772 11 8V12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12V8C9 7.44772 9.44772 7 10 7ZM10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14Z" fill="currentColor"/></svg>';
    }

    let alertContent = '';

    if (settings.icon) {
        alertContent += `<div class="alert-icon">${iconSVG}</div>`;
    }

    alertContent += '<div class="alert-content">';
    if (settings.title) {
        alertContent += `<div class="alert-title">${settings.title}</div>`;
    }
    alertContent += `<div class="alert-message">${settings.message}</div>`;
    alertContent += '</div>';

    if (settings.closable) {
        alertContent += '<button class="alert-close">✕</button>';
    }

    alert.innerHTML = alertContent;

    if (settings.toast) {
        document.body.appendChild(alert);

        // Add slide in animation
        alert.classList.add('slide-in');

        // Auto close if specified
        if (settings.autoClose) {
            setTimeout(() => {
                alert.classList.add('toast-exit');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }, settings.autoCloseDelay);
        }

        // Add click handler for close button
        const closeBtn = alert.querySelector('.alert-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                alert.classList.add('toast-exit');
                setTimeout(() => {
                    alert.remove();
                }, 300);
            });
        }
    } else {
        const alertContainer = document.querySelector('.content') || document.querySelector('.main') || document.body;
        alertContainer.insertAdjacentElement("afterbegin", alert);

        const closeBtn = alert.querySelector('.alert-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                alert.style.opacity = '0';
                alert.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    alert.remove();
                }, 300);
            });
        }
    }

    return alert;
};

window.notify = function(message, type){
    window.showAlert({
        type,
        message,
        autoClose: true,
        accent: true,
        toast: true
    })
}
