let str = "3.5 землекопа +4 поросенка *10 рублей - 5.5 $ /5 человек =";

console.log('Задана строка', str);
calculate(str);

function calculate(str){
    let math_str = ClearOfLetters(str);
    console.log('Строка, "очищенная" от слов', math_str);
    let char = math_str.split("");
    let numbers = [];
    let oper = [];

    parseExpr(char, numbers, oper);

    let result = calculateExpr(numbers, oper);
    console.log(str,result);
}

function ClearOfLetters(str){
    return(str.replace(/[^\d\.\+\-\*\/]/g, ""));
}

function parseExpr(char, numbers, oper){
    let lastCharIsNumber = true;
    let cnt = 0;
    numbers[cnt] = "";

    for(let i = 0; i < char.length; i++){

        if(isNaN(parseInt(char[i])) && char[i] !== "." && !lastCharIsNumber) {
            oper[cnt] = char[i];
            cnt++;
            numbers[cnt] = "";
            lastCharIsNumber = true;
        }
        else {
            numbers[cnt] += char[i];
            lastCharIsNumber = false;
        }
    }

    return (oper, numbers);
}

function calculateExpr(numbers, oper) {
    let result = parseFloat(numbers[0]);

    for(let i = 0; i < oper.length; i++){

        if (oper[i] == "+"){
            result = sum(result, numbers[i+1]);
        }

        if (oper[i] == "-"){
            result = sub(result, numbers[i+1]);
        }

        if (oper[i] == "*"){
            result = mlt(result, numbers[i+1]);
        }

        if (oper[i] == "/"){
            result = div(result, numbers[i+1]);
        }

    }

    return result.toFixed(2);
}

function sum(a, b) {
    let res = Number(a) + Number(b);
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

/*let expr = "3.5 землекопа +4 поросенка *10 рублей - 5.5 $ /5 человек =";
console.log(expr, calculateExpression(expr));

function calculateExpression(rawString) {

    let expr = rawString.replace(/[^\d\.\+\-\*\/]/g, "");
    let chars = expr.split("");
    let numbers = [];		//numbers array
    let operators = [];		//operators array
    let i = 0;
    let lastCharIsNumber = true;
    numbers[i] = "";

    // parse the expression
    for (let ch = 0; ch < chars.length; ch++) {
        if (isNaN(parseInt(chars[ch])) && chars[ch] !== "." && !lastCharIsNumber) {
            operators[i] = chars[ch];
            i++;
            numbers[i] = "";
            lastCharIsNumber = true;
        } else {
            numbers[i] += chars[ch];
            lastCharIsNumber = false;
        }
    }

    // calculate the expression
    let result = parseFloat(numbers[0]);
    for (let op = 0; op < operators.length; op++) {
        let num = parseFloat(numbers[op + 1]);
        switch (operators[op]) {
            case "+":
                result += num;
                break;
            case "-":
                result -= num;
                break;
            case "*":
                result *= num;
                break;
            case "/":
                result /= num;
                break;
            default:
                throw "Unsupported operator!";
        }
    }

    return result.toFixed(2);// output result with accuracy of 2 decimal places
}*/