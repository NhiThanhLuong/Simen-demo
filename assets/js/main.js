const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const bulletList = document.getElementsByClassName('bullet')
const bulletListAr = Array.from(bulletList)
const bullets = $('.bullets')
const imageList = $('.image__list')

let currentIndex = 0
bulletList[currentIndex].classList.add('selected');

const changeImageAnimate = (index) => {
    destroyImage(index)
    const imageItem = document.getElementsByClassName(`image__item${index}`)
    imageList.insertAdjacentHTML("beforeend", `<div class='image__item${index}'></div>`)
        // imageItem[0].style.backgroundPosition = '0'
    const w = imageItem[0].offsetWidth
    for (let i = 1; i < 5; i++) {
        imageList.insertAdjacentHTML("beforeend", `<div class='image__item${index}'></div>`)
        imageItem[i].style.backgroundPosition = `-${w * i}px 0`
        imageItem[i].style.left = `${w * i}px`
        imageItem[i].style.animationDelay = `${i * 0.05}s`
    }
    Array.from(imageItem).forEach(el => el.style.zIndex = '2')
}

const destroyImage = (index) => {
    const ImageItem = document.getElementsByClassName(`image__item${index}`)
    ImageItem.length && Array.from(ImageItem).forEach(el => el.remove())
}

const hiddenImage = (index) => {
    const imageItem = document.getElementsByClassName(`image__item${index}`)
    Array.from(imageItem).forEach(el => {
        el.style.zIndex = '1'
    })
}
changeImageAnimate(currentIndex)
    // changeBullet()

const inactivityTime = function() {
    var time;
    window.onload = resetTimer;
    // Change selected when click
    bullets.onclick = (event) => {
        resetTimer
        if (bulletListAr.find(bullet => bullet === event.target)) {
            bulletList[currentIndex].classList.remove('selected')
            event.target.classList.add('selected');
            const bulletSeleted = $('.bullet.selected')
            if (bulletListAr.indexOf(bulletSeleted) !== currentIndex) {
                hiddenImage(currentIndex)
                const nextIndex = bulletListAr.indexOf(bulletSeleted)
                currentIndex = nextIndex
                changeImageAnimate(currentIndex)
            }
        }
    }

    function logout() {
        bulletList[currentIndex].classList.remove('selected')
        hiddenImage(currentIndex)
        currentIndex++;
        if (currentIndex >= bulletList.length) { currentIndex = 0 }
        bulletList[currentIndex].classList.add('selected')
        changeImageAnimate(currentIndex)
    }

    function resetTimer() {
        clearInterval(time)
        time = setInterval(logout, 5000)
    }
};
inactivityTime()

// Hover icon of product
const boxInnerItems = document.getElementsByClassName('box-inner__item')

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

Array.from(boxInnerItems).forEach(item => {
    item.onmouseover = function() {
        const productImgInfo = getParent(this, '.product-img-info')
        productImgInfo.style.overflow = 'initial'
        this.onmouseout = () => productImgInfo.style.overflow = 'hidden'
    }
})

// Scroll horizontal next and prew Button
const scrollHorizontal = function(container, sliderClass, step) {
    let slider = container.getElementsByClassName(sliderClass)[0]
    let prewButton = container.querySelector('.prew-button')
    let nextButton = container.querySelector('.next-button')
    let start = true;

    function nextSlider() {
        let brand = slider.firstElementChild;

        if (start) slider.firstElementChild.style.marginLeft = step;
        else {
            slider.appendChild(brand);
            brand.style.marginLeft = '0px';
            slider.firstElementChild.style.marginLeft = step;
        }
        start = false;
    }

    if (nextButton) nextButton.onclick = nextSlider

    function prewSlider() {
        let lastBrand = slider.lastElementChild;
        let firstBrand = slider.firstElementChild;
        if (start) {
            slider.insertBefore(lastBrand, firstBrand);
            slider.firstElementChild.style.marginLeft = step
        }
        setTimeout(function() { slider.firstElementChild.style.marginLeft = '0px' }, 0)
        start = true
    }

    if (prewButton) prewButton.onclick = prewSlider

    return {
        nextSlider: nextSlider,
        prewSlider: prewSlider
    }
}
scrollHorizontal($('.products__most-viewed__container'), 'products__most-viewed', '-25%')
scrollHorizontal($('.products__lastest-posts__container'), 'products__lastest-posts', '-33.33333%')
const logoScrollHorizontal = scrollHorizontal($('.donor-logo__container'), 'donor-logo', '-16.66667%')
setInterval(logoScrollHorizontal.nextSlider, 3000)