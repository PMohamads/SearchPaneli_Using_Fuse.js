import React, { useState, useEffect } from 'react';
import './sekiller.css';//Şekillerin Özellikleri Yazılan CSS Dosyası İçe Aktar

const Karisik = () => {//Burda React'ın Bileşen Adını Tanımladım
  const [shapes, setShapes] = useState([]);//shapes adlı state Değişkeni,setShapes state Değikenini Ayarlamak için Kullanılan Fonkisyondur 

//Burda Rasgele Seçilecek Olan Şeklin Ana Özellikleri Ayarlanıyor (Sayısı,Hızı,Boyutu...)
  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 25; i++) {
      const randomShape = Math.floor(Math.random() * 3); 
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
          shape = 'Daire'; 
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
    setShapes(initialShapes);//React state hook'u olan setShapes fonksiyonunu kullanarak shapes adlı state değişkenini günceller
  };

  useEffect(() => {//Burda useEffect Hook'u Progamın ilk Render Edildiğinde (createInitialShapes) Bu Fonkisyonu Çalıştırır.
    createInitialShapes();
  }, []);

  //oluşturulan şekillerin kendilerinin boyutunu Rastgele Bir Şekilde değiştiren fonksiyonudur,
  //Bu Fonkisyon OnClick olayı gerçekleşince çalışır
  const changeSize = (id) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id
          ? { ...shape, size: Math.floor(Math.random() * 100) + 20 }//Şeklin Boyutunu değiştirir
          : shape
      )
    );
  };

  //useEffect Hook'u, her render sonrasında çalışan bir fonksiyonu temsil eder
  //useEffecti Hook'u Kullanarak belirli bir aralıkta dairelerin pozisyonlarını günceller. 
  //Eğer bir şeklin ekranın kenarına ulaşırsa, hızını tersine çevirerek yansıma efekti oluşturur.
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,//JavaScript'te spread operatörüdür ve bu ifade, şekile Ayarlanan Hız özellikleri Diğer Oluşturulan şekiler kopyalar ki diğer şekileri Aynı Hız Özellikleri Taşısın .
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
    }, 30);//Burda Dairenin Effecti Edilme Hızını 30 (MilliSanyide) Gerçekleşyor.

    return () => clearInterval(interval);//bileşenin güncellenmesi (unmount) durumunda, bu interval'ı temizlemek Kullandım.
  }, []);

  //JSX içinde Oluşturulan şeklin ekrana render eder ve onclick gibi . 
  return (
    <div className="anaclass">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`${shape.shape}`}//className prop'u, Daire adlı CSS sınıfını Şeklinin CSS sınıfı olarak belirlenmiş bir stil kuralları kümesi uygular ve her bir daireye bu stili ekler.
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          onClick={() => changeSize(shape.id)}//onclick Olayı Etkinleşiyor
        ></div>
      ))}
    </div>
  );
};
//Bileşeni Başka Yerden Çağırmak için export Ediyoruz
export default Karisik;
