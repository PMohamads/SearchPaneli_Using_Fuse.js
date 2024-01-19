import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";//Particles ve initParticlesEngine Metotları tsparticles Kütüphanesinden Getirme
import { loadFull } from "tsparticles";
import "./particles.css";//particles z-indexi -1 olarak Ayarlama CSS Dosyasıdır.
import particlesOptions from "./particles.json";//json Formatında particles animasyon Dosyasıdır

//Burda React'ın Bileşen Adını Tanımlıyoruz
function ParticlesFirework() {
  const [init, setInit] = useState(false);

  useEffect(() => {//Program İlk render gerçleştiğinde Çalışacak Fonkisyon 
    if (init) {//Bu useEffect hook'u, init değeri false olduğunda çalışır ve parçacık animasyonunu başlatır
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);//Buraya da Animasyonları Ayarladıktan Sonra init true Ayarlanıyor
    });
  }, [init]);
//jsx içinde  
  return (
    <div>
      {init && <Particles options={particlesOptions} />//  init değeri true olduğunda <Particles /> bileşeni, yani parçacık animasyonu render edilir.
      }
    </div>
  );
}
//Bileşeni Başka Yerden Çağırmak için export Ediyoruz
export default ParticlesFirework;