var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var operatorsRegex = /[+\-*\/]/;
var maxDigit = 22;
//  plus minus multiply divide. backslash to escape character with special meaning
var

MyCalculator = function (_React$Component) {_inherits(MyCalculator, _React$Component);
  function MyCalculator(props) {_classCallCheck(this, MyCalculator);var _this = _possibleConstructorReturn(this, (MyCalculator.__proto__ || Object.getPrototypeOf(MyCalculator)).call(this,
    props));
    _this.state = {
      input: '',
      currentVal: '0', //cannot put 0 without ''. Becos string, not number
      evaluated: false };

    _this.initialize = _this.initialize.bind(_this);
    _this.backspace = _this.backspace.bind(_this);
    _this.handleNumbers = _this.handleNumbers.bind(_this);
    _this.handleDecimal = _this.handleDecimal.bind(_this);
    _this.handleOperators = _this.handleOperators.bind(_this);
    _this.handleSolution = _this.handleSolution.bind(_this);return _this;
  }_createClass(MyCalculator, [{ key: 'handleSolution', value: function handleSolution()

    {
      this.setState({
        input: this.state.input + '=' + eval(this.state.input).toString(),
        currentVal: eval(this.state.input).toString(),
        evaluated: true });


    } }, { key: 'handleOperators', value: function handleOperators(

    e) {
      if (this.state.currentVal.length !== maxDigit + 1) {
        if (this.state.evaluated === true) {
          this.setState({
            input: this.state.currentVal + e.target.value,
            currentVal: e.target.value,
            evaluated: false });

        } else

        if (this.state.input === '') {
          this.setState({
            input: '0' + e.target.value,
            currentVal: +this.state.currentVal + e.target.value });

        } else




        if (operatorsRegex.test(this.state.input.slice(-1))) {
          this.setState({
            input: this.state.input.slice(0, -1) + e.target.value,
            currentVal: e.target.value });

        } else {
          this.setState({
            input: this.state.input + e.target.value,
            currentVal: e.target.value });

        }
      }
    } }, { key: 'handleDecimal', value: function handleDecimal(

    e) {
      if (this.state.currentVal.length !== maxDigit) {
        if (this.state.evaluated === true) {
          this.setState({
            input: '0' + e.target.value,
            currentVal: '0' + e.target.value,
            evaluated: false });

        } else



        if (this.state.input === '') {
          this.setState({
            input: '0' + e.target.value,
            currentVal: +this.state.currentVal + e.target.value });

        } else


        if (this.state.input.includes(".") === false && operatorsRegex.test(this.state.input.slice(-1)) === false) {
          this.setState({
            input: this.state.input + e.target.value,
            currentVal: this.state.currentVal + e.target.value });

        } else
          // allow only one decimal input following last operator occurrence    
          if (this.state.input.search(/[+\-*\/](?=[^+\-*\/]*$)/) !== -1 && this.state.input.slice(this.state.input.search(/[+\-*\/](?=[^+\-*\/]*$)/), this.state.input.length).includes(".") === false && operatorsRegex.test(this.state.input.slice(-1)) === false) {
            this.setState({
              input: this.state.input + e.target.value,
              currentVal: this.state.currentVal + e.target.value });

          } else
            // add zero before decimal if not stated
            if (operatorsRegex.test(this.state.input.slice(-1))) {
              this.setState({
                input: this.state.input + '0' + e.target.value,
                currentVal: '0' + e.target.value });

            }
      }
    } }, { key: 'handleNumbers', value: function handleNumbers(

    e) {
      if (this.state.currentVal.length !== maxDigit) {

        if (this.state.evaluated === true) {
          this.setState({
            input: e.target.value,
            currentVal: e.target.value,
            evaluated: false });

        } else


        if (this.state.currentVal === '0') {
          this.setState({
            input: e.target.value,
            currentVal: e.target.value });

        } else if (operatorsRegex.test(this.state.currentVal)) {
          this.setState({
            input: this.state.input + e.target.value,
            currentVal: e.target.value });

        } else {
          this.setState({
            input: this.state.input + e.target.value,
            currentVal: this.state.currentVal + e.target.value });

        }
      }
    } }, { key: 'initialize', value: function initialize()

    {
      this.setState({
        input: '',
        currentVal: '0',
        evaluated: false });

    } }, { key: 'backspace', value: function backspace()

    {
      if (this.state.evaluated === true) {
        this.initialize();
      } else
      if (this.state.input !== '' && this.state.input.length !== 1) {
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 1),
          currentVal: this.state.currentVal.slice(0, this.state.currentVal.length - 1) });

      } else
      if (this.state.input.length === 1) {
        this.setState({
          input: '',
          currentVal: '0' });

      }
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null,
          React.createElement('div', { className: 'creator' }, 'JS/React Calculator by Ed'),
          React.createElement('div', { className: 'calculator' },
            React.createElement(Formula, { currentInput: this.state.input }),
            React.createElement(Output, { currentOutput: this.state.currentVal }),
            React.createElement(Buttons, {
              clearall: this.initialize,
              backspace: this.backspace,
              numbers: this.handleNumbers,
              operators: this.handleOperators,
              decimal: this.handleDecimal,
              equal: this.handleSolution })),



          React.createElement('div', null, React.createElement('h6', null, 'for FCC'))));



    } }]);return MyCalculator;}(React.Component);var


