"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var todo1 = {
    title: 'Lavar roupa',
    description: 'Colocar na lavadora e apertar o botao',
    completed: false
};
// todo.completed = true // throw an error
console.log(todo1);
function updateTodo(todo, toUpdate) {
    return __assign(__assign({}, todo), toUpdate);
}
var todo2 = updateTodo(todo1, { completed: true });
console.log(todo2);
