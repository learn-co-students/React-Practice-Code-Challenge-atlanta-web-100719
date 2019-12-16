import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushiList: [],
    eaten: [],
    sushiPage: 0,
    sushiLimit: 4,
    budget: 100
  }

  componentDidMount() {
    this.fetchSushi()
      .then(sushiList => {
        this.setState({ sushiList })
      })
  }

  fetchSushi = () => {
    return fetch(API)
      .then(res => res.json())
  }

  getSushi = () => {
    return this.state.sushiList.slice(this.state.sushiPage * this.state.sushiLimit, this.state.sushiLimit + this.state.sushiPage * this.state.sushiLimit)
  }

  handleMoreClick = () => {
    const { sushiPage, sushiLimit, sushiList } = this.state
    console.log(sushiList.length / sushiLimit);
    if (sushiPage >= (sushiList.length / sushiLimit) - 1) {
      this.setState({
        sushiPage: 0
      })
    } else {
      this.setState({
        sushiPage: this.state.sushiPage + 1
      })
    }
  }

  handleSushiClick = (sushi) => {
    if (!this.state.eaten.includes(sushi) && this.state.budget >= sushi.price)
      this.setState({
        eaten: [...this.state.eaten, sushi],
        budget: this.state.budget - sushi.price
      })
  }

  render() {
    const { eaten, sushiPage, sushiLimit, budget } = this.state
    return (
      <div className="app">
        <SushiContainer handleMoreClick={this.handleMoreClick} handleSushiClick={this.handleSushiClick} sushiList={this.getSushi()} eaten={eaten} sushiPage={sushiPage} sushiLimit={sushiLimit} />
        <Table budget={budget} eaten={eaten} />
      </div>
    );
  }
}

export default App;