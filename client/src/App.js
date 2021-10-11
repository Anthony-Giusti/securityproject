const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P((resolve) => {
            resolve(value);
          });
    }
    return new (P || (P = Promise))((resolve, reject) => {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    let _ = {
      label: 0,
      sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    };
    let f;
    let y;
    let t;
    let g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y.return
                  : op[0]
                  ? y.throw || ((t = y.return) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
const __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (let i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// @ts-nocheck
const react_1 = require('react');
const react_router_dom_1 = require('react-router-dom');
const axios_1 = __importDefault(require('axios'));
const styles_1 = require('@material-ui/styles');
const Users_1 = __importDefault(require('./Pages/Users/Users'));
const CreateUser_1 = __importDefault(require('./Pages/CreateUser/CreateUser'));
const NavBar_1 = __importDefault(require('./components/NavBar/NavBar'));
const createDateAndTimeString_1 = __importDefault(
  require('./components/util/functions/createDateAndTimeString')
);
require('./App.css');
const Theme_1 = __importDefault(require('./Themes/Theme'));
const Styles_1 = __importDefault(require('./Styles'));

const api = axios_1.default.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000/',
});
const App = function () {
  const _a = react_1.useState([]);
  const userData = _a[0];
  const setUserData = _a[1];
  const classes = Styles_1.default();
  const history = react_router_dom_1.useHistory();
  const fetchUserData = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, (_a) => {
        switch (_a.label) {
          case 0:
            return [
              4 /* yield */,
              api
                .get('/getUserData', {
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                  },
                })
                .then((response) => {
                  const data = Object.values(response.data);
                  setUserData(data);
                }),
            ];
          case 1:
            _a.sent();
            return [2 /* return */];
        }
      });
    });
  };
  const createUser = function (newUser) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, (_a) => {
        switch (_a.label) {
          case 0:
            return [
              4 /* yield */,
              api.post('/createNewUser', { newUser }).then((response) => {
                console.log(response);
              }),
            ];
          case 1:
            _a.sent();
            history.push('/');
            return [2 /* return */];
        }
      });
    });
  };
  const removeUser = function (userId) {
    const newUsers = userData.filter((user) => user._id !== userId);
    setUserData(newUsers);
    api.get(`/deleteUser?userId=${userId}`);
  };
  const editUser = function (editedUser) {
    editedUser.lastEdit = createDateAndTimeString_1.default();
    const newUsers = __spreadArray([], userData);
    const userIndex = userData.findIndex((user) => user._id === editedUser._id);
    newUsers.splice(userIndex, 1, editedUser);
    setUserData(newUsers);
    api.post('/editUser', { editedUser });
  };
  return React.createElement(
    styles_1.ThemeProvider,
    { theme: Theme_1.default },
    React.createElement(
      'div',
      { className: 'App' },
      React.createElement(NavBar_1.default, null),
      React.createElement(
        'div',
        { className: classes.appMain },
        React.createElement(
          react_router_dom_1.Switch,
          null,
          React.createElement(
            react_router_dom_1.Route,
            { exact: true, path: '/' },
            React.createElement(Users_1.default, {
              userData,
              removeUser,
              submitEditedUser: editUser,
              fetchUserData,
            })
          ),
          React.createElement(
            react_router_dom_1.Route,
            { path: '/create-user' },
            React.createElement(CreateUser_1.default, {
              submitUser: createUser,
            })
          )
        )
      )
    )
  );
};
exports.default = App;
