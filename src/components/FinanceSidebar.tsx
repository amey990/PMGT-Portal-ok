import { Box, IconButton, Divider } from '@mui/material'
import AppsRoundedIcon              from '@mui/icons-material/FileCopy'
import AttachMoneyRoundedIcon       from '@mui/icons-material/AttachMoneyRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import PersonRoundedIcon            from '@mui/icons-material/PersonRounded'
import ExitToAppRoundedIcon         from '@mui/icons-material/ExitToAppRounded'
import HelpOutlineRoundedIcon       from '@mui/icons-material/HelpOutlineRounded'
import logo                         from '../assets/Atlas.png'

export interface FinanceSidebarProps {
  selected: string
  onMenuClick: (label: string) => void
}

const financeMain = [
  { Icon: AppsRoundedIcon,        label: 'Accounts'      },
  { Icon: AttachMoneyRoundedIcon, label: 'PA List'       },
  { Icon: NotificationsNoneRoundedIcon, label: 'Notifications' },
  { Icon: PersonRoundedIcon,      label: 'Freelancers'   },
]

const financeBottom = [
  { Icon: ExitToAppRoundedIcon,   label: 'Logout', color: '#FFD700' },
  { Icon: HelpOutlineRoundedIcon, label: 'Help',   color: '#777'    },
]

export default function FinanceSidebar({
  selected,
  onMenuClick
}: FinanceSidebarProps) {
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
        zIndex: 2,
        borderRight: '2px solid #333',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <img src={logo} alt="Logo" width={37} height={50} />
      </Box>

      {/* main */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {financeMain.map(({ Icon, label }) => (
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
              '&.Mui-focusVisible': { outline: 'none' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>

      <Divider sx={{ bgcolor: '#333', my: 2, width: 24 }} />

      {/* filler */}
      <Box sx={{ flexGrow: 1 }} />

      {/* bottom */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 2 }}>
        {financeBottom.map(({ Icon, label, color }) => (
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
              '&.Mui-focusVisible': { outline: 'none' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}
