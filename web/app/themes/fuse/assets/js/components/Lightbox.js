export class Lightbox {
	constructor($lightbox) {
		this.$lightbox = $lightbox
		this.$lightbox.querySelector('.close').addEventListener('click', this.close.bind(this))
		this.open()

    window.onkeydown = function(evt) {
			evt = evt || window.event
			if (evt.keyCode == 27) lightbox.classList.remove('open')
		}
	}

	open() {
		this.$lightbox.classList.add('open')
	}

	close() {
		this.$lightbox.classList.remove('open')
	}
}

let $howMuchLink
if ($howMuchLink = document.querySelector('.modal-link')) {
  $howMuchLink.addEventListener('click', (e) => {
    e.preventDefault()
    let $lightbox
    if ($lightbox = document.getElementById('how-much-lightbox'))
      new Lightbox($lightbox)
  })
}

let $joinUs
if ($joinUs = document.querySelector('.join-us-modal-link a')) {
  $joinUs.addEventListener('click', (e) => {
    e.preventDefault()
    let $lightbox
    if ($lightbox = document.getElementById('join-us-lightbox'))
      new Lightbox($lightbox)
  })
}
