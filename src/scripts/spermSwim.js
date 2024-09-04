export function spermSwim(){
    let spermArray = document.querySelectorAll('.sperm-block-2');
    spermArray.forEach((sperm) => {
        sperm.style.animation = "";
        sperm.style.animation =
            `layer-sperm 3s alternate ease-in-out ${Math.random() * 1.5}s forwards`;
    });
}

export function removeSperm(){
    let spermArray = document.querySelectorAll('.sperm-block-2');
    spermArray.forEach((sperm) => {
        sperm.style.animation = "";
    });
}