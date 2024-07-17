const burger = document.getElementById('burger')

burger.addEventListener('click', function() {
    burger.classList.toggle('active')
    document.getElementById('menu__navigation').classList.toggle('active')
    document.body.classList.toggle('lock')
})