Buttons = function (_React$Component2) {_inherits(Buttons, _React$Component2);function Buttons() {_classCallCheck(this, Buttons);return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).apply(this, arguments));}_createClass(Buttons, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', null,
          React.createElement('button', { id: 'clear', value: 'AC', onClick: this.props.clearall }, 'AC'),
          React.createElement('button', { id: 'backspace', value: 'BS', onClick: this.props.backspace }, '\u232B'),
          React.createElement('button', { id: 'divide', value: '/', onClick: this.props.operators }, '/'),
          React.createElement('button', { id: 'seven', value: '7', onClick: this.props.numbers }, '7'),
          React.createElement('button', { id: 'eight', value: '8', onClick: this.props.numbers }, '8'),
          React.createElement('button', { id: 'nine', value: '9', onClick: this.props.numbers }, '9'),
          React.createElement('button', { id: 'multiply', value: '*', onClick: this.props.operators }, 'x'),
          React.createElement('button', { id: 'four', value: '4', onClick: this.props.numbers }, '4'),
          React.createElement('button', { id: 'five', value: '5', onClick: this.props.numbers }, '5'),
          React.createElement('button', { id: 'six', value: '6', onClick: this.props.numbers }, '6'),
          React.createElement('button', { id: 'subtract', value: '-', onClick: this.props.operators }, '-'),
          React.createElement('button', { id: 'one', value: '1', onClick: this.props.numbers }, '1'),
          React.createElement('button', { id: 'two', value: '2', onClick: this.props.numbers }, '2'),
          React.createElement('button', { id: 'three', value: '3', onClick: this.props.numbers }, '3'),
          React.createElement('div', null,
            React.createElement('button', { id: 'zero', value: '0', onClick: this.props.numbers }, '0'),
            React.createElement('button', { id: 'decimal', value: '.', onClick: this.props.decimal }, '.'),
            React.createElement('button', { id: 'equals', value: '=', onClick: this.props.equal }, '=')),

          React.createElement('button', { id: 'add', value: '+', onClick: this.props.operators }, '+')));


    } }]);return Buttons;}(React.Component);var


Formula = function (_React$Component3) {_inherits(Formula, _React$Component3);function Formula() {_classCallCheck(this, Formula);return _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).apply(this, arguments));}_createClass(Formula, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { className: 'formulaDisplay' }, this.props.currentInput));


    } }]);return Formula;}(React.Component);var


Output = function (_React$Component4) {_inherits(Output, _React$Component4);function Output() {_classCallCheck(this, Output);return _possibleConstructorReturn(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));}_createClass(Output, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'display', className: 'outputDisplay' }, this.props.currentOutput));


    } }]);return Output;}(React.Component);



ReactDOM.render(React.createElement(MyCalculator, null), document.getElementById('app'));