import React, { Component } from 'react'
import { render } from 'react-dom'

export default class ExpandList extends Component {
  constructor (props) {
    super(props)
    this.state = { open: 0 }
  }

  componentDidMount () {
    this.onResize = this.handleResize.bind(this)
    this.$el = this.el.parentNode.parentNode.querySelector(this.props.selector)

    window.requestAnimationFrame(this.onResize)
    window.addEventListener('resize', this.onResize)
  }

  componentDidUpdate () {
    this.$el.classList[this.state.open ? 'add' : 'remove']('expand')
  }

  handleResize () {
    this.$el.style.maxHeight = `${this.$el.scrollHeight + 125}px`
  }

  render () {
    return (
      <a href="javascript:;" ref={c => (this.el = c)} onClick={() => {
        this.setState({ open: !this.state.open })
      }}>
          <i className={`icon-${this.state.open ? 'up' : 'down'}-arrow`}></i>
          {!this.state.open ? 'Expand All' : 'Collapse'}
      </a>
    )
  }
}

Array.from(document.getElementsByClassName('expand-list')).forEach(el => {
  render(<ExpandList {...el.dataset} />, el)
})
