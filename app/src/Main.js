import React from 'react';

function Main() {
  const [count, setCount] = React.useState(0) ;

  function increaseCount() {
    setCount(count + 1);
  }

  React.useEffect(() => {
    console.log ("Inside useEffect() count " + count) ;
  }, [count]) ;

  return (
    <div>
      <button onClick={increaseCount}>Count {count}</button>
    </div>
  ) ;
}

export default Main;
