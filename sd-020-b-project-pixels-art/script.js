let squareColor = window.document.querySelectorAll(".color")

for (let d of squareColor) {
    d.addEventListener("click", classSelected)
}
function classSelected(event) {
    for (let d of squareColor) {
        d.className = "color"
    }
    event.target.className = "color selected"
}

let pixels = window.document.querySelectorAll(".pixel")
for (let p of pixels) {
    p.addEventListener("click", changedColor)
}

function changedColor(event) {
    let selectColor = window.document.querySelector(".selected").id
    event.target.style.background = selectColor
}

document.querySelector("#clear-board").addEventListener("click", clearBoard)

function clearBoard() {
    for (p of pixels) {
        p.style.background = "white"
    }
}