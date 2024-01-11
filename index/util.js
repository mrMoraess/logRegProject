export default function applyBorder(flag, element) {
    if (flag) {
        element.style.outline = "1px solid red"
        element.style.border = "1px solid red"
    } else {
        element.style.outline = ""
        element.style.border = ""
    }
}