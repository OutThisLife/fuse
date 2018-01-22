import wpfetch from '../../helpers/wpfetch'

export default function (keyword) {
  const { agentid, listingids } = this.props
  let endpoint = 'getPropertiesByCustomQuery'
  let params = {
    query: `keyword=${keyword || ''}&state=TX`
  }
  let formData = localStorage.getItem('FormData')
  let timestamp = localStorage.getItem('timestamp')
  const ONE_HOUR = 60 * 60 * 1000

  if (agentid) {
    params = { agentid }
    endpoint = 'getPropertiesByAgentId'
  } else if (timestamp < (Date.now() + ONE_HOUR)) {
    params = {
      query: `keyword=${keyword || ''}&${formData}`
    }
    endpoint = 'getPropertiesByCustomQuery'
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
