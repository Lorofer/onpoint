const list1 = document.querySelector('#list-1');
const list2 = document.querySelector('#list-2');
const pupUp = document.querySelector('.pop-up');
const point1 = document.querySelector('#point-1');
const point2 = document.querySelector('#point-2');

document.querySelector('#third-slide-button').addEventListener('click', (event) => {
    event.stopPropagation();
    pupUp.style.display = 'block';
    pupUp.style.animation = 'show-block 0.3s linear forwards';
});

document.querySelector('#cross').addEventListener('click', (event) => {
    event.stopPropagation();
    pupUp.style.animation = 'hide-block 0.3s linear forwards';
    setTimeout(() => pupUp.style.display = 'none', 333);
});

document.querySelector('#back').addEventListener('click', (event) => {
    event.stopPropagation();
    list2.style.animation = 'hide-block 0.3s linear forwards';
    setTimeout(() => {
        list2.style.display = 'none';
        list1.style.display = 'block';
        list1.style.animation = 'show-block 0.3s linear forwards';

        point2.classList.remove('active');
        point1.classList.add('active');
    }, 333);
});
document.querySelector('#next').addEventListener('click', (event) => {
    event.stopPropagation();
    list1.style.animation = 'hide-block 0.3s linear forwards';
    setTimeout(() => {
        list1.style.display = 'none';
        list2.style.display = 'block';
        list2.style.animation = 'show-block 0.3s linear forwards';

        point1.classList.remove('active');
        point2.classList.add('active');
    }, 333);
});