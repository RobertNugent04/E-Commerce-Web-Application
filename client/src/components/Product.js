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

  render() {
    const shoe = this.state.shoe
    const colors = shoe.in_stock ? shoe.in_stock.reduce((acc, item) => {
      if (!acc.includes(item.color)) {
        acc.push(item.color)
      }
      return acc
    }, []) : []
    const sizes = shoe.in_stock ? shoe.in_stock.reduce((acc, item) => {
      item.sizes.forEach((size) => {
        if (!acc.includes(size)) {
          acc.push(size)
        }
      })
      return acc
    }, []) : []

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
              <input type="radio" name="size" value={size} onChange={this.props.handleFilterChange} />
              {size}
            </label>
          ))}
        </div>
        <p>Gender: {shoe.gender}</p>
        <div>
          <p>Color:</p>
          {colors.map(color => (
            <label key={color}>
              <input type="radio" name="color" value={color} onChange={this.props.handleFilterChange} />
              {color}
            </label>
          ))}
        </div>
        <p>Price: €{shoe.price}</p>
        <p>Description: {shoe.description}</p>
      </div>
    );
  }
}

export default Product;
