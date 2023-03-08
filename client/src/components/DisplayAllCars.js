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
            brandUsed: false,
            genderUsed: false,
            sizeUsed: false,
            colorUsed: false,
            beforeFilter: [],
            updateFilters:true,
            filtered: []
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

    checkFilters = (brand,gender,size,color) =>{

        console.log(2222333)
        if (brand.length > 0){
            
            this.setState({brandUsed: true});
    
        }else if (gender.length > 0){
    
            this.setState({genderUsed: true});
    
        }else if (size.length > 0){
    
            this.setState({sizeUsed: true});
    
        }else if(color.length > 0){

            this.setState({colorUsed: true});
    
        }

    }

    handleFilterChange = (e) => {

        if (this.state.restore === false){

            this.setState({beforeFilter: this.state.selectedShoes});
            this.setState({restore: true});

        }

                this.setState({brandUsed: false})
                this.setState({genderUsed: false})
                this.setState({sizeUsed: false})
                this.setState({colorUsed: false})
    
            

        const filterBy = e.target.value;
        console.log(filterBy)
        let filteredShoes;
        let usedFilters = this.state.usedFilters.slice();
        
        this.setState({updateFilters: true})
        //If there are no filters, display all the shoes
        if (filterBy === "") {
            filteredShoes = this.state.shoes;

            //If the filter has already been applied then undo it
          } else if (usedFilters.includes(filterBy)) {

            usedFilters.splice(usedFilters.indexOf(filterBy), 1);

            console.log("Used Filters after splice: " + usedFilters)

            // apply all the filters in the usedFilters array
  filteredShoes = this.state.beforeFilter;

let brandConcat = false;
let genderConcat = false;
let colorConcat = false;
let sizeConcat = false;


//for each loop to apply filters
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

  //If there are brand filters to be applied...
    if (brandFilteredShoes.length > 0){

        if (brandConcat === true){

            filteredShoes = filteredShoes.concat(brandFilteredShoes);


        }
        else{

            filteredShoes = filteredShoes.filter((shoe) => shoe.brand === filter);
            brandConcat = true;

        }

    }else if (genderFilteredShoes.length > 0){

        if (genderConcat === true){

            filteredShoes = filteredShoes.concat(brandFilteredShoes);

        }
        else{

            filteredShoes = filteredShoes.filter((shoe) => shoe.gender === filter);
            genderConcat = true;

        }

    }else if (sizeFilteredShoes.length > 0){

        if (sizeConcat === true){

            filteredShoes = filteredShoes.concat(brandFilteredShoes);

        }
        else{
            

            filteredShoes = filteredShoes.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
                return colorSizeObj.sizes.includes(filter);
              });
            });
            sizeConcat = true;

        }

    }else{

        if (colorConcat === true){

            filteredShoes = this.state.selectedShoes.concat(brandFilteredShoes);

        }
        else{

        filteredShoes = filteredShoes.filter((shoe) => shoe.in_stock.some((variant) => variant.color === filter))
        console.log(filteredShoes)
        colorConcat = true;

        }
    }

  })

            //Else if the filter has not been applied yet
          } else {

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
            
                  //Call function to check if filters have been app;ied yet
                  this.checkFilters(brandFilteredShoes,genderFilteredShoes,sizeFilteredShoes,colorFilteredShoes);
            
              })

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

              console.log(this.state.genderUsed)
            if (brandFilteredShoes.length > 0) {

                if (this.state.brandUsed === true){

                    console.log(this.state.selectedShoes)
                    let concated = this.state.selectedShoes.concat(brandFilteredShoes);
                    filteredShoes = concated;

                    if (this.state.genderUsed || this.state.sizeUsed || this.state.colorUsed){
                    //Apply rest of filters to concatted data
let genderConcat = false;
let colorConcat = false;
let sizeConcat = false;

                    usedFilters.forEach((filter) => {

                        let genderFilteredShoes = concated.filter((shoe) => shoe.gender === filter);
                        console.log(genderFilteredShoes)
                        let sizeFilteredShoes = concated.filter((shoe) => {return shoe.in_stock.some((colorSizeObj) => {
                              return colorSizeObj.sizes.includes(filter);
                            });
                          });
                          let colorFilteredShoes = concated.filter((shoe) => 
                          shoe.in_stock.some((variant) => 
                              variant.color === filter
                          )
                      );
                        if (genderFilteredShoes.length > 0){
                    
                            if (genderConcat === true){
                    
                                //filteredShoes = concated.concat(genderFilteredShoes);
                    
                            }
                            else{
                    
                                filteredShoes = genderFilteredShoes
                                console.log(filteredShoes)
                                genderConcat = true;
                    
                            }
                    
                        }else if (sizeFilteredShoes.length > 0){
                    
                            if (sizeConcat === true){
                    
                                //filteredShoes = filteredShoes.concat(sizeFilteredShoes);
                    
                            }
                            else{
                                
                    
                                filteredShoes = sizeFilteredShoes
                                sizeConcat = true;
                    
                            }
                    
                        }else if(colorFilteredShoes.length > 0){
                    
                            if (colorConcat === true){
                    
                                //filteredShoes = filteredShoes.concat(colorFilteredShoes);
                    
                            }
                            else{
                    
                            filteredShoes = colorFilteredShoes;
                            colorConcat = true;
                    
                            }
                        }
                    })
                    console.log(filteredShoes)
                }
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
            console.log("Used Filters after filter: " + usedFilters)
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