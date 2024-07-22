const imageObjectArray = [
    {
        url: 'https://ichef.bbci.co.uk/news/999/cpsprodpb/FCD4/production/_131942746_33.jpg',
        description: 'autumn picture',
        id: getId(),
    },
    {
        url: 'https://ichef.bbci.co.uk/news/999/cpsprodpb/FCD4/production/_131942746_33.jpg',
        description: 'autumn picture',
        id: getId(),
    },
    {
        url: 'https://ichef.bbci.co.uk/news/999/cpsprodpb/FCD4/production/_131942746_33.jpg',
        description: 'autumn picture',
        id: getId(),
    },
    {
        url: 'https://images.pexels.com/photos/26997896/pexels-photo-26997896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'girl picture',
        id: getId(),
    },
]


const form = document.getElementById('form')
const imagesContainer = document.getElementById('images-container')
const lightboxEl = document.getElementById('lightbox')

generateGallery()

imageObjectArray.forEach(image => {
    document.addEventListener('click', function(e){
        if (e.target.id === image.id){
            lightboxEffect(image, e.target.dataset.index)
        }
    })
})

lightboxEl.addEventListener('click', function(e){
    console.log(e.target)
    if (e.target !== e.currentTarget) return
    lightboxEl.classList.remove('active')
})

form.addEventListener('submit', function(e) {
    e.preventDefault()
    const url = document.getElementById('url-input').value
    const description = document.getElementById('description-input').value
    
    imageObjectArray.push({
        url: url,
        description: description,
        id: getId()
    })
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
    let imageHtml = ''
    imageObjectArray.map((imgObject, index) => {
        imageHtml += `
        <div class="swiper-slide"
            <div class="image">
                <img id=${imgObject.id} src=${imgObject.url} alt=${imgObject.description}  data-index=${index}>
                <p>${imgObject.description}</p>
            </div>
        </div>
        `
    })
    return imageHtml
}

console.log(generateSwipeHtml())

function lightboxEffect(image, index){
    lightboxEl.innerHTML = `
        <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <div class="swiper-slide"
                <div class="image">
                    <img  src=${image.url} >
                </div>
            </div>
            <div class="swiper-slide"
                <div class="image">
                    <img  src=${image.url} >
                </div>
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>


        </div>
    `

    // фінальна версія коду повинна юула бути такою, але щось зламалось
    // `
    //      <div class="swiper">
    //         <div class="swiper-wrapper">
    //         ${generateSwipeHtml()}
    //         </div>
            
    //         <div class="swiper-button-prev"></div>
    //         <div class="swiper-button-next"></div>
    //     </div>
    // `
    lightboxEl.classList.add('active')

    new Swiper('.swiper', {
        loop: true,
        // initialSlide: index,

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      });
}

function getId(){
    const id = 'id' + Math.random().toString(16).slice(2)
    return id
}





