/*
 * MonoMuse Museum Website — script.js
 *
 * External Libraries Used:
 *   - jQuery 4.0.0 (https://jquery.com/) — loaded via CDN on index.html
 *   - Leaflet 1.9.4 (https://leafletjs.com/) — loaded via CDN on explore.html
 *   - OpenStreetMap tiles (https://www.openstreetmap.org/) — map tile provider
 */

// ===== Increment 3: JavaScript Basics =====

var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function sumnPrint(x1, x2) {
    var result = x1 + x2;
    console.log(result);
}

sumnPrint(x, y);
sumnPrint(A, B);

if (C.length > z) {
    console.log(C);
    if (C.length < z) {
        console.log(z);
    }
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}


// ===== Time-Based Greeting (runs only on pages with #greeting) =====

var now = new Date();
var hour = now.getHours();

function greeting(h) {
    var greetingEl = document.getElementById("greeting");
    if (!greetingEl) return;

    var message;
    if (h < 5 || h >= 20) {
        message = "Good night! Welcome to MonoMuse";
    } else if (h < 12) {
        message = "Good morning! Welcome to MonoMuse";
    } else if (h < 18) {
        message = "Good afternoon! Welcome to MonoMuse";
    } else {
        message = "Good evening! Welcome to MonoMuse";
    }
    greetingEl.innerHTML = message;
}

greeting(hour);


// ===== Dynamic Footer Year =====

function addYear() {
    var yearEl = document.getElementById("copyYear");
    if (yearEl) {
        yearEl.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}


// ===== Active Navigation Bar =====

function ActiveNav() {
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        if (link.classList.contains('icon')) return;
        if (window.location.href === link.href) {
            link.classList.add("active");
        }
    });
}

ActiveNav();


// ===== jQuery: Read More / Read Less Toggle (index.html only) =====

if (typeof $ !== 'undefined') {
    $("#readLess").click(function() {
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });

    $("#readMore").click(function() {
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });
}


// ===== Responsive Hamburger Nav Toggle =====

function toggleNav() {
    var nav = document.querySelector(".nav_bar");
    if (nav.classList.contains("responsive")) {
        nav.classList.remove("responsive");
    } else {
        nav.classList.add("responsive");
    }
}


// ===== Leaflet Map (runs only when Leaflet + #map exist) =====

function initMap() {
    if (typeof L === 'undefined') return;
    var mapEl = document.getElementById('map');
    if (!mapEl) return;

    var map = L.map('map').setView([40.4433, -79.9436], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([40.4433, -79.9436]).addTo(map)
        .bindPopup('<b>MonoMuse Museum</b><br>4400 Forbes Ave<br>Pittsburgh, PA 15213')
        .openPopup();
}

initMap();


// ===== Image Gallery / Slideshow =====

var slideIndex = 0;

function initGallery() {
    var slides = document.querySelectorAll('.gallery-slide');
    if (slides.length === 0) return;
    showSlide(0);
}

function changeSlide(n) {
    var slides = document.querySelectorAll('.gallery-slide');
    if (slides.length === 0) return;
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
}

function showSlide(n) {
    var slides = document.querySelectorAll('.gallery-slide');
    slides.forEach(function(slide) {
        slide.style.display = 'none';
    });
    if (slides[n]) {
        slides[n].style.display = 'block';
    }
}

initGallery();


// ===== Checkout: Auto Price Calculation =====

function calculateTotal() {
    var quantityEl = document.getElementById('ticketQuantity');
    var totalEl = document.getElementById('totalDisplay');
    if (!quantityEl || !totalEl) return;

    var quantity = parseInt(quantityEl.value) || 0;
    if (quantity < 0) quantity = 0;
    if (quantity > 10) quantity = 10;

    var total = quantity * 18;
    totalEl.textContent = 'Total: $' + total.toFixed(2);
}


// ===== Checkout: Form Validation & Submit =====

function validateCheckout() {
    var valid = true;

    var errorEls = document.querySelectorAll('.error-msg');
    errorEls.forEach(function(el) { el.textContent = ''; });

    var date = document.getElementById('visitDate');
    var type = document.getElementById('ticketType');
    var quantity = document.getElementById('ticketQuantity');
    var email = document.getElementById('checkoutEmail');
    var zip = document.getElementById('zipCode');

    if (!date || !type || !quantity || !email) return;

    if (!date.value) {
        document.getElementById('dateError').textContent = 'Please select a visit date.';
        valid = false;
    }

    if (!type.value) {
        document.getElementById('typeError').textContent = 'Please select a ticket type.';
        valid = false;
    }

    var qty = parseInt(quantity.value);
    if (!quantity.value || qty < 1 || qty > 10 || isNaN(qty)) {
        document.getElementById('quantityError').textContent = 'Enter a quantity between 1 and 10.';
        valid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    if (zip && zip.value && !/^\d{5}$/.test(zip.value)) {
        document.getElementById('zipError').textContent = 'Zip code must be exactly 5 digits.';
        valid = false;
    }

    if (valid) {
        var total = qty * 18;
        sessionStorage.setItem('orderTotal', total);
        sessionStorage.setItem('orderQuantity', qty);
        sessionStorage.setItem('orderType', type.value);
        sessionStorage.setItem('orderDate', date.value);
        sessionStorage.setItem('orderEmail', email.value);
        window.location.href = 'confirmation.html';
    }
}


// ===== Confirmation Page: Load Order Details =====

function loadConfirmation() {
    var total = sessionStorage.getItem('orderTotal');
    var qty = sessionStorage.getItem('orderQuantity');
    var type = sessionStorage.getItem('orderType');
    var date = sessionStorage.getItem('orderDate');
    var email = sessionStorage.getItem('orderEmail');

    if (!total) return;

    var el = function(id) { return document.getElementById(id); };

    if (el('confirmTotal'))    el('confirmTotal').textContent = '$' + parseFloat(total).toFixed(2);
    if (el('confirmQuantity')) el('confirmQuantity').textContent = qty;
    if (el('confirmType'))     el('confirmType').textContent = type.charAt(0).toUpperCase() + type.slice(1);
    if (el('confirmDate'))     el('confirmDate').textContent = date;
    if (el('confirmEmail'))    el('confirmEmail').textContent = email;
}
