import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    car: 'Golf',
    purchasedate: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('https://randomuser.me/api/').then((response) => {
      const data = response.data.results[0];
      setUserData({
        firstname: data.name.first,
        lastname: data.name.last,
        email: data.email,
        car: 'Golf',
        purchasedate: '',
      });
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('https://acc-test-vjn7.onrender.com/form', userData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'letmein',
        },
      })
      .then(() => {
        setSuccess(true);
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>React App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Car:
          <select name="car" value={userData.car} onChange={handleInputChange}>
            <option value="Golf">Golf</option>
            <option value="Arteon">Arteon</option>
            <option value="Tiguan">Tiguan</option>
          </select>
        </label>
        <label>
          Purchase Date:
          <input
            type="date"
            name="purchasedate"
            min="2018-01-01"
            value={userData.purchasedate}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {success && <p>Form submitted successfully!</p>}
    </div>
  );
};

export default App;

