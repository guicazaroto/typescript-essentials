"use strict";
var n1 = document.querySelector('#n1');
var n2 = document.querySelector('#n2');
var btn = document.querySelector('#btn-sum');
function sum(n1, n2) {
    return n1 + n2;
}
btn.addEventListener('click', function () {
    console.log(sum(Number(n1.value), Number(n2.value)));
});
