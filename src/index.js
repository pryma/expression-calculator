function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/[\s]/g, "");
    
    let priority =  new Map();
    priority.set('(', 0);
    priority.set('+', 1);
    priority.set('-', 1);
    priority.set('*', 2);
    priority.set('/', 2);

    let rpnExpr = new Array();
    let operators = new Array();

    let arg = '';
    for (let currentExpr of expr) {
        
        if (!isNaN(Number(currentExpr))) {
            arg = arg + currentExpr;
            continue;
        }

        if (arg != '') {
            rpnExpr.push(Number(arg));
            arg = '';
        }

        if (operators.length == 0 || currentExpr == '(' || priority.get(currentExpr) > priority.get(operators[operators.length - 1])) {
            operators.push(currentExpr);
            continue;
        }

        if (currentExpr == ')') {
            while (operators[operators.length - 1] != '(') {
                rpnExpr.push(operators.pop());
                if (operators.length == 0) {
                    throw new Error('ExpressionError: Brackets must be paired');
                }
            }
            operators.pop();
            continue;
        }

        if (priority.get(currentExpr) == priority.get(operators[operators.length - 1])) {
            rpnExpr.push(operators.pop());
            operators.push(currentExpr);
            continue;
        }

         if (priority.get(currentExpr) < priority.get(operators[operators.length - 1])) {
            while (operators[operators.length - 1] != '(') {
                rpnExpr.push(operators.pop());
                if (operators.length == 0) {
                    break;
                }
            }
            operators.push(currentExpr);
        }
    }
    if (arg != "") {
        rpnExpr.push(Number(arg));
    }
    while (operators.length > 0) {
        rpnExpr.push(operators.pop());
    }
    
    let result = new Array();
    for (let rpn of rpnExpr) {
        if (isNaN(rpn)) {
            let num = result.pop();
            switch (rpn) {
                case "+":
                    num = result.pop() + num;
                    break;
                case '-':
                    num = result.pop() - num;
                    break;
                case '*':
                    num = result.pop() * num;
                    break;
                case '/':
                    if (num == 0) {
                        throw new Error('TypeError: Division by zero.');
                    }
                    num = result.pop() / num;
                    break;
                default:
                    if (rpn == '(') {
                        throw new Error('ExpressionError: Brackets must be paired');
                    }
                    break;
            }
            result.push(num);
        } else {
            result.push(rpn);
        }

        
    }
    return result.pop();

}

module.exports = {
    expressionCalculator
}
