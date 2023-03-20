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
        
        const id = this.props.id
        const shoeName = this.props.shoeName
        const size = this.props.size
        const price= this.props.price
        


        axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${id}/${shoeName}/${this.state.name}/${size}/${this.state.email}/${this.props.price}`,{ headers: { "authorization": localStorage.token, "Content-type": "multipart/form-data" } })
            .then(res => {
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.SUCCESS,
                    payPalOrderID: paymentData.orderID,
                    redirectToPayPalMessage: true
                })
                console.log("good")
                localStorage.cart_item = 0;
                window.alert('Your PayPal transaction was successful')
               
            })
            .catch(errorData => {
                console.log("fail")
                this.setState({
                    payPalMessageType: PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage: true
                })
                window.alert("An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again.")

            })

        
    }



    onError = errorData => {
        console.log("PayPal error:", errorData)
        this.setState({
            payPalMessageType: PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage: true
        })
        window.alert("An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again.")
    }


    onCancel = cancelData => {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)
        this.setState({
            payPalMessageType: PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage: true
        })
        window.alert("PayPal Transaction Canceled")

    }

    render() {
        return (
            
            <div>
                {console.log(JSON.stringify(this.state.payPalMessageType))}
                {console.log(this.state.redirectToPayPalMessage)}
                {this.state.redirectToPayPalMessage ? <Redirect to={`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`} /> : null}

                <PayPalScriptProvider options={{ currency: "EUR", "client-id": SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{ layout: "horizontal" }} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel} />
                </PayPalScriptProvider>
            </div>
        )
    }
}