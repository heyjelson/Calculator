const prevDisplay = document.querySelector('.prev');
const currDisplay = document.querySelector('.curr');
const clr = document.querySelector('.clr');
const del = document.querySelector('.del');
const num = document.querySelectorAll('.num');
const opr = document.querySelectorAll('.opr');
const pnt = document.querySelector('.pnt');
const sum = document.querySelector('.sum');

let prevNum = '';
let presNum = '';
let operation = '';

num.forEach((item) => {
    item.addEventListener('click', function(e) {
        numEvent(e.target.textContent);
    })
});

function numEvent(number) {
    if(presNum.length <= 6) {
        presNum += number;
        currDisplay.textContent = presNum;
    }
}

opr.forEach((item) => {
    item.addEventListener('click', function(e) {
        oprEvent(e.target.textContent);
    })
})

function oprEvent(operator) {
    if(prevNum === '') {
        prevNum = presNum;
        oprCheck(operator);
    } else if(presNum === '') {
        oprCheck(operator);
    } else {
        sumEvent();
        operation = operator;
        currDisplay.textContent = '';
        prevDisplay.textContent = prevNum + ' ' + operation;
    }
}

sum.addEventListener('click', function() {
    if(presNum != '' && prevNum != '') {
        sumEvent();
    }
});

function sumEvent() {
    prevNum = Number(prevNum);
    presNum = Number(presNum);

    if(operation === '+') {
        prevNum += presNum;
    } else if(operation === '-') {
        prevNum -= presNum;
    } else if(operation === '/') {
        if(presNum <= 0) {
            prevNum = "Can't divide that number!";
            prevDisplay.textContent = '';
            currDisplay.textContent = prevNum;
            operation = '';
            return;
        }
        prevNum /= presNum;
    } else if(operation === 'x') {
        prevNum *= presNum;
    }
    prevNum = roundNum(prevNum);
    prevNum = prevNum.toString();
    operation = '';
    presNum = '';
    prevDisplay.textContent = '';
    currDisplay.textContent = prevNum;
}

function roundNum(number) {
    return Math.round(number * 10000) / 10000;
}

pnt.addEventListener('click', () => {
    addPoint();
});

function addPoint() {
    if(!presNum.includes('.')) {
        presNum += '.';       
    }
}

function oprCheck(str) {
    operation = str;
    currDisplay.textContent = '0';
    prevDisplay.textContent = prevNum + ' ' + operation;
    presNum = '';
}

clr.addEventListener('click', function() {
    presNum = '';
    prevNum = ''
    prevDisplay.textContent = prevNum;
    currDisplay.textContent = '0';
})

del.addEventListener('click', function() {
    if(presNum != '') {
        presNum = presNum.slice(0, -1);
        currDisplay.textContent = presNum;
    }
})


