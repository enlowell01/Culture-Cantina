import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import NewUser from "./Components/NewUser";
import Media from "./Components/Media";
import Login from './Components/Login';
import { UserContextProvider } from './Components/UserContext'
function App() {
  return (
    <div>
        <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  )
};

export default App;
