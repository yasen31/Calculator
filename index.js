// const variables
const numberBtns = document.querySelectorAll("[data-number]")
const operatorBtns = document.querySelectorAll("[data-operator]")
const clearBtn = document.querySelector("[data-clear]")
const equalsBtn = document.querySelector("[data-equals]")
const displayBox = document.querySelector("[data-display-number]")



// let variables
let currentActiveNumber = []
let currentOperator = []
let previousActiveNumber = []
let lastClickedBtn = ""

// functions
function operate(numOne, numTwo) {
    switch (currentOperator[0]) {
        case "+":
            sum = numTwo + numOne
            break
        case "-":
            sum = numTwo - numOne
            break
        case "*":
            sum = numTwo * numOne
            break
        case "/":
            sum = numTwo / numOne
            break
        default:
            console.log("oops")    
    }

    currentActiveNumber[0] = sum
    previousActiveNumber = []
    display(sum.toFixed(2).slice(0,-1))
}

function display(value) {
    displayBox.textContent = value
}

function clear() {
    currentActiveNumber = []
    currentOperator = []
    previousActiveNumber = []
    multipleOperatorChecker = []
    console.clear()
    display("")
}

// button event listeners
clearBtn.addEventListener("click", () => {
    clear()
})


for (const button of numberBtns) {
    button.addEventListener('click', function() {
        if (currentActiveNumber === true || lastClickedBtn === "operator") {
            displayBox.textContent = ""
        }
        displayBox.textContent += button.innerHTML

        lastClickedBtn = ""
        lastClickedBtn = "number"
    });
  }

for (const button of operatorBtns) {
    button.addEventListener('click', function() {
        lastClickedBtn = ""
        lastClickedBtn = "operator"
        if (currentActiveNumber.length < 1) {
            currentActiveNumber.push(JSON.parse(displayBox.innerText))
        } else if (currentActiveNumber.length = 1) {
            previousActiveNumber.push(JSON.parse(displayBox.innerText))
        }

        currentOperator.push(button.innerText)
        displayBox.textContent = ""

        if (currentOperator.includes("+", 1) || currentOperator.includes("-", 1) || currentOperator.includes("/", 1) || currentOperator.includes("*", 1)) {
            operate(previousActiveNumber[0], currentActiveNumber[0])
            currentOperator.splice(0, 1)
            previousActiveNumber = []
        }
    });
  }


equalsBtn.addEventListener("click", () => {
        previousActiveNumber = currentActiveNumber.splice(0, 1)
        currentActiveNumber.push(JSON.parse(displayBox.innerText))
        operate(currentActiveNumber[0], previousActiveNumber[0])
        currentOperator = []
        previousActiveNumber = []
})

