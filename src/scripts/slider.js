import {spermSwim, removeSperm} from "./spermSwim";

const slider = document.querySelector('.slider');
const sliderTrack = document.querySelector('.main');
const slides = document.querySelectorAll('.slide');

let slideIndex = 0;

let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;

function setSlide(){
    sliderTrack.style.transition = 'transform 0.5s';
    sliderTrack.style.transform = `translate3d(-${slideIndex * slides[0].offsetWidth}px, 0px, 0px)`;
    if(slideIndex === 0){
        setTimeout(() => removeSperm(), 500);
    }
}

function swipeAction(event){
    event.stopPropagation();

    const trfRegExp = /[-0-9.]+(?=px)/;
    const transformValueX = +sliderTrack.style.transform.match(trfRegExp)[0];

    let touchPoint = event.touches[0].clientX

    posX2 = posX1 - touchPoint;
    posX1 = touchPoint;

    if (slideIndex === 0 && posInit < posX1) {
        sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
        return;
    }
    else if (slideIndex === 0 && posInit > posX1) {
        spermSwim();
    }
    else if (slideIndex === slides.length - 1 && posInit > posX1) {
        sliderTrack.style.transform = `translate3d(-${(slides.length - 1) * slides[0].offsetWidth}px, 0px, 0px)`;
        return;
    }

    sliderTrack.style.transform = `translate3d(${transformValueX - posX2}px, 0px, 0px)`;
}
function swipeEnd(event){
    event.stopPropagation();

    posFinal = posInit - posX1;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    const posThreshold = slides[0].offsetWidth * 0.15;

    if (Math.abs(posFinal) > posThreshold) {
        if(posInit < posX1 && slideIndex > 0){
            slideIndex--;
        }
        else if(posInit > posX1 && slideIndex < slides.length - 1){
            slideIndex++;
        }
    }
    if (posInit !== posX1) {
        setSlide();
    }
}
function swipeStart(event){
    event.stopPropagation();

    if(event.touches){
        posInit = posX1 = event.touches[0].clientX;

        sliderTrack.style.transition = '';

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('mouseup', swipeEnd);
    }
}

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

document.querySelector('#on-the-first-screen').addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelector('.main').style.transition = 'transform 0.5s';
    document.querySelector('.main').style.transform = 'translate3d(0px, 0px, 0px)';
    slideIndex = 0;
});
document.querySelector('#first-screen-button').addEventListener('click', (event) => {
    event.stopPropagation();
    spermSwim();
    document.querySelector('.main').style.transition = 'transform 0.5s';
    document.querySelector('.main').style.transform = 'translate3d(-1024px, 0px, 0px)';
    slideIndex = 1;
});