import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Users from './components/Users/Users.jsx';
import CreateUser from './Pages/CreateUser/CreateUser'
import userExample from './Data/userExample';
import NavBar from './components/NavBar/NavBar';
import birthdayStringToDate from './components/util/functions/birthdayStringToDate';

function App() {
  const [userData, setUserData] = useState(userExample);
  const [visibleUserData, setVisibleUserData] = useState(userExample);
  const [sexFilter, setSexFilter] = useState([]);
  const [currentSort, setCurrentSort] = useState({property: 'id', order: 'ascending'});

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

    return(filteredUsers);
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

    if (order === 'descending') {
      filteredUsers.sort((a, b) => (birthdayStringToDate(a.birthday) > birthdayStringToDate(b.birthday)) ? 1: -1);
    } else if (order === 'ascending') {
      filteredUsers.sort((a, b) => (birthdayStringToDate(a.birthday) < birthdayStringToDate(b.birthday)) ? 1: -1);;
    }

    return filteredUsers;
  }

  const sortUsers = (users, order, list) => {
    const filteredUsers = users;

    if (order === 'descending') {
      filteredUsers.sort((a, b) => (a[list] > b[list]) ? 1: -1);
    } 
    
    if (order === 'ascending') {
      filteredUsers.sort((a, b) => (a[list] < b[list]) ? 1: -1);
    }
    
    return filteredUsers;
}

  const handleSortUsers = (order, list) => {
    let sortedUsers = [...userData];

    if (list === 'birthday') {
      sortedUsers = sortByBirthday(sortedUsers, order);
    } else {
      sortedUsers = sortUsers(sortedUsers, order, list)
    }

    setCurrentSort({property: list, order})

    if (sexFilter.length > 0) {
      setVisibleUserData(filterUsers(sortedUsers));
    } else {
      setVisibleUserData(sortedUsers)
    }
  }


  const removeUser = (userId) => {
    const newUsers = userData.filter((user) => user.id !== userId);

    setUserData(newUsers);
  };

  const editUser = (editedUser) => {
    const newUsers = userData;
    const userIndex = userData.findIndex((user) => user.id === editedUser.id);
    newUsers.splice(userIndex, 1, editedUser);

    setUserData(newUsers);
  };

  useEffect(() => {
    handleSortUsers(currentSort.order, currentSort.property);
  }, [userData, sexFilter])

  return (
    <div className="App">
      <NavBar />
      <Switch>
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
          <CreateUser />
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;
