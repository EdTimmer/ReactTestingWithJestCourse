import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    }
    this.onIncrement = this.onIncrement.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }
  onIncrement(ev) {
    if (this.state.error) {
      this.setState({error: false});
    }
    this.setState({counter: this.state.counter + 1});
  }
  onDecrement(ev) {
    if (this.state.counter > 0) {
      this.setState({counter: this.state.counter - 1});
    }
    else {
      this.setState({error: true});
    }
    
  }
  onReset(ev) {
    this.setState({counter: 0, error: false})
  }
  render() {
    const { counter, error } = this.state;
    const { onIncrement, onDecrement, onReset } = this;
    return (
      <div data-test="component-app" className="App">
        <div style={{marginTop: 50}}>
          <img data-test="top-image" src={require('./matrix.jpg')} height={200} />
        </div>
        <div>
          <h1 data-test="counter-display">The couner is {counter}</h1>
        </div>
        <div>
          {
            error ? (<h1 data-test="error-display" style={{color: "red"}}>Counter cannot go lower than 0</h1>) : (null)
          } 
        </div>       
        <div>
          <button data-test="increment-button" onClick={ onIncrement }>Increment</button>
        </div>        
        <br />
        <div>
          <button data-test="decrement-button" onClick={ onDecrement }>Decrement</button>
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
