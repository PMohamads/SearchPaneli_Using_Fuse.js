import React,{useState} from "react";
import './SideBar.css';//yanMenü Oluşturan CSS Özelliklerin CSS Dosyasıdırç
import Karisik from "./Sekiller/Karisik";
import Daire from "./Sekiller/Daire";
import Kare from "./Sekiller/Kare"
import Ucgen from "./Sekiller/Ucgen"
import Yildiz from "./Sekiller/Yildiz";
import ParticlesFirework from "./Sekiller/particles";
import Parallax from "./Sekiller/paralellik";
//import MoviesComponent from "./printthedata";
//import MoviesComponent from "./getdatacompenent";
//import PresidentsComponent from "./presedent";


//Bu bileşeni, bir yan menü (sidebar) ve seçilen bir seçeneğe göre değişen ana içerik alanından oluşmaktadır.
const SideBar = () => {
    const [secilensecenek,secilensecenekayarla] = useState(null);//state fonksiyonu
    const [sidebarGizle, SidebarAyarla] = useState(true);//state fonksiyonu
    const Ayarla = (secenek) => {secilensecenekayarla(secenek)};//Ayarla fonksiyonu, tıklanan seçeneği secilensecenek state'ine set etmek için kullanılır.
    const toggleSidebar = () => {SidebarAyarla(!sidebarGizle);};// fonksiyonu, yan menünün görünürlüğünü değiştirmek için kullanılır.Yan menü ve içerik bölümü, CSS sınıfları ve koşullu renderlama kullanılarak kontrol edilir.
    return (
        <>
        {!sidebarGizle && (           
        <button className="toggle-sidebar-button" onClick={toggleSidebar}>
            <span class="material-symbols-outlined">
                widgets
            </span>           
         </button>
         )}
            <div className={`sidebar ${sidebarGizle ? 'visible' : 'hidden'}`}>
                <button onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">
                    widgets
                    </span>
                </button>
                <ul>
                    <li onClick={() => Ayarla('A')}>
                        <span className="daire">
                            <span className="material-symbols-outlined">
                            circle                            
                            </span>  
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Daireler
                        </span>
                    </li>
                    <li onClick={() => Ayarla('B')}>
                        <span className="ucgen">
                            <span className="material-symbols-outlined">
                                change_history
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Üçgenler
                        </span>
                    </li>
                    <li onClick={() => Ayarla('C')}>
                    <span className="kare">
                        <span className="material-symbols-outlined">
                            crop_square
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kareler
                        </span>
                    </li>
                    <li onClick={() => Ayarla('E')}>
                    <span className="yildiz">
                        <span className="material-symbols-outlined">
                            star
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yıldız
                        </span>
                    </li>
                    <li onClick={() => Ayarla('F')}>
                    <span className="web">
                        <span class="material-symbols-outlined">
                            device_hub
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Web Network
                        </span>
                    </li>
                    <li onClick={() => Ayarla('G')}>
                    <span className="parallex">
                        <span class="material-symbols-outlined" > 
                            diversity_2
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parallex
                        </span>
                    </li>
                    
                    <li onClick={() => Ayarla('D')}>
                    <span className="karisik">
                        <span className="material-symbols-outlined">
                            category
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Karıştır
                        </span>
                    </li>
                    
                </ul>
            </div>
            <div className="main-content">
                {secilensecenek === 'A' && <Daire />}
                {secilensecenek === 'B' && <Ucgen />}
                {secilensecenek === 'C' && <Kare />}
                {secilensecenek === 'D' && <Karisik/>} 
                {secilensecenek === 'E' && <Yildiz/>}
                {secilensecenek === 'F' && <ParticlesFirework/>}
                {secilensecenek === 'G' && <Parallax/>}
            </div>
        </>
    );
}

//Bileşeni App Sayfasında Çağırmak için export Ediyoruz
export default SideBar;