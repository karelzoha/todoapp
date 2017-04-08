import React, { Component } from 'react';

const ToDo = (props) => (<div>{props.item}</div>)

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    const query = JSON.stringify({"list": {"page": 0, "pageSize": 10, filter: { state: 'UNFINISHED' } } })
    fetch(
      '/v1.0.0/task', 
      { 
        method: 'POST', 
        body: query,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': query.length,
        },
      }
    ).then((resp) => {
      return resp.json()
    })
    .then((json) => {
      this.setState((prevState, props) => ({
        tasks: json.items
      }))
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.tasks.map((_) => <ToDo key={_.id} item={_.id} />)
        }
      </div>
    );
  }
}

export default App;
