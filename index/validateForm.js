import applyBorder from "./util.js";

const el = {
    email: document.getElementById("input-email"),
    pass: document.getElementById("input-pass"),
    repetPass: document.getElementById("input-repetPass"),
    submit: document.getElementById("submit-regist"),
    username: document.getElementById("input-username"),
    myForm: document.getElementById("my-form"),

}

const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pass: /^[^\s]{8,128}$/,
    username: /^[^#@%\$&!\\|{}[\]()]{3,30}$/,
}

function disableSubmit() {
    if (el.email.value == "" || el.pass.value == "" || el.repetPass.value == ""
        || !regex.email.test(el.email.value) || !regex.pass.test(el.pass.value) 
        || !regex.pass.test(el.repetPass.value) || !regex.username.test(el.username.value)) {
        el.submit.disabled = true
    } else {
        el.submit.disabled = false
    }
}

el.username.addEventListener("input", (e) => {
    applyBorder(!regex.username.test(el.username.value), el.username)
    disableSubmit()
})

el.email.addEventListener("input", (e) => {
    applyBorder(!regex.email.test(el.email.value), el.email)
    disableSubmit()
})

el.pass.addEventListener("input", (e) => {
    applyBorder(!regex.pass.test(el.pass.value), el.pass)
    disableSubmit()
})

el.repetPass.addEventListener("input", (e) => {
    applyBorder(el.pass.value != el.repetPass.value || !regex.pass.test(el.repetPass.value), el.repetPass)
    disableSubmit()
})

disableSubmit()

el.myForm.onsubmit = (e) => {
    e.preventDefault()
    
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "registScript.php", true)
    xhr.onload = () => {
        console.log("hey" + xhr.response)
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.response) {
                // show a success message
                console.log("Sucess")
            }
        }
    }

    let formData = new FormData(el.myForm);
    console.log(formData)
    xhr.send(formData)
}

