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
var Dialog_1 = __importDefault(require("@material-ui/core/Dialog"));
var DialogActions_1 = __importDefault(require("@material-ui/core/DialogActions"));
var DialogContent_1 = __importDefault(require("@material-ui/core/DialogContent"));
var Divider_1 = __importDefault(require("@material-ui/core/Divider"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Check_1 = __importDefault(require("@material-ui/icons/Check"));
var Delete_1 = __importDefault(require("@material-ui/icons/Delete"));
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var styles_1 = require("@material-ui/styles");
var Styles_1 = __importDefault(require("./Styles"));
var UserForm_1 = __importDefault(require("../UserForm/UserForm"));
var EditModal = function (_a) {
    var editModalOpen = _a.editModalOpen, closeEditModal = _a.closeEditModal, selectedUser = _a.selectedUser;
    var _b = react_1.useState(false), isEdited = _b[0], setIsEdited = _b[1];
    var _c = react_1.useState(false), editModalConfirmOpen = _c[0], setEditModalConfirmOpen = _c[1];
    var ref = react_1.useRef(null);
    var classes = Styles_1.default();
    var theme = styles_1.useTheme();
    var mdDevice = useMediaQuery_1.default(theme.breakpoints.up('md'));
    var discardEdits = function () {
        setEditModalConfirmOpen(false);
        setIsEdited(false);
        closeEditModal('discard', null);
    };
    var cancelEdits = function () {
        setEditModalConfirmOpen(false);
    };
    var handleModalClose = function () {
        if (isEdited) {
            setEditModalConfirmOpen(true);
        }
        else {
            closeEditModal('discard', null);
        }
    };
    var editMade = function () {
        if (!isEdited) {
            setIsEdited(true);
        }
    };
    var handleSubmit = function (editedUser) {
        setEditModalConfirmOpen(false);
        setIsEdited(false);
        closeEditModal('submit', editedUser);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Dialog_1.default, { open: editModalOpen, onClose: handleModalClose, fullWidth: true },
            react_1.default.createElement("div", { className: classes.title },
                react_1.default.createElement(Typography_1.default, { variant: "h2" }, "Edit User"),
                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "caption" },
                    "ID: ",
                    selectedUser._id)),
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { className: classes.dateBox },
                        react_1.default.createElement(Typography_1.default, { className: classes.dateTitle }, "Date Created:"),
                        react_1.default.createElement(Typography_1.default, { className: classes.date }, selectedUser.created)),
                    react_1.default.createElement(Divider_1.default, null),
                    react_1.default.createElement("span", { className: classes.dateBox },
                        react_1.default.createElement(Typography_1.default, { className: classes.dateTitle }, "Last Edited:"),
                        react_1.default.createElement(Typography_1.default, { className: classes.date }, selectedUser.lastEdit))),
                react_1.default.createElement(Divider_1.default, null),
                react_1.default.createElement(UserForm_1.default, { submit: handleSubmit, user: selectedUser, editMade: editMade, ref: ref })),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { variant: "contained", startIcon: react_1.default.createElement(Check_1.default, null), className: classes.negitiveBtn, color: "primary", onClick: function () { return ref.current.sendForm(); }, disabled: !isEdited }, "Confirm Edits"),
                react_1.default.createElement(Button_1.default, { className: classes.negitiveBtn, onClick: function () { return closeEditModal('discard', null); } }, "Cancel"))),
        react_1.default.createElement(Dialog_1.default, { open: editModalConfirmOpen },
            react_1.default.createElement(DialogContent_1.default, null,
                react_1.default.createElement(Typography_1.default, null, "Confirm edits before closing?"),
                react_1.default.createElement(DialogActions_1.default, { disableSpacing: !mdDevice, className: classes.confirmDialogBtnsContainer },
                    react_1.default.createElement(Button_1.default, { className: classes.confirmDialogBtn, variant: "contained", startIcon: react_1.default.createElement(Check_1.default, null), color: "primary", onClick: function () { return ref.current.sendForm(); } }, "Confirm Edits"),
                    react_1.default.createElement(Button_1.default, { className: classes.confirmDialogBtn, variant: "contained", startIcon: react_1.default.createElement(Delete_1.default, null), color: "secondary", onClick: discardEdits }, "Discard Edits"),
                    react_1.default.createElement(Button_1.default, { className: classes.confirmDialogBtn, onClick: cancelEdits }, "Cancel"))))));
};
// EditModal.propTypes = {
//   editModalOpen: PropTypes.bool,
//   closeEditModal: PropTypes.func,
//   selectedUser: PropTypes.object,
// };
exports.default = EditModal;
