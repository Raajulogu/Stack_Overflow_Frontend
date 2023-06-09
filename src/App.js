import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/DashBoard';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import UserPage from './Components/UserPage';
import { useState } from 'react';
import AskQuestion from './Components/AskQuestion';
import Answer from './Components/Answer';

function App() {
  const [userData, setUserData] = useState([]);
  return (
    <div className="App">
         <Routes>

       <Route exact path ="/"
       element={<Dashboard/>}/>

       <Route path="/login"
        element={<LoginPage/>}
       />

      <Route path="/signup"
        element={<SignupPage/>}
       /> 

    <Route path="/ask/:token"
        element={<AskQuestion
          userData={userData}
          setUserData={setUserData}
        />}
       />

        <Route path="/answer/:id"
        element={<Answer
          userData={userData}
          setUserData={setUserData}
        />}
       />

      <Route path="/user"
        element={<UserPage
          userData={userData}
          setUserData={setUserData}
        />}
       />

         </Routes>
    </div>
  );
}

export default App;
