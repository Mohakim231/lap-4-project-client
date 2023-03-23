import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import SignUp from "./Signup"
import { NavBar } from './layout'
import Services from "./Services"

import CardProfile from "./Components/PetProfileForm";
import { AuthProvider } from "./context"
import { ProviderPage, ServiceProfile} from "./Pages"
import './App.css'


function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route index element={<Home/>}/>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/services/:id" element={<ProviderPage/>} />
            <Route path="/service-profile" element = {<ServiceProfile/>}/>
            <Route path="/pet-profile" element={<CardProfile/>} />
          </Route>
        </Routes>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
