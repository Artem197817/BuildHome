const swiper = new Swiper('.swiper', {
    centeredSlides: true, // Center the active slide
    slidesPerView: 'auto', // Allow variable width slides
    spaceBetween: 30, // Space between slides
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});