import React, { Component } from "react";
import "./style.css";
import { getOrders } from './Services.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    getOrders()
    .then(data => {
      console.log(JSON.stringify(data));
      this.setState({orders: JSON.stringify(data)})
    })
  }

  render() {
    return (
    <div className="App">
      <button onClick={this.handleClick}>Get orders</button>
      <ul>
        {this.state.orders}
      </ul>
    </div>
    );
  }
}

export default App;
