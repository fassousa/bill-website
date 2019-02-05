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
      .get("http://localhost:3001/api/v1/bills.json")
      .then(response => {
        console.log(response);
        this.setState({ bills: response.data });
      })
      .catch(error => console.log(error));
  }
  render() {
    return <div className="">Bills</div>;
  }
}

export default App;
