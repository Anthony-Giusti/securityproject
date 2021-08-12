import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Users from "./components/Users/Users.jsx";
import CreateUser from "./Pages/CreateUser/CreateUser";
import userExample from "./Data/userExample";
import NavBar from "./components/NavBar/NavBar";
import birthdayStringToDate from "./components/util/functions/birthdayStringToDate";

import Theme from './Themes/Theme';
import useStyles from "./Styles";
import { ThemeProvider } from "@material-ui/styles";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});


function App() {
  const [userData, setUserData] = useState([]);
  const [visibleUserData, setVisibleUserData] = useState([]);
  const [sexFilter, setSexFilter] = useState([]);
  const [currentSort, setCurrentSort] = useState({
    property: "_id",
    order: "ascending",
  });

  const classes = useStyles();
  const history = useHistory();

  const fetchUserData = async () => {
    await api
      .get("/getUserData", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const data = Object.values(response.data)
        setUserData(data);
      });
  };

  const filterUsers = (users) => {
    const filteredUsers = [];

    users.forEach((user) => {
      for (let x = 0; x < sexFilter.length; x += 1) {
        if (user.sex === sexFilter[x]) {
          filteredUsers.push(user);
          break;
        }
      }
    });

    return filteredUsers;
  };

  const changeSexFilter = (newSex) => {
    if (sexFilter.includes(newSex)) {
      setSexFilter((prev) => prev.filter((sex) => sex !== newSex));
    } else {
      setSexFilter((prev) => [...prev, newSex]);
    }
  };

  const sortByBirthday = (users, order) => {
    const filteredUsers = [...userData];

    if (order === "descending") {
      filteredUsers.sort((a, b) =>
        birthdayStringToDate(a.birthday) > birthdayStringToDate(b.birthday)
          ? 1
          : -1
      );
    } else if (order === "ascending") {
      filteredUsers.sort((a, b) =>
        birthdayStringToDate(a.birthday) < birthdayStringToDate(b.birthday)
          ? 1
          : -1
      );
    }

    return filteredUsers;
  };

  const sortUsers = (users, order, list) => {
    const filteredUsers = users;

    if (order === "descending") {
      filteredUsers.sort((a, b) => (a[list].toLowerCase() > b[list].toLowerCase() ? 1 : -1));
    }

    if (order === "ascending") {
      filteredUsers.sort((a, b) => (a[list].toLowerCase() < b[list].toLowerCase() ? 1 : -1));
    }

    return filteredUsers;
  };

  const handleSortUsers = (order, list) => {
    let sortedUsers = [...userData];

    if (list === "birthday") {
      sortedUsers = sortByBirthday(sortedUsers, order);
    } else {
      sortedUsers = sortUsers(sortedUsers, order, list);
    }

    setCurrentSort({ property: list, order });

    if (sexFilter.length > 0) {
      setVisibleUserData(filterUsers(sortedUsers));
    } else {
      setVisibleUserData(sortedUsers);
    }
  };

  const createUser = (newUser) => {
    setUserData([...userData, newUser])

     api.post("/createNewUser", { newUser }).then((response) => {
      console.log(response);
      history.push('/');
    })
  }

  const removeUser = (userId) => {
    const newUsers = userData.filter((user) => user._id !== userId);
    setUserData(newUsers);

    api.get(`/deleteUser?userId=${userId}`);
  };

  const editUser = (editedUser) => {
    const newUsers = [...userData];
    const userIndex = userData.findIndex((user) => user._id === editedUser._id);
    newUsers.splice(userIndex, 1, editedUser);

    setUserData(newUsers);
    api.post("/editUser", {editedUser});
  };

  useEffect(() => {
    handleSortUsers(currentSort.order, currentSort.property);
  }, [userData, sexFilter]);

  useEffect( () => {
    fetchUserData();
  }, [])

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
      <NavBar />
      <Switch>
        <div className={classes.appMain}>
          <Route exact path="/">
            <Users
              sortUsers={handleSortUsers}
              handleSexFilter={changeSexFilter}
              userData={visibleUserData}
              removeUser={removeUser}
              submitEditedUser={editUser}
            />
          </Route>
          <Route path="/create-user">
            <CreateUser submitUser={createUser} />
          </Route>
        </div>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
