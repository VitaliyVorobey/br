$(document).ready(function () {
    var navMenu = document.getElementById('navMenu');
    if (navMenu != null ? true : false) {
        var menu = navMenu.querySelectorAll('.menu');
        for (var m = 0; m < menu.length; m++) {
            menu = menu[m];
        }
        var iconMenuBtn = navMenu.querySelectorAll('.fas');
        for (var c = 0; c < iconMenuBtn.length; c++) {
            iconMenu = iconMenuBtn[c];
        }
        var btnClose = navMenu.querySelectorAll('.navbar__menu-close');
        for (var x = 0; x < btnClose.length; x++) {
            btnClose[x].addEventListener('click', closeNavbarMenu);
            close = btnClose[x];
        }

        function toggleNavbarMenu() {
            if (menu.style.maxHeight) {
                closeNavbarMenu();

            } else {
                iconMenu.classList.add('fa-times');
                iconMenu.classList.remove('fa-bars');
                menu.style.maxHeight = menu.scrollHeight + "px"
                close.classList.add('show');
            }
        }

        function closeNavbarMenu() {
            menu.style.maxHeight = null;
            iconMenu.classList.remove('fa-times');
            iconMenu.classList.add('fa-bars');
            close.classList.remove('show');
        }

        var navMenuBtn = navMenu.querySelectorAll('.navbar__menu-btn');
        for (var i = 0; i < navMenuBtn.length; i++) {
            navMenuBtn[i].addEventListener('click', toggleNavbarMenu)
        }
        var menuLink = navMenu.querySelectorAll('.menu__list-item-link');
        for (var k = 0; k < menuLink.length; k++) {
            menuLink[k].addEventListener('click', closeNavbarMenu)
        }
        $(window).scroll(closeNavbarMenu);

    }
});



