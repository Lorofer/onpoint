const scroll = document.querySelector('.scroll');
const scrollLine = document.querySelector('.scroll-line');
const scrollHeight = scroll.offsetHeight;
const scrollLineHeight = scrollLine.offsetHeight;

const textBlock = document.querySelector('.text-block');
const textBlockHeight = textBlock.offsetHeight;
const text = document.querySelector('.text');
const textHeight = text.offsetHeight;

let posInit = 0;
let posY1 = 0;
let posY2 = 0;

function scrollEnd(event){
    event.stopPropagation();

    document.removeEventListener('touchmove', scrollAction);
    document.removeEventListener('mousemove', scrollAction);
    document.removeEventListener('touchend', scrollEnd);
    document.removeEventListener('mouseup', scrollEnd);
}
function scrollAction(event){
    event.stopPropagation();

    const trfRegExp = /[-0-9.]+(?=px)/;
    const transformValueY = +scroll.style.transform.match(trfRegExp)[0];

    let touchPoint = event.touches[0].clientY;

    posY2 = posY1 - touchPoint;
    posY1 = touchPoint;

    if (transformValueY <= 0 && posInit > posY1) {
        scroll.style.transform = 'translateY(0px)';
        return;
    }
    else if (transformValueY >= scrollLineHeight - scrollHeight && posInit < posY1) {
        scroll.style.transform = `translateY(${scrollLineHeight - scrollHeight}px)`;
        return;
    }

    text.style.transform = `translateY(-${
        (textHeight - textBlockHeight + 64) * (transformValueY / (scrollLineHeight - scrollHeight)).toFixed(2)
    }px)`;
    scroll.style.transform = `translateY(${transformValueY - posY2}px)`;
}
function scrollStart(event){
    event.stopPropagation();

    if(event.touches){
        posInit = posY1 = event.touches[0].clientY;

        document.addEventListener('touchmove', scrollAction);
        document.addEventListener('touchend', scrollEnd);
        document.addEventListener('mousemove', scrollAction);
        document.addEventListener('mouseup', scrollEnd);
    }
}

scroll.style.transform = 'translateY(0px)';
text.style.transform = 'translateY(0px)';

scroll.addEventListener('touchstart', scrollStart);
scroll.addEventListener('mousedown', scrollStart);