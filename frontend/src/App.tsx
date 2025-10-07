
import './App.css'
import Header from "./Header/Header.tsx";
import Login from "./Pages/Login/Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Cookies from "js-cookie";
import {useState} from "react";
import PageNotFound from "./Pages/PageNotFound.tsx";
import CreateAccount from "./Pages/Login/CreateAccount.tsx";

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const connected = Cookies.get("token") !== undefined
    if (isConnected !== connected){
        setIsConnected(connected)
    }
    return (
        <div className="main_container">
            <Header username={"user"} picture={""} isConnected={isConnected}/>

            <div className="App">
                {!Cookies.get('token') ? (
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path="*" element={<Navigate to={"/login"}/>} />
                        <Route path="/create-account" element={<CreateAccount/>}/>
                    </Routes>
                ) : (

                    <Routes>
                        <Route path="/login" element={<Navigate to={"/home"}/>} />
                        <Route path="/" element={<Navigate to={"/home"}/>} />
                        <Route path="/home" element={<h1>Page Home</h1>} />
                        <Route path="*" element={<PageNotFound homepage={"/home"}/>} />
                    </Routes>

                )}
            </div>
        </div>
    )
}

export default App
