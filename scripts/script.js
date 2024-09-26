$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();


const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 0,
    freeMode: true,
    centeredSlides: true,
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

 const form = document.querySelector('.consultation-order-form');

    form.addEventListener('submit', function (event) {

        form.classList.remove('was-validated');

        event.preventDefault();
        event.stopPropagation();

        form.classList.add('was-validated');

        $('.consultation-order-form input').each(function () {

            if (!this.checkValidity()) {
                $(this).addClass('is-invalid');
                $(this).next().css({
                    display: 'block'
                })
            } else {
                $(this).removeClass('is-invalid');
                $(this).next().css({
                    display: 'none'
                })
            }
        });
      //  const loader = $('.loader-container');

        if (form.checkValidity()) {
            form.classList.remove('was-validated');

            let name = $('#inputName').val();
            let phone = $('#phone').val();

           // loader.css('display', 'flex');
            $.ajax({
                url: 'https://testologia.ru/checkout',
                type: 'POST',
                data: {
                    name: name,
                    phone: phone
                },

                success: function (response) {
                    if (response.success === 1) {
                       // successInfo('Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!', form)
                    } else {
                       // successInfo('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ', form)
                    }
                   // loader.hide();
                },
                error: function (xhr, status, error) {
                    console.error('Произошла ошибка:', error);
                }
            });
        }
    });


function successInfo(message, form) {

    $('.order-info-form').css('display', 'none');
    $('.order-success-info').css('display', 'flex').text(message);
    form.reset();
}


});