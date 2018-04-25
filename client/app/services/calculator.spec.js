import calculator from './calculator';

describe('Service: calculator', () => {
    let service = new calculator();

    it('Should change the currentState to operandState', () => {
        service.changeToCalculationOperandState();
        expect(service.currentState).to.be.equal(CALCULATION_STATE.INSERT_OPERAND_1);
    });

    it('Should change the value of operand1 to 3', () => {
        service.addDigit(3);
        expect(service.operand1.value).to.be.equal(3);
    });

    it('Should change the value of operand1 to 35', () => {
        service.addDigit(5);
        expect(service.operand1.value).to.be.equal(35);
    });

    it('Should change the value of operand1 to -35', () => {
        service.changeOperandSign();
        expect(service.operand1.value).to.be.equal(-35);
        expect(service.operand1.sign).to.be.equal(-1);
    });

    it('Should change the value of operand1 to 35', () => {
        service.changeOperandSign();
        expect(service.operand1.value).to.be.equal(35);
        expect(service.operand1.sign).to.be.equal(1);
    });

    it('Should change operand1 to decimal', () => {
        service.changeToDecimalOperand();
        expect(service.operand1 instanceof DecimalOperand).to.be.equal(true);
        expect(service.operand1.getValueString()).to.be.equal("35.");
    });

    it('Should change the value of operand1 to 35.5', () => {
        service.addDigit(5);
        expect(service.operand1.value).to.be.equal(35.5);
    });

    it('Should select operator +', () => {
        service.selectOperator(ARITHMETIC_OPERATORS.ADD);
        expect(service.currentState).to.be.equal(CALCULATION_STATE.INSERT_OPERATOR);
        expect(service.operator instanceof Addition).to.be.equal(true);
        expect(service.operator.sign).to.be.equal("+");
    });

    it('Should select operator -', () => {
        service.selectOperator(ARITHMETIC_OPERATORS.SUB);
        expect(service.operator instanceof Subtraction).to.be.equal(true);
        expect(service.operator.sign).to.be.equal("-");
    });

    it('Should change the value of operand2 to 6', () => {
        service.addDigit(6);
        expect(service.currentState).to.be.equal(CALCULATION_STATE.INSERT_OPERAND_2);
        expect(service.operand2.value).to.be.equal(6);
    });

    it('Should get result 29.5', () => {
        service.getResult();
        expect(service.lastResult.value).to.be.equal(29.5);
        expect(service.operand1.value).to.be.equal(0);
        expect(service.operand2.value).to.be.equal(0);
        expect(service.operator).to.be.null;
        expect(service.currentState).to.be.equal(CALCULATION_STATE.START);
    });

    it('Should get result 5', () => {
        service.addDigit(5);
        service.getResult();
        expect(service.lastResult.value).to.be.equal(5);
    });

    it('Should get result 5', () => {
        service.addDigit(5);
        service.selectOperator(ARITHMETIC_OPERATORS.MUL);
        service.getResult();
        expect(service.lastResult.value).to.be.equal(5);
    });

    it('Should change the value of operand1 to 5', () => {
        service.selectOperator(ARITHMETIC_OPERATORS.ADD);
        expect(service.currentState).to.be.equal(CALCULATION_STATE.INSERT_OPERATOR);
        expect(service.operand1.value).to.be.equal(5);
    });

    it('Should change the value of operand1 to 9', () => {
        service.addDigit(4);
        service.selectOperator(ARITHMETIC_OPERATORS.DIV);
        expect(service.operand1.value).to.be.equal(9);
    });

    it('Should show error message', () => {
        service.addDigit(0);
        service.getResult();
        expect(service.lastResult.getValueString()).to.be.equal("Oh no! You can't do that..");
    });

    it('Should change the value of operand1 to 0', () => {
        service.selectOperator(ARITHMETIC_OPERATORS.ADD);
        expect(service.operand1.value).to.be.equal(0);
    });
});