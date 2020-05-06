// @ts-check

/**
 * @param {CustomEvent} e 
 */
function handleError(e) {
    const $template = document.getElementById("error-message-template")
    if ($template instanceof HTMLTemplateElement) {
        const $message = $template.content.cloneNode(true)
        if ($message instanceof DocumentFragment) {
            var $p = $message.querySelector("[slot=message]")
            if (typeof e.detail === "string") {
                console.error(e.detail)
                $p.textContent = e.detail
            } else {
                const error = JSON.stringify(e.detail)
                console.error(error)
                $p.textContent = e.detail
            }
            document.getElementById("error-message").appendChild($message)
        }
    }
}

document.addEventListener("Error", handleError)

