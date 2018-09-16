import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import LogoImage from './logo.svg';
import MatrixImage from './matrix.jpg';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial sttate for setup.
 * @returns {ShallowWrapper}
*/

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
}

/**
 * Retrun ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

//RENDERING  

describe('Components and buttons are rendered without error', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test('App renders', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });
  test('Top image renders', () => {
    const topImage = findByTestAttr(wrapper, 'top-image');
    expect(topImage.length).toBe(1);
  })
  test('Increment button renders', () => {
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    expect(incrementButton.length).toBe(1);
  });
  test('Decrement button renders', () => {
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    expect(decrementButton.length).toBe(1);
  });
  
  test('Reset button renders', () => {
    const resetButton = findByTestAttr(wrapper, 'reset-button');
    expect(resetButton.length).toBe(1);
  });
  
  test('Counter display renders', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
  });  
});

//RIGHT IMAGE IS RENDERED 

describe('App renders correct image', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  })
  test('top image is matrix', () => {
    const topImage = findByTestAttr(wrapper, 'top-image');
    expect(topImage.prop("src")).toEqual(LogoImage);
  });
})

//BUTTONS 

describe('Buttons work', () => {
  let wrapper;
  let counter;

  beforeEach(() => {
    counter = 7;
    wrapper = setup(null, { counter });    
  });

  test('Increment button works', () => {
    // find button and click
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    incrementButton.simulate('click');
    wrapper.update();
  
    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1)
  });
  
  test('Decrement button works', () => {
    //find button and click
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();
  
    //find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });

  test('Reset button works', () => {
    // find button and click
    const resetButton = findByTestAttr(wrapper, 'reset-button');
    resetButton.simulate('click');
    wrapper.update();
  
    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(0)
  });
});

//COUNTER 

describe('Counter display', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = setup();
  });

  test('starts at 0', () => {
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);  
  });

  test('does not go lower than 0', () => {
    //find decrement button and click it
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();
  
    //find display and test content
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).not.toContain(-1);
  });
});

//ERROR HANDLING

describe('Error message', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('shown when counter is 0 and decrement is pressed', () => {
    //find decrement button and click it
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();
  
    //error display renders
    const errorDisplay = findByTestAttr(wrapper, 'error-display');
    expect(errorDisplay.length).toBe(1);
  });

  test('not shown when there is no error', () => {
    //error display does not render
    const errorDisplay = findByTestAttr(wrapper, 'error-display');
    expect(errorDisplay.length).toBe(0);
  });
})

describe('Error message clears', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = setup(null, {error: true});
  });

  test('when increment is clicked', () => {
    const incrementButton = findByTestAttr(wrapper, 'increment-button');
    incrementButton.simulate('click');
    wrapper.update();   
    const errorDisplay = findByTestAttr(wrapper, 'error-display');
    expect(errorDisplay.length).toBe(0);
  });

  test('when reset is clicked', () => {
    const resetButton = findByTestAttr(wrapper, 'reset-button');
    resetButton.simulate('click');
    wrapper.update();   
    const errorDisplay = findByTestAttr(wrapper, 'error-display');
    expect(errorDisplay.length).toBe(0);
  });
});
