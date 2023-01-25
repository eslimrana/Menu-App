import React from 'react'
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
    const navigate = useNavigate();
  
    return (
        <div style={{width: "100%", backgroundSize: "cover", height: "100vh",marginTop:0,paddingTop:0,textAlign:"center"}}>
                <h1 style={{fontSize:80,marginTop:0,paddingTop:60,fontFamily:"didot"}}>Welcome To <br/> Otsimo Restaurant</h1>
                <p >
                    <button
                        className='button'
                        onClick={()=>navigate("/Menu")}>Press to see the menu
                    </button>
                </p>
  
            </div>
    )
}
  
export default Home
