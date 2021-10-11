"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/* eslint-disable react/prop-types */
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var pickers_1 = require("@material-ui/pickers");
var isAlpha_1 = __importDefault(require("validator/es/lib/isAlpha"));
var date_fns_1 = __importDefault(require("@date-io/date-fns"));
var BirthdayPicker_1 = __importDefault(require("../BirthdayPicker/BirthdayPicker"));
var birthdayDateToString_1 = __importDefault(require("../util/functions/birthdayDateToString"));
var birthdayStringToDate_1 = __importDefault(require("../util/functions/birthdayStringToDate"));
var createDateAndTimeString_1 = __importDefault(require("../util/functions/createDateAndTimeString"));
var sexIntToString_1 = __importDefault(require("../util/functions/sexIntToString"));
var sexStringToInt_1 = __importDefault(require("../util/functions/sexStringToInt"));
var Styles_1 = __importDefault(require("./Styles"));
var UserForm = react_1.forwardRef(function (props, ref) {
    var _a = react_1.useState(props.user ? sexStringToInt_1.default(props.user.sex) : 3), userSex = _a[0], setUserSex = _a[1];
    var _b = react_1.useState(props.user ? birthdayStringToDate_1.default(props.user.birthday) : new Date()), userBirthday = _b[0], setUserBirthday = _b[1];
    var classes = Styles_1.default();
    var _c = react_1.useState(false), firstNameError = _c[0], setFirstNameError = _c[1];
    var _d = react_1.useState(false), lastNameError = _d[0], setLastNameError = _d[1];
    var firstNameField;
    var lastNameField;
    var userSexChange = function (e) {
        setUserSex(e.target.value);
        if (props.editMade) {
            props.editMade();
        }
    };
    var userBirthdayChange = function (newBirthday) {
        setUserBirthday(newBirthday);
        if (props.editMade) {
            props.editMade();
        }
    };
    var validateForm = function () {
        var errorsFound = false;
        if (!isAlpha_1.default(firstNameField.value)) {
            setFirstNameError(true);
            errorsFound = true;
        }
        else {
            setFirstNameError(false);
        }
        if (!isAlpha_1.default(lastNameField.value)) {
            setLastNameError(true);
            errorsFound = true;
        }
        else {
            setLastNameError(false);
        }
        var now = createDateAndTimeString_1.default();
        if (!errorsFound) {
            var editedUser = {
                _id: props.user ? props.user._id : null,
                firstName: firstNameField.value,
                lastName: lastNameField.value,
                sex: sexIntToString_1.default(userSex),
                birthday: birthdayDateToString_1.default(userBirthday),
                created: props.user ? props.user.created : now,
                lastEdit: now,
            };
            props.submit(editedUser);
        }
    };
    react_1.useImperativeHandle(ref, function () { return ({
        sendForm: function () {
            validateForm();
        },
    }); });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.userFields },
            React.createElement(core_1.TextField, { className: classes.userField, variant: "outlined", error: firstNameError, onChange: props.editMade ? props.editMade : null, label: "First Name", helperText: firstNameError ? 'Must contain only letters' : '', defaultValue: props.user ? props.user.firstName : '', inputRef: function (ref) {
                    firstNameField = ref;
                } }),
            React.createElement(core_1.TextField, { className: classes.userField, variant: "outlined", error: lastNameError, onChange: props.editMade ? props.editMade : null, label: "Last Name", helperText: lastNameError ? 'Must contain only letters' : '', defaultValue: props.user ? props.user.lastName : '', inputRef: function (ref) {
                    lastNameField = ref;
                } }),
            React.createElement(core_1.FormControl, { className: classes.userField },
                React.createElement(core_1.TextField, { label: "Sex", variant: "outlined", onChange: userSexChange, value: userSex, select: true },
                    React.createElement(core_1.MenuItem, { value: 1 }, "M"),
                    React.createElement(core_1.MenuItem, { value: 2 }, "F"),
                    React.createElement(core_1.MenuItem, { value: 3 }, "NB"))),
            React.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                React.createElement(BirthdayPicker_1.default, { className: classes.userField, userBirthday: userBirthday, userBirthdayChange: userBirthdayChange })))));
});
UserForm.displayName = 'UserForm';
exports.default = UserForm;
