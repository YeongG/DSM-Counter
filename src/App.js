import React,{ useState, useCallback } from 'react';

const App = () => {
  const [number,setNumber] = useState(0);
  const [timeoutId,setTimeoutId] = useState(null);
  const [intervalId,setIntervalId] = useState(null);

  const numberChanger = useCallback(target => {
    setNumber(prev => prev+parseInt(target.dataset.value));
  },[]);

  const holdingFunc = useCallback(target => {
    const intervalId = setInterval(() => numberChanger(target),100);
    setIntervalId(intervalId);
  },[])

  const mouseDown = useCallback(e => {
    const target = e.target;
    setNumber(prev => prev + parseInt(target.dataset.value));
    const timeoutId = setTimeout(() => holdingFunc(target),2000);
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
