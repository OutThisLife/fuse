import React, { PureComponent } from 'react'
import styled from 'styled-components'

export default class RangeDropdown extends PureComponent {
  shouldComponentUpdate ({ options }) {
    return this.props.options.length !== options.length
  }

  render () {
    return (
      <select name={this.props.name} onChange={this.props.onChange || (() => {})}>
        <option value={this.props.defaultValue}>
          {this.props.defaultOption}
        </option>

        {this.props.options.map((x, i) => (
          <option key={Math.random()} value={x}>
            {this.props.labels ? this.props.labels[i] : x}
          </option>
        ))}
      </select>
    )
  }
}
