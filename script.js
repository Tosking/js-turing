const input = document.querySelector(".turing__input")
const output = document.querySelector(".turing__output")
const next = document.querySelector(".turing__next")
const start = document.querySelector(".turing__start")
const carDisplay = document.querySelector(".turing__car")

let line = ""
let car = 0
let state = "q1"
let interval

start.addEventListener("click", () => {
    line = input.value
    output.innerHTML = line
    car = 0
    clearInterval(interval)
    interval = setInterval(nextStep, 200)
    state = "q1"
})

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function nextStep(){
    let c
    console.log(line, car, state)
    switch(state){
        case "q1":
            car++
            c = line[car]
            if(c == "*"){
                break
            }
            else if(c == "1"){
                state = "q2"
                line = line.replaceAt(car, "*")
                break;
            }
            else if(c == "+"){
                line = line.replaceAt(car, "*")
                break;
            }
            else if(c == "="){
                line = line.replaceAt(car, "*")
                state = "q4"
            }
            break;
        case "q2":
            car++
            c = line[car]
            if(c == "*"){
                line = line.replaceAt(car, "1")
                state = "q3"
            }
            break
        case "q3":
            car--
            c = line[car]
            if(c == "*"){
                state = "q1"
            }
    }
    output.innerHTML = line.substring(0, car) + `<span style="background-color: #f33">${line[car]}</span>` + line.substring(car + 1, line.length)
}

next.addEventListener("click", () => {
    nextStep()
})