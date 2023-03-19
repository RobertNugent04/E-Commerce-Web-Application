import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER,SERVER_HOST} from "../config/global_constants"


export default class CartTableRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageFiles: [],
            embeddedImage: false
        }
    }
    componentDidMount() {
        console.log("get from file")
        let imageFiles = []
        JSON.parse(this.props.car.photos).map(photo => {
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
                                this.setState({ embeddedImage: true, imageFiles: imageFiles })
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
    render() {
        console.log(this.props.car.photos)
        return (
            <table className="shoe">
                <tr>
                    <td><h5>{this.props.car.name}</h5></td>
                </tr>
                {/* <tr>
                    <Link to={`/Product?shoeID=${this.props.car._id}`}><td><img src={this.props.car.imageURL} alt={this.props.car.name}></img></td></Link>
                    </tr> */}

                {!this.state.embeddedImage ?
                    <tr>
                        <Link to={`/Product?shoeID=${this.props.car._id}`}><td><img src={this.props.car.imageURL} alt={this.props.car.name}></img></td></Link>
                    </tr>
                    :
                    <tr>
                        <Link to={`/Product?shoeID=${this.props.car._id}`}><td><img src={this.state.imageFiles[0]} alt={this.props.car.name} className="shoeImage"></img></td></Link>
                    </tr>
                }
                <tr>
                    <td>{this.props.car.brand}</td>
                </tr>
                <tr>
                    <td>Size: {this.props.car.size}</td>
                </tr>
                <tr>
                    <td>Price: €{this.props.car.price}</td>
                </tr>
                <tr>
                    <td>Amount: {this.props.car.amount}<br></br></td>
                </tr>
                <tr>
                    <td>
                        <div className="shoeButtons">

                            {localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? <Link className="red-button" to={"/CartDelete/" + this.props.car._id + "/" + this.props.car.amount}>Delete</Link> : null}
                        </div>
                    </td>
                </tr>
                <tr>
                </tr>
            </table>
        )
    }
}