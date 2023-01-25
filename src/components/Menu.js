import {React,useState, Component} from 'react'
import "../App.css";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import menu from "../local-json/menu.json"

let sorted=menu.meals.sort(
    (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0); 
let meals_toShow=sorted
let meals_toShow2=sorted

function Menu() {   
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [real_meals,setMeals]=useState(sorted)
    const handleChange = (e) => {
        setSearchInput(e.target.value)
        meals_toShow2=sorted.filter((meal_ind) => {
            return meal_ind.id.toString().match(e.target.value);
        });
        setMeals(meals_toShow2)
    };

    const handleFilter=(e)=>{
        meals_toShow=[]
        if(e.currentTarget.value=="Vegan"){
            sorted.forEach(element => {
                
                var count=0
                for(var i=0;i<element.ingredients.length;i++){
                    
                    for(var j=0;j<menu.ingredients.length;j++){
                        
                        if(menu.ingredients[j].name==element.ingredients[i].name){
                            for(var k=0;k<menu.ingredients[j].groups.length;k++){
                                
                                if(menu.ingredients[j].groups[k]=="vegan"){
                                    count++
                                }
                            }
                        }
                    }
                }
                
                if(count==element.ingredients.length){
                    meals_toShow.push(element)
                }
            });
        }
        if(e.currentTarget.value=="Vegetarian"){
            sorted.forEach(element => {
                var count=0
                for(var i=0;i<element.ingredients.length;i++){
                    for(var j=0;j<menu.ingredients.length;j++){
                        if(menu.ingredients[j].name==element.ingredients[i].name){
                            for(var k=0;k<menu.ingredients[j].groups.length;k++){
                                if(menu.ingredients[j].groups[k]=="vegetarian"){
                                    count++
                                }
                            }
                        }
                    }
                }
                if(count==element.ingredients.length){
                    meals_toShow.push(element)
                }
            });
        }
        if(e.currentTarget.value=="All"){
            sorted.forEach(element => {
                meals_toShow.push(element)
            });
        }
        setMeals(meals_toShow)
    }
    return (
        <div style={{textAlign:"center"}}>
            <div style={{textAlign:"center",marginTop:0,paddingTop:0}}>
                <h1 style={{fontFamily:"didot"}}>Menu </h1>
                <div className="container">
                    <div className='filter'>
                        <p style={{fontSize:17,fontWeight:"bold"}}>Filter:</p>
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" name="1" value="Vegan" onChange={handleFilter}/>
                                Vegan
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="1" value="Vegetarian" onChange={handleFilter}/>
                                Vegetarian
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" name="1" value="All" onChange={handleFilter}/>
                                All
                            </label>
                            </div>
                        </form>
                    </div>
                    <div className='search'>
                        <label style={{fontSize:17,fontWeight:"bold"}}>Search with ID:</label>
                        <input
                        style={{marginBottom:"20px", marginTop:"13px"}}
                            type="text"
                            placeholder="Search here"
                            onChange={handleChange}
                            value={searchInput}
                        />
                    </div>
                    
                    </div>
                    <div style={{marginTop:0,marginBottom:0, padding:0, alignItems:'center',textAlign:'center',marginLeft:200, marginRight:250}}>
                        {real_meals && real_meals.map(({id, name, ingredients})=>(

                            <div className='meals' key={id}>
                                <p>{name}</p>
                                <p className='hoverting'>{"ID: "+id}</p>
                                <div className='hoverting'>
                                <p>Ingredients</p>
                                {ingredients && ingredients.map(({name, quantity, quantity_type})=>(

                                    <div key={id}>
                                        <p>{name+": "+quantity+ " "+quantity_type}</p>
                                    </div>
                                ))}
                                </div>
                                <button className='hoverting' onClick={()=>navigate("/Ingredients", {state:{name2: name, ingredient_list: ingredients}})} style={{margin:20, paddingLeft:20,paddingRight:20,borderRadius:"20px", textAlign:"center",fontSize:12,backgroundColor:"#5783db",boxShadow:"0px 3px 4px #5783db",borderStyle:"none",color:"white"}}>Select the Qualities</button>
                            </div>
                            
                        ))}
                    </div>
            </div>
            <button onClick={()=>navigate("/")} style={{marginTop:20,marginBottom:20,marginLeft:53, paddingLeft:20,paddingRight:20,paddingTop:20,paddingBottom:20,borderRadius:"20px", textAlign:"center",fontSize:12,backgroundColor:"white",boxShadow:"0px 3px 4px lightgray",borderStyle:"none",color:"black",fontSize:"20px",}}>
                Back to Home
            </button>
        </div>
    )
}
  
export default Menu

