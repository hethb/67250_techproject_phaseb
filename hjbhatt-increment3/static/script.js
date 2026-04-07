// ===== Part 2: JavaScript Basics =====

// Variable Declarations and Console Output
var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

// Basic Function
function sumnPrint(x1, x2) {
    var result = x1 + x2;
    console.log(result);
}

sumnPrint(x, y);
sumnPrint(A, B);

// Conditional Statement
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

// Arrays + Loops
var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

// function findTheBanana(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] === "Banana") {
//             alert("Found the Banana!");
//         }
//     }
// }
// findTheBanana(L1);
// findTheBanana(L2);

// Rewritten using forEach
// function findTheBanana(arr) {
//     arr.forEach(function(item) {
//         if (item === "Banana") {
//             alert("Found the Banana!");
//         }
//     });
// }
// findTheBanana(L1);
// findTheBanana(L2);


// ===== Part 3: Time-Based Greeting Function =====

var now = new Date();
var hour = now.getHours();

function greeting(h) {
    var greetingEl = document.getElementById("greeting");
    if (!greetingEl) return;

    var message;
    if (h < 5 || h >= 20) {
        message = "Good night! Welcome to the MonoMuse Museum";
    } else if (h < 12) {
        message = "Good morning! Welcome to the MonoMuse Museum";
    } else if (h < 18) {
        message = "Good afternoon! Welcome to the MonoMuse Museum";
    } else {
        message = "Good evening! Welcome to the MonoMuse Museum";
    }
    greetingEl.innerHTML = message;
}

greeting(hour);


// ===== Part 4: Dynamic Footer Year =====

function addYear() {
    var yearEl = document.getElementById("copyYear");
    if (yearEl) {
        yearEl.innerHTML = "&copy; " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}
