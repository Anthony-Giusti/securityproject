"use strict";
exports.__esModule = true;
var date_and_time_1 = require("date-and-time");
var createDateAndTimeString = function () {
    return date_and_time_1["default"].format(new Date(), 'YYYY/MM/DD HH:mm:ss');
};
exports["default"] = createDateAndTimeString;
