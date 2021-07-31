import { useState } from 'react';
import './App.css';
import Users from './components/Users/Users.jsx';
import userExample from './Data/userExample';

function App() {
  const [userData, setUserData] = useState(userExample);
  const [filteredUserData, setFiltereduserData] = useState(userExample);
  const [sexFilter, setSexFilter] = useState([]);

  const removeUser = (userId) => {
    const newUsers = userData.filter((user) => user.id !== userId);

    setUserData(newUsers);
    setFiltereduserData(newUsers);
  };

  const editUser = (editedUser) => {
    const newUsers = userData;
    const userIndex = userData.findIndex((user) => user.id === editedUser.id);
    newUsers.splice(userIndex, 1, editedUser);

    setUserData(newUsers);
    setFiltereduserData(newUsers);
  };

  const changeSexFilter = (newSex) => {
    console.log(sexFilter.includes(newSex));
    if (sexFilter.includes(newSex)) {
      setSexFilter((prev) => prev.filter((sex) => sex !== newSex));
    } else {
      setSexFilter((prev) => [...prev, newSex]);
    }
  };

  return (
    <div className="App">
      <Users
        handleSexFilter={changeSexFilter}
        userData={filteredUserData}
        removeUser={removeUser}
        submitEditedUser={editUser}
      />
    </div>
  );
}

export default App;
