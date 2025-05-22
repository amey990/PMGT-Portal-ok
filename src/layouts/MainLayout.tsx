// import React, { ReactNode, useState, useEffect } from 'react'
// import { useNavigate, useLocation }          from 'react-router-dom'
// import { Box, Snackbar, Alert }              from '@mui/material'

// import AtlasSidebar     from '../components/Sidebar'
// import FinanceSidebar   from '../components/FinanceSidebar'
// import Navbar           from '../components/Navbar'
// import RightPanel       from '../components/RightPanel'
// import ProjectsPanel    from '../components/ProjectsPanel'
// import ProfilePanel     from '../components/ProfilePanel'
// import ReportIssueModal from '../components/ReportIssueModal'

// interface MainLayoutProps {
//   children: ReactNode
//   title: string
//   showRightPanel?: boolean
// }

// export default function MainLayout({
//   children,
//   title,
//   showRightPanel = true,
// }: MainLayoutProps) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [selected,   setSelected]   = useState<string>('Home')
//   const [expanded,   setExpanded]   = useState<string | null>(null)
//   const [reportOpen, setReportOpen] = useState(false)
//   const [toastOpen,  setToastOpen]  = useState(false)

//   // Finance mode if path begins with any of these
//   const financePaths = ['/accounts', '/pa-list', '/generate-pa', '/raise-pa', '/notifications-freelancers', '/freelancers-list']
//   const isFinanceRoute = financePaths.some(p => location.pathname.startsWith(p))

//   // sync selected icon on URL change
//   useEffect(() => {
//     const p = location.pathname

//     if (isFinanceRoute) {
//       if (p.startsWith('/accounts'))               return setSelected('Accounts')
//       if (p.startsWith('/pa-list'))                return setSelected('PA List')
//       if (p.startsWith('/generate-pa'))            return setSelected('Generate PA')
//       if (p.startsWith('/raise-pa'))               return setSelected('Raise PA')
//       if (p.startsWith('/notifications-freelancers')) return setSelected('Notifications')
//       if (p.startsWith('/freelancers-list'))       return setSelected('Freelancers')
//       return
//     }

//     // atlas logic
//     if (p.startsWith('/projects')) {
//       setSelected('Projects'); return
//     }
//     const profilePaths = [
//       '/addpm','/viewpm','/addbdm','/viewbdm',
//       '/addfe','/viewfe','/view-all-users','/profile'
//     ]
//     if (profilePaths.some(r => p.startsWith(r))) {
//       setSelected('Profile'); return
//     }
//     switch (p) {
//       case '/dashboard':   setSelected('Home');          break
//       case '/reminders':   setSelected('Notifications'); break
//       case '/analytics':   setSelected('Analytics');     break
//       case '/add-ticket':  setSelected('Calendar');      break
//       default:                                       break
//     }
//   }, [location.pathname, isFinanceRoute])

//   function onMenuClick(label: string) {
//     if (isFinanceRoute) {
//       // finance navigation
//       switch (label) {
//         case 'Accounts':      navigate('/accounts');                break
//         case 'PA List':       navigate('/pa-list');                 break
//         case 'Generate PA':   navigate('/generate-pa');             break
//         case 'Raise PA':      navigate('/raise-pa');                break
//         case 'Notifications': navigate('/notifications-freelancers'); break
//         case 'Freelancers':   navigate('/freelancers-list');        break
//         case 'Logout':        navigate('/signup');                  break
//         case 'Help':          setReportOpen(true);                  return
//       }
//     } else {
//       // atlas navigation
//       switch (label) {
//         case 'Home':          navigate('/dashboard');   setExpanded(null); break
//         case 'Projects':      setExpanded(expanded==='Projects'?null:'Projects'); break
//         case 'Calendar':      navigate('/add-ticket');  setExpanded(null); break
//         case 'Analytics':     navigate('/analytics');   setExpanded(null); break
//         case 'Notifications': navigate('/reminders');   setExpanded(null); break
//         case 'Profile':       setExpanded(expanded==='Profile'?null:'Profile'); break
//         case 'Logout':        navigate('/signup');      break
//         case 'Help':          setReportOpen(true);      return
//       }
//     }
//   }

//   const handleReportSuccess = () => setToastOpen(true)

//   return (
//     <Box sx={{ display:'flex', height:'100vh', width:'100vw', bgcolor:'#0F0F0F' }}>
//       {isFinanceRoute
//         ? <FinanceSidebar selected={selected} onMenuClick={onMenuClick}/>
//         : <AtlasSidebar   selected={selected} onMenuClick={onMenuClick}/>
//       }

//       {/* Atlas only panels */}
//       {!isFinanceRoute && expanded==='Projects' && <ProjectsPanel onNavigate={navigate}/>}
//       {!isFinanceRoute && expanded==='Profile'  && <ProfilePanel  onNavigate={navigate}/>}

//       <Box sx={{ flexGrow:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
//         <Navbar title={title} />
//         <Box sx={{ display:'flex', flexGrow:1 }}>
//           <Box sx={{ flexGrow:1, overflow:'hidden' }}>{children}</Box>
//           {showRightPanel && !isFinanceRoute && <RightPanel/>}
//         </Box>

