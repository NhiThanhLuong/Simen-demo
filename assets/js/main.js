const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const bulletList = document.getElementsByClassName('bullet')
const bulletListAr = Array.from(bulletList)
const bullets = $('.bullets')
const imageList = $('.image__list')
    // const app = {
    //     currentIndex: 0,
    //     handle: () => {
    //         const bulletSeleted = $('.bullet.selected')
    //         console.log(bulletListAr.indexOf(bulletSeleted));
    //     },
    //     changeImageAnimate: (nextIndex) => {
    //         console.log(imageList.innerHTML);
    //         const imageItem = document.getElementsByClassName(`image__item${nextIndex}`)
    //         imageList.innerHTML += `<div class='image__item${nextIndex}'></div>`
    //         const w = imageItem[0].offsetWidth

//         for (let i = 1; i < 5; i++) {
//             imageList.innerHTML += `<div class='image__item${nextIndex}'></div>`
//             imageItem[i].style.backgroundPosition = `-${w * i}px`
//             imageItem[i].style.animationDelay = `${i * 0.05}s`
//         }
//     },
//     changeBullet: () => {
//         bullets.onclick = (event) => {
//             if (bulletListAr.find(bullet => bullet === event.target)) {
//                 bulletListAr.forEach(bullet => {
//                     bullet.classList.remove('selected')
//                 })
//                 event.target.classList.add('selected');
//                 const bulletSeleted = $('.bullet.selected')
//                 return bulletListAr.indexOf(bulletSeleted)
//             }
//         }
//     },
//     start: () => {
//         app.changeImageAnimate(app.changeBullet())

//     }
// }

let currentIndex = 0
bulletList[currentIndex].classList.add('selected');
// Change selected when click
const changeBullet = () => {
    bullets.onclick = (event) => {
        if (bulletListAr.find(bullet => bullet === event.target)) {
            bulletListAr.forEach(bullet => {
                bullet.classList.remove('selected')
            })
            event.target.classList.add('selected');
            const bulletSeleted = $('.bullet.selected')
                // return bulletListAr.indexOf(bulletSeleted)
            if (bulletListAr.indexOf(bulletSeleted) !== currentIndex) {
                hiddenImage(currentIndex)
                    // Assign current index = next index
                currentIndex = bulletListAr.indexOf(bulletSeleted)
                changeImageAnimate(currentIndex)
            }
        }
    }
}

// 
const changeImageAnimate = (index) => {
    destroyImage(index)
    const imageItem = document.getElementsByClassName(`image__item${index}`)
    imageList.insertAdjacentHTML("beforeend", `<div class='image__item${index}'></div>`)
    console.log(imageList);
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
changeBullet()