import React, { Component } from "react";
import "./style.css";
import { getOrder } from './Services.js';
import { getOrders } from './Services.js';
import { orderSandwich } from './Services.js';

class App extends Component {
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
      this.setState({searchStatus: "The order ID should be a positive number. Please try again."});
    } else {
      getOrder(parsedValue)
      .then(res => {
        if (res.status === 200) {
          this.setState({searchResult: JSON.stringify(res.data)})
          this.setState({searchStatus: "Order found with the given ID!"});
        } else if (res.status === 400) {
          this.setState({searchStatus: "The order ID should be a positive number. Please try again."});
        } else if (res.status === 404) {
          this.setState({searchStatus: "No sandwiches found with the given ID."});
        } else {
          this.setState({searchStatus: "Something went wrong, please try again!"});
        }
      })
    }
    this.setState({searchValue: ""});
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
        this.setState({newOrderStatus: msg});
      } else {
        msg = "Oh no! Order not successfull, please try again!";
      }
    })
  }

  searchChanged(event) {
    this.setState({searchValue: event.target.value})
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
      <div className="singleOrderContainer">
        <div className="searchFuncContainer">
          <input type="number" value={this.state.searchValue} onChange={this.searchChanged} min="0" placeholder="Order ID"/>
          <button onClick={this.fetchOrder}>Find</button>
        </div>
        <div className="searchResultContainer">
          <p className="statusMessage">{this.state.searchStatus}</p>
          <p className="statusMessage">{this.state.searchResult}</p>
        </div>
      </div>
      <div className="sandwichOrderContainer">
        <button onClick={this.makeOrder}>Order a sandwich</button>
        <p className="statusMessage">{this.state.newOrderStatus}</p>
      </div>
    </div>
    );
  }
}

export default App;
