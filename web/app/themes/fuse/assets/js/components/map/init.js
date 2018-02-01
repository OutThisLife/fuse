import wpfetch from '../../helpers/wpfetch'

export default function () {
  wpfetch('getProperties', this.props.params || { state: 'TX' }, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
