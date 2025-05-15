// import React, { useState } from 'react';

import { useState } from 'react';

import {
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchRoundedIcon       from '@mui/icons-material/SearchRounded';
import FolderOutlinedIcon      from '@mui/icons-material/FolderOutlined';
import CategoryOutlinedIcon    from '@mui/icons-material/CategoryOutlined';

const recentProjects = [
  { name: 'Redux – SaaS Product',        count: 3 },
  { name: 'BCA – CRM Web App',           count: 5 },
  { name: 'TCTS – Company Profile',      count: 7 },
  { name: 'CBI – Social Media Plan',     count: 4 },
  { name: 'TCTS – Company Profile',      count: 7 },
  { name: 'CBI – Social Media Plan',     count: 4 },
  { name: 'TCTS – Company Profile',      count: 7 },
  { name: 'CBI – Social Media Plan',     count: 4 },
  { name: 'TCTS – Company Profile',      count: 7 },
  { name: 'CBI – Social Media Plan',     count: 4 },
 
  
];

const categories = [
  '• Service Delivery',
  '• Managed Services',
];

export default function ProjectsPanel({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [tab, setTab] = useState<'Team' | 'Personal'>('Team');

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'width 0.3s ease',
      }}
    >
      {/* header + tabs */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap:1.3
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
            Projects
          </Typography>
          <Box
            sx={{
              bgcolor: '#242424',
              borderRadius: '9999px',
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {(['Team', 'Personal'] as const).map((t) => (
              <Box
                key={t}
                onClick={() => setTab(t)}
                sx={{
                  px: 2,
                  py: 0.5,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 500,
                  color: tab === t ? '#fff' : '#888',
                  bgcolor: tab === t ? '#0F0F0F' : 'transparent',
                  '&:hover': { color: '#fff' },
                }}
              >
                {t}
              </Box>
            ))}
          </Box>
        </Box>
        <Divider sx={{ bgcolor: '#333', mt: 2, mb: 2 }} />
      </Box>

      {/* search */}
      <Box sx={{ px: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: '#888' }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: '#0F0F0F',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 0 },
              height: 32,
              '& .MuiInputBase-input': { color: '#fff', fontSize: 13 },
              '& .MuiInputBase-input::placeholder': {
                color: '#888',
                opacity: 1,
                fontSize: 15,
              },
            },
          }}
        />
      </Box>

      {/* all projects */}
      <Box
        sx={{
          px: 2,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { color: 'white' },
        }}
        onClick={() => onNavigate('/projects')}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FolderOutlinedIcon sx={{ color: '#ccc', mr: 1 }} fontSize="small" />
          <Typography sx={{ color: '#ccc', fontSize: 14 }}>All Projects</Typography>
        </Box>
        <Typography sx={{ color: '#4EA1F3', fontSize: 14, fontWeight: 500 }}>
          View All &gt;
        </Typography>
      </Box>

      {/* recent items */}
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          mb: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: '3px' },
        }}
      >
        {/* {recentProjects.map((proj, i) => ( */}
        {recentProjects.map((proj) => (
          <Box
            key={proj.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 0.75,
              cursor: 'pointer',
              color: '#ccc',
              '&:hover': { color: '#fff' },
            }}
            onClick={() =>
              onNavigate(`/projects/update/${encodeURIComponent(proj.name)}`)
            }
          >
            {/* smaller project name */}
      <Typography
        variant="caption"
        sx={{
          color: '#ccc',
          fontSize: '0.77rem',       // ~14px; tweak as needed
          lineHeight: 1.2,
          '&:hover': { color: '#fff' } // ensure hover still works
        }}
      >
        {proj.name}
      </Typography>

            {/* <Typography variant="body2">{proj.name}</Typography> */}
            <Box
              sx={{
                bgcolor: '#FBBF24',
                borderRadius: '12px',
                px: 1,
                py: '2px',
                minWidth: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: '#fff', fontWeight: 600 }}
              >
                {proj.count}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* categories */}
           <Box sx={{ display:'flex', alignItems:'center', px:2, mt:1 }}>
        <CategoryOutlinedIcon sx={{ color:'#888', mr:1, fontSize:16 }}/>
             <Typography variant="overline" sx={{ color:'#888', fontSize:10 }}>
               Categories
             </Typography>
           </Box>
           <Box sx={{ pl:3, mt:1 }}>
             {categories.map(name=>(
              <Typography
                key={name}
                variant="body2"
                sx={{
                  color:'#ccc',
                  py:0.75,
                  cursor:'pointer',
                  '&:hover':{ color:'#fff'}
                }}
              >
                {name}
              </Typography>
            ))}
          </Box>


      {/* footer CTA */}
      <Box sx={{ borderTop:'1px solid #333', px:2, py:2 }}>
            <Button fullWidth variant="contained" sx={{
              bgcolor:'#242424',
              color:'#fff',
              textTransform:'none',
              fontSize:14,
              '&:hover':{ bgcolor:'#333' }
            }}
            onClick={() => onNavigate('/projects/new')}
            >
              + New Projects
            </Button>
          </Box>
    </Box>
  );
}
