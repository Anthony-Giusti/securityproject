"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
// import PropTypes from 'prop-types';
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var ArrowDownward_1 = __importDefault(require("@material-ui/icons/ArrowDownward"));
var ArrowUpward_1 = __importDefault(require("@material-ui/icons/ArrowUpward"));
var Styles_1 = __importDefault(require("./Styles"));
var SortButton = function (_a) {
    var handleSort = _a.handleSort, toBeSorted = _a.toBeSorted, selectedSortBtn = _a.selectedSortBtn;
    var _b = react_1.useState('descending'), currentDirection = _b[0], setCurrentDirection = _b[1];
    var classes = Styles_1.default();
    var handleClick = function (order) {
        handleSort(order, toBeSorted);
        if (order === 'ascending') {
            setCurrentDirection('descending');
        }
        else if (order === 'descending') {
            setCurrentDirection('ascending');
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        currentDirection === 'ascending' && (react_1.default.createElement(IconButton_1.default, { className: selectedSortBtn === toBeSorted
                ? classes.btnActive
                : classes.btnPassive, onClick: function () { return handleClick('ascending'); } },
            react_1.default.createElement(ArrowUpward_1.default, { id: toBeSorted }))),
        currentDirection === 'descending' && (react_1.default.createElement(IconButton_1.default, { className: selectedSortBtn === toBeSorted
                ? classes.btnActive
                : classes.btnPassive, onClick: function () { return handleClick('descending'); } },
            react_1.default.createElement(ArrowDownward_1.default, { id: toBeSorted })))));
};
// SortButton.propTypes = {
//   handleSort: PropTypes.func,
//   toBeSorted: PropTypes.string,
//   selectedSortBtn: PropTypes.string,
// };
exports.default = SortButton;
