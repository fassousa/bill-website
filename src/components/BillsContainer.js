import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: []
    };
  }

  componentDidMount() {
    axios
      .get("https://floating-journey-70389.herokuapp.com/api/v1/bills.json")
      .then(response => {
        console.log(response);
        this.setState({ bills: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {console.log(this.state.bills[0])}
        {this.state.bills.map(bill => {
          return (
            <div className="tile" key={bill.id}>
              <h4>{bill.author}</h4>
              <p>{bill.id}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
