import applyBorder from "./util.js";

const el = {
    username: document.getElementById("input-username"),
    pass: document.getElementById("input-password"),
    submit: document.getElementById("submit-btn"),
    myForm: document.getElementById("login-form"),
}

export const regex = {
    pass: /^[^\s]{8,128}$/,
    username: /^[^#@%\$&!\\|{}[\]()]{3,30}$/,
}

function disableSubmit() {
    if (el.pass.value == "" || el.username.value == ""
        || !regex.pass.test(el.pass.value) 
        || !regex.username.test(el.username.value)) {
        el.submit.disabled = true
    } else {
        el.submit.disabled = false 
    }
}

el.username.addEventListener("input", (e) => {
    applyBorder(!regex.username.test(el.username.value), el.username)
    disableSubmit()
})

el.pass.addEventListener("input", (e) => {
    applyBorder(!regex.pass.test(el.pass.value), el.pass)
    disableSubmit()
})

disableSubmit()

el.myForm.onsubmit = (e) => {
    e.preventDefault()
    
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "loginScript.php", true)
    xhr.onload = () => {
        console.log("hey" + xhr.response)
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.response == 1) {
                // show a success message
                console.log("Success")
            } else {
                console.log("Fail.")
            }
        }
    }

    let formData = new FormData(el.myForm);
    console.log(formData)
    xhr.send(formData)
}
