import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './component/Layout/MainLayout';
import { 
  Homepage, 
  Service, 
  Feature, 
  Product, 
  Testimonial, 
  FAQ,
  Login,
  Signup,
  Dashboard,
  Reports,
  Library,
  People,
  Activities,
  GetStarted,
  Settings,
} from './Pages';

function App() {
  return (
    <Routes>
      {/* Routes WITH Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Feature" element={<Feature />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Testimonial" element={<Testimonial />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Route>
      
      {/* Dashboard Routes WITHOUT Navbar and Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/library" element={<Library />} />
      <Route path="/people" element={<People />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/getStarted" element={<GetStarted />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;