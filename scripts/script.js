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

    const forms = document.querySelectorAll('.consultation-order-form');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            this.classList.remove('was-validated');
            event.preventDefault();
            event.stopPropagation();
            this.classList.add('was-validated');
    
            // Валидация инпутов внутри текущей формы
            $(this).find('input').each(function () {
                if (!this.checkValidity()) {
                    $(this).addClass('is-invalid');
                    $(this).next().css({ display: 'block' });
                } else {
                    $(this).removeClass('is-invalid');
                    $(this).next().css({ display: 'none' });
                }
            });
    
            // Проверка валидности всей формы
            if (this.checkValidity()) {
                this.classList.remove('was-validated');
    
                let name = $('[name="name"]', this).val();
                let phone = $('[name="phone"]', this).val();
    
                // Отправка данных формы
                $.ajax({
                    url: 'https://testologia.ru/checkout',
                    type: 'POST',
                    data: {
                        name: name,
                        phone: phone
                    },
                    success: function (response) {
                        if (response.success === 1) {
                           successInfo('Спасибо, мы свяжемся с вами в ближайшее время!', form);
                        } else {
                           successInfo('Возникла ошибка при оформлении, позвоните нам и запишитесь', form);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Произошла ошибка:', error);
                    }
                
                });
            }
        });
    });

    let popUp = $('.pop-up-my');
    let popUpForm;
    let popUpMessage;
    let popUpMsg;

    function successInfo(message, form) {
        if(form.id === 'consultation-form'){
             popUpForm =$('#consultation-form');
             popUpMessage=$('.consultation-order-message');
             popUpMsg=$('#consultation-message')
        }else{
            popUpForm =$('#pop-up-form');
             popUpMessage=$('.pop-up-message');
              popUpMsg = $('#pop-up-msg')
        }
        popUpForm.css({ display: 'none' });
        popUpMessage.css({ display: 'flex' });
        popUpMsg.text(message);
        form.reset();
       
        
    }
   

    $('#button-tour').click((e)=>{
        popUp.css('display', 'flex');
        console.log(popUp)
        console.log( $('#button-tour'))
        $('#pop-up-msg').css('display', 'flex');
    });

    $('.close-pop').click(() => {
        popUp.css({ display: 'none' });
        popUpForm.css({ display: 'flex' });
        popUpMessage.css({ display: 'none' });
        
        
    });

    $(window).click((e) => {
        if ($(e.target).is(popUp)) {
            popUp.css({ display: 'none' });
            popUpForm.css({ display: 'flex' });
            popUpMessage.css({ display: 'none' });
        }
    }); 

    $('.close-order').click(() => {
        $('#consultation-form').css({ display: 'flex' });
        $('.consultation-order-message').css({ display: 'none' });
        
        
    });

});