import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "./LinkInClass"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

import UserTable from "./UserTable"
import Login from "./Login"
import Logout from "./Logout"
import Search from "./Search"
import Sort from "./Sort"
import NavBar from "./NavBar"
import Footer from "./Footer"


export default class User extends Component
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            shoes:[],
            searchBy: "name",
            attributes: ["name"],
            selectedShoes: [],
            sortedShoes: [],
            sortBy: "name",
            sortSwitch: true,
            switchKey: "Asc ▲"
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/users`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log(res.data)
                    console.log("Records read")   
                    this.setState({shoes: res.data,
                                   selectedShoes: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }
    
        handleChange = e => {
        this.setState({ searchBy: e.target.value })
    }
    
//         handleSearchChange = e => {

//         let x = this.state.searchBy

//         if (!(e === "")) {

//             if(this.state.sortedShoes.length > 0){
//                 this.setState({ selectedShoes: this.state.sortedShoes.filter(finder => finder.name.toUpperCase().includes(e.toUpperCase()) || finder.email.toUpperCase().includes(e.toUpperCase())) });
//             }
//             else{
//             this.setState({ selectedShoes: this.state.shoes.filter(finder => finder.name.toUpperCase().includes(e.toUpperCase()) || finder.email.toUpperCase().includes(e.toUpperCase())) });
//             }
//         }
//         else{
//             if(this.state.sortedShoes.length > 0){
//             this.setState({ selectedShoes: this.state.sortedShoes })
//         }
//         else{
//             this.setState({ selectedShoes: this.state.shoes })
//         }

//     }
// }
    
        handleSortClick = e => {
        let sortDirection
        if (this.state.sortSwitch) {
            sortDirection = 1
            this.setState({ switchKey: "Desc ▼" })
        }
        else {
            sortDirection = -1
            this.setState({ switchKey: "Asc ▲" })
        }

        this.setState({ selectedShoes: this.state.selectedShoes.sort((a, b) => a[this.state.sortBy] < b[this.state.sortBy] ? -sortDirection : sortDirection) })
        this.setState({ sortSwitch: !this.state.sortSwitch })
        this.setState({sortedShoes: this.state.selectedShoes.sort((a, b) => a[this.state.sortBy] < b[this.state.sortBy] ? -sortDirection : sortDirection) })
    }
    
    
    handleSortChange = e => {
        this.setState({ sortBy: e.target.value })
    }
    
    render()
    {
        return (
                <div className="form-container">
                    <div class="navbar-container">
                        <NavBar/>
                    </div> <br/> <br/> <br/>
                
                    {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                                    null
                            :
                                    <div>
                                    <h1>Authentification Required!</h1>
                                    <p>Please Sign In!</p>
                                        <Link className="green-button" to={"/Login"}>Login</Link>
                                        <br/><br/><br/></div>
                    }
                
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                                    <div className="admin-controls"><center>
                                        <div className="search-sort">
                                    {/* <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange}/> */}
                                        <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                                        </div><br></br>
                                        {/* <Link className="blue-button" to={"/AddCar"}>Add New Shoe</Link> */}
                                        {/* <Link className="red-button" to={"/ResetDatabase"}>Reset Users</Link> */}
                                        {/* <Link className="red-button" to={"/ResetShoes"}>Reset Shoes</Link> */}
                                        </center></div>

                            :
                            null
                    }
                
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                                        <div className="table-container"><center>
                                            <UserTable cars={this.state.selectedShoes} />
                                            </center></div>

                            :
                            null
                    }
                
                    <Footer/>
                </div>
                )
    }
}


