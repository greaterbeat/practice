let str = "33 коровы - 38 попугаев / 5 раз =";

console.log('Задана строка', str);
calculate(str);

function calculate(str){
    let math_str = ClearOfLetters(str);
    console.log('Строка, "очищенная" от слов', math_str);
    let char = math_str.split("");
    let numbers = [];
    let operators = [];

    parseExpr(char, numbers, operators);

    let result = calculateExpr(numbers, operators);
    console.log(str,result);
}

function ClearOfLetters(str){
    return(str.replace(/[^\d\.\+\-\*\/]/g, ""));
}

function parseExpr(char, numbers, operators){
    let lastCharIsNumber = true;
    let cnt = 0;
    numbers[cnt] = "";

    for(let i = 0; i < char.length; i++){

        if(isNaN(parseInt(char[i])) && char[i] !== "." && !lastCharIsNumber){
            operators[cnt] = char[i];
            cnt++;
            numbers[cnt] = "";
            lastCharIsNumber = true;
        } else {
            numbers[cnt] += char[i];
            lastCharIsNumber = false;
        }
    }

    return (operators, numbers);
}

function calculateExpr(numbers, operators) {
    let result = parseFloat(numbers[0]);

    for(let i = 0; i < operators.length; i++){

        let n = parseFloat(numbers[i+1]);

        if (operators[i] == "+"){
            result = sum(result, n);
        }

        if (operators[i] == "-"){
            result = sub(result, n);
        }

        if (operators[i] == "*"){
            result = mlt(result, n);
        }

        if (operators[i] == "/"){
            result = div(result, n);
        }

    }

    return result.toFixed(2);
}

function sum(a, b) {
    let res = a + b;
    return res;
}

function sub(a, b) {
    let res = a - b;
    return res;
}

function mlt(a, b) {
    let res = a * b;
    return res;
}

function div(a, b) {
    let res = a / b;
    return res;
}