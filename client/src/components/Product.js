import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import Filter from "./Filter"
import CarTable from "./CarTable"
import ShoeTable from "./ShoeTable"
import Logout from "./Logout"
import Search from "./Search"
import Sort from "./Sort"
import NavBar from "./NavBar"
import Footer from "./Footer"
import AddedToCart from "./AddedToCart"
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST, cart_item } from "../config/global_constants"
import BuyShoeGuest from "./BuyShoeGuest"
import BuyShoe from "./BuyShoe"


export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoe: {},
      size: null,
      slideIndex: 1,
      showComments: false,
      comments: [],
      embeddedImage: false,
      imageFiles: [],
      redirectToAdded: false,
      wasSubmittedOnce: false,
      quantityNum: 0
    };
    this.showSlides = this.showSlides.bind(this);
  }

  componentDidMount() {
    // const el = document.getElementById(photo._id)
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
              this.getFromFile();

              this.showSlides(this.state.slideIndex);

              
            });
          }
        } else {
          console.log("Record not found")
        }
      })
  }

  getFromFile() {
    console.log("get from file")
    let imageFiles = []
    this.state.shoe.photos.map(photo => {
      return axios.get(`${SERVER_HOST}/cars/photo/${photo.filename}`)
        .then(res => {
          if (res.data) {
            console.log(res.data)
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage)
            }
            else {
              if (res.data.image != null) {
                
                // console.log( document.getElementById(photo._id) )
                imageFiles.push(`data:;base64,${res.data.image}`)
                this.setState({embeddedImage:true, imageFiles: imageFiles })
              }
              else {
                console.log("no embedded image")
              }
              // console.log(`data:;base64,${res.data.image}` )                                                     
            }
          }
          else {
            console.log("Record not found")
          }
        })
    })
    // window.location.reload(false);

  }


  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({wasSubmittedOnce: true})

    const shoeID = this.props.location.search.slice(8)
    const name = this.state.shoe.name;
    //const imageURL = "insertImage";
    const price = this.state.shoe.price;
    const size = this.state.size;
    // const imageURL = this.state.shoe.imageURL
    const email = localStorage.email
    let photos =null;
    const quantity = this.state.quantityNum - 1;
    console.log("Quantity: " + quantity)
    if(this.state.embeddedImage ===true){
   photos =JSON.stringify(this.state.shoe.photos)}
   else{ 
    photos =JSON.stringify([{"test":"one"}])
    console.log(shoeID)}
    
    // console.log(imageURL)

    if(this.state.size !== null && this.state.shoe.items_left - 1 >= 0){
      localStorage.cart_item++;

      axios.post(`${SERVER_HOST}/cart/${shoeID}/${name}/${price}/${size}/${email}/${photos}/${quantity}`, {

      size: this.state.size // Pass the selected size to the server
    })
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          } else {
            console.log("Shoe Added to Cart Successfully")

            let quantity = this.state.quantityNum - 1;

            localStorage.shoeID = res.data.shoeID
            localStorage.name = res.data.name
            // localStorage.imageURL = res.data.imageURL
            localStorage.price = res.data.price;
            localStorage.image = res.data.imageURL;
            localStorage.size = this.state.size;
            localStorage.quantity = quantity;
            console.log("Quantity: " + localStorage.quantity)

            this.setState({redirectToAdded: true})
          }
        } else {
          console.log("Add to cart failed")
        }
      })
    }else{
      console.log("not enough stock")
    }
 //   window.location.reload(false);
  }

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  //Code adapted from https://www.w3schools.com/howto/howto_js_slideshow.asp
  plusSlides(n) {
    this.showSlides(this.state.slideIndex + n);
  }

  currentSlide(n) {
    this.showSlides(n);
  }
  commentToggle = (e) => {
    axios.get(`${SERVER_HOST}/comment/${this.state.shoe.name}`)
      .then(res => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage)
          }
          else {
            console.log("Records read")
            console.log(res.data)
            // let comments =[]
            // res.data.map((data)=>comments.push(data.comments))
            // console.log(comments)
            this.setState({
              comments: res.data

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

  //Increase and decrease methods taken from https://codepen.io/mtbroomell/pen/yNwwdv
  increaseValue = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    this.setState({ quantityNum: value })
    document.getElementById('number').value = value;
   // this.setState({ quantityNum: document.getElementById('number').value })
   this.forceUpdate();
  }
  
  decreaseValue = () => {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value = value < 1 ? 1 : value;
    value--;
    this.setState({ quantityNum: value })
    document.getElementById('number').value = value;
   // this.setState({ quantityNum: document.getElementById('number').value })
  }

  render() {

    let sizeError = ""
    let stockError = ""

   
      console.log("Greater then 2")
    

    if (this.state.redirectToAdded === true) {
      return <Redirect to="./AddedToCart" />
    }

    const shoe = this.state.shoe
    const sizes = shoe.sizes ? shoe.sizes.map(size => {
      return size;
    }) : [];

    console.log(this.state.shoe.photos)
    console.log("comments" + this.state.comments)
    console.log(this.state.embeddedImage)
    console.log(this.state.imageFiles)

    if(this.state.size === null && this.state.wasSubmittedOnce){

      sizeError = <p class="error">Please pick a size</p>;

    }

  console.log("Items: " + this.state.shoe.items_left)
    if(this.state.shoe.items_left < 1){
      stockError = <center><p class="error">This item is currently out of stock</p></center>;
    }

    return (

      <div>

        <div class="navbar-container">
          <NavBar />
        </div><br /><br /><br /><br /><br />
        <center><h1 id="title2">{shoe.name}</h1></center>

        <div className="superContainer">

        {stockError}
        <div className="productControls">
        <p><b>Brand: </b>{shoe.brand}</p>
        <div>
          <p><b>Size:</b></p>
          {sizes.map(size => (
            <label class="radio-label">
            <input type="radio" name="size" value={size} checked={this.state.size === size} onChange={this.handleSizeChange} />
            <span class="radio-button"></span>
            {size}
          </label>
          ))}
        </div>
        {sizeError}
        <p><b>Gender: </b>{shoe.gender}</p>
        <p><b>Color: </b>{shoe.color}</p>
        <p><b>Price: </b>€{shoe.price}</p><br></br>

        <p><b>Quantiy: </b></p> 
        <form>
        <div class="value-button" id="decrease" onClick={this.decreaseValue} value="Decrease Value">-</div>
  <input type="number" id="number" value={this.state.quantityNum} />
  <div class="value-button" id="increase" onClick={this.increaseValue} value="Increase Value">+</div>
  </form>
        
        <br></br>

        <button class="green-button" id="btn" onClick={this.commentToggle}>Comments</button>
        {this.state.showComments ?
          (<table>
            <div style={{display:"inline-block"}}>
            {this.state.comments.userName.map((comment)=><tr><td>{comment}:</td> </tr>)} 
            </div>
            <div style={{display:"inline-block"}}>
            {this.state.comments.comments.map((comment)=><tr><td>{comment}</td> </tr>)} 
            </div>
            <tr>
            <Link className="green-button" to={"/AddComment/" + shoe.name}>add comment</Link> 
            </tr>
          </table>)
          :
          null
        }
        <div className="gap"></div>
        {localStorage.accessLevel == ACCESS_LEVEL_GUEST ?  <BuyShoe price={this.state.price}  ids={this.state.shoe._id}  names={this.state.shoe.name}  sizes={this.state.size}/>: <input class="green-button" type="button" name="cart" value="Add to Cart" onClick={this.handleSubmit} />}


        {/* <button class="green-button" id="btn" onClick={this.commentToggle}>Comments</button>
        {this.state.showComments ?
          <table>
            {this.state.comments.map((comment)=><tr><td>{comment.userName}</td> <td>{comment.comments}</td></tr> )}
          </table>
          :
          null
        } */}
        <br></br><br></br>
          </div>


          <div className="slideshow-container">
            {!this.state.embeddedImage ?
              shoe.photos && shoe.photos.map((photo, index) => {
                {
                  return(
                <div className="mySlides fade" key={index}>
                  <img src={photo}/>
                  {/* {this.state.embeddedImage ?  this.getFromFile() : null} */}
                  {/* {this.state.embeddedImage ?  <img src={photo} key={photo._id} id={photo._id}/> : <img src={photo}/>} */}
                </div>)
                }
              })
              :
              (
              this.state.imageFiles.map((file,index) => {
                {
                  return(
                <div className="mySlides fade" key={index}>
                  <img src={file}/>
                </div>)
                }
              }))}


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
          <p><b>Size:</b></p>
          {sizes.map(size => (
            <label class="radio-label">
            <input type="radio" name="size" value={size} checked={this.state.size === size} onChange={this.handleSizeChange} />
            <span class="radio-button"></span>
            {size}
          </label>
          ))}
        </div>
        <p><b>Price:</b> €{shoe.price}</p><br></br>
        <button class="green-button" id="btn" onClick={this.commentToggle}>Comments</button>
        {this.state.showComments ?
          (<table>
            <div style={{display:"inline-block"}}>
            {this.state.comments.userName.map((comment)=><tr><td>{comment}:</td> </tr>)} 
            </div>
            <div style={{display:"inline-block"}}>
            {this.state.comments.comments.map((comment)=><tr><td>{comment}</td> </tr>)} 
            </div>
            <tr>
            <Link className="green-button" to={"/AddComment/" + shoe.name}>add comment</Link> 
            </tr>
          </table>)
          :
          null
        }
        {console.log(this.state.shoe.price)}
        
        {localStorage.accessLevel == ACCESS_LEVEL_GUEST ?  <BuyShoeGuest  price={this.state.shoe.price}  id={this.state.shoe._id}  shoeName={this.state.shoe.name}  size={this.state.size}/>: null}
            {console.log(localStorage.cart_item)}

          {localStorage.accessLevel> ACCESS_LEVEL_GUEST ?  <input class="green-button" type="button" name="cart" value="Add to Cart" onClick={this.handleSubmit} /> : null}
          </center></div>

        </div><br></br><br></br>
        <Footer />
      </div>
    );
  }
}