//         <ReportIssueModal
//           open={reportOpen}
//           onClose={()=>setReportOpen(false)}
//           onReportSuccess={handleReportSuccess}
//           userEmail={'you@yourapp.com'}
//         />
//         <Snackbar
//           open={toastOpen}
//           autoHideDuration={1200}
//           onClose={()=>setToastOpen(false)}
//           anchorOrigin={{ vertical:'top', horizontal:'right' }}
//         >
//           <Alert onClose={()=>setToastOpen(false)} severity="success" sx={{ width:'100%' }}>
//             Issue reported successfully
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   )
// }


import React, { ReactNode, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Snackbar, Alert } from '@mui/material'

import Sidebar, { SidebarVariant } from '../components/Sidebar'
import Navbar from '../components/Navbar'
import RightPanel from '../components/RightPanel'
import ProjectsPanel from '../components/ProjectsPanel'
import ProfilePanel from '../components/ProfilePanel'
import ReportIssueModal from '../components/ReportIssueModal'

interface MainLayoutProps {
  children: ReactNode
  title: string
  showRightPanel?: boolean
}

export default function MainLayout({
  children,
  title,
  showRightPanel = true,
}: MainLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [selected, setSelected] = useState<string>('Home')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  // finance vs atlas?
  const isFinanceRoute = location.pathname.startsWith('/accounts')
  const sidebarVariant: SidebarVariant = isFinanceRoute ? 'finance' : 'atlas'

  // sync menu highlight to current URL
  useEffect(() => {
    const p = location.pathname

    if (!isFinanceRoute) {
      // Atlas logic
      if (p.startsWith('/projects')) {
        setSelected('Projects')
        return
      }
      const profilePaths = [
        '/addpm',
        '/viewpm',
        '/addbdm',
        '/viewbdm',
        '/addfe',
        '/viewfe',
        '/view-all-users',
        '/profile',
      ]
      if (profilePaths.some(r => p.startsWith(r))) {
        setSelected('Profile')
        return
      }
      switch (p) {
        case '/dashboard':
          setSelected('Home')
          break
        case '/reminders':
          setSelected('Notifications')
          break
        case '/analytics':
          setSelected('Analytics')
          break
        case '/add-ticket':
          setSelected('Calendar')
          break
        default:
          break
      }
    } else {
      // Finance logic
      if (p.startsWith('/accounts')) {
        setSelected('Projects')
        return
      }
      if (p.startsWith('/transactions')) {
        setSelected('Transactions')
        return
      }
      if (p.startsWith('/reminders')) {
        setSelected('Reminders')
        return
      }
      if (p.startsWith('/profile')) {
        setSelected('Profile')
        return
      }
    }
  }, [location.pathname, isFinanceRoute])

  // menu‐click handler
  function onMenuClick(label: string) {
    if (!isFinanceRoute) {
      // Atlas routing
      switch (label) {
        case 'Home':
          navigate('/dashboard')
          setExpanded(null)
          break
        case 'Projects':
          setExpanded(expanded === 'Projects' ? null : 'Projects')
          break
        case 'Calendar':
          navigate('/add-ticket')
          setExpanded(null)
          break
        case 'Analytics':
          navigate('/analytics')
          setExpanded(null)
          break
        case 'Notifications':
          navigate('/reminders')
          setExpanded(null)
          break
        case 'Profile':
          setExpanded(expanded === 'Profile' ? null : 'Profile')
          break
        case 'Logout':
          navigate('/signup')
          break
        case 'Help':
          setReportOpen(true)
          return
        default:
          setExpanded(null)
      }
    } else {
      // Finance routing
      switch (label) {
        case 'Projects':
          navigate('/accounts')
          break
        case 'Transactions':
          navigate('/transactions')
          break
        case 'Reminders':
          navigate('/reminders')
          break
        case 'Profile':
          navigate('/profile')
          break
        case 'Logout':
          navigate('/signup')
          break
        case 'Help':
          setReportOpen(true)
          return
        default:
          break
      }
    }
  }

  const handleReportSuccess = () => setToastOpen(true)

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#0F0F0F' }}>
      <Sidebar selected={selected} variant={sidebarVariant} onMenuClick={onMenuClick} />

      {/* only Atlas has those two flyout panels */}
      {!isFinanceRoute && expanded === 'Projects' && <ProjectsPanel onNavigate={navigate} />}
      {!isFinanceRoute && expanded === 'Profile' && <ProfilePanel onNavigate={navigate} />}

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* pass showBackToAtlas only on finance pages */}
        <Navbar title={title} showBackToAtlas={isFinanceRoute} />

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>{children}</Box>
          {showRightPanel && !isFinanceRoute && <RightPanel />}
        </Box>

        <ReportIssueModal
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          onReportSuccess={handleReportSuccess}
          userEmail={'you@yourapp.com'}
        />

        <Snackbar
          open={toastOpen}
          autoHideDuration={1200}
          onClose={() => setToastOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
            Issue reported successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}



