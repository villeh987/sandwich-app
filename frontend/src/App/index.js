import React, { Component } from "react";
import "./style.css";
import { getOrders } from './Services.js';
import { orderSandwich } from './Services.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      newOrderStatus: ""
    }

    this.fetchOrders = this.fetchOrders.bind(this);
    this.makeOrder = this.makeOrder.bind(this);
  }
  fetchOrders() {
    getOrders()
    .then(data => {
      this.setState({orders: JSON.stringify(data)})
    })
  }

  makeOrder() {
    orderSandwich()
    .then(res => {
      var msg = "";
      if (res.status === 200) {
        msg = "Order succesfull! Your order ID is: ";
        msg += res.data.data.id.toString();
        this.setState({newOrderStatus: msg})
      } else {
        msg = "Oh no! Order not successfull, please try again!"
      }
    })
  }

  render() {
    return (
    <div className="App">
      <div className="multipleOrdersContainer">
        <button onClick={this.fetchOrders}>Get orders</button>
        <ul>
          {this.state.orders}
        </ul>
      </div>
      <div className="sandwichOrderContainer">
        <p className="statusMessage">{this.state.newOrderStatus}</p>
        <button onClick={this.makeOrder}>Order a sandwich</button>
      </div>
    </div>
    );
  }
}

export default App;
