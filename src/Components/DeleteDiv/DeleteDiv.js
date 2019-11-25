import React, { Component } from 'react';
import './DeleteDiv.css';

class DeleteDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: '',
    }
  }

  handleChange = (e) => {
    this.setState({ parameter: e.target.value });
  }

  handleClick = (e) => {
    e.preventDefault();
    const param = this.state.parameter;
    this.props.handleClick(param);
    this.setState({ parameter: '' });
  }

  render() {
    const { title, endpoint, fetch, parameter, type } = this.props;
    return (
      <div className="endpoint">
        <h3>{title}</h3>
        <code>
          {endpoint}
        </code>
        <h4>Parameters</h4>
        <p>{parameter} String</p>
        <h4>JS example</h4>
        <pre>{fetch}</pre>
        <form onSubmit={this.handleClick}>
        <input 
          placeholder={parameter} 
          onChange={this.handleChange}
          value={this.state.parameter}
          type={type || 'text'}
          min='2019-01-01'
          max='2019-11-10'
        />
        {!this.state.parameter && <button disabled>Run</button>}
        {this.state.parameter && <button>Run</button>}
        </form>
      </div>
    );  
  }
}

export default DeleteDiv;
