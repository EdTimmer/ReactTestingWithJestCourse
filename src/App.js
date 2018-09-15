import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    this.onIncrement = this.onIncrement.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }
  onIncrement(ev) {
    this.setState({counter: this.state.counter + 1});
  }
  onDecrement(ev) {
    this.setState({counter: this.state.counter - 1});
  }
  onReset(ev) {
    this.setState({counter: 0})
  }
  render() {
    const { counter } = this.state;
    const { onIncrement, onDecrement, onReset } = this;
    return (
      <div data-test="component-app" className="App">
        <h1 data-test="counter-display">The couner is {counter}</h1>
        <div>
          <button data-test="increment-button" onClick={ onIncrement }>Increment</button>
        </div>        
        <br />
        <div>
          <button data-test="decrement-button" onClick={ onDecrement }>Increment</button>
        </div>        
        <br />
        <div>
          <button data-test="reset-button" onClick={ onReset }>Reset</button>
        </div>        
      </div>
    );
  }
}

export default App;
