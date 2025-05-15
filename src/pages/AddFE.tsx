
// import { Card, CardContent, Typography } from '@mui/material'
// import MainLayout from '../layouts/MainLayout'

// export default function AddFE() {
//   return (
//      <MainLayout title="Add Field Engineer" showRightPanel={false}>
//       <Card sx={{ width:300, p:2, bgcolor:'#1E1E2F' }}>
//         <CardContent>
//           <Typography variant="h5" color="white" gutterBottom>
//             Welcome to AddFE
//           </Typography>
//           <Typography variant="body2" color="grey.400">
//             This is your main workspace. Here you’ll see your key metrics and tasks.
//           </Typography>
//         </CardContent>
//       </Card>
//     </MainLayout>
//   )
// }

// src/pages/AddFE.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from '@mui/material';

export default function AddFE() {
  // Person info
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [projects, setProjects] = useState<string[]>([]);
  const [sites, setSites]       = useState<string[]>([]);

  // Payment info
  const [bankInfo, setBankInfo]         = useState('');
  const [accountNo, setAccountNo]       = useState('');
  const [ifsc, setIfsc]                 = useState('');
  const [pan, setPan]                   = useState('');
  const [zone, setZone]                 = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [city, setCity]                 = useState('');
  const [state, setStateValue]          = useState('');

  // sample options
  const projectOptions = ['Alpha','Beta','Gamma'];
  const siteOptions    = ['Site A','Site B','Site C'];

  // toast
  const [open, setOpen] = useState(false);
  const handleCreate = () => {
    // TODO: API call
    setOpen(true);
    handleClear();
  };
  const handleCloseSnackbar = (
    _e: React.SyntheticEvent<any, Event> | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  const handleCloseAlert = () => setOpen(false);

  const handleClear = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setProjects([]);
    setSites([]);
    setBankInfo('');
    setAccountNo('');
    setIfsc('');
    setPan('');
    setZone('');
    setContactPerson('');
    setCity('');
    setStateValue('');
  };

  // styling
  const inputSx = {
    '& .MuiFilledInput-root':  { bgcolor: '#2A2A2A', borderRadius: 1 },
    '& .MuiFilledInput-input': { color: '#E0E0E0' },
    '& .MuiInputLabel-root':   { color: '#888' },
  };
  const menuSx = {
    PaperProps: {
      sx: { bgcolor: '#2A2A2A', color: '#fff', '& .MuiMenuItem-root': { color: '#fff' } }
    }
  };

  return (
    <MainLayout title="Add Field Engineer" showRightPanel={false}>
      <Box sx={{ pt: 5, px: 3 }}>
        <Card
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: 'calc(100vh - 125px)',
            bgcolor: '#1C1C1E',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 1) Header (fixed) */}
          <CardContent sx={{ pt: 2, px: 3, pb: 0 }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <Typography variant="h6" color="white">
                Create Field Engineer
              </Typography>
              <Button onClick={handleClear} sx={{ color:'#fff', textTransform:'none', fontSize:14 }}>
                Clear
              </Button>
            </Box>
            <Divider sx={{ borderColor:'#333', my:2 }} />
          </CardContent>

          {/* 2) Scrollable body */}
          <CardContent
            sx={{
              flex: 1,
              px: 3,
              pt: 0,
              pb: 0,
              overflowY: 'auto',
            }}
          >
            {/* Person Info */}
            <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
              <Box sx={{ display:'flex', gap:2 }}>
                <TextField
                  label="Full Name"
                  variant="filled"
                  fullWidth
                  value={fullName}
                  onChange={e=>setFullName(e.target.value)}
                  sx={inputSx}
                />
                <TextField
                  label="Role"
                  variant="filled"
                  fullWidth
                  value="Field Engineer"
                  InputProps={{ disableUnderline:true, readOnly:true }}
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ display:'flex', gap:2 }}>
                <TextField
                  label="Email"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  sx={inputSx}
                />
                <TextField
                  label="Contact No"
                  variant="filled"
                  fullWidth
                  value={phone}
                  onChange={e=>setPhone(e.target.value)}
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ display:'flex', gap:2 }}>
                <FormControl variant="filled" fullWidth sx={inputSx}>
                  <InputLabel sx={{ color:'#888' }}>Project Working</InputLabel>
                  <Select
                    multiple
                    value={projects}
                    onChange={e=>{
                      const v=e.target.value;
                      setProjects(typeof v==='string'?v.split(','):v);
                    }}
                    renderValue={sel=>(sel as string[]).join(', ')}
                    MenuProps={menuSx}
                  >
                    {projectOptions.map(p=>(
                      <MenuItem key={p} value={p}>
                        <Checkbox
                          checked={projects.indexOf(p)>-1}
                          sx={{ color:'white','&.Mui-checked':{color:'#FFC300'} }}
                        />
                        <ListItemText primary={p}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" fullWidth sx={inputSx}>
                  <InputLabel sx={{ color:'#888' }}>Sites</InputLabel>
                  <Select
                    multiple
                    value={sites}
                    onChange={e=>{
                      const v=e.target.value;
                      setSites(typeof v==='string'?v.split(','):v);
                    }}
                    renderValue={sel=>(sel as string[]).join(', ')}
                    MenuProps={menuSx}
                  >
                    {siteOptions.map(s=>(
                      <MenuItem key={s} value={s}>
                        <Checkbox
                          checked={sites.indexOf(s)>-1}
                          sx={{ color:'white','&.Mui-checked':{color:'#FFC300'} }}
                        />
                        <ListItemText primary={s}/>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Divider */}
              <Divider sx={{ borderColor:'#333', my:3 }} />

              {/* Payment Info */}
              <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
                <Box sx={{ display:'flex', gap:2 }}>
                  <TextField
                    label="Bank Info"
                    variant="filled"
                    fullWidth
                    value={bankInfo}
                    onChange={e=>setBankInfo(e.target.value)}
                    sx={inputSx}
                  />
                  <TextField
                    label="Bank Account No"
                    variant="filled"
                    fullWidth
                    value={accountNo}
                    onChange={e=>setAccountNo(e.target.value)}
                    sx={inputSx}
                  />
                </Box>

                <Box sx={{ display:'flex', gap:2 }}>
                  <TextField
                    label="Bank IFSC"
                    variant="filled"
                    fullWidth
                    value={ifsc}
                    onChange={e=>setIfsc(e.target.value)}
                    sx={inputSx}
                  />
                  <TextField
                    label="Pan No"
                    variant="filled"
                    fullWidth
                    value={pan}
                    onChange={e=>setPan(e.target.value)}
                    sx={inputSx}
                  />
                </Box>

                <Box sx={{ display:'flex', gap:2 }}>
                  <TextField
                    label="Zone"
                    variant="filled"
                    fullWidth
                    value={zone}
                    onChange={e=>setZone(e.target.value)}
                    sx={inputSx}
                  />
                  <TextField
                    label="Contact Person"
                    variant="filled"
                    fullWidth
                    value={contactPerson}
                    onChange={e=>setContactPerson(e.target.value)}
                    sx={inputSx}
                  />
                </Box>

                <Box sx={{ display:'flex', gap:2 }}>
                  <TextField
                    label="City"
                    variant="filled"
                    fullWidth
                    value={city}
                    onChange={e=>setCity(e.target.value)}
                    sx={inputSx}
                  />
                  <TextField
                    label="State"
                    variant="filled"
                    fullWidth
                    value={state}
                    onChange={e=>setStateValue(e.target.value)}
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>

          {/* 3) Create button (fixed) */}
          <Box sx={{ px:3, py:2, display:'flex', justifyContent:'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{ bgcolor:'#FFC300', color:'#000', px:4, textTransform:'none' }}
            >
              Create
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Toast */}
      <Snackbar
        open={open}
        autoHideDuration={1200}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          Field engineer created successfully
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
