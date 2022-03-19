import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Component, useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/Register';
import { LoginOrRegister } from './components/loginregister';

const Console = () => {
  const [cookies, setCookie] = useCookies();
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Marcin");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setCount((currentCount2) => currentCount2 + 5)
    if(!user.name) {
      console.log("No user");
      navigate("register")
    }
  }, [])

 //const handleChangeName = () => setName((currentName) => "Kasia");
 //const handleIncrement = () => setCount((currentCount321) => currentCount321 + 1);

 //const handleDecrement = () => setCount((currentCount123) => currentCount123 - 1);

  return (
    <Routes path="/*">
      <Route index element={<h1>Console</h1>}/>
      <Route path="register" element={<LoginOrRegister/>}/>
    </Routes>
//   <div className="counter">
//     <h1 className="count">{count}</h1>
//     <h1 className="name">{name}</h1>
//
//     <button type="button" onClick={handleIncrement}>
//       Increment
//     </button>
//     <button type="button" onClick={handleDecrement}>
//       Decrement
//     </button>
//     <button type="button" onClick={handleChangeName}>
//       Name
//     </button>
//   </div>
 );
//  return (
//    <h1>Console</h1>
//  );
}

export default Console;
