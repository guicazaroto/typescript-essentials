"use strict";
// boolean
var isOpen;
isOpen = true;
// string
var msg;
msg = 'foo';
// number
var total;
total = 1.2;
// Array
var myArr;
myArr = [1, 2, 3];
var items;
items = [1, 2, 3];
// tuple
var tup;
tup = [1, 'hey'];
// enum
var Colors;
(function (Colors) {
    Colors["white"] = "#ffffff";
    Colors["black"] = "#000000";
})(Colors || (Colors = {}));
// any (não recomendado)
var a;
// void 
function log() {
    console.log('Hello');
}
// never
function err() {
    throw new Error('ocorreu um erro');
}
// object (qualquer coisa que não seja tipo primitivo)
