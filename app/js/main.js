/* Copyright (c) 2021 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

$(document).ready(function () {
    var header = $('.header');
    var topBlock = $('.top-block');
    var headerOffset = header.outerHeight();

    //Fix header
    $(window).scroll(function () {
        console.log(headerOffset);
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            header.addClass('header--fixed');
            topBlock.css('padding-top', headerOffset);
        } else {
            topBlock.css('padding-top', 0);
            header.removeClass('header--fixed');
        }
    });

    //Header mobile

    var headerMobile = $('.header-mobile');
    var hamburgerBtn = $('.header-hamburger, .header-hamburger--static');
    var headerMobileClose = $('.header-mobile__close');

    hamburgerBtn.on('click', function () {
        headerMobile.addClass('header-mobile-height');
    });

    headerMobileClose.on('click', function () {
        headerMobile.removeClass('header-mobile-height');
    });

    var headerMobileA = $('.header-mobile a');
    headerMobileA.on('click', function () {
      headerMobile.removeClass('header-mobile-height');
    });

    //Smooth scroll
    $('.header__wrap a, .header-mobile a ').smoothScroll({offset: -headerOffset});

    //Components slider
    $('.components-descr-slides').slick({
        fade: true,
        infinite: true,
        dots: false,
        asNavFor: '.phone-slides'
    });

    $('.phone-slides').slick({
        infinite: true,
        dots: false,
        arrows: false,
        asNavFor: '.components-descr-slides'
    });

    var labelComponent = $('.components-slider-labels__item');
    var activeLAbel = $('.components-slider-labels__item--active');
    var index = activeLAbel.attr('data-index');

    labelComponent.on('click', function () {
        labelComponent.removeClass('components-slider-labels__item--active');
        activeLAbel = $(this);
        activeLAbel.addClass('components-slider-labels__item--active');
        var index = $(this).attr('data-index');
        $('.components-descr-slides').slick('slickGoTo', parseInt(index), false);
    });

    var prev = $('.components-descr-slides .slick-prev');
    var next = $('.components-descr-slides .slick-next');

    function changeLabel() {
        var activeSlide = $(".components-block .slick-current").attr('data-slick-index');
        var label = $("li[data-index=" + activeSlide + "]");
        labelComponent.removeClass('components-slider-labels__item--active');
        label.addClass('components-slider-labels__item--active');
    }

    next.on('click', function () {
        changeLabel()
    });
    prev.on('click', function () {
        changeLabel()
    });


    //Complete projects sliders

    $('.netoptikaSlider').slick({
        infinite: true,
        dots: false,
        arrows: true,
    });

    $('.vsemaikiSlider').slick({
        infinite: true,
        dots: false,
        arrows: true,
    });

    $('.rosinkaSlider').slick({
        infinite: true,
        dots: false,
        arrows: true,
    });

    $('.giftmakerSlider').slick({
        infinite: true,
        dots: false,
        arrows: true,
    });


    //Check project
    var project = $('.projects-list-item');
    var projectSlider = $('.project-slider');


    project.on('click', function () {
        project.removeClass('projects-list-item--checked');
        $(this).addClass('projects-list-item--checked');

        var index = $(this).attr('data-key');
        var activeSlide = $("ul[data-project-slider-key=" + index + "]");
        projectSlider.removeClass('project-slider--visible');
        activeSlide.addClass('project-slider--visible');
        $(".project-slider").slick("refresh");
    });


    //Popup-form

    var getInBtn = $('.get-btn');
    var closeBtn = $('.popup-form__close');
    var overlay = $('.overlay');
    var popUpForm = $('.popup-form__wrap');

    var appStoreLink = $('.mobile-links__store__app-store');
    var popUpFormTitle = $('.popup-form__title');

    function openPopUp(title) {
        popUpForm.addClass('visibleF');
        if (arguments.length) {
            popUpFormTitle.text(title);
        }
    }

    function closePopUp() {
      var popUpFormName = $('#popup-form-name');
      var popUpFormMail = $('#popup-form-mail');
      var popUpFormPhone = $('#popup-form-phone');
      popUpFormName.val('');
      popUpFormMail.val('');
      popUpFormPhone.val('');
      popUpForm.removeClass('visibleF');
      $(popUpFormTitle).text('');
    }

    getInBtn.on('click', function () {
        openPopUp();
        popUpFormTheme = popUpFormThemeContactUs;
    });

    appStoreLink.on('click', function () {
      if (getCurrentLanguage() === 'ru') {
        openPopUp('Запрос на доступ к демо приложению.');
      } else {
        openPopUp('Experience our TestFlight version on iOS.');
      }
      popUpFormTheme = popUpFormThemeGetIOSApp;
    });

    closeBtn.on('click', function () {
        closePopUp()
    });

    //Send popUpForm
    var popUpFormName = $('#popup-form-name');
    var popUpFormMail = $('#popup-form-mail');
    var popUpFormPhone = $('#popup-form-phone');
    var popUpFormTheme = null;
    const popUpFormThemeContactUs = 'contact-us';
    const popUpFormThemeGetIOSApp = 'get-ios-app';

    var popUpFormWarning = $('.popup-form__warning');

    var popUpFormNameWarning = $('#popup-form-name + img');
    var popUpFormMailWarning = $('#popup-form-mail + img');
    var popUpFormPhoneWarning = $('#popup-form-phone + img');

    $(".popup-form").on('submit', function (e) {
        e.preventDefault();
        var x = true;
        if (popUpFormName.val() == "") {
            popUpFormNameWarning.addClass("warning");
            popUpFormWarning.addClass("warning");
            x = false;
        }
        if (popUpFormMail.val() == "") {
            popUpFormMailWarning.addClass("warning");
            popUpFormWarning.addClass("warning");
            x = false;
        }
        if (popUpFormPhone.val() == "") {
            popUpFormPhoneWarning.addClass("warning");
            popUpFormWarning.addClass("warning");
            x = false;
        }
        if (x) {
            $.ajax({
                url: ('https://icerockdev.com/mail.php?type=mcommerce'),
                type: 'POST',
                data: {
                    name: popUpFormName.val(),
                    email: popUpFormMail.val(),
                    phone: popUpFormPhone.val(),
                    theme: popUpFormTheme,
                    referrer: document.referrer
                },
            })
            .done(function (e) {
                closePopUp();
                alert("Your message has been sent!");
            })
            .fail(function (e) {
                alert("Error!");
            })
        }

    });

    $(".popup-form input").on('focus', function (e) {
        $(this).parent('div').children('img').removeClass("warning");
        popUpFormWarning.removeClass("warning");
    });

    //Send Contact Form

    var contactFormName = $('#contact-form-name');
    var contactFormMail = $('#contact-form-mail');
    var contactFormPhone = $('#contact-form-phone');

    var contactFormWarning = $('.contacts-block-form__warning');
    var contactFormNameWarning = $('#contact-form-name + img');
    var contactFormMailWarning = $('#contact-form-mail + img');
    var contactFormPhoneWarning = $('#contact-form-phone + img');

    $(".contact-form").on('submit', function (e) {
      e.preventDefault();
      var x = true;
      if (contactFormName.val() == "") {
        contactFormNameWarning.addClass("warning");
        contactFormWarning.addClass("warning");
        x = false;
      }
      if (contactFormMail.val() == "") {
        contactFormMailWarning.addClass("warning");
        contactFormWarning.addClass("warning");
        x = false;
      }
      if (contactFormPhone.val() == "") {
        contactFormPhoneWarning.addClass("warning");
        contactFormWarning.addClass("warning");
        x = false;
      }
      if (x) {
        $.ajax({
          url: 'https://icerockdev.com/mail.php?type=mcommerce',
          type: 'POST',
          data: {
            name: contactFormName.val(),
            email: contactFormMail.val(),
            phone: contactFormPhone.val(),
            referrer: document.referrer
          },
        })
        .done(function (e) {
          cleanContactUs();
          alert("Your message has been sent!");
        })
        .fail(function (e) {
          alert("Error!");
        })
      }

      $(".contact-form input").on('focus', function (e) {
        $(this).parent('div').children('img').removeClass("warning");
        contactFormWarning.removeClass("warning");
      });
    });

    function cleanContactUs() {
      contactFormName.val('');
      contactFormMail.val('');
      contactFormPhone.val('');
    }

  // Choose language.

  $('.lang-panel-flag').on('click', function (e) {
    e.preventDefault();

    var currentLanguage = getCurrentLanguage() === 'ru' ? 'en' : 'ru';
    setLanguage(currentLanguage);
  });

  var langParam = getAllUrlParams().lang;
  if (langParam !== undefined) {
    if (langParam === 'ru') {
      setLanguage('ru');
    } else {
      setLanguage('en');
    }
  } else {
    setLanguage(getCurrentLanguage());
  }

  /// disable scroll


  function disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }

});

function InvalidMsg(textbox) {
  if (textbox.validity.typeMismatch) {
    var currentLanguage = getCurrentLanguage();
    if (currentLanguage === 'ru') {
      textbox.setCustomValidity('Пожалуйста, введите действительный адрес электронной почты');
    } else {
      textbox.setCustomValidity('Please enter a valid email address');
    }
  } else {
    textbox.setCustomValidity('');
  }
  return true;
}


// localization

function getCurrentLanguage() {
  function checkBrowserLanguage() {
    var lang = (navigator.language || navigator.userLanguage).split("-")[0];
    return lang;
  }

  var currentLanguage = localStorage.getItem('lang') || checkBrowserLanguage();
  return currentLanguage;
}

function setLanguage(lang) {
  $("[data-localize]").localize("localize", {
    language: lang,
    callback: function(data, defaultCallback){
      $('body').removeClass('body-hidden');
      defaultCallback(data);
    }
  });

  $('.lang-panel-flag').removeClass('is-en').removeClass('is-ru').addClass('is-'+lang);
  localStorage.setItem('lang', lang);
}

// parse url
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}