import Login from "./Login/Login";
import Home from "./Home/Home.jsx"
import * as ReactDOM from "react-dom";
import { Routes, Route ,BrowserRouter} from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
