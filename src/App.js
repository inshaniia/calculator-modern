import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [calculated, setCalculated] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Function to get current time in Jakarta, Indonesia (GMT+7)
  const updateJakartaTime = () => {
    const now = new Date();
    // Jakarta is GMT+7
    const jakartaTime = new Date(now.getTime() + (7 * 60 * 60 * 1000 - now.getTimezoneOffset() * 60 * 1000));
    const hours = jakartaTime.getHours().toString().padStart(2, '0');
    const minutes = jakartaTime.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  };

  // Update time every minute
  useEffect(() => {
    updateJakartaTime(); // Initial update
    const interval = setInterval(updateJakartaTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (value) => {
    if (calculated) {
      setInput(value);
      setCalculated(false);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('0');
    setCalculated(false);
  };

  const handleBackspace = () => {
    if (input.length > 0) {
      setInput(input.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      // Replace × with * and ÷ with / for JavaScript evaluation
      // eslint-disable-next-line no-eval
      const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/');
      const calculatedResult = eval(sanitizedInput);
      setResult(calculatedResult.toString());
      setCalculated(true);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="phone">
      <div className="status-bar">
        <div className="time">{currentTime}</div>
        <div className="status-icons">
          <span className="signal">●●● ●</span>
          <span className="wifi">●</span>
        </div>
      </div>

      <div className="calculator">
        <div className="calculator-display">
          <div className="calculation">{input || '0'}</div>
          <div className="result">= {result}</div>
        </div>

        <div className="calculator-keypad">
          {/* Row 1 */}
          <button className="calculator-key function-key" onClick={handleClear}>C</button>
          <button className="calculator-key function-key" onClick={handleBackspace}>⌫</button>
          <button className="calculator-key operator-key" onClick={() => handleButtonClick('/')}>÷</button>
          <button className="calculator-key operator-key" onClick={() => handleButtonClick('*')}>×</button>
          
          {/* Row 2 */}
          <button className="calculator-key number-key" onClick={() => handleButtonClick('7')}>7</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('8')}>8</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('9')}>9</button>
          <button className="calculator-key operator-key" onClick={() => handleButtonClick('-')}>−</button>
          
          {/* Row 3 */}
          <button className="calculator-key number-key" onClick={() => handleButtonClick('4')}>4</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('5')}>5</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('6')}>6</button>
          <button className="calculator-key operator-key" onClick={() => handleButtonClick('+')}>+</button>
          
          {/* Row 4 */}
          <button className="calculator-key number-key" onClick={() => handleButtonClick('1')}>1</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('2')}>2</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('3')}>3</button>
          <button className="calculator-key operator-key equals-key" onClick={handleCalculate}>=</button>
          
          {/* Row 5 */}
          <button className="calculator-key function-key copy-key">⎘</button>
          <button className="calculator-key number-key zero-key" onClick={() => handleButtonClick('0')}>0</button>
          <button className="calculator-key number-key" onClick={() => handleButtonClick('.')}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
