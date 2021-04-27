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
         searchResult: "",
         searchStatus: ""
      }

      this.fetchOrder = this.fetchOrder.bind(this);
      this.fetchOrders = this.fetchOrders.bind(this);
      this.makeOrder = this.makeOrder.bind(this);
      this.searchChanged = this.searchChanged.bind(this);
   }

   fetchOrder() {
      var parsedValue = this.state.searchValue.replace(/[^0-9]/g, '');
      if (parsedValue === '' || isNaN(parseInt(parsedValue))) {
         this.setState({ searchStatus: "The order ID should be a positive number. Please try again." });
      } else {
         getOrder(parsedValue)
            .then(res => {
               if (res.status === 200) {
                  this.setState({ searchResult: JSON.stringify(res.data) })
                  this.setState({ searchStatus: "Order found with the given ID!" });
               } else if (res.status === 400) {
                  this.setState({ searchStatus: "The order ID should be a positive number. Please try again." });
               } else if (res.status === 404) {
                  this.setState({ searchStatus: "No sandwiches found with the given ID." });
               } else {
                  this.setState({ searchStatus: "Something went wrong, please try again!" });
               }
            })
      }
      this.setState({ searchValue: "" });
   }

   fetchOrders() {
      getOrders()
         .then(data => {
            this.setState({ orders: JSON.stringify(data) })
         })
   }

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
      return (
         <div className="cards">
            <section class="card card--weather">
               <header>
                  <h1 className="text-center">Tilaa poeka leipä</h1>
               </header>
               <div className="singleOrderContainer">
                  <div className="searchFuncContainer">
                     <input type="number" value={this.state.searchValue} onChange={this.searchChanged} min="0" placeholder="Order ID" />
                     <button onClick={this.fetchOrder}>Find</button>
                  </div>
                  <div className="searchResultContainer">
                     <p className="statusMessage">{this.state.searchStatus}</p>
                     <p className="statusMessage">{this.state.searchResult}</p>
                  </div>
               </div>
               <div className="sandwichOrderContainer">
                  <button className="btn btn-dark" onClick={this.makeOrder}>Order a sandwich</button>
                  <p className="statusMessage">{this.state.newOrderStatus}</p>
               </div>
               <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
            </section>
            <section class="card card--egain">
               <header>
                  <h1 className="text-center">Leibs</h1>
               </header>
               <div className="multipleOrdersContainer">
                  <button className="btn btn-dark" onClick={this.fetchOrders}>Get orders</button>
                  <ul>
                     {this.state.orders}
                  </ul>
               </div>
               <ul>
                  <li>Leib1</li>
                  <li>Leib2</li>
                  <li>Leib3</li>
               </ul>
            </section>
         </div>
      )
   }
}

export default Landing
