$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    // додаю додаткові обчислення для оффсету - див. правку №1
    // https://jira.everad.group/browse/PROD-3515?focusedCommentId=77634&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-7763
    var offset = 40;

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - offset
    }, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
    
    // Вивід дати (+ час).
    postDate();   

});

function postDate() {
    // Додаємо клас "date-N", де N - кількість "відмотаних" днів.
    // Наприклад, span class="date-0"></span> - мотає 0 днів назад (сьогодні).
    // Наприклад, span class="date-5"></span> - мотає 5 днів назад.

    // Вивід дати (+ години + хвилини), додаємо клас "time". Наприклад, <span class="date-1 time"></span>. 
    // Виводить у форматі на зразок "14.02.2018 14:22"
    // Працює як в порядку зростання, так і в порядку спадання (міняємо флажок нижче)
    var body = document.body,
        postLang = body.getAttribute('data-post-lang');

    var sa = body.getAttribute('data-post-format') || 'dd.mm.yyyy',
        msInDay = 86400000,
        counterLength = 90,  // Максимальна кількість вімотаних днів. Змінюємо за необхідності.
        months, 
        countryName = postLang ? postLang 
            : window.country_code ? window.country_code.toLowerCase() 
            : 'ru',  // Мова для місяців. 
        isAbbreviated = body.getAttribute('data-post-abbreviated') ? true : false, // Скорочений варіант місяців до трьох букв
        localDate = new Date();

    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    switch(countryName) {
        case 'it':  // Italy
            days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
            break;
        case 'es':  // Spain
            days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            break;
        case 'fr':  // France
            days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            break;
        case 'pt':  // Portugal
            days = ['Segund-feira', 'Terç-feira', 'Quart-feira', 'Quint-feira', 'Sext-feira', 'Sábado', 'Domingo'];
            break;
        case 'de':  // Germany
            days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
            break;
        case 'bg':  // Bulgaria
            days = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя']
            break;
        case 'pl':  // Poland
            days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
            break;
        case 'ro':  // Romania
            days = ['Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sîmbătă', 'Duminică'];
            break;
        case 'hu':  // Hungary (Угорщина)
            days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
            break;
        case 'gr':  // Greece
        case 'cy':  // Cyprus (Кіпр)
            days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή']
            break;
        case 'ru':  // Russia
        default:
            days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
            break;
    }
                                   
    switch(countryName) {
        case 'it':  // Italy
            months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            break;
        case 'es':  // Spain
            months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            break;
        case 'fr':  // France
            months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            break;
        case 'pt':  // Portugal
            months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'de':  // Germany
            months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            break;
        case 'bg':  // Bulgaria
            months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
            break;
        case 'pl':  // Poland
            months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
            break;
        case 'ro':  // Romania
            months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
            break;
        case 'hu':  // Hungary (Румунія)
            months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
            break;
        case 'gr':  // Greece
        case 'cy':  // Cyprus (Кіпр)
            months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
            break;
        case 'ru':  // Russia
        default:
            months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            break;
    }

    if (isAbbreviated) {
        for (var i = 0; i < months.length; i++) {
            months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
        }
    }

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date-" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() - counter * msInDay),
            timeCounter = 0,
            timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаємo як data-format="фомарт". 
                /// Формати дивитись в switch нижче. dd - числом, day - прописом.

                // Наприклад, <span class="date-1" data-format="dd month yyyy"></span> 
                // мотає на 1 день назад і виводить цей span у вигляді "14 Лютого 2018".
            } else {
                // Загальний формат виводу дати змінювати ТУТ!
                nodeList[i].innerHTML = format(date, sa); // Default: dd.mm.yyyy 
            }
            if (/\btime\b/.test(nodeList[i].className)) {
                nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
                timeCounter++;
            } 
        }
    }

    // <span clas="date-N"></span> - мотає час назад на N днів. Наприклад, <span className="date-5"></span>
    // <span clas="dateN"></span> - мотає час вперед на N днів. Наприклад, <span className="date5"></span>

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() + counter * msInDay),
            timeCounter = 0;

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
            } else {
                nodeList[i].innerHTML = format(date, sa);
            }
        }
    }

    function time(nodeList, reverse) {
        var timeArray = [], timeStatement = false;

        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className.match(/\btime\b/)) {
                if (nodeList[i].className.match(/\bdate-0\b/)) {
                    timeStatement = true;
                }
                timeArray.push(timeRandom(timeStatement));
            }
        }

        if (reverse) timeArray.sort(function(a, b) { return b - a; });
        else timeArray.sort(function(a, b) { return a - b; });

        return timeArray;
    } 

    function timeRandom(statement) {
        if (statement) {
            var date = new Date(),
                timeLimit = date.getHours() * 60 + date.getMinutes();

            return Math.round(0 + Math.random() * timeLimit);
        }
        return Math.round(0 + Math.random() * 1440);
    }

    function timeFormat(timearray) {
        var array = [];

        for (var i = 0; i < timearray.length; i++) {
        var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
            hours = htemp < 10 ? "0" + htemp : htemp,
            minutes = mtemp < 10 ? "0" + mtemp : mtemp; 
        array.push(hours + ":" + minutes);  
        }
        
        return array;
    }

    function notLastIteration(index, array) {
        return index !== array.length - 1;
    }

    function format(date, format) {
        var testFormat = ['dd', 'day', 'mm', 'month', 'yyyy', 'year'];
        var innerDate = format;

        var dd = date.getDate(),
            mm = date.getMonth() + 1,
            year = date.getFullYear(),
            month = months[mm - 1],
            day = days[new Date(year, mm - 1, dd).getDay()];

        dd = (dd < 10) ? ("0" + dd) : dd;
        mm = (mm < 10) ? ('0' + mm) : mm;

        var dateFormat = {
            day: day,
            dd: dd,
            year: year,
            yyyy: year,
            mm: mm,
            month: month
        };

        for (var i = 0; i < testFormat.length; i++) {
            var string = testFormat[i];
            var regExp = new RegExp(string);
            innerDate = innerDate.replace(regExp, dateFormat[string]);
        }

        return innerDate;
    }
}

