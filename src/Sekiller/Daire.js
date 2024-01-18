// Ball.js

import React, { useState, useEffect } from 'react';
import './sekiller.css'; // CSS file for styling

const Ball = () => {
  const [shapes, setShapes] = useState([]);

  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 25; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        size: Math.floor(Math.random() * 100) + 70,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape: 'Daire', // Directly set the shape to 'circle'
      });
    }
    setShapes(initialShapes);
  };

  useEffect(() => {
    createInitialShapes();
  }, []);

  const changeSize = (id) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id
          ? { ...shape, 
            xSpeed: Math.random() * 8 , // Change xSpeed randomly
              ySpeed: Math.random() * 6, 
              size: Math.floor(Math.random() * 120) + 150 }
          
          : shape
      )
    );
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
      {shapes.map((shape) => (
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

export default Ball;
