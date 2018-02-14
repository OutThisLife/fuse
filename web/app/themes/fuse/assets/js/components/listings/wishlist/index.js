import React, { PureComponent } from 'react'
import wpfetch from '../../../helpers/wpfetch'

export default class WishList extends PureComponent {
  handleClick (e) {
    e.stopPropagation()

    if (document.body.classList.contains('logged-in')) {
      const action = this.el.classList.contains('active') ? 'removeFromWishlist' : 'addToWishlist'
      const listing_id = this.props.listing_id.toString()

      wpfetch(action, { listing_id }, ({ ids }) => {
        if (~ids.indexOf(listing_id)) {
          this.el.classList.add('active')
        } else {
          this.el.classList.remove('active')
        }
      })
    } else {
      alert('You have to be registered to do that.')
    }
  }

  render() {
    return (
      <span
        ref={c => (this.el = c)}
        className={`${this.props.on_wishlist ? 'active' : ''} wishlist`}
        onClick={this.handleClick.bind(this)}
      />
    )
  }
}
