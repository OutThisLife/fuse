import wpfetch from '../../helpers/wpfetch'

export default function (params) {
  wpfetch('getProperties', params || this.props.params || { state: 'TX' }, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
