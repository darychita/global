import debounce from './debounce';
import scrollHandler from './tabsHandler';
import inputCheckboxesClick from './inputCheckboxes';
import initSlider from './slider';
import initHamburgerBtn from './navMenu';

const navigationItems = document.querySelectorAll('nav > a');
const main = document.querySelector('#main');

// init scrolling handler
const scroll = debounce(scrollHandler(navigationItems, main), 300);
document.addEventListener('wheel', scroll);
document.addEventListener('touchmove', scroll);

// add click listeners to form fields
document
    .querySelectorAll('.hire-us__buttons__item')
    .forEach((el) => {
        el.addEventListener('click', inputCheckboxesClick);
    });


// init slider
const slider = document.querySelector('.works__slider__items-container');
const sliderItems = document.querySelectorAll('.works__slider__item');
const sliderPrevBtn = document.querySelector('#slider-prev');
const sliderNextBtn = document.querySelector('#slider-next');
initSlider(slider, sliderItems, sliderPrevBtn, sliderNextBtn);

// init navigation menu handler 
const hamburger = document.querySelector('#hamburger-btn');
const navigation = document.querySelector('#navigation');
initHamburgerBtn(hamburger, main, navigation);

