export default class NeighborhoodMap {
  constructor($mapContainer) {
    this.$mapContainer = $mapContainer
    this.$neighborhoods = $mapContainer.querySelectorAll('path')
    Array.from(this.$neighborhoods).map(x => x.addEventListener('click', (e) => this.handleClick(e)))
  }

  handleClick(e) {
    document.querySelector(`a[data-id="${e.target.id}"]`).click()
  }
}

let $mapContainer
if ($mapContainer = document.getElementById('neighborhood-map'))
  new NeighborhoodMap($mapContainer)
