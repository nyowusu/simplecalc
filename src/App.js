import React, {Component} from 'react';
import {DisplayMain} from './components/display/DisplayMain.component';
import { DisplayAuxilliary } from "./components/display/DisplayAuxilliary.component";
import {FunctionButton} from './components/functionbuttons/FunctionButton.component';
import { OperatorButton } from './components/operator/OperatorButton.component';
import { NumberButton } from './components/numberbuttons/NumberButton.component';
import { ZeroButton } from './components/zerobutton/ZeroButton.component';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      maindisplay: "0",
      auxilliary: "0",
      prevNumber: 0,
      operator: null
    }

    this.DIVIDE = "divide";
    this.ADD = "add";
    this.SUBTRACT = "subtract";
    this.MULTIPLY = "multiply";
    this.ZERO = "0";
  }

  handleClearDisplays = () => {
    this.setState({maindisplay: "0", auxilliary: "0", prevNumber: 0, operator: null});
  }

  handleSetSign = () => {
      this.setState((state) => ({maindisplay: String(state.maindisplay * -1)}));
  }

  handlePercentage = () => {
      this.setState((state) => ({maindisplay: String(state.maindisplay / 100)}))
  }

  handleClick = (props,e) => {
    this.setState((state) => {
      let dot = ".";
      let zero = "0";
      let main = String(state.maindisplay);
      let containsDot = main.includes(dot);
      let nextNumber = String(props.number);
      
      // check if there's already a decimal point in the current number
      if (!(containsDot) && (nextNumber === dot)) {
        main = main + nextNumber;
      }else if ((containsDot) && (nextNumber !== dot)){
        main = main + nextNumber;
      } else if (!(containsDot) && (nextNumber !== dot)) {
        main = main + nextNumber;
      }
      //check if the first number is zero
      //to avoid repition of zeros with a decimal point
      if ((main.indexOf(zero) === 0) && (main.indexOf(dot) === -1)) {
        main = main.substring(1);
      }
      
      return {maindisplay: main}
    });
  }

  manageDisplays(props) {
    //const operators = ["÷","x","-","+"];
    
    if ((this.state.auxilliary.length > 1) &&
            this.state.auxilliary.lastIndexOf("0") !== 0) {
      
      // set the current number to operated on
      this.manageAuxDisplay(props);

    } else if((this.state.auxilliary.length === 1) && 
      (((this.state.maindisplay.length === 1) && (this.state.maindisplay.indexOf("0") !== 0)) || 
      (this.state.maindisplay.length > 1))) {

      // set the current number to be operated on.
      this.manageMainDisplay();
      this.manageAuxDisplay(props);
    }
  } 

  handleAddition = (props, e) => {
    // show current number in auxilliary display
    // with the addition sign 
    // then clear main display. 
    this.manageDisplays(props);
    this.setOperator((prev, curr) => (prev + curr));
  }

  handleSubtraction = (props, e) => {
    // show current number in auxilliary display
    // with the subtraction sign 
    // then clear main display.
    this.manageDisplays(props);
    this.setOperator((prev, curr) => (prev - curr));
  }

  handleMultiplication = (props, e) => {
    // show current number in auxilliary display
    // with the multiplication sign 
    // then clear main display.
    this.manageDisplays(props);
    this.setOperator((prev, curr) => (prev * curr));
  }

  handleDivision = (props, e) => {
    // show current number in auxilliary display
    // with the division sign 
    // then clear main display.
    this.manageDisplays(props);
    this.setOperator((prev, curr) => {
      if (curr === 0) {
        return 0;
      }

      return (prev / curr);
    });
  }

  handlePerformOperation = () => {
    let newNumber = Number(this.state.maindisplay);

    if (this.state.operator !== null) {
      newNumber = this.state.operator(this.state.prevNumber, newNumber);
    }

    this.setState(() => {
      return {maindisplay: String(newNumber), auxilliary:"0"}
    });
    
  }

  setOperator(callback) {
    this.setState({ operator: callback });
  }

  manageMainDisplay() {
    this.setState((state) => {
      return {
      maindisplay: "0",
        prevNumber: Number(state.maindisplay)
      };
    });
  }

  manageAuxDisplay(props) {
    this.setState((state) => {
      return {
        auxilliary: `${state.prevNumber} ${props.operator}`
      };
    });
  }

  componentDidUpdate() {

  }

  render() { 
    
    return (
    <div className="calculator">
      <DisplayAuxilliary key="aux" values={this.state.auxilliary} />
      <DisplayMain key="main" values={this.state.maindisplay}  />
      <FunctionButton content="AC" actionClick={this.handleClearDisplays} />
      <FunctionButton content="+/-" actionClick={this.handleSetSign}  />
      <FunctionButton content="%" actionClick={this.handlePercentage} />
      <OperatorButton operator="÷" actionClick={this.handleDivision} />
      <NumberButton number="7" appendNumber={this.handleClick} />
      <NumberButton number="8" appendNumber={this.handleClick} />
      <NumberButton number="9" appendNumber={this.handleClick} />
      <OperatorButton operator="x" actionClick={this.handleMultiplication} />
      <NumberButton number="4" appendNumber={this.handleClick} />
      <NumberButton number="5" appendNumber={this.handleClick} />
      <NumberButton number="6" appendNumber={this.handleClick} />
      <OperatorButton operator="-" actionClick={this.handleSubtraction} />
      <NumberButton number="1" appendNumber={this.handleClick} />
      <NumberButton number="2" appendNumber={this.handleClick} />
      <NumberButton number="3" appendNumber={this.handleClick} />
      <OperatorButton operator="+" actionClick={this.handleAddition} />
      <ZeroButton number="0" appendNumber={this.handleClick} />
      <NumberButton number="." appendNumber={this.handleClick} />
      <OperatorButton operator="=" actionClick={this.handlePerformOperation} />
    </div>
  )};
}

export default App;
