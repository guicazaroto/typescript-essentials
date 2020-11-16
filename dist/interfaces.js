"use strict";
var LOL = {
    title: 'League of Legends',
    genre: 'RPG',
    stockAmount: 30,
    tags: ['lol', 'br', 'hu3'],
    getSimilar: function (title) {
        console.log(title + " is similar to Mu Gnn");
    }
};
var CSGo = /** @class */ (function () {
    function CSGo(title, genre, stockAmount, tags) {
        this.title = title;
        this.genre = genre;
        this.stockAmount = stockAmount;
        this.tags = tags;
    }
    CSGo.prototype.getSimilar = function () {
        console.log('Similar Game Here');
    };
    return CSGo;
}());
