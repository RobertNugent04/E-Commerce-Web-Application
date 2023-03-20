import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import PayPalMessage from "./PayPalMessage"

import { SANDBOX_CLIENT_ID, SERVER_HOST } from "../config/global_constants"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"


export default class BuyShoe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToPayPalMessage: false,
            payPalMessageType: null,
            payPalOrderID: null,
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        }
    }


    createOrder = (data, actions) => {
        return actions.order.create({ purchase_units: [{ amount: { value: this.props.price } }] })
    }


    // onApprove = paymentData =>
    // {      
    //     axios.post(`${SERVER_HOST}/sales/${paymentData.paymentID}/${this.props.shoeID}/${this.props.price}/${paymentData.email}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
    //     .then(res => 
    //     {                   
    //         this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
    //                        payPalPaymentID:paymentData.paymentID, 
    //                        redirectToPayPalMessage:true}) 
    //     })
    //     .catch(errorData =>
    //     {
    //         console.log("PayPal payment unsuccessful error:", errorData)            
    //         this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
    //                        redirectToPayPalMessage:true}) 
    //     })
    // }

    onApprove = paymentData => {

        // let formData = new FormData();

        // this.props.ids.forEach((item) => {
        //     formData.append('shoesID', item);
        //     console.log(item)
        // });
        // console.log(formData)
        const data = JSON.stringify( this.props.ids)
        const amount = JSON.stringify(this.props.quantity)
        const names = JSON.stringify(this.props.names)
        const images = JSON.stringify(this.props.images)
        const sizes = JSON.stringify(this.props.sizes)
        

        console.log("data" + data)
        console.log("names" + names)

        axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${data}/${amount}/${sizes}/${names}/${this.state.name}/${this.state.email}/${this.props.price}`,{ headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            .then(res => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true
                })
                console.log("good")
                localStorage.cart_item = 0;
               
            })
            .catch(errorData => {
                console.log("fail")
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true
                })
            })
    }



    onError = errorData => {
        console.log("PayPal error:", errorData)
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true
        })
    }


    onCancel = cancelData => {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true
        })
    }

    render() {
        return (
            
            <div>
                {console.log(JSON.stringify(this.props.images))}
                {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`} /> : null}

                <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                </PayPalScriptProvider>
            </div>
        )
    }
}