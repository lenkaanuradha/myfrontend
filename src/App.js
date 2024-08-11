
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrincipalView from "./pages/PrincipalView";
import EditUser from "./pages/EditUser";
import CreateClassRoom from "./pages/CreateClassRoom";
import TeacherView from "./pages/TeacherView";
import StudentsView from "./pages/StudentsView"
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
         
           <Route path="/principalView" element={<PrincipalView />} />
           <Route path="/principalView/editUser/:UserId" element={<EditUser />} />
           <Route path="/principalview/createClassRoom" element={<CreateClassRoom />} />
           <Route path="/teacherview" element={<TeacherView />} />
           <Route path="/studentview" element={<StudentsView />} />
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
