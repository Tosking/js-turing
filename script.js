const input = document.querySelector(".turing__input")
const output = document.querySelector(".turing__output")
const next = document.querySelector(".turing__next")
const start = document.querySelector(".turing__start")
const carDisplay = document.querySelector(".turing__car")
const startMan = document.querySelector(".turing__start-manually")

let line = ""
let car = 0
let state = "q1"
let interval
let mode = "+"


start.addEventListener("click", () => {
    line = input.value
    output.innerHTML = line
    car = 0
    clearInterval(interval)
    if(line.indexOf("+") != -1){
        interval = setInterval(nextStepSum, 200)
    }
    else {
        interval = setInterval(nextStepMult, 200)
    }
    state = "q1"
})

startMan.addEventListener("click", () => {
    line = input.value
    output.innerHTML = line
    car = 0
    clearInterval(interval)
    if(line.indexOf("+") != -1){
        mode = "+"
    }
    else{
        mode = "x"
    }
    state = "q1"
})

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function nextStepSum(){
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
                clearInterval(interval)
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

function nextStepMult(){
    let c
    console.log(state, c)
    switch(state){
        case "q1":
            car++
            c = line[car]
            if(c == "1"){
                line = line.replaceAt(car, "*")
                state = "q2"
            }
            else if(c == "x"){
                line = line.replaceAt(car, "*")
            }
            else if(c == "="){
                line = line.replaceAt(car, "*")
                clearInterval(interval)
            }
            break
        case "q2":
            car++
            c = line[car]
            if(c == "*"){
                line = line.replaceAt(car, "1")
            }
            else if(c == "="){
                state = "q3"
            }
            break
        case "q3":
            car--
            c = line[car]
            if(c == "1"){
                line = line.replaceAt(car, "*")
                state = "q4"
            }
            else if(c == "x"){
                state = "q7"
            }
            break
        case "q4":
            car++
            c = line[car]
            if(c == "="){
                state = "q5"
            }
            break
        case "q5":
            car++
            c = line[car]
            if(c == "*"){
                line = line.replaceAt(car, "1")
                state = "q6"
            }
            break
        case "q6":
            car--
            c = line[car]
            if(c == "="){
                state = "q3"
            }
            break
        case "q7":
            car--
            c = line[car]
            if(c == "*"){
                state = "q1"
            }
            break
    }   
    output.innerHTML = line.substring(0, car) + `<span style="background-color: #f33">${line[car]}</span>` + line.substring(car + 1, line.length)

}

next.addEventListener("click", () => {
    if(mode == "+"){
        nextStepSum()
    }
    else{
        nextStepMult()
    }
})