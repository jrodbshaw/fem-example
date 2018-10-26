const display = document.querySelector(".display");
let runningTotal = 0;
let displayedNum = "0";
let previousOperator = null;

document.querySelector(".calc-button").addEventListener("click", function(event) {
	buttonClick(event.target.innerText);
});

function buttonClick(value) {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	reRender();
}

function handleNumber(value) {
	if (displayedNum === "0") {
		displayedNum = value;
	} else {
		displayedNum += value;
	}
}

function handleSymbol(value) {
	switch (value) {
		case "C":
			displayedNum = "0";
			runningTotal = 0;
			previousOperator = null;
			break;
		case "=":
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(displayedNum));
			previousOperator = null;
			displayedNum = `${runningTotal}`;
			runningTotal = 0;
			break;
		case "←":
			if (displayedNum.length === 1) {
				displayedNum = "0";
			} else {
				displayedNum = displayedNum.substring(0, displayedNum.length - 1);
			}
			break;
		default:
			handleMath(value);
			break;
	}
}

function handleMath(value) {
	const intDisplayedNum = parseInt(displayedNum);
	if (runningTotal === 0) {
		runningTotal = intDisplayedNum;
	} else {
		flushOperation(intDisplayedNum);
	}
	previousOperator = value;
	displayedNum = "0";
}

function flushOperation(intDisplayedNum) {
	if (previousOperator === "+") {
		runningTotal += intDisplayedNum;
	} else if (previousOperator === "-") {
		runningTotal -= intDisplayedNum;
	} else if (previousOperator === "x") {
		runningTotal *= intDisplayedNum;
	} else {
		runningTotal /= intDisplayedNum;
	}
}

function reRender() {
	display.innerText = displayedNum;
}
