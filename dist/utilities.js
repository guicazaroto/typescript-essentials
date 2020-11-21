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
// Readonly, torna o objeto disponível apenas para leitura, impedindo reatribuições.
var todo1 = {
    title: 'Lavar roupa',
    description: 'Colocar na lavadora e apertar o botao',
    completed: false
};
// todo.completed = true // throw an error
console.log(todo1);
// Partial, deixa que o objeto contenha somente partes do tipo, portanto
// não precisa ter necessariamente as propriedades do objeto.
function updateTodo(todo, toUpdate) {
    return __assign(__assign({}, todo), toUpdate);
}
var todo2 = updateTodo(todo1, { completed: true });
console.log(todo2);
// Pick, permite pegar apenas as propriedades que desejar de um determinado tipo.
var p = {
    title: 'Lavar roupa',
    completed: false
};
// Omit, vai omitir as propriedades informadas
var o = {
    description: 'Texto qualquer',
    completed: true
};
