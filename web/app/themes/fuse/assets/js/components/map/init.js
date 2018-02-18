import wpfetch from '../../helpers/wpfetch'

export default function (params) {
  const obj = params || this.props.params || { state: 'TX' }
  const { userid } = document.body.dataset

  wpfetch('getProperties', { ...obj, userid }, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
