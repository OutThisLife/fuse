import wpfetch from '../../helpers/wpfetch'

export default function (keyword) {
  const { agentid, listingids } = this.props
  let endpoint = 'getPropertiesByCustomQuery'
  let params = {
    query: `keyword=${keyword || ''}&state=TX`
  }

  if (agentid) {
    params = { agentid }
    endpoint = 'getPropertiesByAgentId'
  } else if (listingids) {
    params = { listingids }
    endpoint = 'getPropertiesByIds'
  }

  wpfetch(endpoint, params, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
