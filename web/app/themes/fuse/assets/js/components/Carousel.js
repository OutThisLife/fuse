import scrollTo from 'scroll-to'

export default class Carousel {
  constructor ($carousel) {
    this.$carousel = $carousel
    this.$slides = $carousel.querySelectorAll('figure')
    this.$nav = $carousel.querySelector('nav')

    if (this.$nav) {
      this.$navButtons = this.$nav.querySelectorAll('a')
    }

    this.index = 0
    this.timeout = 6000

    window.requestAnimationFrame(() => this.update().play())

    if (this.$navButtons) {
      Array.from(this.$navButtons).forEach((el) => el.addEventListener('click', (e) => {
        this.stop().goToSlide([...el.parentElement.children].indexOf(el)).play()
      }))
    }

    $carousel.addEventListener('mouseenter', this.stop.bind(this))
    $carousel.addEventListener('mouseleave', this.play.bind(this))

    this.$scrollDown = $carousel.querySelector('.scroll-down')
    if (this.$scrollDown) {
      this.$scrollDown.addEventListener('click', () => {
        scrollTo(0, window.innerHeight)
      })
    }
  }

  play () {
    window.requestAnimationFrame(() => {
      this.animateSlides = setInterval(() => {
        this.index += 1

        if (this.index === this.$slides.length) {
          this.index = 0
        }

        this.update()
      }, this.timeout)
    })

    return this
  }

  stop () {
    clearInterval(this.animateSlides)
    return this
  }

  goToSlide (i) {
    this.index = i
    this.update()
    return this
  }

  update () {
    const set = ($parent, $items) => {
      const $current = $parent.querySelector('.active')
      if ($current) {
        $current.classList.remove('active')
      }

      $items[this.index].classList.add('active')
    }

    set(this.$carousel, this.$slides)

    if (this.$nav) {
      set(this.$nav, this.$navButtons)
    }

    return this
  }
}

let $carousel
if ($carousel = document.querySelector('.carousel')) {
  new Carousel($carousel)
}
