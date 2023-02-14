import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CarTable from "./CarTable"
import Logout from "./Logout"
import Search from "./Search"
import Sort from "./Sort"
import NavBar from "./NavBar"
import Footer from "./Footer"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class DisplayAllCars extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            shoes:[],
            searchBy: "name",
            attributes: ["name", "brand", "category", "price"],
            selectedShoes: [],
            sortBy: "name",
            sortSwitch: true,
            switchKey: "Asc ▲"
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/cars`)
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
    
        handleSearchChange = e => {

        let x = this.state.searchBy

        if (!(e.target.value === "")) {

          
            this.setState({ selectedShoes: this.state.selectedShoes.filter(finder => finder.name.toUpperCase().includes(e.target.value.toUpperCase()) || finder.brand.toUpperCase().includes(e.target.value.toUpperCase()) || finder.category.toUpperCase().includes(e.target.value.toUpperCase())|| finder.gender.toUpperCase().includes(e.target.value.toUpperCase())) });
        }
        else
            this.setState({ selectedShoes: this.state.shoes })

    }
    
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
                    <div className="logout">
                        <Logout/>
                    </div>
                :
                    <div>
            <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange}/>
            <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>  
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link> 
                        <Link className="red-button" to={"/ResetShoes"}>Reset Shoes</Link> <br/><br/><br/></div>
                }
                
                <div className="table-container">
                    <CarTable cars={this.state.selectedShoes} /> 
                        
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                        <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
                        </div>
                    :
                        null
                    }
                </div>
                <Footer/>
            </div> 
        )
    }
}