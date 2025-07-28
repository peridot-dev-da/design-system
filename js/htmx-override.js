HTMXOverride = {
    config: {
        showLoadingAnimationFn: () => { },
        removeLoadingAnimationFn: () => { },
        onErrorResponse: () => { },
    },
    init: function (config = {}) {
        this.config = { ...this.config, ...config }
    },
    parseAjaxResponse: function (ajaxResponse) {
        return new DOMParser().parseFromString(ajaxResponse, "text/html")
    },
    extractErrorMessagesFromResponse: function (parsedAJXResDocument) {
        const backendFeebackMessages = parsedAJXResDocument.querySelector(".be-feedback-messages")
        if (backendFeebackMessages) {
            return Array.from(backendFeebackMessages.querySelectorAll(".be-message")).map(beMessageDiv => {
                return {
                    "type": beMessageDiv.dataset.tags,
                    "message": beMessageDiv.dataset.message,
                }
            })
        }
        return []
    },
    showLoadingAnimation: function () {
        this.config.showLoadingAnimationFn()
    },
    removeLoadingAnimation: function () {
        this.config.removeLoadingAnimationFn()
    },
    makeEvent(eventName, detail) {
        let event
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            event = new CustomEvent(eventName, { bubbles: true, cancelable: true, composed: true, detail })
        } else {
            event = document.createEvent('CustomEvent')
            evt.initCustomEvent(eventName, true, true, detail)
        }
        return event
    },
    registerReadyEvent: function (detail) {
        this.makeEvent(`htmxo-ready`, detail ?? {})
    },
    mediaQuery: { // TODO: deprecate
        injectVWHeader: function (event) {
            event.detail.headers["X-VP-Width"] = window.innerWidth;
        },
        reloadWithVWHeaderInjected: function (config = {}) {
            htmx.ajax("GET", location.href, { ...config })
        },
        reloadIfMobile: function (config = {}) {
            if (window.innerWidth < 1024) {
                this.reloadWithVWHeaderInjected(config)
            }
        }
    },
    defaultReqErrorHandling: function (e) {
        this.config.onErrorResponse(e)
    }
}

document.addEventListener("htmx:configRequest", function (event) {
    HTMXOverride.mediaQuery.injectVWHeader(event)
})

document.addEventListener("htmx:beforeOnLoad", function (event) {
    // htmx:beforeOnLoad
})

document.addEventListener("htmx:beforeRequest", function (e) {
    const hxRequestAttr = `hx-${e.detail.requestConfig.verb}`
    let htmxTargetedElement = e.detail.requestConfig.triggeringEvent?.target.closest(`[${hxRequestAttr}]`)
    const submitter = e.detail.requestConfig.triggeringEvent?.submitter
    if (submitter) {
        htmxTargetedElement = submitter
    }
    // if still empty, try some other tricks
    if (!htmxTargetedElement) {
        sourceElement = e.detail.requestConfig.elt
        switch (sourceElement.nodeName) {
            case 'FORM': htmxTargetedElement = sourceElement.querySelector("button[type='submit']");
                break;
            case 'BUTTON': htmxTargetedElement = sourceElement;
                break;
            default: { }
        }
    }
    if (htmxTargetedElement) {
        htmxTargetedElement.classList.add("flowing-overlay")
        htmxTargetedElement.classList.add("success")
    }
    HTMXOverride.showLoadingAnimation()
})

document.addEventListener("htmx:afterRequest", function (e) {
    e.detail.elt.classList.remove("flowing-overlay")
    e.detail.elt.classList.remove("danger")
    e.detail.elt.classList.remove("success")
    HTMXOverride.removeLoadingAnimation()
    const doc = HTMXOverride.parseAjaxResponse(e.detail.xhr.response)
    const BEMessages = HTMXOverride.extractErrorMessagesFromResponse(doc)
    if (BEMessages?.length > 0) {
        BEMessages.forEach(bMessage => {
            window.notify(bMessage.message, bMessage.type)
        })
    }
})

document.addEventListener("htmx:sendError", () => {
    window.showAlert({
        "type": "error",
        "title": "Network Error",
        "message": "Please check your internet connection.",
        "autoClose": true,
        "toast": true
    })
})

document.addEventListener("htmx:responseError", (e) => {
    if (e.detail.xhr.status >= 400) HTMXOverride.defaultReqErrorHandling(e)
})

document.addEventListener("htmx:historyRestore", function (e) {
    setTimeout(() => {
        document.querySelectorAll(".flowing-overlay").forEach(e => e.classList.toggle("flowing-overlay"))
    }, 250)
})

document.addEventListener("htmx:afterOnLoad", (e) => document.dispatchEvent(HTMXOverride.makeEvent(`htmxo:ready`, e.detail)))
document.addEventListener("DOMContentLoaded", (e) => document.dispatchEvent(HTMXOverride.makeEvent(`htmxo:ready`, e.detail)))
