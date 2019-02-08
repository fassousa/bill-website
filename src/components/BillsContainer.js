import React, { Component } from "react";
import axios from "axios";
import { Search, Grid, Header, Segment, Input } from "semantic-ui-react";
import _ from "lodash";
import "./BillsContainer.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.sayHi = this.sayHi.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.state = {
      bills: [],
      results: [{}],
      value: "",
      moreInfo: {}
    };
  }

  componentWillMount() {
    axios
      .get("https://floating-journey-70389.herokuapp.com/api/v1/bills.json")
      .then(response => {
        console.log(response);
        this.setState({ bills: response.data });
      })
      .catch(error => console.log(error));
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => this.setState({ value: result.id });

  sayHi = e => {
    let value = e.target.value;
    console.log("Value0020 value", value);
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.id);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.bills, isMatch)
      });
    }, 300);
  };

  sayHi2() {
    console.log("HIHiHi");
  }

  moreInfo(selected) {
    this.setState({
      moreInfo: {
        autor: selected.author,
        ano: selected.year,
        tipo: selected.kind,
        número: selected.number,
        nome: selected.name,
        descrição: selected.description
      }
    });
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <Input
          className="input"
          placeholder="Search bill by number"
          onChange={this.sayHi}
        />
        {/* {console.log(this.state.bills[0])} */}
        <ul>
          {this.state.results.map(result => {
            return (
              <li className="list" onClick={() => this.moreInfo(result)}>
                {result.year} {result.author} {result.status}
              </li>
            );
          })}
        </ul>
        {Object.keys(this.state.moreInfo).map(key => {
          return (
            <div className="cards">
              <div className="card">
                <div className="card-header">
                  <h2>{key}</h2>
                </div>
                <div className="card-main">
                  <p className="main-description">{this.state.moreInfo[key]}</p>
                </div>
              </div>
            </div>
          );
        })}
        {this.state.bills.map(bill => {
          return <div className="tile" key={bill.id} />;
        })}
      </div>
    );
  }
}

export default App;
