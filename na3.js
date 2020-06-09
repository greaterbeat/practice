function test(str)
{
    return str.replace(/[^\d\+\*\-\/\.\)]*[+*-/.]*[^\d\+\*\-\/\.\(]*[^\d\+\*\/\-\.]/g, '')
}

let str = '(3.5 зем+л.е-копа *4 поросенка) + (10 рублей) - 5.5 $ /5 человек =';
let n = test(str)

const applyMath = getMathHandler();

console.log('Задана строка', str);
console.log('Строка, "очищенная" от слов', n);
console.log('Результат счёта без eval', applyMath(n));
console.log('Результат счёта c eval', eval(n));

function getMathHandler() {
    const math = getMathFn();
    let divByZero = false;

    return applyMath;

    /***/

    function applyMath(math_str) {
        divByZero = false;

        math_str = autoCorrect(math_str);

        let result = parseLinearMath(math_str);
        return divByZero ? "Караул, тут делят на ноль!" : result;
    }

    function parseLinearMath(math_str) {
        math_str = autoCorrect(math_str);
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

                math_str = autoCorrect(math_str);
                // Строка не из миллиона символов, поэтому после каждой операции
                // На всякий случай исправляется всё, что может пойти не так.
                // В основном, "гасятся" знаки вида ++, +-, --
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

                math_str = autoCorrect(math_str);
            }

            return math_str;
        }
    }

    function autoCorrect(math_str) {
        return (math_str               // Замены:
                .replace(/\s/g, "")          // Удалить все пробелы
                .replace(/\(\)/g, "")        // Убрать пустые скобки
                .replace(/--/g, "+")         // Два минуса подряд → Плюс
                .replace(/(\+\+|\*\*|\/\/)/g, (_, oper) => oper[0])
                // Двойные плюсы, умножения и пр → на один
                .replace(/\+-|-\+/g, "-")    // Плюс после минуса и наоборот → на минус
                .replace(/\)\(/g, ")*(")     // Две скобки подряд → вставить умножение
                .replace(/(\d)\(/g, "$1*(")  // Число и сразу скобка → умножение
                .replace(/\)(\d)/g, ")*$1")  // Скобка и сразу число → умножение
                .replace(/(\/|\*)\+/g, "$1") // *+ или /+ → убрать плюс
        );
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