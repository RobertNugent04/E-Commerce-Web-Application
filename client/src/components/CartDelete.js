import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

import { SERVER_HOST } from "../config/global_constants"


export default class CartDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToCart: false
        }
    }


    componentDidMount() {
        localStorage.cart_item -= this.props.match.params.amount
        // console.log(this.props.match.params.amount)
        axios.delete(`${SERVER_HOST}/cart/${this.props.match.params.id}/${localStorage.email}/${this.props.match.params.amount}`)
            .then(res => {
                console.log("axios")
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    }
                    else // success
                    {
                        console.log("Record deleted")
                    }
                    this.setState({ redirectToCart: true })
                }
                else {
                    console.log("Record not deleted")
                }
            })
            // window.location.reload(false);
    }


    render() {
        console.log(localStorage.cart_item)
        return (
            <div>
                {this.state.redirectToCart ? <Redirect to="/Cart" /> : null}
            </div>
        )
    }
}