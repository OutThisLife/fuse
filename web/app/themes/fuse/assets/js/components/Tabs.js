export default class Tabs {
	constructor($tabs) {
		this.$parent = $tabs
		this.$tabs = $tabs.querySelectorAll('li')
		this.$contents = $tabs.nextElementSibling.querySelectorAll('.tab-content')
		this.index = 0

		this.activateTab()
		
		Array.from(this.$tabs).forEach((el) => el.addEventListener('click', (e) => {
            const index = [...el.parentElement.children].indexOf(el)

            this.goToTab(index)
		}))
	}

    activateTab() {
        this.$tabs[this.index].classList.add('active')
        this.$contents[this.index].classList.add('active')
    }
    
    deactivateTab() {
        this.$tabs[this.index].classList.remove('active')
        this.$contents[this.index].classList.remove('active')
    }

    goToTab(i) {
        this.deactivateTab()
        this.index = i
        this.activateTab()
    }
}

Array.from(document.getElementsByClassName('tabs')).forEach(e => new Tabs(e))