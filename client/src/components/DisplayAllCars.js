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
            selectedGenders: [],
            selectedCategories: [],
            filteredShoes: [],
            sortedShoes: []
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

        if (e === "") {

            if(this.state.filteredShoes.length > 0){
            this.setState({ selectedShoes: this.state.filteredShoes})
            }else if(this.state.sortedShoes.length > 0){
                this.setState({ selectedShoes: this.state.sortedShoes})
            }else{
                this.setState({ selectedShoes: this.state.shoes })
            }
        }

        else{
            if(this.state.filteredShoes.length > 0){
                this.setState({ selectedShoes: this.state.filteredShoes.filter(finder => finder.name.toUpperCase().includes(e.toUpperCase()) || finder.brand.toUpperCase().includes(e.toUpperCase()) || finder.category.toUpperCase().includes(e.toUpperCase()) || finder.gender.toUpperCase().includes(e.toUpperCase()) || finder.color.toUpperCase().includes(e.toUpperCase())) });
                }else if(this.state.sortedShoes.length > 0){
                    this.setState({ selectedShoes: this.state.sortedShoes.filter(finder => finder.name.toUpperCase().includes(e.toUpperCase()) || finder.brand.toUpperCase().includes(e.toUpperCase()) || finder.category.toUpperCase().includes(e.toUpperCase()) || finder.gender.toUpperCase().includes(e.toUpperCase()) || finder.color.toUpperCase().includes(e.toUpperCase())) });
                }else{
                    this.setState({ selectedShoes: this.state.shoes.filter(finder => finder.name.toUpperCase().includes(e.toUpperCase()) || finder.brand.toUpperCase().includes(e.toUpperCase()) || finder.category.toUpperCase().includes(e.toUpperCase()) || finder.gender.toUpperCase().includes(e.toUpperCase()) || finder.color.toUpperCase().includes(e.toUpperCase())) });
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
        this.setState({ sortedShoes: this.state.selectedShoes.sort((a, b) => a[this.state.sortBy] < b[this.state.sortBy] ? -sortDirection : sortDirection) })
    }


    handleSortChange = e => {
        this.setState({ sortBy: e.target.value })
    }

    handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        const isChecked = e.target.checked;
        const { selectedBrands, selectedColors, selectedGenders, selectedCategories } = this.state;

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
        } else if (e.target.name === "categories") {
            if (isChecked) {
                const updatedCategories = [...selectedCategories, selectedValue];
                this.setState({ selectedCategories: updatedCategories }, this.applyFilters);
            } else {
                const unfilteredCategories = selectedCategories.filter((category) => category !== selectedValue);
                this.setState({ selectedCategories: unfilteredCategories }, this.applyFilters);
            }
        }
    }

    applyFilters = () => {
        const { selectedBrands, selectedColors, selectedGenders, selectedCategories } = this.state;
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

        if (selectedCategories.length > 0) {
            filteredShoes = filteredShoes.filter(shoe => selectedCategories.includes(shoe.category));
        }

        this.setState({ selectedShoes: filteredShoes });
        this.setState({ filteredShoes: filteredShoes });
      }
      
    render() {
        return (
            <div className="form-container">
                <div class="navbar-container">
                    <NavBar />
                </div> <br /> <br /> <br />
                <div className="superContainer">
                    <div className="controls">
 
                            <div>
                                <br /> <br />
                                <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange} />
                                <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                                <br></br>
                                <div>
                                    <Filter shoes={this.state.shoes} handleFilterChange={this.handleFilterChange} />
                                </div>
                                <br /></div>


                        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                            <div className="stock">
                                <Link className="blue-button" to={"/AddCar"}>Add New Shoe</Link><br /><br /><br />
                                <Link className="blue-button" to={"/Stock"}>View Stock Table</Link>
                            </div>

                            :
                            null
                        }
                        <br></br>
                    </div>


                    <div className="controlsMobile"><center>
                    
                            <div>
                                <div className="search-sort">
                                    <Search handleSearchChange={this.handleSearchChange} handleChange={this.handleChange} />
                                    <Sort sortSwitch={this.state.sortSwitch} switchKey={this.state.switchKey} handleSortChange={this.handleSortChange} handleSortClick={this.handleSortClick} sortColumn={this.state.attributes} />
                                </div><br></br>
                                <br /></div>

                        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                            <div className="stock">
                                <Link className="blue-button" to={"/AddCar"}>Add New Shoe</Link>
                                <Link className="blue-button" to={"/Stock"}>View Stock Table</Link>
                            </div>

                            :
                            null
                        }
                        <br></br>
                        </center></div>


                    <div className="shoe-container">
                        <ShoeTable cars={this.state.selectedShoes} />


                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}