import React, { useState, useEffect } from 'react';
import './sekiller.css';//Kare Özellikleri içinde Yazılan CSS Dosyası İçe Aktar

const Kare = () => {//Burda React'ın Bileşen Adını Tanımladım
  const [shapes, setShapes] = useState([]);//shapes adlı state Değişkeni,setShapes state Değikenini Ayarlamak için Kullanılan Fonkisyondur 

  //Burda Karenın Ana Özellikleri Ayarlanıyor (Sayısı,Hızı,Boyutu...)
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
        shape: 'Kare', 
      });
    }
    setShapes(initialShapes);//React state hook'u olan setShapes fonksiyonunu kullanarak shapes adlı state değişkenini günceller
  };

  useEffect(() => {//Burda useEffect Hook'u Progamın ilk Render Edildiğinde (createInitialShapes) Bu Fonkisyonu Çalıştırır.
    createInitialShapes();
  }, []);

  //oluşturulan Karenın kendisinin boyutunu ve Hareket Hızını Rastgele Bir Şekilde değiştiren fonksiyonudur,
  //Bu Fonkisyon OnClick olayı gerçekleşince çalışır
  const changeSize = (id) => {
    setShapes((prevShapes) => {
      const updatedShapes = prevShapes.map((shape) =>
        shape.id === id
          ? [
              { ...shape, size: Math.floor(Math.random() * 100) + 20 },
              {
                ...shape,
                id: prevShapes.length,
                x: shape.x + 10, 
                y: shape.y + 10, 
              },
            ]
          : shape
      );
      return [].concat(...updatedShapes);
    });
  };

    //useEffect Hook'u, her render sonrasında çalışan bir fonksiyonu temsil eder
  //useEffecti Hook'u Kullanarak belirli bir aralıkta Karelerın pozisyonlarını günceller. 
  //Eğer bir Kare ekranın kenarına ulaşırsa, hızını tersine çevirerek yansıma efekti oluşturur.
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,//JavaScript'te spread operatörüdür ve bu ifade, Kareye Ayarlanan Hız özellikleri Diğer Oluşturulan Karelere kopyalar ki diğer Karelerı Aynı Hız Özellikleri Taşısın .
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
    }, 30);//Burda Karenın Effecti Edilme Hızını 30(MilliSanyide Gerçekleşyor)

    return () => clearInterval(interval);//bileşenin güncellenmesi (unmount) durumunda, bu interval'ı temizlemek Kullandım.
  }, []);

    //JSX içinde Oluşturulan Karenın ekrana render eder ve onclick gibi . 
  return (
    <div className="anaclass">
      {shapes
        .filter((shape) => shape.shape === 'Kare') 
        .map((shape) => (
          <div
            key={shape.id}
            className={`${shape.shape}`}//className prop'u, Kare adlı CSS sınıfını Daire CSS sınıfı olarak belirlenmiş bir stil kuralları kümesi uygular ve her bir Kareye bu stili ekler.
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
export default Kare;
