import React, { Component } from 'react'

export default class Required extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <span>
        <span style={{ color: 'red' }}>* </span>
        {this.props.children}
      </span>
    )
  }
}
