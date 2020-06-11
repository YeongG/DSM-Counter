import React,{ useState, useCallback } from 'react';

const App = () => {
  const [number,setNumber] = useState(0);
  const [timeoutId,setTimeoutId] = useState(null);
  const [intervalId,setIntervalId] = useState(null);

  const numberChanger = useCallback(value => {
    setNumber(prev => prev+parseInt(value));
  },[]);

  const holdingFunc = useCallback(value => {
    const intervalId = setInterval(() => numberChanger(value),100);
    setIntervalId(intervalId);
  },[])

  const mouseDown = useCallback(e => {
    const {target:{dataset:{value}}} = e;
    setNumber(prev => prev + parseInt(value));
    const timeoutId = setTimeout(() => holdingFunc(value),2000);
    setTimeoutId(timeoutId);
  },[]);

  const clearFunc = useCallback(() => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  },[timeoutId,intervalId]);

  return (
    <>
      <span>{number}</span>
      <div>
        <button 
          data-value="1" 
          onMouseDown={mouseDown} 
          onMouseLeave={clearFunc} 
          onMouseUp={clearFunc}
        >+</button>
        <button 
          data-value="-1" 
          onMouseDown={mouseDown} 
          onMouseLeave={clearFunc} 
          onMouseUp={clearFunc}
        >-</button>
      </div>
    </>
  );
}

export default App;
