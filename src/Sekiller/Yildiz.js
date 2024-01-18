import React, { useState, useEffect } from 'react';
import './sekiller.css';

const Yildiz = () => {
  const [shapes, setShapes] = useState([]);

  const createInitialShapes = () => {
    const initialShapes = [];
    const fixedSize =20;

    for (let i = 0; i < 50; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * (window.innerWidth - fixedSize),
        y: Math.random() * (window.innerHeight - fixedSize),
        size: fixedSize,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape: 'star',
        visible: true,
      });
    }
    setShapes(initialShapes);
  };

  useEffect(() => {
    createInitialShapes();
  }, []);

  const onClickHandler = (id) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id
          ? {
              ...shape,
              visible: false,
            }
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
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="anaclass">
      {shapes.map((shape) =>
        shape.visible ? (
          <div
            key={shape.id}
            className={`${shape.shape}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            onClick={() => onClickHandler(shape.id)}
          ></div>
        ) : null
      )}
    </div>
  );
};

export default Yildiz;
