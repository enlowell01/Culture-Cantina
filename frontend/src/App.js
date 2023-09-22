import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import NewUser from "./Components/NewUser";
import Media from "./Components/Media";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;
