// import React from 'react';
// import {
//   Box,
//   Typography,
//   Divider,
//   Button,
// } from '@mui/material';
// import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';

// export default function ProfilePanel({
//   onNavigate,
// }: {
//   onNavigate: (path: string) => void;
// }) {
//   return (
//     <Box
//       sx={{
//         width: 240,
//         bgcolor: '#1A1A1A',
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         transition: 'width 0.3s ease',
//       }}
//     >
//       <Box sx={{ px: 2, pt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
//           Commedia People
//         </Typography>
//         <PeopleOutlineRoundedIcon sx={{ color: '#888' }} />
//       </Box>
//       <Divider sx={{ borderColor: '#333', my: 1.5 }} />
//       <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: '#242424',
//             color: '#fff',
//             textTransform: 'none',
//             '&:hover': { bgcolor: '#333' },
//           }}
//           onClick={() => onNavigate('/addpm')}
//         >
//           Add Project Manager +
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: '#242424',
//             color: '#fff',
//             textTransform: 'none',
//             '&:hover': { bgcolor: '#333' },
//           }}
//           onClick={() => onNavigate('/addbdm')}
//         >
//           Add BDM +
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: '#242424',
//             color: '#fff',
//             textTransform: 'none',
//             '&:hover': { bgcolor: '#333' },
//           }}
//           onClick={() => onNavigate('/addfe')}
//         >
//           Add Field Engineer +
//         </Button>
//       </Box>
//       <Box sx={{ flexGrow: 1 }} />
//       <Divider sx={{ borderColor: '#333', my: 2 }} />
//     </Box>
//   );
// }


// src/components/ProfilePanel.tsx

import { 
  Box, 
  Typography, 
  Divider, 
  Button, 
} from '@mui/material'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded'

import PortraitIcon from '@mui/icons-material/Portrait';

const dummyUsers = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Nguyen',
  'David Lee',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
  'Eva Patel',
  'Frank Müller',
  'Grace Chen',
 
]

export default function ProfilePanel({
  onNavigate,
}: {
  onNavigate: (path: string) => void
}) {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        transition: 'width 0.3s ease',
        borderRight: '2px solid #333',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2, pt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
          Commedia People
        </Typography>
        <PeopleOutlineRoundedIcon sx={{ color: '#888' }} />
      </Box>
      <Divider sx={{ borderColor: '#333', my: 1.5 }} />

      {/* Quick Actions */}
      <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#242424',
            color: '#fff',
            textTransform: 'none',
            '&:hover': { bgcolor: '#333' },
          }}
          onClick={() => onNavigate('/addpm')}
        >
          Add Project Manager +
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#242424',
            color: '#fff',
            textTransform: 'none',
            '&:hover': { bgcolor: '#333' },
          }}
          onClick={() => onNavigate('/addbdm')}
        >
          Add BDM +
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: '#242424',
            color: '#fff',
            textTransform: 'none',
            '&:hover': { bgcolor: '#333' },
          }}
          onClick={() => onNavigate('/addfe')}
        >
          Add Field Engineer +
        </Button>
      </Box>

      {/* All Users List */}
      <Box
        sx={{
          px: 2,
          mt: 2,
          flexGrow: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 2 },
        }}
      >
        <Box
         sx={{
           display: 'flex',
           justifyContent: 'space-between',
           alignItems: 'center',
           mb: 1
         }}
       > 
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <PortraitIcon sx={{ color: '#ccc', pr:1 }} fontSize="medium" />      
         <Typography sx={{ 
          color: '#ccc', 
          fontSize: 14 }}>
           All Users
         </Typography>
         </Box> 
         <Typography
           sx={{
             color: '#4EA1F3',
             fontSize: 14,
             cursor: 'pointer',
           }}
           onClick={() => onNavigate('/view-all-users')}
         >
           View All &gt;
         </Typography>
       </Box>
        
        {dummyUsers.map((u) => (
          <Box
            key={u}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#2a2a2a' },
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: 14 }}>{u}</Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom “Add Customer” */}
      <Divider sx={{ borderColor: '#333' }} />

      <Box sx={{ px: 2, py: 1 }}>
        
      <Button
            fullWidth
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#333',
              textTransform: 'none',
              '&:hover': { borderColor: '#555', bgcolor: 'rgba(255,255,255,0.05)' },
            }}
            // tack on a query string to tell the signup page “I’m customer mode”
            onClick={() => onNavigate('/signup?mode=customer')}
          >
            + Add Customer
          </Button>
      </Box>
    </Box>
  )
}
