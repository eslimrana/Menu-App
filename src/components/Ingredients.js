import {React,useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import menu from "../local-json/menu.json";

function Ingredients() {
    const location=useLocation();
    const[price, setPrice]=useState(0);
    const [quality, setQuality]=useState(0);
    let [map2,setMap2]=useState(new Map())
    let sum=0;
    let price_tot=0
    const navigate = useNavigate();
    const handleChange=(e)=> {
        
        map2.set(e.currentTarget.name, {val: e.currentTarget.value, p:e.currentTarget.id})
        sum=0
        price_tot=0
        for (let [key, value] of map2) {
            console.log(value);
            if(value.val=="Low"){
                sum=(sum+10)
            }
            else if(value.val=="Medium"){
                sum=(sum+20)
            }
            else if(value.val=="High"){
                sum=(sum+30)
            }
            for(var i=0;i<menu.ingredients.length;i++){
                if(menu.ingredients[i].name==key){
                    if(value.val=="Low"){
                        price_tot=0.10+price_tot+menu.ingredients[i].options[2].price*(value.p/1000)
                    }
                    if(value.val=="Medium"){
                        price_tot=0.05+price_tot+menu.ingredients[i].options[1].price*(value.p/1000)
                    }
                    if(value.val=="High"){
                        price_tot=price_tot+menu.ingredients[i].options[0].price*(value.p/1000)
                    }
                }
            }
        } 
        setQuality((sum/location.state.ingredient_list.length).toFixed(1))  
        setPrice(price_tot.toFixed(2))
    }

    return (
        <div style={{marginTop:0,marginBottom:0, padding:0, alignItems:'center',textAlign:'center',marginLeft:200, marginRight:250}}>
                <h1 style={{fontFamily:"didot",marginLeft:100}}>{location.state.name2}</h1>
                <p style={{fontFamily:"didot",marginLeft:100}}>{"Quality Score: "+quality}</p>
                <p style={{fontFamily:"didot",marginLeft:100}}>{"Price: "+price+"$"}</p>
                {location.state.ingredient_list && location.state.ingredient_list.map(({name, quantity, quantity_type})=>(
                    
                <div className='meals2'>
                    <p style={{fontWeight:"bold",}}>{name}</p>
                    <p>{quantity+" "+quantity_type}</p>
                    
                    <div className="container">
                        <div className="row">
                            <div style={{marginBottom:20}}>
                            <form>
                                <div className="radio">
                                <label>
                                    <input type="radio" id={quantity} name={name} value={"Low"} onChange={handleChange}/>
                                    Low
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" id={quantity} name={name} value={"Medium"} onChange={handleChange}/>
                                    Medium
                                </label>
                                </div>
                                <div className="radio">
                                <label>
                                    <input type="radio" id={quantity} name={name} value={"High"} onChange={handleChange}/>
                                    High
                                </label>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                </div>
                ))}
               <button onClick={()=>navigate("/Menu")} style={{fontFamily:"didot",marginTop:20,marginBottom:20,marginLeft:100, paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:20,borderRadius:"20px", textAlign:"center",fontSize:12,backgroundColor:"white",boxShadow:"0px 3px 4px lightgray",borderStyle:"none",color:"black",fontSize:"20px"}}>Back To Menu
                </button> 
        </div>
    )
}
  
export default Ingredients