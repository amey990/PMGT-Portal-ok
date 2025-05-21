
// // src/layouts/MainLayout.tsx
// import { ReactNode, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Box, Snackbar, Alert } from '@mui/material';

// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import RightPanel from '../components/RightPanel';
// import ProjectsPanel from '../components/ProjectsPanel';
// import ProfilePanel from '../components/ProfilePanel';
// import ReportIssueModal from '../components/ReportIssueModal';

// interface MainLayoutProps {
//   children: ReactNode;
//   title: string;
//   showRightPanel?: boolean; // Optional toggle
// }

// export default function MainLayout({
//   children,
//   title,
//   showRightPanel = true,
// }: MainLayoutProps) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [selected, setSelected] = useState<string>('Home');
//   const [isReportOpen, setIsReportOpen] = useState(false);
//   const [toastOpen, setToastOpen] = useState(false);
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);

//   // When the URL changes, update which Sidebar item is highlighted
//   useEffect(() => {
//     switch (location.pathname) {
//       case '/dashboard':
//         setSelected('Home');
//         break;
//       case '/reminders':
//         setSelected('Notifications');
//         break;
//         case '/analytics':
//           setSelected('Analytics');
//           break;
//       case '/add-ticket':
//           setSelected('Calendar');
//           break;
      
//       default:
//         break;
//     }
//   }, [location.pathname]);

//   function onMenuClick(label: string) {

//     switch (label) {
//       case 'Home':
//         navigate('/dashboard');
//         setExpandedItem(null);
//         break;
//       case 'Projects':
//         setExpandedItem(expandedItem === 'Projects' ? null : 'Projects');
//         break;
//       case 'Calendar':
//         navigate('/add-ticket');
//         setExpandedItem(null);
//         break;
//       case 'Analytics':
//         navigate('/analytics');
//         setExpandedItem(null);
//         break;
//       case 'Notifications':
//         navigate('/reminders');
//         setExpandedItem(null);
//         break;
//       case 'Profile':
//         setExpandedItem(expandedItem === 'Profile' ? null : 'Profile');
//         break;
//       case 'Logout':
//         navigate('/signup');
//         break;
        
//       case 'Help':
//         setIsReportOpen(true);
//         return;
//         default:
//         setExpandedItem(null);
        
//     }
//   }

//   const handleReportSuccess = () => {
//      // called after the modal's "Send"
//         setToastOpen(true);
//       };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#0F0F0F' }}>
//       <Sidebar selected={selected} onMenuClick={onMenuClick} />

//       {expandedItem === 'Projects' && <ProjectsPanel onNavigate={navigate} />}
//       {expandedItem === 'Profile'  && <ProfilePanel  onNavigate={navigate} />}

//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//         {/* Top Navbar with dynamic title */}
//         <Navbar title={title} />

//         {/* Main content area */}
//         <Box sx={{ display: 'flex', flexGrow: 1 }}>
//           {/* Center Content */}
//           <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
//             {children}
//           </Box>

//           {/* Right Panel (optional) */}
//           {showRightPanel && <RightPanel />}

         

//          {/* Report an Issue / Bug modal */}
//          <ReportIssueModal
//           open={isReportOpen}
//           onClose={() => setIsReportOpen(false)}
//           onReportSuccess={handleReportSuccess}
//           userEmail={'you@yourapp.com'}
//         />

//         {/* Success toast */}
//         <Snackbar
//            open={toastOpen}
//            autoHideDuration={1200}
//           onClose={() => setToastOpen(false)}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <Alert
//             onClose={() => setToastOpen(false)}
//             severity="success"
//             sx={{ width: '100%' }}
//           >
//             Issue reported successfully
//           </Alert>
//         </Snackbar>
 

//         </Box>
//       </Box>
//     </Box>
//   );
// }

// src/layouts/MainLayout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Snackbar, Alert } from '@mui/material';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RightPanel from '../components/RightPanel';
import ProjectsPanel from '../components/ProjectsPanel';
import ProfilePanel from '../components/ProfilePanel';
import ReportIssueModal from '../components/ReportIssueModal';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  showRightPanel?: boolean;
}

export default function MainLayout({
  children,
  title,
  showRightPanel = true,
}: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState<string>('Home');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [toastOpen, setToastOpen]       = useState(false);

  // When the URL changes, update which Sidebar item is highlighted
  useEffect(() => {
    const path = location.pathname;

    // 1) any /projects… route → "Projects"
    if (path.startsWith('/projects')) {
      setSelected('Projects');
      return;
    }

    // 2) any of your ProfilePanel routes → "Profile"
    const profileRoutes = [
      '/addpm',
      '/viewpm',
      '/addbdm',
      '/viewbdm',
      '/addfe',
      '/viewfe',
      '/view-all-users',
      '/profile' // in case you navigate directly
    ];
    if (profileRoutes.some(r => path.startsWith(r))) {
      setSelected('Profile');
      return;
    }

    // 3) fall back to top-level pages
    switch (path) {
      case '/dashboard':
        setSelected('Home');
        break;
      case '/reminders':
        setSelected('Notifications');
        break;
      case '/analytics':
        setSelected('Analytics');
        break;
      case '/add-ticket':
        setSelected('Calendar');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  function onMenuClick(label: string) {
    switch (label) {
      case 'Home':
        navigate('/dashboard');
        setExpandedItem(null);
        break;
      case 'Projects':
        setExpandedItem(expandedItem === 'Projects' ? null : 'Projects');
        break;
      case 'Calendar':
        navigate('/add-ticket');
        setExpandedItem(null);
        break;
      case 'Analytics':
        navigate('/analytics');
        setExpandedItem(null);
        break;
      case 'Notifications':
        navigate('/reminders');
        setExpandedItem(null);
        break;
      case 'Profile':
        setExpandedItem(expandedItem === 'Profile' ? null : 'Profile');
        break;
      case 'Logout':
        navigate('/signup');
        break;
      case 'Help':
        setIsReportOpen(true);
        return;
      default:
        setExpandedItem(null);
    }
  }

  const handleReportSuccess = () => {
    setToastOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', bgcolor: '#0F0F0F' }}>
      <Sidebar selected={selected} onMenuClick={onMenuClick} />

      {expandedItem === 'Projects' && <ProjectsPanel onNavigate={navigate} />}
      {expandedItem === 'Profile'  && <ProfilePanel  onNavigate={navigate} />}

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar title={title} />

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            {children}
          </Box>

          {showRightPanel && <RightPanel />}

          <ReportIssueModal
            open={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            onReportSuccess={handleReportSuccess}
            userEmail={'you@yourapp.com'}
          />

          <Snackbar
            open={toastOpen}
            autoHideDuration={1200}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              Issue reported successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
}

