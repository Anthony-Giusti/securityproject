import { useEffect, useState } from 'react';
import './App.css';
import Users from './components/Users/Users.jsx';
import userExample from './Data/userExample';

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

  const sortUsers = (order, list) => {
    const filteredUsers = [...userData];

    if (order === 'descending') {
      filteredUsers.sort((a, b) => (a[list] > b[list]) ? 1: -1);
    } else if (order === 'ascending') {
      filteredUsers.sort((a, b) => (a[list] < b[list]) ? 1: -1);
    }

    setCurrentSort({property: list, order})


    if (sexFilter.length > 0) {
      return filterUsers(filteredUsers);
    }
      return filteredUsers;
  }

  const handleSortUsers = (order, list) => {
    setVisibleUserData(sortUsers(order, list))
  }

  const sortByBirthday = (order) => {

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

  // useEffect(() => {
  //   if (sexFilter.length > 0) {
  //     setVisibleUserData(sortUsers(currentSort.order, currentSort.property));
  //   } else {
  //     setVisibleUserData(userData);
  //   }
  // }, [sexFilter]);

  useEffect(() => {
    handleSortUsers(currentSort.order, currentSort.property);
  }, [userData, sexFilter])

  return (
    <div className="App">
      <Users
        sortUsers={handleSortUsers}
        handleSexFilter={changeSexFilter}
        userData={visibleUserData}
        removeUser={removeUser}
        submitEditedUser={editUser}
      />
    </div>
  );
}

export default App;
