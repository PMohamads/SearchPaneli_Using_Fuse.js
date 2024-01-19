import SideBar from "./SideBar";//Yan Menü Şekilleri Seçmek İçin SideBar bileşeni Getiryor
import SearchComponent from "./fusee";//Arama işlemi Yapan SearchComponent bileşeni Getiryor

//Burda Programızın Ana Bileşeni Render Edilir
function App() {
    return (
         <div className="app-container">
         <div>
           <SideBar/>
           <div className="search-container">
             <SearchComponent />
           </div>
         </div>
       </div>
    );
}

export default App;