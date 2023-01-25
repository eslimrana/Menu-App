import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Homepage from "./components/Home"
import Courses from "./components/Menu"
  
import './App.css';
import Ingredients from './components/Ingredients';
  
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" 
                        element={<Homepage/>} />
  
                    <Route exact path="/Menu" 
                        element={<Courses/>} />

                    <Route exact path="/Ingredients" 
                        element={<Ingredients/>} />
                </Routes>
            </Router>
        </>
    );
}
  
export default App;
