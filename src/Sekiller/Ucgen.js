import React, { useState, useEffect } from 'react';
import './sekiller.css';//Üçgen Özellikleri içinde Yazılan CSS Dosyası İçe Aktar

const Ucgen = () => {//Burda React'ın Bileşen Adını Tanımladım
 
  const [shapes, setShapes] = useState([]);//shapes adlı state Değişkeni,setShapes state Değikenini Ayarlamak için Kullanılan Fonkisyondur 

  //Burda Üçgenin Ana Özellikleri Ayarlanıyor (Sayısı,Hızı,Boyutu...)
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
    setShapes(initialShapes);//React state hook'u olan setShapes fonksiyonunu kullanarak shapes adlı state değişkenini günceller
  };

  useEffect(() => {//Burda useEffect Hook'u Progamın ilk Render Edildiğinde (createInitialShapes) Bu Fonkisyonu Çalıştırır.
    createInitialShapes();
  }, []);

  //oluşturulan Üçgenin kendisinin Hareket Hızını Rastgele Bir Şekilde değiştiren fonksiyonudur,
  //Bu Fonkisyon OnClick olayı gerçekleşince çalışır
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


  //useEffect Hook'u, her render sonrasında çalışan bir fonksiyonu temsil eder
  //useEffecti Hook'u Kullanarak belirli bir aralıkta Üçgenlerin pozisyonlarını günceller. 
  //Eğer bir Üçgen ekranın kenarına ulaşırsa, hızını tersine çevirerek yansıma efekti oluşturur.
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,//JavaScript'te spread operatörüdür ve bu ifade, Üçgene Ayarlanan Hız özellikleri Diğer Oluşturulan Üçgenlere kopyalar ki diğer Üçgenleri Aynı Hız Özellikleri Taşısın .
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
    return () => clearInterval(interval);//bileşenin güncellenmesi (unmount) durumunda, bu interval'ı temizlemek Kullandım.
  }, []); 

   //JSX içinde Oluşturulan Üçgenin ekrana render eder ve onclick gibi . 
  return (
    <div className="anaclass">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`${shape.shape}`}//className prop'u, Üçgen adlı CSS sınıfını Daire CSS sınıfı olarak belirlenmiş bir stil kuralları kümesi uygular ve her bir Üçgene bu stili ekler.
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          onClick={() => changeSpeed(shape.id)}//onclick Olayı Etkinleşiyor
        ></div>
      ))}
    </div>
  );
};
//Bileşeni Başka Yerden Çağırmak için export Ediyoruz
export default Ucgen;
