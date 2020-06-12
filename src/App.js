import React,{ useState, useCallback } from 'react';

const App = () => {
  const [number,setNumber] = useState(0);
  const [timeoutId,setTimeoutId] = useState(null);
  const [intervalId,setIntervalId] = useState(null);

  const numberChanger = useCallback(intValue => {
    setNumber(prev => prev+intValue);
  },[]);

  const holdingFunc = useCallback(intValue => {
    const intervalId = setInterval(() => numberChanger(intValue),100);

    setIntervalId(intervalId);
  },[]);

  const mouseDown = useCallback(e => {
    const {target:{dataset:{value}}} = e;
    const intValue = parseInt(value);
    const timeoutId = setTimeout(() => holdingFunc(intValue),2000);

    setNumber(prev => prev + intValue);
    setTimeoutId(timeoutId);
  },[]);

  // const clearFunc = useCallback(() => {
  //   setTimeoutId(prev => {
  //     clearTimeout(prev);
  //     return null;
  //   });
  //   setIntervalId(prev => {
  //     clearInterval(prev);
  //     return null;
  //   });
  // },[]);

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
          onMouseUp={clearFunc}
          onMouseLeave={clearFunc} 
        >
          +
        </button>
        <button 
          data-value="-1" 
          onMouseDown={mouseDown} 
          onMouseUp={clearFunc}
          onMouseLeave={clearFunc} 
        >
          -
        </button>
      </div>
    </>
  );
}

export default App;
