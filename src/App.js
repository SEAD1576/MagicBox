import React, { useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState(Array(9).fill('white')); 
  const [clickedOrder, setClickedOrder] = useState([]); 
  const [sequenceStarted, setSequenceStarted] = useState(false); 

  
  const handleBoxClick = (index) => {
  
    if (sequenceStarted || clickedOrder.includes(index)) return;

    const newColors = [...colors];
    newColors[index] = 'green'; 
    setColors(newColors);
    setClickedOrder([...clickedOrder, index]);

    
    if (clickedOrder.length === 8) {
      setSequenceStarted(true); 
      

    
      clickedOrder.forEach((idx, i) => {
        setTimeout(() => {
          setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[idx] = 'orange'; 
            return newColors;
          });
        }, i * 500); 
      });

    
      setTimeout(() => {
        setColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = 'orange'; 
          return newColors;
        });
      }, clickedOrder.length * 500);
    }
  };


  const resetGame = () => {
    setColors(Array(9).fill('white')); 
    setClickedOrder([]); 
    setSequenceStarted(false); 
  };

  return (
    <div className="App">
      <h1>Magic Box</h1>
      <div className="grid">
        {colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default App;
