let imageObjectArray = []
const form = document.getElementById('form')
const imagesContainer = document.getElementById('images-container')
const lightboxEl = document.getElementById('lightbox')

getItemsFromLocal()
generateGallery()

imageObjectArray.forEach(image => {
    document.addEventListener('click', function(e){
        if (e.target.id === image.id){
            lightboxEffect(e.target.dataset.index)
        }
    })
})

lightboxEl.addEventListener('click', function(e){
    if (e.target !== e.currentTarget) return
    lightboxEl.classList.remove('active')
})

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let url = document.getElementById('url-input').value
    let description = document.getElementById('description-input').value
    
    localStorage.setItem(`${getId()}`, JSON.stringify({
        url: url,
        description: description
    })) 

    url = ''
    description = ''
    getItemsFromLocal()
    generateGallery()
})

function generateGallery(){
    imagesContainer.innerHTML = ''
    imagesContainer.innerHTML = generateHtml()
}

function generateHtml(){
    let imageHtml = ''
    imageObjectArray.map((imgObject, index) => {
        imageHtml += `
            <div class="image">
                <img id=${imgObject.id} src=${imgObject.url} alt=${imgObject.description}  data-index=${index}>
                <p>${imgObject.description}</p>
            </div>
        `
    })
    return imageHtml
}

function generateSwipeHtml(){
    let imageHtml = '';
    imageObjectArray.forEach((imgObject, index) => {
        imageHtml += `
        <div class="swiper-slide">
            <div class="image">
                <img id="${imgObject.id}" src="${imgObject.url}" alt="${imgObject.description}" data-index="${index}">
                <p>${imgObject.description}</p>
            </div>
        </div>
        `;
    });
    return imageHtml;
}

function lightboxEffect(index){
    lightboxEl.innerHTML = `
        <div class="swiper">
            <div class="swiper-wrapper">
                ${generateSwipeHtml()}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    `;
    lightboxEl.classList.add('active');

    new Swiper('.swiper', {
        loop: true,
        initialSlide: index,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
    });
}



function getItemsFromLocal(){
    let itemsNames = []
    for (let i = 0; i < localStorage.length; i++){
        itemsNames.push(localStorage.key(i))
    }
    
    const localStorageItems = itemsNames.map(item => {
        return localStorage.getItem(item)
    })
    
    imageObjectArray = localStorageItems.map(obj => {
        let object = JSON.parse(obj)
        return object = {...object,
            id: getId()
        }
    })
    
}


function getId(){
    const id = 'id' + Math.random().toString(16).slice(2)
    return id
}





