import React, { useState, useEffect } from 'react';
import './sekiller.css'; // CSS file for styling

const Karisik = () => {
  const [shapes, setShapes] = useState([]);

  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 25; i++) {
      const randomShape = Math.floor(Math.random() * 3); // Random number to determine shape
      let shape;
      switch (randomShape) {
        case 0:
          shape = 'Daire';
          break;
        case 1:
          shape = 'Kare';
          break;
        case 2:
          shape = 'Ucgen';
          break;
          case 3:
            shape = 'star';
            break;
        default:
          shape = 'Daire'; // Default to circle
      }
      initialShapes.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        size: Math.floor(Math.random() * 100) + 20,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape,
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
          ? { ...shape, size: Math.floor(Math.random() * 100) + 20 }
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

export default Karisik;
