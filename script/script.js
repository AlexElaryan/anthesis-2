const burgerBtn = document.querySelector('.burger-btn');
const burgerMenu = document.querySelector('.burger-menu');
burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
})

const modal = document.querySelector('.modal');
const contactBtns = document.querySelectorAll('.black-btn');

contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
    })
})

modal.addEventListener('click', (e) => {
    if (e.target === modal && !e.target.classList.contains('contact-form')) {
        modal.classList.remove('active');
    }
})