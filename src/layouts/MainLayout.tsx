import React, { ReactNode, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Snackbar, Alert } from '@mui/material'

import Sidebar           from '../components/Sidebar'
import FinanceSidebar    from '../components/FinanceSidebar'
import Navbar            from '../components/Navbar'
import RightPanel        from '../components/RightPanel'
import ProjectsPanel     from '../components/ProjectsPanel'
import ProfilePanel      from '../components/ProfilePanel'
import ReportIssueModal  from '../components/ReportIssueModal'

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

  const [selected,   setSelected]   = useState('Home')
  const [expanded,   setExpanded]   = useState<string|null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [toastOpen,  setToastOpen]  = useState(false)

  // detect Finance vs Atlas
  const isFinance = [
    '/accounts',
    '/pa-list',
    '/generate-pa',
    '/raise-pa',
    '/freelancers-list'
  ].some(path => location.pathname.startsWith(path))

  // sync "selected" with URL
  useEffect(() => {
    const p = location.pathname

    if (!isFinance) {
      // — Atlas —
      if (p.startsWith('/projects')) {
        setSelected('Projects'); return
      }
      if (['/addpm','/viewpm','/addbdm','/viewbdm','/addfe','/viewfe','/view-all-users','/profile']
          .some(r=>p.startsWith(r))) {
        setSelected('Profile'); return
      }
      switch (p) {
        case '/dashboard':   setSelected('Home');          break
        case '/reminders':   setSelected('Notifications'); break
        case '/analytics':   setSelected('Analytics');     break
        case '/add-ticket':  setSelected('Calendar');      break
        default: break
      }
    } else {
      // — Finance —
      if (p.startsWith('/accounts'))              { setSelected('Accounts');    return }
      if (p.startsWith('/pa-list'))               { setSelected('PA List');     return }
      if (p.startsWith('/generate-pa'))           { setSelected('PA List');     return }
      if (p.startsWith('/raise-pa'))              { setSelected('PA List');     return }
      if (p.startsWith('/freelancers-list'))      { setSelected('Freelancers'); return }
    }
  }, [location.pathname, isFinance])

  function onMenuClick(label: string) {
    if (!isFinance) {
      // Atlas routing
      switch (label) {
        case 'Home':
          navigate('/dashboard'); setExpanded(null); break
        case 'Projects':
          setExpanded(expanded==='Projects'?null:'Projects'); break
        case 'Calendar':
          navigate('/add-ticket'); setExpanded(null); break
        case 'Analytics':
          navigate('/analytics'); setExpanded(null); break
        case 'Profile':
          setExpanded(expanded==='Profile'?null:'Profile'); break
        case 'Logout':
          navigate('/signup'); break
        case 'Help':
          setReportOpen(true); return
        default:
          setExpanded(null)
      }
    } else {
      // Finance routing
      switch (label) {
        case 'Accounts':
          navigate('/accounts'); break
        case 'PA List':
          navigate('/pa-list'); break
        case 'Freelancers':
          navigate('/freelancers-list'); break
        case 'Logout':
          navigate('/signup'); break
        case 'Help':
          setReportOpen(true); return
        default:
          break
      }
    }
  }

  const handleReportSuccess = () => setToastOpen(true)

  return (
    <Box sx={{ display:'flex', height:'100vh', width:'100vw', bgcolor:'#0F0F0F' }}>
      {isFinance
        ? <FinanceSidebar selected={selected} onMenuClick={onMenuClick}/>
        : <Sidebar        selected={selected} onMenuClick={onMenuClick}/>
      }

      {/* Atlas‐only flyouts */}
      {!isFinance && expanded==='Projects' && <ProjectsPanel onNavigate={navigate}/>}
      {!isFinance && expanded==='Profile'  && <ProfilePanel  onNavigate={navigate}/>}

      <Box sx={{ flexGrow:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <Navbar title={title} showAtlas={isFinance} />

        <Box sx={{ display:'flex', flexGrow:1 }}>
          <Box sx={{ flexGrow:1, overflow:'hidden' }}>{children}</Box>
          {showRightPanel && !isFinance && <RightPanel />}
        </Box>

        <ReportIssueModal
          open={reportOpen}
          onClose={()=>setReportOpen(false)}
          onReportSuccess={handleReportSuccess}
          userEmail={'you@yourapp.com'}
        />
        <Snackbar
          open={toastOpen}
          autoHideDuration={1200}
          onClose={()=>setToastOpen(false)}
          anchorOrigin={{ vertical:'top', horizontal:'right' }}
        >
          <Alert onClose={()=>setToastOpen(false)} severity="success" sx={{ width:'100%' }}>
            Issue reported successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

