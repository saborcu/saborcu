//--------------------------------FROM HERE TO END OF SECTION, USED FOR SMOOTHSCROLL-----------------------------

//**Returns total pixels scrolled by user (Current position of page).*//
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
        return self.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    }
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
        return document.body.scrollTop;
    }
    return 0;
}

//**Returns distance between current div and next div.**//
function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    while (elm.offsetParent && elm.offsetParent != document.body) {
        y += elm.offsetParent.offsetTop;
    }
    return y;
}

//**Depending on position of closest parent element, either scrolls up or down**//
function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = 7;
    var step = 10;
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer + speed + timer + timer);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

//--------------------------------FROM HERE TO TOP OF SECTION, USED FOR SMOOTHSCROLL-----------------------------//


//----Calls smoothScroll(eID) based on element clicked----//
function scroller() {
    if (this.id == "arrow1") {
        smoothScroll("SP");
    }
    else if (this.id == "arrow2") {
        smoothScroll("FP");
    }
    else if (this.id == "arrow3") {
        smoothScroll("TP");
    }
    else if (this.id == "arrow4") {
        smoothScroll("top");
    }
}

//-----Triggers text animation on opening of page------//
function textAtStart() {
    var quick = document.getElementById("tText").querySelectorAll("span");
    setTimeout(function () { typist(0); }, 970);
    function typist(index) {
        if (quick.length > index) {
            setTimeout(function () {
                quick[index].style.opacity = 1;
                typist(++index);
            }, 18);
        }
    }
}

//----Sets up eventListener for menu button.----//
function menuEventListen() {
    var getter = document.getElementById("Scont");
    getter.addEventListener('click', menuShower, false);
}

//-------Sets up an eventListener for arrow buttons.------//
function arrowEventListen() {
    var arrClass = document.getElementsByClassName("arrow");
    for (var i = 0; i < arrClass.length; i++) {
        arrClass[i].addEventListener('click', scroller, false);
    }
}

//-------Works with menuShower() function to hide and show menu content.------//
function menuHider() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
        else if (!openDropdown.classList.contains('show')) {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    }
}

//------Triggers menu icon animation when icon is clicked.-------//
function menuShower() {
    this.classList.toggle("change");
    menuHider();
}


//-----Start up function----//
function startUp() {
    textAtStart();
    menuEventListen();
    arrowEventListen();
}

//-----Starts up all code with startUp() function ---->
startUp();
