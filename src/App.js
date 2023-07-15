import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/DashBoard';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import AskQuestion from './Components/AskQuestion';
import Answer from './Components/Answer';
import Company from './Components/Company';

function App() {
  return (
    <div className="App">
         <Routes>

       <Route exact path ="/"
       element={<Dashboard/>}/>

        <Route path="/company"
        element={<Company/>}
       />

       <Route path="/login"
        element={<LoginPage/>}
       />

      <Route path="/signup"
        element={<SignupPage/>}
       /> 

    <Route path="/ask/:token"
        element={<AskQuestion/>}
       />

        <Route path="/answer/:id"
        element={<Answer/>}
       />

         </Routes>
    </div>
  );
}

export default App;
