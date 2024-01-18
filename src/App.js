import SideBar from "./SideBar";
import SearchComponent from "./fusee";

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