// лічильник

// $(document).ready(function(){
//     $('.count').text(0);
//    var show = true;
//      var countbox = ".use";                                            // назва блоку з лічильником
//      $(window).on("scroll", function(){
//       if(!show) return false;                               // Відміна анімації, якщо вона уже була виконана
//       var w_top = $(window).scrollTop();                    // Кількість пікселів на яку прокручена сторінка
//       var e_top = $(countbox).offset().top - 1100;       // Відстань від блоку з лічильника до верху всього документу
//       var w_height = $(window).height();                    // Висота вікна браузера
//       var d_height = $(document).height();                  // Висота всього документа
//       var e_height = $(countbox).outerHeight();             // Повна висока блоку з лічильником
//       if(w_top >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
//        $('.count').each(function(){
//         $(this).animate({
//          count: $(this).data("name")
//         }, {
//          duration: 2500,                                                        //час анімації
//          easing: 'swing',
//          step:function(now){
//           $(this).text(Math.ceil(now));
//          }
//         });
//        });

//        show = false;
//       }
//      });
// });



// $(document).ready(function(){
//   $('.reviews__list').slick({
//     slidesToShow: 2,
//     dots: true,
//     centerMode: true,
//     infinite: false,
//     touchMove: false,
//     initialSlide: 1,
//     // centerPadding: '100px',
//     variableWidth: true,
//      responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         dots: false
//         // infinite: true
//       }
//     }
//     ]
//   });
// });


 /* $(function() {
    // другий слайд робимо поточним
    $('.reviews').find('slick-current').removeClass('.slick-current');

    // задаємо слайдам (сусідам центрального) класи
     var rev = $('.reviews__list');
    rev.on('init', function(event, slick, currentSlide) {
      var
        cur = $('.reviews .slick-current'),
        next = cur.next(),
        prev = cur.prev();
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
      cur.removeClass('slick-snext').removeClass('slick-sprev');
      slick.$prev = prev;
      slick.$next = next;
    });
    rev.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var
        cur = $(slick.$slides[nextSlide]);
      slick.$prev.removeClass('slick-sprev');
      slick.$next.removeClass('slick-snext');
      next = cur.next(),
        prev = cur.prev();
      prev.prev();
      prev.next();
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
      slick.$prev = prev;
      slick.$next = next;
      cur.removeClass('slick-next').removeClass('slick-sprev');
    });
    

    // лічильник слайдів
     rev.on('init', function(event, slick){
      slideCount = slick.slideCount;
      setSlideCount();
      setCurrentSlideNumber(slick.currentSlide);
    });

    rev.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
      var el = $('.reviews__count-total');
      el.text(slideCount);
    }

    function setCurrentSlideNumber(currentSlide) {
      var el = $('.reviews__count-cur');
      el.text(currentSlide + 1);
    }



    // фікс для бескінечного циклу
    rev.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      $('.slick-slide[data-slick-index=' + currentSlide + ']').addClass('slick-slide-active');
    })

        // налаштування слайдера
    rev.slick({
      speed: 1000,
      arrows: true,
      dots: false,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0',
      variableWidth: true,
      swipe: true,
    //   infinite: false,
      initialSlide: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            adaptiveHeight: true
          }
        }]
    });
     
 }); */

$(function() {
    var $owl = $('.reviews__list');

    $('.reviews__list').find('.reviews__item').each(function(index, elem) {
        $(elem).attr('data-count', index + 1);
    });

    $owl.on('initialized.owl.carousel', function(evt) {
        $('.reviews__count-cur').html(
            $('.owl-item.center .reviews__item').attr('data-count')
        );
        $('.reviews__count-total').html(evt.item.count);
        $('.owl-item.center').css(
            'height',
            $(this)
        );
    });

    $owl.on('translated.owl.carousel', function() {
        $('.reviews__count-cur').html(
            $('.owl-item.center .reviews__item').attr('data-count')
        );
    });

    $owl.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        center: true,
        startPosition: 2,
        responsive: {
            0: {
                items: 1
            },
            1024: {
                items: 3
            }
        }
    })
});



