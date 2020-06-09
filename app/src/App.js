import React, { useState, useEffect, useRef } from 'react';
import './App.css';

/*
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class DateToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000) ;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render () {
    return (
      <h1>Today is {this.state.date.toLocaleTimeString()}.</h1>
    );
  }
}

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
*/

/*
function Google() {
}
*/

function Counter() {
  const [date, setDate] = useState(new Date());
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(()=>{setDate(new Date());}, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  });
 
  return (
    <div>
      <h1>Time: {date.toLocaleTimeString()}.</h1>
    </div>
  );
}

function App() {
  return (
    <Counter />
  );
}

export default App;
