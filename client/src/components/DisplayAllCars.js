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
            beforeFilter:[],
            restore:false,
            backup: [],
            usedFilters:[],
            lastFilter:"",
            brandUsed: false,
            genderUsed: false,
            sizeUsed: false,
            colorUsed: false,
            beforeFilter: []
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

        if (this.state.restore === false){

            this.setState({beforeFilter: this.state.selectedShoes});
            this.setState({restore: true});

        }

        const filterBy = e.target.value;
        console.log(filterBy)
        let filteredShoes;
        let usedFilters = this.state.usedFilters.slice();
        
        if (filterBy === "") {
            filteredShoes = this.state.shoes;
          } else if (usedFilters.includes(filterBy)) {
            
            usedFilters.splice(usedFilters.indexOf(filterBy), 1);

            // apply all the filters in the usedFilters array
  filteredShoes = this.state.shoes;

let brandCount = 0;
let genderCount = 0;
let colorCount = 0;
let sizeCount = 0;
console.log(1111)
console.log(usedFilters)
  usedFilters.forEach((filter) => {

    let brandFilteredShoes = this.state.shoes.filter((shoe) => shoe.brand === filter);
    let genderFilteredShoes = this.state.shoes.filter((shoe) => shoe.gender === filter);
    let sizeFilteredShoes = this.state.shoes.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
          return colorSizeObj.sizes.includes(filter);
        });
      });
      let colorFilteredShoes = this.state.shoes.filter((shoe) => 
      shoe.in_stock.some((variant) => 
          variant.color === filter
      )
  );

  //Add in if statements for concatting. If (count > 1) filter = filteredShoes.concat(xxx)
    if (brandFilteredShoes.length > 0){

        filteredShoes = filteredShoes.filter((shoe) => shoe.brand === filter);
        brandCount++;

    }else if (genderFilteredShoes.length > 0){

        filteredShoes = filteredShoes.filter((shoe) => shoe.gender === filter);
        genderCount++;

    }else if (sizeFilteredShoes.length > 0){

        filteredShoes = filteredShoes.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
            return colorSizeObj.sizes.includes(filter);
          });
        });
        sizeCount++;

    }else{

        filteredShoes = filteredShoes.filter((shoe) => shoe.in_stock.some((variant) => variant.color === filter))
        console.log(filteredShoes)
        colorCount++;
    }

  })

            //Change when these are set
            if (usedFilters.length < 1){

                this.setState({brandUsed: false})
                this.setState({genderUsed: false})
                this.setState({sizeUsed: false})
                this.setState({colorUsed: false})
    
            }

          } else {
            const brandFilteredShoes = this.state.shoes.filter((shoe) => shoe.brand === filterBy);
            const genderFilteredShoes = this.state.shoes.filter((shoe) => shoe.gender === filterBy);
            const sizeFilteredShoes = this.state.shoes.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
                  return colorSizeObj.sizes.includes(filterBy);
                });
              });
              const colorFilteredShoes = this.state.shoes.filter((shoe) => 
              shoe.in_stock.some((variant) => 
                  variant.color === filterBy
              )
          );

              console.log(sizeFilteredShoes)
            if (brandFilteredShoes.length > 0) {

                if (this.state.brandUsed === true){

                    filteredShoes = this.state.selectedShoes.concat(brandFilteredShoes);

                }else{
                    filteredShoes = this.state.selectedShoes.filter((shoe) => shoe.brand === filterBy);
                    this.setState({brandUsed: true})
                }
            } else if (colorFilteredShoes.length > 0){

                if (this.state.colorUsed === true){

                    filteredShoes = this.state.selectedShoes.concat(colorFilteredShoes);

                }else{
                    filteredShoes = this.state.selectedShoes.filter((shoe) => shoe.in_stock.some((variant) => variant.color === filterBy))
                    this.setState({colorUsed: true})
                }

            }
            else if (sizeFilteredShoes.length > 0){

                if (this.state.sizeUsed === true){

                    filteredShoes = this.state.selectedShoes.concat(sizeFilteredShoes);

                }else{
                    filteredShoes = this.state.selectedShoes.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
                        return colorSizeObj.sizes.includes(filterBy);
                      });
                    });
                    this.setState({sizeUsed: true})
                }

            }
             else {

                if (this.state.genderUsed === true){

                    filteredShoes = this.state.selectedShoes.concat(genderFilteredShoes);

                }else{
                    filteredShoes = this.state.selectedShoes.filter((shoe) => shoe.gender === filterBy);
                    this.setState({genderUsed: true})
                }

            }
            usedFilters.push(filterBy);
          }
        
        this.setState({
          filterBy: filterBy,
          selectedShoes: filteredShoes,
          usedFilters: usedFilters
        });
   
      };
      
    
      
      
      
      
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