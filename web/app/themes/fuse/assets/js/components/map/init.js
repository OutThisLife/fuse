import wpfetch from '../../helpers/wpfetch'

export default function (keyword) {
  const { agentId } = this.props
  console.log(agentId)
  const endpoint = agentId ? 'getPropertiesByAgentId' : 'getPropertiesByCustomQuery'
  const params = agentId ? { agentId } : { query: `keyword=${keyword || ''}` }

  wpfetch(endpoint, params, ({ results, meta }) => {
    this.setState({
      all: results,
      listings: results,
      meta
    })
  })
}
