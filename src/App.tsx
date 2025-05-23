import { Routes, Route, Navigate } from 'react-router-dom'

/* Atlas pages */
import Signup        from './pages/Signup'
import Dashboard     from './pages/Dashboard'
import AllProjects   from './pages/AllProjects'
import AddProject    from './pages/AddProject'
import Updateproject from './pages/Updateproject'
import AddTicket     from './pages/AddTicket'
import UpdateTicket  from './pages/UpdateTicket'
import Analytics     from './pages/Analytics'
import Reminders     from './pages/Reminders'
import AddPM         from './pages/AddPM'
import ViewPM        from './pages/ViewPM'
import AddBDM        from './pages/AddBDM'
import ViewBDM       from './pages/ViewBDM'
import AddFE         from './pages/AddFE'
import ViewFE        from './pages/ViewFE'
import ViewAllUsers  from './pages/ViewAllUsers'
import UserProfile   from './pages/UserProfile'
import Inventory     from './pages/Inventory'
import AddSite       from './pages/AddSite'
import ViewSites     from './pages/ViewSites'

/* Finance pages */
import Accounts               from './pages/Finance Module/Accounts'
import PA_List                from './pages/Finance Module/PA_List'
import Generate_PA            from './pages/Finance Module/Generate_PA'
import Raise_PA               from './pages/Finance Module/Raise_Pa'
import Notifications_FEs      from './pages/Finance Module/Notifications_freelancers'
import Freelancers_List       from './pages/Finance Module/Freelancers_List'

// export default function App() {
//   return (
//     <Routes>
//       {/* Authentication */}
//       <Route path="/signup" element={<Signup />} />

//       {/* Atlas module */}
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/projects" element={<AllProjects />} />
//       <Route path="/projects/new" element={<AddProject />} />
//       <Route path="/projects/update/:id" element={<Updateproject />} />
//       <Route path="/projects/sites/new" element={<AddSite />} />
//       <Route path="/projects/sites" element={<ViewSites />} />
//       <Route path="/add-ticket" element={<AddTicket />} />
//       <Route path="/tickets/update/:id" element={<UpdateTicket />} />
//       <Route path="/analytics" element={<Analytics />} />
//       <Route path="/reminders" element={<Reminders />} />
//       <Route path="/addpm" element={<AddPM />} />
//       <Route path="/viewpm" element={<ViewPM />} />
//       <Route path="/addbdm" element={<AddBDM />} />
//       <Route path="/viewbdm" element={<ViewBDM />} />
//       <Route path="/addfe" element={<AddFE />} />
//       <Route path="/viewfe" element={<ViewFE />} />
//       <Route path="/view-all-users" element={<ViewAllUsers />} />
//       <Route path="/profile" element={<UserProfile />} />
//       <Route path="/inventory" element={<Inventory />} />

//       {/* Finance module */}
//       <Route path="/accounts"                    element={<Accounts />} />
//       <Route path="/pa-list"                     element={<PA_List />} />
//       <Route path="/generate-pa"                 element={<Generate_PA />} />
//       <Route path="/raise-pa"                    element={<Raise_PA />} />
//       <Route path="/notifications-freelancers"   element={<Notifications_FEs />} />
//       <Route path="/freelancers-list"            element={<Freelancers_List />} />

//       {/* fallback */}
//       <Route path="*" element={<Navigate to="/signup" replace />} />
//     </Routes>
//   )
// }

export default function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />

      {/* Atlas module */}
      {/* ... Atlas routes ... */}

      {/* Finance module */}
      <Route path="/accounts"         element={<Accounts />} />
      <Route path="/pa-list"          element={<PA_List />} />
      <Route path="/generate-pa"      element={<Generate_PA />} />
      <Route path="/raise-pa"         element={<Raise_PA />} />
      <Route path="/freelancers-list" element={<Freelancers_List />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
}
