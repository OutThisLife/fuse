export default class Carousel {
  constructor ($carousel) {
    this.$carousel = $carousel
    this.$slides = $carousel.querySelectorAll('figure')
    this.$nav = $carousel.querySelector('nav')
    this.$navButtons = this.$nav.querySelectorAll('a')

    this.index = 0
    this.timeout = 6000

    window.requestAnimationFrame(() => this.update().play())
    Array.from(this.$navButtons).forEach((el) => el.addEventListener('click', (e) => {
      this.stop().goToSlide([...el.parentElement.children].indexOf(el)).play()
    }))

    $carousel.addEventListener('mouseenter', this.stop.bind(this))
    $carousel.addEventListener('mouseleave', this.play.bind(this))
  }

  play () {
    console.info('starting slideshow')
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
    console.info('stopping slideshow')
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
    set(this.$nav, this.$navButtons)

    return this
  }
}

let $carousel
if ($carousel = document.querySelector('.carousel')) {
  new Carousel($carousel)
}
