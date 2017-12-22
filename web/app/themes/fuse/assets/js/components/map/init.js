import wpfetch from '../../helpers/wpfetch'

export default function (keyword) {
  const { agentId } = this.props

  const endpoint = agentId ? 'getPropertiesByAgentId' : 'getPropertiesByCustomQuery'
  const params = agentId ? { agentId } : {
    query: `keyword=${keyword || ''}&state=TX&with_image=1`
  }

  wpfetch(endpoint, params, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
