import React, { Component } from 'react'

import { getOrder } from './Services.js';
import { getOrders } from './Services.js';
import { orderSandwich } from './Services.js';

class Landing extends Component {
   constructor(props) {
      super(props);
      this.state = {
         orders: [],
         newOrderStatus: "",
         searchValue: "",
         searchResult: [],
         searchStatus: ""
      }

      // Bind the functions so they can be used
      this.fetchOrder = this.fetchOrder.bind(this);
      this.fetchOrders = this.fetchOrders.bind(this);
      this.makeOrder = this.makeOrder.bind(this);
      this.searchChanged = this.searchChanged.bind(this);
   }

   // Get list of all orders when the page loads
   componentDidMount() {
      this.fetchOrders();
   }

   // Get data of order with the given ID
   fetchOrder() {
      var parsedValue = this.state.searchValue.replace(/[^0-9]/g, '');
      if (parsedValue === '' || isNaN(parseInt(parsedValue))) {
         this.setState({ searchStatus: "The order ID should be a positive number. Please try again." });
         this.setState({ searchValue: "" });
         this.setState({ searchResult: [] })
      } else {
         getOrder(parsedValue)
            .then(res => {
               // Act based on the status code of the response
               if (res.status === 200) {
                  this.setState({ searchResult: res.data })
                  this.setState({ searchStatus: "Order found with the given ID!" });
               } else if (res.status === 400) {
                  this.setState({ searchResult: [] })
                  this.setState({ searchStatus: "The order ID should be a positive number. Please try again." });
               } else if (res.status === 404) {
                  this.setState({ searchResult: [] })
                  this.setState({ searchStatus: "No sandwiches found with the given ID." });
               } else {
                  this.setState({ searchResult: [] })
                  this.setState({ searchStatus: "Something went wrong, please try again!" });
               }
            })
      }
      this.setState({ searchValue: "" });
   }

   // Get data of all of the orders in DB
   fetchOrders() {
      getOrders()
         .then(data => {
            console.log(data);
            this.setState({ orders: data })
         })
   }

   // Order a new sandwich
   makeOrder() {
      orderSandwich()
         .then(res => {
            var msg = "";
            if (res.status === 200) {
               msg = "Order succesfull! Your order ID is: ";
               msg += res.data.data.id.toString();
               this.setState({ newOrderStatus: msg });
            } else {
               msg = "Oh no! Order not successfull, please try again!";
            }
         })
   }

   searchChanged(event) {
      this.setState({ searchValue: event.target.value })
   }


   render() {
      // Create the search result if there is data for it in state
      var searchResult = "";
      if (this.state.searchResult !== null && this.state.searchResult.length !== 0) {
         searchResult = "ID: " + this.state.searchResult.id + " - Status: " + this.state.searchResult.status + " - Sandwich ID: " +  this.state.searchResult.status;
      }
      return (
         <div className="cards">
            <section class="card card--order">
               <header>
                  <h1 className="text-center">Sandwich ordering</h1>
               </header>
               <div className="sandwichOrderContainer">
                  <button className="btn btn-dark" onClick={this.makeOrder}>Order a sandwich</button>
                  <p className="statusMessage">{this.state.newOrderStatus}</p>
               </div>
               <div className="singleOrderContainer">
                  <div className="searchFuncContainer">
                     <input type="number" value={this.state.searchValue} onChange={this.searchChanged} min="0" placeholder="Order ID" />
                     <button className="btn btn-dark" onClick={this.fetchOrder}>Find</button>
                  </div>
                  <div className="searchResultContainer">
                     <p className="statusMessage">{this.state.searchStatus}</p>
                     <p className="searchResult">{searchResult}</p>
                  </div>
               </div>
            </section>
            <section class="card card--orderList">
               <header>
                  <h1 className="text-center">Order history</h1>
               </header>
               <button className="btn btn-dark" onClick={this.fetchOrders}>Update orders</button>
               <div className="multipleOrdersContainer">
                  <ul>
                     {(this.state.orders).map(function(item, index){
                        return <li key={ index }>ID: {item.id} - Status: {item.status} - Sandwich ID: {item.sandwichId}</li>;
                     })}
                  </ul>
               </div>
            </section>
         </div>
      )
   }
}

export default Landing
