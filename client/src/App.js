import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
import EditUser from "./components/EditUser"
import DeleteCar from "./components/DeleteCar"
import UserDelete from "./components/UserDelete"
import Home from "./components/Home"
import DisplayAllCars from "./components/DisplayAllCars"
import LoggedInRoute from "./components/LoggedInRoute"
import BuyShoe from "./components/BuyShoe"
import PayPalMessage from "./components/PayPalMessage"
import ProfilePage from "./components/ProfilePage"
import ContactUs from "./components/ContactUs"
import PurchaseHistory from "./components/PurchaseHistory"
import Cart from "./components/Cart"
import Product from "./components/Product"
import CartDelete from "./components/CartDelete"
import Users from "./components/Users"



import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.email = null
    localStorage.cart_item= 0
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/NavBar" component={NavBar} />
                    <Route exact path="/ContactUs" component={ContactUs} />
                    <Route exact path="/Cart" component={Cart} />
                    <Route exact path="/Product" component={Product} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />   
                    <Route exact path="/ResetShoes" component={ResetShoes} />               
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Login" component={Login} />
                    <LoggedInRoute exact path="/BuyShoe/:id" component={BuyShoe} />
                    <LoggedInRoute exact path="/PayPalMessage/:msessageType/:payPalPaymentID" component={PayPalMessage}/>   
                    <LoggedInRoute exact path="/Stock" component={Stock} />
                    <LoggedInRoute exact path="/Users" component={Users} />
                    <LoggedInRoute exact path="/ProfilePage" component={ProfilePage} />
                    <LoggedInRoute exact path="/Logout" component={Logout} />
                    <LoggedInRoute exact path="/AddCar" component={AddCar} />
                    <LoggedInRoute exact path="/EditCar/:id" component={EditCar} />
                    <LoggedInRoute exact path="/EditUser/:id" component={EditUser} />
                    <LoggedInRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <LoggedInRoute exact path="/UserDelete/:id" component={UserDelete} />
                    <LoggedInRoute exact path="/PurchaseHistory/:email" component={PurchaseHistory} />
                    <LoggedInRoute exact path="/CartDelete/:id/:amount" component={CartDelete} />

                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route exact path="/Home" component={Home}/> 
                    <Route path="*" component={Home}/> 
                    <Route exact path="/Footer" component={Footer} />
                </Switch>
            </BrowserRouter>
        )
    }
}