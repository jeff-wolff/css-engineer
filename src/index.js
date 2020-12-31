import 'normalize.css';
import './style.scss';
if (!("scrollBehavior" in document.documentElement.style)) {
	await import("scroll-behavior-polyfill");
}

const next = document.querySelector('.testimonial-block__forward-arrow');
const prev = document.querySelector('.testimonial-block__back-arrow');

class Carousel {
  constructor(duration, carousel, slideWidth) {
    this.duration = duration;
    this.carousel = carousel;
    this.slideWidth = slideWidth;
    this.currentSlide = 0;
    this.pos = slideWidth * this.currentSlide;
    this.interrupt = false;
    this.length = document.querySelectorAll('.testimonial-block__item').length;
    this.initial = Date.now();

    this.tick();
    this.generateDots();
    this.active(0);

    next.addEventListener('click', () => this.step(1))
    prev.addEventListener('click', () => this.step(-1))

    carouselBlock.addEventListener('mouseover',() => this.interrupt = true)
    carouselBlock.addEventListener('mouseout',() => this.interrupt = false)
    carouselBlock.addEventListener('mouseout',() => this.interrupt = false)

    document.querySelectorAll('.testimonial-block__dots .dot').forEach((el,i) => el.addEventListener('click', () => this.dotClick(el,i)))
    window.addEventListener('resize', () => this.updateSlideWidth())
  }

  generateDots() {
    document.querySelectorAll('.testimonial-block__item').forEach(function(){
      Object.assign(
        document.querySelector('.testimonial-block__dots').appendChild(document.createElement("button")), {className: "dot"})
    })
  }

  tick() {
    let time = Date.now();
    let elapsed = time - this.initial;

    if (elapsed > this.duration && !this.interrupt) {
      this.initial = time;
      this.step(1);
    }

    setTimeout(() => {
      this.tick();
    }, 300);
  }

  step(val) {
    this.currentSlide += val;

    switch (this.currentSlide) {
      case -1:
        this.currentSlide = this.length - 1;
        break;
      case this.length:
        this.currentSlide = 0;
      default:
        break;
    }

    this.pos = slideWidth * this.currentSlide;

    if (this.currentSlide == 0) {
      this.pos = 0;
    }
    
    if (this.currentSlide == this.length-1) {
      carouselWrap.classList.add('remove_gradient');
    } else {
      carouselWrap.classList.remove('remove_gradient');
    }

    document.querySelector('.testimonial-block__carousel').scroll({
      left: this.pos,
      behavior: 'smooth'
    });

    this.active(this.currentSlide);
  }

  active(current) {
    let activeCard = document.querySelectorAll('.testimonial-block__item')[current];
    let currentDot = document.querySelectorAll('.testimonial-block__dots .dot')[current];

    // Remove shadow on all slides
    document.querySelectorAll('.testimonial-block__item').forEach((el) => {
      el.classList.remove('testimonial-block__item_selected');
    })
    // Remove active on all dots
    document.querySelectorAll('.testimonial-block__dots .dot').forEach((el) => {
      el.classList.remove('dot_active');
    })
    // Add active classes on slides / dots
    activeCard.classList.add('testimonial-block__item_selected');
    currentDot.classList.add('dot_active');
  }

  dotClick(el,i) {
    let currentCard = document.querySelectorAll('.testimonial-block__item')[i];
    this.slideWidth = currentCard.offsetWidth + parseInt(getComputedStyle(document.querySelector('.testimonial-block__item')).marginRight);
    this.currentSlide = i;
    this.pos = this.slideWidth * i;
    document.querySelector('.testimonial-block__carousel').scroll({
      left: this.pos,
      behavior: 'smooth'
    });
    this.active(i)
  }

  updateSlideWidth() {

  }
}

let slideWidth = document.querySelector('.testimonial-block__item').offsetWidth + parseInt(getComputedStyle(document.querySelector('.testimonial-block__item')).marginRight);
let carouselBlock = document.querySelector('.testimonial-block');
let carouselWrap = document.querySelector('.testimonial-block__carousel-wrap');
let carousel = document.querySelector('.testimonial-block__carousel');
const testimonial = new Carousel(3000, carousel, slideWidth, carouselWrap);


let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
let mobileMenuHamburger = document.querySelector('.mobile-menu-hamburger');
let mobileMenuClose = document.querySelector('.mobile-menu-overlay .feather-x');
// Open Mobile Menu
mobileMenuHamburger.addEventListener('click',function(){
  document.documentElement.style.overflow = "hidden";
  mobileMenuOverlay.classList.remove('mobile-menu-overlay--closed');
});

// Close Mobile Menu
mobileMenuClose.addEventListener('click',function(){
  document.documentElement.style.overflow = "auto";
  mobileMenuOverlay.classList.add('mobile-menu-overlay--closed');
});
