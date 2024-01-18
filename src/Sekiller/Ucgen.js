import React, { useState, useEffect } from 'react';
import './sekiller.css';

const Ucgen = () => {
  // State to manage the array of shapes
  const [shapes, setShapes] = useState([]);

  // Function to create initial shapes and set them in the state
  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 50; i++) {
      initialShapes.push({
        id: i,
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
        size: Math.floor(Math.random() * 20) + 20,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape: 'Ucgen',
      });
    }
    setShapes(initialShapes);
  };

  useEffect(() => {
    createInitialShapes();
  }, []);

  // Function to change the speed of a shape when clicked
  const changeSpeed = (id) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id
          ? {
              ...shape,
              xSpeed: Math.random() * 8,
              ySpeed: Math.random() * 6,
            }
          : shape
      )
    );
  };

  // useEffect Kullanarak Üçgenkleri Basıldığında Hareketi Değişterme Fonksiyonudur
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

    // clearInterval Metodu Kullanarak bileşenin bağlantısı kesildiğinde aralığı temizleme işlevi
    return () => clearInterval(interval);
  }, []); //  dependency Boş kalacak temizleme işi bir kerelik yapması için

  // Üçgen Bileşeni Çalıştıran yerdir
  return (
    <div className="anaclass">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`${shape.shape}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          onClick={() => changeSpeed(shape.id)}
        ></div>
      ))}
    </div>
  );
};

export default Ucgen;
