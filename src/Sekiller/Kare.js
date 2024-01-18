// Kare.js

import React, { useState, useEffect } from 'react';
import './sekiller.css'; // CSS file for styling

const Kare = () => {
  const [shapes, setShapes] = useState([]);

  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 25; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        size: Math.floor(Math.random() * 100) + 20,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape: 'Kare', // Set shape directly to 'square'
      });
    }
    setShapes(initialShapes);
  };

  useEffect(() => {
    createInitialShapes();
  }, []);

  const changeSize = (id) => {
    setShapes((prevShapes) => {
      const updatedShapes = prevShapes.map((shape) =>
        shape.id === id
          ? [
              { ...shape, size: Math.floor(Math.random() * 100) + 20 },
              {
                ...shape,
                id: prevShapes.length, // Assign a new id to the duplicated square
                x: shape.x + 10, // Offset the duplicated square
                y: shape.y + 10, // Offset the duplicated square
              },
            ]
          : shape
      );

      // Flatten the array of shapes to remove nested arrays
      return [].concat(...updatedShapes);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,
          x: shape.x + shape.xSpeed,
          y: shape.y + shape.ySpeed,
          xSpeed:
            shape.x + shape.xSpeed > window.innerWidth - shape.size || shape.x + shape.xSpeed < 0
              ? -shape.xSpeed
              : shape.xSpeed,
          ySpeed:
            shape.y + shape.ySpeed > window.innerHeight - shape.size || shape.y + shape.ySpeed < 0
              ? -shape.ySpeed
              : shape.ySpeed,
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="anaclass">
      {shapes
        .filter((shape) => shape.shape === 'Kare') // Filter out non-square shapes
        .map((shape) => (
          <div
            key={shape.id}
            className={`${shape.shape}`} // Use shape as a class name
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            onClick={() => changeSize(shape.id)}
          ></div>
        ))}
    </div>
  );
};

export default Kare;
