// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Button, IconButton } from '@mui/material';
// import Inventory2Icon from '@mui/icons-material/Inventory2';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import Avatar from '@mui/material/Avatar';

// interface NavbarProps {
//   title: string;
// }

// export default function Navbar({ title }: NavbarProps) {
//   const navigate = useNavigate();
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         height: 40,
//         flexShrink: 0,
//         px: 3,
//         py: 0.6,
//         bgcolor: '#0F0F0F',
//         borderBottom: '1px solid #333',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       {/* Page Title */}
//       <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
//         {title}
//       </Typography>

//       {/* Right side buttons */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.7, pr: 3.5 }}>
//         {/* Inventory Button */}
//         <Button
//           variant="contained"
//           startIcon={<Inventory2Icon />}
//           onClick={() => navigate('/inventory')}
//           sx={{
//             bgcolor: '#6F4E37',
//             color: '#fff',
//             fontSize: 13,
//             fontWeight: 500,
//             px: 1.5,
//             py: 0.5,
//             textTransform: 'none',
//             display: 'flex',
//             gap: 0.5,
//             '&:hover': {
//               bgcolor: '#663916',
//             },
//           }}
//         >
//           Inventory
//         </Button>

//         {/* Accounts Button */}
//         <Button
//           variant="contained"
//           startIcon={<AccountBalanceWalletIcon />}
//           sx={{
//             bgcolor: '#22C55E',
//             color: '#fff',
//             fontSize: 13,
//             fontWeight: 500,
//             px: 1.5,
//             py: 0.5,
//             textTransform: 'none',
//             display: 'flex',
//             gap: 0.5,
//             '&:hover': {
//               bgcolor: '#16A34A',
//             },
//           }}
//         >
//           Accounts
//         </Button>

//         {/* User Avatar */}
//         <IconButton
//           onClick={() => navigate('/profile')}
//           sx={{
//             bgcolor: '#1C1C1C',
//             width: 40,
//             height: 40,
//             color: '#fff',
//             p: 0.5,
//             '&:hover': { bgcolor: '#333' },
//           }}
//         >
//           <Avatar
//             alt="User"
//             src="/src/assets/icons/user.png"
//             sx={{ width: '100%', height: '100%', borderRadius: '50%' }}
//           />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, IconButton } from '@mui/material'
import Inventory2Icon               from '@mui/icons-material/Inventory2'
import AccountBalanceWalletIcon     from '@mui/icons-material/AccountBalanceWallet'
import ArrowBackIosNewRoundedIcon   from '@mui/icons-material/ArrowBackIosNewRounded'
import Avatar                       from '@mui/material/Avatar'
import AppsRoundedIcon from '@mui/icons-material/FileCopy'

interface NavbarProps {
  title: string
  showAtlas?: boolean
}

export default function Navbar({ title, showAtlas = false }: NavbarProps) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100%',
        height: 40,
        flexShrink: 0,
        px: 3,
        py: 0.6,
        bgcolor: '#0F0F0F',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Title + optional Back-to-Atlas */}
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        {/* {showAtlas && (
          <Button
            variant="contained"
            startIcon={<AppsRoundedIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              bgcolor: '#3B82F6',
              color: '#fff',
              fontSize: 13,
              textTransform: 'none',
              py: 0.4,
              '&:hover': { bgcolor: '#2563EB' },
            }}
          >
            Atlas
          </Button>
        )} */}
        <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      {/* Right side buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.7, pr: 3.5 }}>
        {showAtlas && (
          <Button
            variant="contained"
            startIcon={<AppsRoundedIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              bgcolor: '#3B82F6',
              color: '#fff',
              fontSize: 13,
              textTransform: 'none',
              py: 0.4,
              '&:hover': { bgcolor: '#2563EB' },
            }}
          >
            Atlas
          </Button>
        )}
        
        <Button
          variant="contained"
          startIcon={<Inventory2Icon />}
          onClick={() => navigate('/inventory')}
          sx={{
            bgcolor: '#6F4E37',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            px: 1.5,
            py: 0.5,
            textTransform: 'none',
            '&:hover': { bgcolor: '#663916' },
          }}
        >
          Inventory
        </Button>

        <Button
          variant="contained"
          startIcon={<AccountBalanceWalletIcon />}
          onClick={() => navigate('/accounts')}
          sx={{
            bgcolor: '#22C55E',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            px: 1.5,
            py: 0.5,
            textTransform: 'none',
            '&:hover': { bgcolor: '#16A34A' },
          }}
        >
          Accounts
        </Button>

        <IconButton
          onClick={() => navigate('/profile')}
          sx={{
            bgcolor: '#1C1C1C',
            width: 40,
            height: 40,
            color: '#fff',
            p: 0.5,
            '&:hover': { bgcolor: '#333' },
          }}
        >
          <Avatar
            alt="User"
            src="/src/assets/icons/user.png"
            sx={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </IconButton>
      </Box>
    </Box>
  )
}
