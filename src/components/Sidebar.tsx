// import { Box, IconButton, Divider } from '@mui/material';

// import HomeRoundedIcon            from '@mui/icons-material/Dashboard';
// import AppsRoundedIcon            from '@mui/icons-material/FileCopy';
// import CalendarTodayRoundedIcon   from '@mui/icons-material/CalendarTodayOutlined';
// import ShowChartRoundedIcon       from '@mui/icons-material/AnalyticsOutlined';
// import NotificationsNoneRounded    from '@mui/icons-material/NotificationsNoneRounded';
// import PersonRoundedIcon          from '@mui/icons-material/PersonRounded';
// import ExitToAppRoundedIcon       from '@mui/icons-material/ExitToAppRounded';
// import HelpOutlineRoundedIcon     from '@mui/icons-material/HelpOutlineRounded';

// import logo from '../assets/Atlas.png';
// import { useLocation } from 'react-router';

// export interface SidebarProps {
//   selected: string;
//   onMenuClick: (label: string) => void;
// }

// export default function Sidebar({ selected, onMenuClick }: SidebarProps) {

//    const location = useLocation();
//    const isAccounts = location.pathname.startsWith('/accounts');


//   // const mainIcons = [
//   //   { Icon: HomeRoundedIcon,  label: 'Home'     },
//   //   { Icon: AppsRoundedIcon,  label: 'Projects' },
//   //   { Icon: CalendarTodayRoundedIcon, label: 'Calendar'  },
//   //   { Icon: ShowChartRoundedIcon,     label: 'Analytics' },
//   // ];
//   // const midIcons = [
//   //   { Icon: NotificationsNoneRounded, label: 'Notifications' },
//   //   { Icon: PersonRoundedIcon,         label: 'Profile'       },
//   // ];
//   // const bottomIcons = [
//   //   { Icon: ExitToAppRoundedIcon,   label: 'Logout', color: '#FFD700' },
//   //   { Icon: HelpOutlineRoundedIcon, label: 'Help',   color: '#777'    },
//   // ];

//    // Atlas app menu
//    const atlasMain = [
//      { Icon: HomeRoundedIcon,  label: 'Home'     },
//      { Icon: AppsRoundedIcon,  label: 'Projects' },
//      { Icon: CalendarTodayRoundedIcon, label: 'Calendar'  },
//      { Icon: ShowChartRoundedIcon,     label: 'Analytics' },
//    ];
//    const atlasMid = [
//      { Icon: NotificationsNoneRounded, label: 'Notifications' },
//      { Icon: PersonRoundedIcon,         label: 'Profile'       },
//    ];
//    const atlasBottom = [
//      { Icon: ExitToAppRoundedIcon,   label: 'Logout', color: '#FFD700' },
//      { Icon: HelpOutlineRoundedIcon, label: 'Help',   color: '#777'    },
//    ];

//   // Finance (Accounts) menu
//   const finMain = [
//     { Icon: HomeRoundedIcon, label: 'Accounts Home' },
//     { Icon: AppsRoundedIcon, label: 'Transactions'  },
//     { Icon: CalendarTodayRoundedIcon, label: 'Invoices' },
//     { Icon: ShowChartRoundedIcon,     label: 'Reports'  },
//   ];
//   const finMid = [
//     { Icon: NotificationsNoneRounded, label: 'Alerts'   },
//     { Icon: PersonRoundedIcon,         label: 'Profile'  },
//   ];
//   const finBottom = atlasBottom; // same “Logout” / “Help”

//    const mainIcons   = isAccounts ? finMain   : atlasMain;
//    const midIcons    = isAccounts ? finMid    : atlasMid;
//    const bottomIcons = isAccounts ? finBottom : atlasBottom;
 

//   return (
//     <Box
//       sx={{
//         width: 60,
//         flexShrink: 0,  
//         bgcolor: 'rgba(17,17,17,0.62)',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         py: 2,
//         zIndex: 2,
//         borderRight:'2px solid #333',
//       }}
//     >
//       <Box sx={{ mb: 3 }}>
//         <img src={logo} alt="Logo" width={37} height={50} />
//       </Box>

//       {/* top nav */}
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//         {mainIcons.map(({ Icon, label }) => (
//           <IconButton
//             key={label}
//             onClick={() => onMenuClick(label)}
//             disableRipple
//             sx={{
//               width: 40, height: 40,
//               color: selected === label ? '#fff' : '#777',
//               bgcolor: selected === label ? '#222' : 'transparent',
//               '&:hover': { bgcolor: '#222' },
//               '&.Mui-focusVisible': { outline: 'none' },
//             }}
//           >
//             <Icon fontSize="small" />
//           </IconButton>
//         ))}
//       </Box>

//       <Divider sx={{ bgcolor: '#333', my: 2, width: 24 }} />

