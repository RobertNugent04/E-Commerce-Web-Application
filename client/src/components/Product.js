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
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST,cart_item } from "../config/global_constants"

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoe: {},
      size: null,
      slideIndex: 1,
      showComments: false,
      comments: []
    };
    this.showSlides = this.showSlides.bind(this);
  }

  componentDidMount() {
    const shoeID = this.props.location.search.slice(8);
    axios.get(`${SERVER_HOST}/cars/${shoeID}`, { headers: { "authorization": localStorage.token } })
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Records read")
            this.setState({
              shoe: res.data,
            }, () => {
              this.showSlides(this.state.slideIndex);
            });
          }
        } else {
          console.log("Record not found")
        }
      })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    localStorage.cart_item++;
    const shoeID = this.props.location.search.slice(8)
    const name = this.state.shoe.name;
    //const imageURL = "insertImage";
    const price = this.state.shoe.price;
    const size = this.state.size;
    const imageURL = this.state.shoe.imageURL
    const email = localStorage.email
    console.log(this.state.shoe)
    // console.log(imageURL)
    axios.post(`${SERVER_HOST}/cart/${shoeID}/${name}/${price}/${size}/${email}`, {
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
            // localStorage.imageURL = res.data.imageURL
            localStorage.price = res.data.price;
            localStorage.image = res.data.imageURL;
            localStorage.size = this.state.size;
          }
        } else {
          console.log("Add to cart failed")
        }
      })
      window.location.reload(false);
  }

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  plusSlides(n) {
    this.showSlides(this.state.slideIndex + n);
  }

  currentSlide(n) {
    this.showSlides(n);
  }
  commentToggle = (e) => {
    axios.get(`${SERVER_HOST}/comment/${this.props.location.search.slice(8)}`)
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Records read")
            console.log(res.data.comments)
            // let comments =[]
            // res.data.map((data)=>comments.push(data.comments))
            // console.log(comments)
            this.setState({
              comments: res.data.comments

            })
            if (this.state.showComments) {
              this.setState({ showComments: false })
            } else {
              this.setState({ showComments: true })
            }
          }
        }
        else {
          console.log("Record not found")
        }
      })

  }

  showSlides(slideIndex) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    this.setState({
      slideIndex: slideIndex
    });

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides && slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  render() {
    const shoe = this.state.shoe
    const sizes = shoe.sizes ? shoe.sizes.map(size => {
      return size; // return the original size value (this is not necessary but can be useful in some cases)
    }) : [];

    console.log(this.state.shoe)
    console.log(this.state.comments)

    return (

      <div>
        <div class="navbar-container">
          <NavBar />
        </div><br /><br /><br /><br /><br />
        <center><h1 id = "title2">{shoe.name}</h1></center>

        <div className = "superContainer">


        <div className="productControls">
        <p className="filter-heading">Brand: {shoe.brand}</p>
        <div>
          <p className="filter-heading">Size:</p>
          {sizes.map(size => (
            <label class="radio-label">
            <input type="radio" name="size" value={size} checked={this.state.size === size} onChange={this.handleSizeChange} />
            <span class="radio-button"></span>
            {size}
          </label>
          ))}
        </div>
        <p className="filter-heading">Gender: {shoe.gender}</p>
        <p className="filter-heading">Color: {shoe.color}</p>
        <p className="filter-heading">Price: €{shoe.price}</p><br></br>
        <button class="green-button" id="btn" onClick={this.commentToggle}>Comments</button>
        {this.state.showComments ?
          <table>
            {this.state.comments.map((comment)=><tr>{comment}</tr>)}
          </table>
          :
          null
        }
        <br></br><br></br>
            {console.log(localStorage.cart_item)}

        <input class="green-button" type="button" name="cart" value="Add to Cart" onClick={this.handleSubmit} />
        </div>


        <div className="slideshow-container">
          {shoe.photos && shoe.photos.map((photo, index) => {
            return (
              <div className="mySlides fade" key={index}>
                <img src={photo} />
              </div>
            );
          })}
          <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={() => this.plusSlides(1)}>&#10095;</a>
          <div className="dots-container"><center>
          {shoe.photos && shoe.photos.map((photo, index) => {
            return (
              <span
                className="dot"
                key={index}
                onClick={() => this.currentSlide(index + 1)}
              ></span>
            );
          })}
        </center></div>
        </div>

        <div className="productControlsMobile"><center>
        <div>
          <p className="filter-heading">Size:</p>
          {sizes.map(size => (
            <label class="radio-label">
            <input type="radio" name="size" value={size} checked={this.state.size === size} onChange={this.handleSizeChange} />
            <span class="radio-button"></span>
            {size}
          </label>
          ))}
        </div>
        <p className="filter-heading">Price: €{shoe.price}</p><br></br>
        <button class="green-button" id="btn" onClick={this.commentToggle}>Comments</button>
        {this.state.showComments ?
          <table>
            {this.state.comments.map((comment)=><tr>{comment}</tr>)}
          </table>
          :
          null
        }
            {console.log(localStorage.cart_item)}

        <input class="green-button" type="button" name="cart" value="Add to Cart" onClick={this.handleSubmit} />
        </center></div>

        

          
        </div><br></br><br></br>
        <Footer />
      </div>
    );
  }
}