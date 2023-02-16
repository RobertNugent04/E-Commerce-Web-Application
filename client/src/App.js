import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import ResetShoes from "./components/ResetShoes"
import Login from "./components/Login"
import Stock from "./components/Stock"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/NavBar" component={NavBar} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />   
                    <Route exact path="/ResetShoes" component={ResetShoes} />                 
                    <Route exact path="/" component={DisplayAllCars} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/Stock" component={Stock} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route path="*" component={DisplayAllCars}/> 
                    <Route exact path="/Footer" component={Footer} />
                </Switch>
            </BrowserRouter>
        )
    }
}