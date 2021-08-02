import { useEffect, useState } from 'react';
import './App.css';
import Users from './components/Users/Users.jsx';
import userExample from './Data/userExample';

function App() {
  const [userData, setUserData] = useState(userExample);
  const [visibleUserData, setVisibleUserData] = useState(userExample);
  const [sexFilter, setSexFilter] = useState([]);

  const removeUser = (userId) => {
    const newUsers = userData.filter((user) => user.id !== userId);

    setUserData(newUsers);
    setVisibleUserData(newUsers);
  };

  const editUser = (editedUser) => {
    const newUsers = userData;
    const userIndex = userData.findIndex((user) => user.id === editedUser.id);
    newUsers.splice(userIndex, 1, editedUser);

    setUserData(newUsers);
    setVisibleUserData(newUsers);
  };

  const filterUsers = () => {
    const filteredUsers = [];

    userData.forEach((user) => {
      for (let x = 0; x < sexFilter.length; x += 1) {
        if (user.sex === sexFilter[x]) {
          filteredUsers.push(user);
          break;
        }
      }
    });

    setVisibleUserData(filteredUsers);
  };

  const changeSexFilter = (newSex) => {
    if (sexFilter.includes(newSex)) {
      setSexFilter((prev) => prev.filter((sex) => sex !== newSex));
    } else {
      setSexFilter((prev) => [...prev, newSex]);
    }
  };

  const sortUsers = (order, list) => {
    const filteredUsers = userData;

    filteredUsers.sort((a, b) => a[list] > b[list]);

    setVisibleUserData(filteredUsers);
  }

  useEffect(() => {
    if (sexFilter.length > 0) {
      filterUsers();
    } else {
      setVisibleUserData(userData);
    }
  }, [sexFilter]);

  return (
    <div className="App">
      <Users
        sortUsers={sortUsers}
        handleSexFilter={changeSexFilter}
        userData={visibleUserData}
        removeUser={removeUser}
        submitEditedUser={editUser}
      />
    </div>
  );
}

export default App;
