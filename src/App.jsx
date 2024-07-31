import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './pages/Home';
import Business from './pages/business';
import { Routes, Route } from "react-router-dom";
import Deshboard from './pages/Deshboard';
import UserControle from './Deshboard/Components/ControleTable/UserControle';
import BusinessControle from './Deshboard/Components/ControleTable/BusinessControle';
import CampaignControle from './Deshboard/Components/ControleTable/CampaignControle';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/campaigns" element={<HomePage />} />
        <Route path="/business" element={<Business />} />
        <Route path="/deshboard" element={<Deshboard />} />
        <Route path="/deshboard/user-list" element={<UserControle />} />
        <Route path="/deshboard/business-list" element={<BusinessControle />} />
        <Route path="/deshboard/campaign-list" element={<CampaignControle />} />
      </Routes>

    </div>
  );
}

export default App;
