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

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoe: {},
      size:null
    };
  }

  componentDidMount() {
    const shoeID = this.props.location.search.slice(8);
    axios.get(`${SERVER_HOST}/cars/${shoeID}`,{headers:{"authorization":localStorage.token}})
        .then(res => {
            if (res.data) {
                if (res.data.errorMessage) {
                    console.log(res.data.errorMessage)
                }
                else {
                    console.log("Records read")
                    this.setState({
                        shoe: res.data,
                    })
                }
            }
            else {
                console.log("Record not found")
            }
        })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  
    const shoeID = this.props.location.search.slice(8)
    const name = this.state.shoe.name;
    const imageURL = "insertImage";
    const price = this.state.shoe.price;
    const size = this.state.size;
    console.log(this.state.shoe)
  
    axios.post(`${SERVER_HOST}/cart/${shoeID}/${name}/${price}/${size}/`, {
      size: this.state.size // Pass the selected size to the server
    })
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Shoe Added to Cart Successfully")
  
            localStorage.shoeID = res.data.shoeID
            localStorage.name = res.data.name
            localStorage.imageURL = res.data.imageURL
            localStorage.price = res.data.price;
            localStorage.size = this.state.size;
          }
        } else {
          console.log("Add to cart failed")
        }
      })
  }
  
  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  render() {
    const shoe = this.state.shoe
    const sizes = shoe.sizes ? shoe.sizes.map(size => {
      return size; // return the original size value (this is not necessary but can be useful in some cases)
    }) : [];

console.log(this.state.shoe)

    return (

      <div>
                            <div class="navbar-container">
                        <NavBar />
                    </div><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1>{shoe.name}</h1>
        <img src={shoe.imageURL} alt={shoe.name} />
        <p>Brand: {shoe.brand}</p>
        <div>
          <p>Size:</p>
          {sizes.map(size => (
            <label key={size}>
              <input type="radio" name="size" value={size} checked={this.state.size === size} onChange={this.handleSizeChange}/>
              {size}
            </label>
          ))}
        </div>
        <p>Gender: {shoe.gender}</p>
          <p>Color: {shoe.color}</p>
        <p>Price: €{shoe.price}</p>
        <p>Description: {shoe.description}</p>
        <input type="button" name="cart" value="Add to Cart" onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export default Product;
