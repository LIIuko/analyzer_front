import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import AllProducts from "./components/AllProducts";
import Products from "./components/Products";
function App() {


  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={'auth'} element={<Auth/>} exact/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'/'} element={<AllProducts/>}/>
                <Route path={'/product/:id'} element={<Products/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
