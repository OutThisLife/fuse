import serialize from 'form-serialize'

class Filter {
  constructor ($filters) {
    this.el = $filters
    this.$items = $filters.getElementsByClassName('filter-item')
    this.$form = $filters.querySelector('form')

    this.$form.addEventListener('change', this.handleChange.bind(this))
  }

  handleChange () {
    const formData = serialize(this.$form, { hash: true })

    Array.from(this.$items).forEach(({ dataset, classList }) => {
      classList.remove('hide')

      let found = 0
      let mandatory = 0

      Object.keys(formData).map(k => {
        const v = formData[k]

        if (v !== 'all') {
          mandatory++
        }

        if (dataset[k] === v) {
          found++
        }
      })

      if (found !== mandatory) {
        classList.add('hide')
      }
    })
  }
}

let $filterable
if ($filterable = document.getElementById('has-filters')) {
  new Filter($filterable)
}
