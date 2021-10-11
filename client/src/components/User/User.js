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
// @ts-nocheck
var react_1 = __importStar(require("react"));
// import PropTypes from 'prop-types';
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
var Menu_1 = __importDefault(require("@material-ui/core/Menu"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var Edit_1 = __importDefault(require("@material-ui/icons/Edit"));
var MoreVert_1 = __importDefault(require("@material-ui/icons/MoreVert"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var styles_1 = require("@material-ui/styles");
var Styles_1 = __importDefault(require("./Styles"));
var User = function (_a) {
    var user = _a.user, openEditModal = _a.openEditModal, handleRemoveUser = _a.handleRemoveUser;
    var _b = react_1.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var classes = Styles_1.default();
    var theme = styles_1.useTheme();
    var mdDevice = useMediaQuery_1.default(theme.breakpoints.up('md'));
    var smDevice = useMediaQuery_1.default(theme.breakpoints.down('sm'));
    var handleExpandedMenuOpen = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleExpandedMenuClose = function () {
        setAnchorEl(null);
    };
    return (react_1.default.createElement(Card_1.default, { elevation: 1, className: classes.userMain },
        react_1.default.createElement(CardContent_1.default, { className: classes.userInfo },
            react_1.default.createElement("span", { className: classes.infoCell + " " + classes.name },
                react_1.default.createElement(Typography_1.default, { className: classes.userText }, user.firstName)),
            react_1.default.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
            react_1.default.createElement("span", { className: classes.infoCell + " " + classes.name },
                react_1.default.createElement(Typography_1.default, { className: classes.userText }, user.lastName)),
            react_1.default.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
            react_1.default.createElement("span", { className: classes.infoCell + " " + classes.sex },
                react_1.default.createElement(Typography_1.default, null, user.sex)),
            react_1.default.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
            react_1.default.createElement("span", { className: classes.infoCell + " " + classes.birthday },
                react_1.default.createElement(Typography_1.default, null, user.birthday))),
        react_1.default.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
        react_1.default.createElement(CardActions_1.default, { className: classes.userButtons },
            mdDevice && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(IconButton_1.default, { size: "small", onClick: function () { return openEditModal(user); } },
                    react_1.default.createElement(Edit_1.default, null)),
                react_1.default.createElement(IconButton_1.default, { size: "small", onClick: function () { return handleRemoveUser(user); } },
                    react_1.default.createElement(Delete_1.default, null)))),
            smDevice && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(IconButton_1.default, { onClick: handleExpandedMenuOpen, size: "small" },
                    react_1.default.createElement(MoreVert_1.default, null)))),
            react_1.default.createElement(Menu_1.default, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleExpandedMenuClose },
                react_1.default.createElement(MenuItem_1.default, null,
                    react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(Edit_1.default, null), size: "small", onClick: function () { return handleRemoveUser(user); } }, "Delete User")),
                react_1.default.createElement(MenuItem_1.default, null,
                    react_1.default.createElement(Button_1.default, { startIcon: react_1.default.createElement(Delete_1.default, null), size: "small", onClick: function () { return openEditModal(user); } }, "Edit User"))))));
};
// User.propTypes = {
//   user: PropTypes.object,
//   openEditModal: PropTypes.func,
//   handleRemoveUser: PropTypes.func,
// };
exports.default = User;
