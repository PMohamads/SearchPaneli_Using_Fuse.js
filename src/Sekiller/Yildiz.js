import React, { useState, useEffect } from 'react';
import './sekiller.css';//Yıldızın Özellikleri içinde Yazılan CSS Dosyası İçe Aktar

const Yildiz = () => {//Burda React'ın Bileşen Adını Tanımladım
  const [shapes, setShapes] = useState([]);//shapes adlı state Değişkeni,setShapes state Değikenini Ayarlamak için Kullanılan Fonkisyondur 

  //Burda Yıldızın Ana Özellikleri Ayarlanıyor (Sayısı,Hızı,Boyutu...)
  const createInitialShapes = () => {
    const initialShapes = [];
    const fixedSize =20;

    for (let i = 0; i < 50; i++) {
      initialShapes.push({//initialShapes Fonksiyonların ana tanımları yapılyor.
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
    setShapes(initialShapes);//React state hook'u olan setShapes fonksiyonunu kullanarak shapes adlı state değişkenini günceller
  };

  useEffect(() => {//Burda useEffect Hook'u Progamın ilk Render Edildiğinde (createInitialShapes) Bu Fonkisyonu Çalıştırır.
    createInitialShapes();
  }, []);

  //oluşturulan Yıldızın kendisinin Yok Olamsına  fonksiyonudur,
  //Bu Fonkisyon OnClick olayı gerçekleşince çalışır
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

  //useEffect Hook'u, her render sonrasında çalışan bir fonksiyonu temsil eder
  //useEffecti Hook'u Kullanarak belirli bir aralıkta Yıldızların pozisyonlarını günceller. 
  //Eğer bir Yıldız ekranın kenarına ulaşırsa, hızını tersine çevirerek yansıma efekti oluşturur.
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,//JavaScript'te spread operatörüdür ve bu ifade, Yıldıza Ayarlanan Hız özellikleri Diğer Oluşturulan Yıldızlara kopyalar ki diğer Yıldızları Aynı Hız Özellikleri Taşısın .
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
    }, 10);//Burda Dairenin Effecti Edilme Hızını 10(MilliSanyide) Gerçekleşyor.

    return () => clearInterval(interval);//bileşenin güncellenmesi (unmount) durumunda, bu interval'ı temizlemek Kullandım.
  }, []);

    //JSX içinde Oluşturulan Yıldızın ekrana render eder ve onclick gibi . 
  return (
    <div className="anaclass">
      {shapes.map((shape) =>
        shape.visible ? (
          <div
            key={shape.id}
            className={`${shape.shape}`}//className prop'u, star adlı CSS sınıfını Daire CSS sınıfı olarak belirlenmiş bir stil kuralları kümesi uygular ve her bir Yıldıza bu stili ekler.
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            onClick={() => onClickHandler(shape.id)}//onclick Olayı Etkinleşiyor
          ></div>
        ) : null
      )}
    </div>
  );
};
//Bileşeni Başka Yerden Çağırmak için export Ediyoruz
export default Yildiz;
