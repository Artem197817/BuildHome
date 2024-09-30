

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
    
                let name = $('#inputName', this).val();
                let phone = $('#phone', this).val();
    
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

    const technologyInfoArrow = $('.technology-info-arrow')

    $('.technology-dot').on('click', function() {
        const classes = $(this).attr('class'); 

        let title;
        let text;

        switch (true) { 
            case classes.includes('dot1'):
                title ='Неразрывний каркас'
                text = 'Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.'
                break;

            case classes.includes('dot2'):
                title ='5 камерные окна'
                 text = 'Обеспечивает исключительную сохранность тепла в доме'
                break;

            case classes.includes('dot3'):
                title ='Плитная ветрозащита'
                text = 'Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен'
                break;

             case classes.includes('dot4'):
                title ='Сборка силовых узлов'
                text = 'Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции'
                break

             case classes.includes('dot5'):
                title ='Диагональный раскос'
                text = 'Система диагональных раскосов позволяет создать оптимальный вентиляционный зазор для капитальных стен и наружной отделки'
                break;
    
            default:
                console.log('No matching class found');
              
        }
        technologyInfoArrow.css();
        $('.technology-info-title.min').text(title);
        $('.technology-info-text.min').text(text);

    });

    $(window).click((e) => {
        if ($(e.target).is(technologyInfoArrow)) {
            technologyInfoArrow.css({ display: 'none' });
        }
    }); 

    let menu = $('.menu-pop-up');

    $('.menu').click(()=>{
        menu.css('display', 'block');
    });

    $('.close-menu').click(()=>{
        menu.css('display', 'none');
    })

    $(window).click((e) => {
        if ($(e.target).is(menu)) {
            menu.css({ display: 'none' });
        }
    }); 

    function updateLeftPosition() {
        const fixedElement = document.querySelector('.my-arrow-down');
        const containerWidth = document.querySelector('body').clientWidth;

        let leftPosition;

        if (containerWidth >= 1920) {
            leftPosition = 305; 
        } else if (containerWidth <= 1200) {
            leftPosition = -55; 
        } else {
            leftPosition = (containerWidth - 1200) / 2 - 70;
        }

        fixedElement.style.left = `${leftPosition}px`;
    }
    
    window.addEventListener('load', updateLeftPosition);
    window.addEventListener('resize', updateLeftPosition);

    window.addEventListener('scroll', () => {

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            consultationPopUp.css({ display: 'flex' });
        }
    });

    const consultationPopUp = $('.consultation-pop-up')

    $('.consultation-pop-up-link').click(() => {

        consultationPopUp.css({ display: 'none' });

    });

    $(window).click((e) => {
        if ($(e.target).is(consultationPopUp)) {
           consultationPopUp.css({ display: 'none' });
        }
    });

    $('.project-image-link').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 500,
            easing: 'ease-in-out',

        }
    });
    $('.project-link-block').click(()=>{
        $('.more').css({ display: 'flex' });
    });

});