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
         this.setState({ searchResult: [] })
      } else {
         getOrder(parsedValue)
            .then(res => {
               // If the response was error, Services.js returns only the error code
               if (typeof res === "number") {
                  // Order was not found with the given id
                  if (res === 404) {
                     this.setState({ searchResult: [] })
                     this.setState({ searchStatus: "No orders found with the given ID!" });
                  // Order ID somehow wasn't a positive number, even though frontend shouldn't send those
                  } else if (res === 400) {
                     this.setState({ searchResult: [] })
                     this.setState({ searchStatus: "The order ID should be a positive number. Please try again." });
                  } else {
                     this.setState({ searchResult: [] })
                     this.setState({ searchStatus: "Something went wrong, please try again!" });
                  }
               // If the response was something else than a number, and order should have been found
               } else {
                  // Order was found, save its data to state
                  if (res.status === 200) {
                     this.setState({ searchResult: res.data })
                     this.setState({ searchStatus: "Order found with the given ID!" });
                  // Something very weird has happened, as the code should not be able to be other than 200, 400 or 404
                  } else {
                     this.setState({ searchResult: [] })
                     this.setState({ searchStatus: "Something went wrong, please try again!" });
                  }
               }
            })
      }
      this.setState({ searchValue: "" });
   }

   // Get data of all of the orders in DB
   fetchOrders() {
      getOrders()
         .then(data => {
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
      if (this.state.searchResult !== null && this.state.searchResult.id !== undefined) {
         searchResult = "ID: " + this.state.searchResult.id + " - Status: " + this.state.searchResult.status + " - Sandwich ID: " +  this.state.searchResult.sandwichID;
      }

      // Create the list of orders it there is data for it in state
      var orderList = []
      if (this.state.orders !== null && this.state.orders.length > 0) {
         orderList = (this.state.orders).map(function(item, index) {
            return <li key={ index }>ID: {item.id} - Status: {item.status} - Sandwich ID: {item.sandwichId}</li>;
         });
      }

      return (
         <div className="cards">
            <section className="card card--order">
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
            <section className="card card--orderList">
               <header>
                  <h1 className="text-center">Order history</h1>
               </header>
               <button className="btn btn-dark" onClick={this.fetchOrders}>Update orders</button>
               <div className="multipleOrdersContainer">
                  <ul>
                     {orderList}
                  </ul>
               </div>
            </section>
         </div>
      )
   }
}

export default Landing
