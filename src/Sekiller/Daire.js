import React, { useState, useEffect } from 'react';
import './sekiller.css';//Dairenin Özellikleri içinde Yazılan CSS Dosyası İçe Aktar

const Daire = () => {//Burda React'ın Bileşen Adını Tanımladım
  const [shapes, setShapes] = useState([]);//shapes adlı state Değişkeni,setShapes state Değikenini Ayarlamak için Kullanılan Fonkisyondur 

//Burda Dairenin Ana Özellikleri Ayarlanıyor (Sayısı,Hızı,Boyutu...)
  const createInitialShapes = () => {
    const initialShapes = [];
    for (let i = 0; i < 25; i++) {
      initialShapes.push({
      daire: i,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        size: Math.floor(Math.random() * 100) + 70,
        xSpeed: Math.random() * 4 - 2,
        ySpeed: Math.random() * 4 - 2,
        shape: 'Daire', 
      });
    }
    setShapes(initialShapes);//React state hook'u olan setShapes fonksiyonunu kullanarak shapes adlı state değişkenini günceller
  };

  useEffect(() => {//Burda useEffect Hook'u Progamın ilk Render Edildiğinde (createInitialShapes) Bu Fonkisyonu Çalıştırır.
    createInitialShapes();
  }, []);

  //oluşturulan daireinin kendisinin boyutunu ve Hareket Hızını Rastgele Bir Şekilde değiştiren fonksiyonudur,
  //Bu Fonkisyon OnClick olayı gerçekleşince çalışır
  const changeSize = (daire) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.daire === daire
          ? { ...shape, 
            xSpeed: Math.random() * 8 ,//dikey hızını değiştirir
            ySpeed: Math.random() * 6, //yatay hızını değiştirir
            size: Math.round(Math.random() * 120) + 150 }//Dairenin Boyutunu değiştirir
          : shape
      )
    );
  };
  //useEffect Hook'u, her render sonrasında çalışan bir fonksiyonu temsil eder
  //useEffecti Hook'u Kullanarak belirli bir aralıkta dairelerin pozisyonlarını günceller. 
  //Eğer bir daire ekranın kenarına ulaşırsa, hızını tersine çevirerek yansıma efekti oluşturur.
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => ({
          ...shape,//JavaScript'te spread operatörüdür ve bu ifade, Daireye Ayarlanan Hız özellikleri Diğer Oluşturulan Daireler kopyalar ki diğer Daireleri Aynı Hız Özellikleri Taşısın .
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
    },15);//Burda Dairenin Effecti Edilme Hızını 15(MilliSanyide Gerçekleşyor)

    return () => clearInterval(interval);//bileşenin güncellenmesi (unmount) durumunda, bu interval'ı temizlemek Kullandım.
  }, []);


  //JSX içinde Oluşturulan Dairenin ekrana render eder ve onclick gibi . 
  return (
    <div className="anaclass">
      {shapes.map((shape) => (
        <div
          key={shape.daire}
          className={`${shape.shape}`}//className prop'u, Daire adlı CSS sınıfını Daire CSS sınıfı olarak belirlenmiş bir stil kuralları kümesi uygular ve her bir daireye bu stili ekler.
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          onClick={() => changeSize(shape.daire)}//onclick Olayı Etkinleşiyor
        ></div>
      ))}
    </div>
  );
};
//Bileşeni Başka Yerden Çağırmak için export Ediyoruz
export default Daire;
