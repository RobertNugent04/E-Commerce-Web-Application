import React, { Component } from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import Filter from "./Filter"
import CarTable from "./CarTable"
import ShoeTable from "./ShoeTable"
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
            filters: [],
            selectedBrands: [],
            selectedColors:[],
            selectedGenders: []
        }
    }


    componentDidMount() {
        axios.get(`${SERVER_HOST}/cars`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Records read")
                        this.setState({
                            shoes: res.data,
                            selectedShoes: res.data
                        })
                    }
                }
                else {
                    console.log("Record not found")
                }
            })
    }

    handleChange = e => {
        this.setState({ searchBy: e.target.value })
    }

    // beforeSearch = e =>{

    //   if (this.state.undo === true){
    //     this.setState({backup: this.state.selectedShoes})
    //     console.log(this.state.backup)
    //   }

    //   this.setState({undo: false})
    //   this.handleSearchChange()

    // }

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
    }

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

    handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        const isChecked = e.target.checked;
        const { selectedBrands, selectedColors, selectedGenders } = this.state;
    
        if (e.target.name === "brands") {
          if (isChecked) {
            const updatedBrands = [...selectedBrands, selectedValue];
            this.setState({ selectedBrands: updatedBrands }, this.applyFilters);
          } else {
            const unfilteredBrands = selectedBrands.filter((brand) => brand !== selectedValue);
            this.setState({ selectedBrands: unfilteredBrands }, this.applyFilters);
          }
        } else if (e.target.name === "colors") {
          if (isChecked) {
            const updatedColors = [...selectedColors, selectedValue];
            this.setState({ selectedColors: updatedColors }, this.applyFilters);
          } else {
            const unfilteredColors = selectedColors.filter((color) => color !== selectedValue);
            this.setState({ selectedColors: unfilteredColors }, this.applyFilters);
          }
        } else if (e.target.name === "genders") {
            if (isChecked) {
              const updatedGenders = [...selectedGenders, selectedValue];
              this.setState({ selectedGenders: updatedGenders }, this.applyFilters);
            } else {
              const unfilteredGenders = selectedGenders.filter((gender) => gender !== selectedValue);
              this.setState({ selectedGenders: unfilteredGenders }, this.applyFilters);
            }
          }
      }
    
      applyFilters = () => {
        const { selectedBrands, selectedColors, selectedGenders } = this.state;
        let filteredShoes = [...this.state.shoes];
    
        if (selectedBrands.length > 0) {
          filteredShoes = filteredShoes.filter(shoe => selectedBrands.includes(shoe.brand));
        }
    
        if (selectedColors.length > 0) {
          filteredShoes = filteredShoes.filter(shoe => selectedColors.includes(shoe.color));
        }

        if (selectedGenders.length > 0) {
            filteredShoes = filteredShoes.filter(shoe => selectedGenders.includes(shoe.gender));
          }
    
        this.setState({ selectedShoes: filteredShoes });
      }
      
    render() {
        return (
            <div className="form-container">
                <div class="navbar-container">
                    <NavBar />
                </div> <br /> <br /> <br />

                {localStorage.accessLevel > ACCESS_LEVEL_GUEST ?
                    <div>
                    <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange} />
                    <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                    <Filter shoes ={this.state.shoes} handleFilterChange={this.handleFilterChange}/>
                    <Link className="red-button" to={"/ResetDatabase"}>Reset Users</Link>
                    <Link className="red-button" to={"/ResetShoes"}>Reset Shoes</Link> 
                    <br /><br /><br /></div>
                    :
                    null
                }

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="add-new-car">
                        <Link className="blue-button" to={"/AddCar"}>Add New Shoe</Link>
                    </div>

                    :
                    null
                }
                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="stock">
                        <Link className="blue-button" to={"/Stock"}>View Stock Table</Link>
                    </div>

                    :
                        null
                    }
                
                <div className="shoe-container">
                    <ShoeTable cars={this.state.selectedShoes} />


                </div>
                <Footer />
            </div>
        )
    }
}