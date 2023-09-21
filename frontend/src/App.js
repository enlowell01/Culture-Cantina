import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import NewUser from "./Components/NewUser";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/newUser" element={<NewUser/>} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;
