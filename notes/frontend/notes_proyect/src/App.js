import { Login } from './components/Login/Login.jsx';
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from './components/Home/Home.jsx';
import { Notes } from './components/Notes/Notes.jsx';
import { Create } from './components/Create/Create.jsx';
import { Archived } from './components/Archived/Archived.jsx';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/archived" element={<Archived/>}/>
          </Routes>
      
   
  );
}

export default App;
