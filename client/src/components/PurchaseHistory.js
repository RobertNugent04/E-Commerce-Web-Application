import React, { Component } from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import Filter from "./Filter"
import CarTable from "./CarTable"
import ShoeTableHistory from "./ShoeTableHistory"
import Logout from "./Logout"
import Search from "./Search"
import Sort from "./Sort"
import NavBar from "./NavBar"
import Footer from "./Footer"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants"


export default class DisplayAllCars extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shoes: [],
            searchBy: "name",
            attributes: ["name", "brand", "category", "price"],
            selectedShoes: [],
            sortBy: "name",
            sortSwitch: true,
            switchKey: "Asc ▲",
            saved: false,
            beforeFilter: [],
            restore: false,
            backup: [],
            usedFilters: [],
            lastFilter: "",
            brandUsed: false,
            genderUsed: false,
            sizeUsed: false,
            colorUsed: false,
            beforeFilter: []
        }
    }


    componentDidMount() {
        // this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/history/${this.props.match.params.email}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        // this.setState({
                        //     name: res.data.name,
                        //     brand: res.data.brand,
                        //     gender: res.data.gender,
                        //     category: res.data.category,
                        //     price: res.data.price,
                        //     items_left: res.data.items_left
                        // })
                        console.log(res.data)
                        console.log("Records read")
                        this.setState({
                            shoes: res.data,
                            selectedShoes: res.data
                        })
                    }
                }
                else {
                    console.log(`Record not found`)
                }
            })
    }


    handleSearchChange = e => {

        let x = this.state.searchBy

        if(this.state.saved === false){

            this.setState({backup: this.state.selectedShoes})
            this.setState({saved: true})

        }
        else{

        if (e.target.value === "") {

            this.setState({selectedShoes: this.state.backup})
            this.setState({saved: false})

        }
        else{
            this.setState({ selectedShoes: this.state.selectedShoes.filter(finder => finder.name.toUpperCase().includes(e.target.value.toUpperCase()) || finder.brand.toUpperCase().includes(e.target.value.toUpperCase()) || finder.category.toUpperCase().includes(e.target.value.toUpperCase()) || finder.gender.toUpperCase().includes(e.target.value.toUpperCase())) });
        }
    }}



    render() {
        return (
            <div className="form-container">
                <div class="navbar-container">
                    <NavBar />
                </div> <br /> <br /> <br /><center>

                {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                      <div>
                      <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange} />
                      {/* <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                      <Filter shoes={this.state.shoes} handleFilterChange={this.handleFilterChange} /> */}
                      {/* <Link className="red-button" to={"/ResetDatabase"}>Reset Users</Link>
                      <Link className="red-button" to={"/ResetShoes"}>Reset Shoes</Link> */}
                      <br /><br /><br /></div>
                    :
                        null
                }

                <div className="shoe-container">
                    <ShoeTableHistory cars={this.state.selectedShoes} />


                </div>
                </center>
                <Footer />
            </div>
        )
    }
}