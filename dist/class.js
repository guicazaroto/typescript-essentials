"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var UserAccount = /** @class */ (function () {
    function UserAccount(name, age) {
        this.name = name;
        this.age = age;
    }
    UserAccount.prototype.logDetails = function () {
        console.log("Usern name is " + this.name + " and age is " + this.age);
    };
    return UserAccount;
}());
var UserAvatar = /** @class */ (function (_super) {
    __extends(UserAvatar, _super);
    function UserAvatar(name, age, nick, level) {
        var _this = _super.call(this, name, age) || this;
        _this.nick = nick;
        _this.level = level;
        return _this;
    }
    Object.defineProperty(UserAvatar.prototype, "getLevel", {
        get: function () {
            return this.level;
        },
        enumerable: false,
        configurable: true
    });
    return UserAvatar;
}(UserAccount));
var avatar = new UserAvatar('Guilherme', 26, 'guicazaroto', 80);
avatar.logDetails();
console.log(avatar.getLevel);
