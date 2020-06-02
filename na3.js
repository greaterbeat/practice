function test(str)
{
    return str.replace(/[^\d\+\*\/\-\.\(\)]/g, '')
}

let str = '3.5 землекопа +4 поросенка *10 рублей - 5.5 $ /5 человек =';
let n = test(str)

const applyMath = getMathHandler();
console.log('Задана строка', str);
console.log('Результат счёта без eval', applyMath(n));
console.log('Результат счёта c eval', eval(n));

function getMathHandler()
{
    const math = getMathFn();
    let divByZero = false;

    return applyMath;

    function applyMath(math_str) {
        divByZero = false;

        throwUnmatchedScopes(math_str);

        math_str = deepRemoveScopes(math_str);

        let result = parseLinearMath(math_str);
        return divByZero ? "Деление на ноль!" : result;
    }

    function deepRemoveScopes(str) {
        let index = str.indexOf("(");
        if( index === -1 ) return parseLinearMath(str);

        let scope = "(";
        let open = 1;

        for( let i = index + 1; i <= 100000; i++ ) {

            scope += str[i];

            if( str[i] === "(" ) {
                open++;
            } else if( str[i] === ")" ) {
                open--;
            }

            if( open === 0 ) {
                return deepRemoveScopes( str.replace(scope, deepRemoveScopes( scope.slice(1, -1) ) ) );
            }
        }
    }

    function parseLinearMath(math_str) {
        math_str = mul_div(math_str);
        math_str = plus_minus(math_str);

        return math_str;


        function mul_div(math_str) {
            let length = (math_str.match(/\/|\*/g) || []).length;
            if (!length) return math_str;

            for (let i = 0; i < length; i++) {
                math_str = math_str.replace(
                    /(\d+(?:\.\d+)?)(\/|\*)(-?\d+(?:\.\d+)?)/,
                    function(_, a, oper, b) {
                        return math(a, oper, b);
                    }
                );

            }

            return math_str;
        }

        function plus_minus(math_str) {
            let length = (math_str.match(/\+|-/g) || []).length;
            if (!length) return math_str;

            for (let i = 0; i < length; i++) {
                math_str = math_str.replace(
                    /((?:^-)?\d+(?:\.\d+)?)(\+|-)(\d+(?:\.\d+)?)/,
                    function(_, a, oper, b) {
                        return math(a, oper, b);
                    }
                );

            }

            return math_str;
        }
    }

    function throwUnmatchedScopes(math_str) {
        let scopes_open = (math_str.match(/\(/g) || []).length;
        let scopes_close = (math_str.match(/\)/g) || []).length;

        if (scopes_open !== scopes_close) {
            throw new Error("Unmatched parenthesis at " + math_str);
        }
    }

    function getMathFn() {
        let local_math = {
            "+": (a, b) => Number(a) + Number(b),
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => {
                if( b === "0" ) {
                    divByZero = true;
                }

                return (a / b);
            },
        };

        return function math(a, operation, b) {
            return local_math[operation](a, b);
        }
    }
}