//       {/* mid nav */}
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//         {midIcons.map(({ Icon, label }) => (
//           <IconButton
//             key={label}
//             onClick={() => onMenuClick(label)}
//             disableRipple
//             sx={{
//               width: 40, height: 40,
//               color: selected === label ? '#fff' : '#777',
//               bgcolor: selected === label ? '#222' : 'transparent',
//               '&:hover': { bgcolor: '#222' },
//               '&.Mui-focusVisible': { outline: 'none' },
//             }}
//           >
//             <Icon fontSize="small" />
//           </IconButton>
//         ))}
//       </Box>

//       <Divider sx={{ bgcolor: '#333', my: 2, width: 24 }} />
//       <Box sx={{ flexGrow: 1 }} />

//       {/* bottom nav */}
//       <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1.5, mb:2 }}>
//         {bottomIcons.map(({ Icon, label, color }) => (
//           <IconButton
//             key={label}
//             onClick={() => onMenuClick(label)}
//             disableRipple
//             sx={{
//               width: 40, height: 40,
//               color,
//               bgcolor: selected === label ? '#222' : 'transparent',
//               '&:hover': { bgcolor: '#222' },
//               '&.Mui-focusVisible': { outline: 'none' },
//             }}
//           >
//             <Icon fontSize="small" />
//           </IconButton>
          
//         ))}
//       </Box>
//     </Box>
//   );
// }

import { Box, IconButton, Divider } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/Dashboard'
import AppsRoundedIcon from '@mui/icons-material/FileCopy'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ShowChartRoundedIcon from '@mui/icons-material/AnalyticsOutlined'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded' // finance-only

import logo from '../assets/Atlas.png'

// both variants of your sidebar
export type SidebarVariant = 'atlas' | 'finance'

export interface SidebarProps {
  selected: string
  onMenuClick: (label: string) => void
  variant?: SidebarVariant
}

export default function Sidebar({
  selected,
  onMenuClick,
  variant = 'atlas',
}: SidebarProps) {
  // Atlas‐mode icons
  const atlasMain = [
    { Icon: HomeRoundedIcon, label: 'Home' },
    { Icon: AppsRoundedIcon, label: 'Projects' },
    { Icon: CalendarTodayRoundedIcon, label: 'Calendar' },
    { Icon: ShowChartRoundedIcon, label: 'Analytics' },
  ]
  const atlasMid = [
    { Icon: NotificationsNoneRoundedIcon, label: 'Notifications' },
    { Icon: PersonRoundedIcon, label: 'Profile' },
  ]
  const atlasBottom = [
    { Icon: ExitToAppRoundedIcon, label: 'Logout', color: '#FFD700' },
    { Icon: HelpOutlineRoundedIcon, label: 'Help', color: '#777' },
  ]

  // Finance‐mode icons
  const financeMain = [
    { Icon: AppsRoundedIcon, label: 'Projects' },
    { Icon: AttachMoneyRoundedIcon, label: 'Transactions' },
  ]
  const financeMid = [
    { Icon: NotificationsNoneRoundedIcon, label: 'Reminders' },
    { Icon: PersonRoundedIcon, label: 'Profile' },
  ]
  const financeBottom = atlasBottom

  // select which sets to render
  const mainIcons = variant === 'atlas' ? atlasMain : financeMain
  const midIcons = variant === 'atlas' ? atlasMid : financeMid
  const bottomIcons = atlasBottom // same for both

  return (
    <Box
      sx={{
        width: 60,
        flexShrink: 0,
        bgcolor: 'rgba(17,17,17,0.62)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        borderRight: '2px solid #333',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <img src={logo} alt="Logo" width={37} height={50} />
      </Box>

      {/* Top nav */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {mainIcons.map(({ Icon, label }) => (
          <IconButton
            key={label}
            onClick={() => onMenuClick(label)}
            disableRipple
            sx={{
              width: 40,
              height: 40,
              color: selected === label ? '#fff' : '#777',
              bgcolor: selected === label ? '#222' : 'transparent',
              '&:hover': { bgcolor: '#222' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>

      <Divider sx={{ bgcolor: '#333', my: 2, width: 24 }} />

      {/* Middle nav */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {midIcons.map(({ Icon, label }) => (
          <IconButton
            key={label}
            onClick={() => onMenuClick(label)}
            disableRipple
            sx={{
              width: 40,
              height: 40,
              color: selected === label ? '#fff' : '#777',
              bgcolor: selected === label ? '#222' : 'transparent',
              '&:hover': { bgcolor: '#222' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>

      <Divider sx={{ bgcolor: '#333', my: 2, width: 24 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* Bottom nav */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
        {bottomIcons.map(({ Icon, label, color }) => (
          <IconButton
            key={label}
            onClick={() => onMenuClick(label)}
            disableRipple
            sx={{
              width: 40,
              height: 40,
              color,
              bgcolor: selected === label ? '#222' : 'transparent',
              '&:hover': { bgcolor: '#222' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}
