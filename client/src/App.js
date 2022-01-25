import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import './App.css';
import { GET_ALL_USERS, GET_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingUser } = useQuery(GET_USER, { variables: { id: 1 } });

  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState('');
  const [age, setUserage] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = async (e) => {
    e.preventDefault();
    const data = await newUser({
      variables: {
        input: {
          username,
          age: Number(age),
        },
      },
    });
    setUsername('');
    setUserage(0);
    getAll(e);
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  const getOneUser = async (e) => {
    e.preventDefault();

    console.log('oneUser', oneUser);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="App">
      <form className="form">
        <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type="number" className="input" value={age} onChange={(e) => setUserage(e.target.value)}></input>

        <div className="buttons">
          <button className="button" onClick={(e) => addUser(e)}>
            Create
          </button>
          <button className="button" onClick={(e) => getAll(e)}>
            Get
          </button>
          <button className="button" onClick={(e) => getOneUser(e)}>
            Get user
          </button>
        </div>
      </form>
      <div className="user-list">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <b>{user.id}.</b> {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
