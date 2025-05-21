import { Routes, Route, Navigate } from 'react-router-dom';

import Signup        from './pages/Signup';
import Dashboard     from './pages/Dashboard';
import AllProjects   from './pages/AllProjects';
import AddProject    from './pages/AddProject';
import Updateproject from './pages/Updateproject';
import AddTicket     from './pages/AddTicket';
import UpdateTicket  from './pages/UpdateTicket';
import Analytics     from './pages/Analytics';
import Reminders     from './pages/Reminders';
import AddPM         from './pages/AddPM';
import ViewPM        from './pages/ViewPM';
import AddBDM        from './pages/AddBDM';
import ViewBDM       from './pages/ViewBDM';
import AddFE         from './pages/AddFE';
import ViewFE        from './pages/ViewFE';
import ViewAllUsers  from './pages/ViewAllUsers';
import UserProfile   from './pages/UserProfile';

import Inventory     from './pages/Inventory';
import Accounts      from './pages/Accounts';

// new pages
import AddSite       from './pages/AddSite';
import ViewSites     from './pages/ViewSites';

export default function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />

      {/* Main App */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Projects */}
      <Route path="/projects"                element={<AllProjects />} />
      <Route path="/projects/new"            element={<AddProject />} />
      <Route path="/projects/update/:id"     element={<Updateproject />} />
      {/* AddSite & ViewSites */}
      <Route path="/projects/sites/new"      element={<AddSite />} />
      <Route path="/projects/sites"          element={<ViewSites />} />

      {/* Tickets */}
      <Route path="/add-ticket"              element={<AddTicket />} />
      <Route path="/tickets/update/:id"      element={<UpdateTicket />} />

      {/* Analytics & Reminders */}
      <Route path="/analytics"               element={<Analytics />} />
      <Route path="/reminders"               element={<Reminders />} />

      {/* People Management */}
      <Route path="/addpm"                   element={<AddPM />} />
      <Route path="/viewpm"                  element={<ViewPM />} />
      <Route path="/addbdm"                  element={<AddBDM />} />
      <Route path="/viewbdm"                 element={<ViewBDM />} />
      <Route path="/addfe"                   element={<AddFE />} />
      <Route path="/viewfe"                  element={<ViewFE />} />

      {/* View all users */}
      <Route path="/view-all-users"          element={<ViewAllUsers />} />

      {/* Inventory & Accounts */}
      <Route path="/inventory"               element={<Inventory />} />
      <Route path="/accounts"                element={<Accounts />} />

      {/* Profile */}
      <Route path="/profile"                 element={<UserProfile />} />

      {/* Catch-all → redirect to signup */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
