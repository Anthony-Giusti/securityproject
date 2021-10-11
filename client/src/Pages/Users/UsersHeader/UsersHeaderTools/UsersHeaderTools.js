"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var react_1 = __importDefault(require("react"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var FormControl_1 = __importDefault(require("@material-ui/core/FormControl"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var FormGroup_1 = __importDefault(require("@material-ui/core/FormGroup"));
var FormLabel_1 = __importDefault(require("@material-ui/core/FormLabel"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Styles_1 = __importDefault(require("./Styles"));
var birthdayStringToDate_1 = __importDefault(require("../../../../components/util/functions/birthdayStringToDate"));
var UsersHeaderTools = function (_a) {
    var handleSexFilter = _a.handleSexFilter, sexFilter = _a.sexFilter, userData = _a.userData;
    var handleChange = function (e) {
        handleSexFilter(e.target.value);
    };
    var handleGetAverage = function () {
        var now = new Date();
        var birthdaysInDays = userData.map(function (user) {
            var diffTime = Math.abs(now - birthdayStringToDate_1.default(user.birthday));
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        });
        var sum = birthdaysInDays.reduce(function (a, b) { return a + b; }, 0);
        return Math.round(sum / birthdaysInDays.length / 365);
    };
    var classes = Styles_1.default();
    return (react_1.default.createElement("div", { className: classes.toolsMain },
        react_1.default.createElement("div", { className: classes.toolsSection },
            react_1.default.createElement(FormControl_1.default, { component: "fieldset" },
                react_1.default.createElement(FormLabel_1.default, { component: "legend" }, "Only Include"),
                react_1.default.createElement(FormGroup_1.default, null,
                    react_1.default.createElement(FormControlLabel_1.default, { onChange: handleChange, control: react_1.default.createElement(Checkbox_1.default, { name: "male" }), value: "M", label: "Male", checked: sexFilter.includes('M') }),
                    react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, { name: "female" }), onChange: handleChange, value: "F", label: "Female", checked: sexFilter.includes('F') }),
                    react_1.default.createElement(FormControlLabel_1.default, { control: react_1.default.createElement(Checkbox_1.default, { name: "non-binary" }), onChange: handleChange, value: "NB", label: "Non-Binary", checked: sexFilter.includes('NB') })))),
        react_1.default.createElement("div", { className: classes.toolsSection },
            react_1.default.createElement(Typography_1.default, null, "Average User Age:"),
            react_1.default.createElement(Typography_1.default, null, handleGetAverage()))));
};
// UsersHeaderTools.propTypes = {
//   handleSexFilter: PropTypes.func,
//   sexFilter: PropTypes.array,
//   userData: PropTypes.array,
// };
exports.default = UsersHeaderTools;
