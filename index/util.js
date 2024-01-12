function applyBorder(flag, element) {
    if (flag) {
        element.style.outline = "1px solid red"
        element.style.border = "1px solid red"
    } else {
        element.style.outline = ""
        element.style.border = ""
    }
}

function message(text, status) {
    const containerMsg = document.querySelector(".msg")

    containerMsg.innerText = text
    if (status) {
        console.log("Success")
        containerMsg.classList.add("success-msg")
    } else {
        console.log("Fail")
        containerMsg.classList.add("error-msg")
    }
    containerMsg.style.display = "block"

    setTimeout(() => {
        containerMsg.innerText = ""
        if (status) {
            containerMsg.classList.remove("success-msg")
        } else {
            containerMsg.classList.remove("error-msg")
        }
        containerMsg.style.display = "none"
    }, 3000)
}

export {applyBorder, message}