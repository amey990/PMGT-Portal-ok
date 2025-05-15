// import React from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { Box, Typography } from '@mui/material';

// export default function AddSite() {
//   return (
//     <MainLayout title="Add Site" showRightPanel={false}>
//       <Box sx={{ pt:3, px:2 }}>
//         <Typography sx={{ color:'#fff' }}>— Your Add Site form goes here —</Typography>
//       </Box>
//     </MainLayout>
//   );
// }
// 

// src/pages/AddSite.tsx
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
  Button,
} from '@mui/material';

export default function AddSite() {
  const [project, setProject]     = useState('');
  const [siteName, setSiteName]   = useState('');
  const [siteId, setSiteId]       = useState('');
  const [address, setAddress]     = useState('');
  const [pincode, setPincode]     = useState('');
  const [poc, setPoc]             = useState('');
  const [stateVal, setStateVal]   = useState('');
  const [district, setDistrict]   = useState('');

  const handleSave = () => {
    // TODO: your save logic here
    console.log('Saving site:', {
      project, siteName, siteId, address, pincode, poc, stateVal, district
    });
    // then clear all
    setProject('');
    setSiteName('');
    setSiteId('');
    setAddress('');
    setPincode('');
    setPoc('');
    setStateVal('');
    setDistrict('');
  };

  return (
    <MainLayout title="Add Site" showRightPanel={false}>
      <Box sx={{ pt: 3, px: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600, mb: 1 }}>
              Add Site Details
            </Typography>
            <Divider sx={{ borderColor: '#333', mb: 2 }} />

            <Box
              component="form"
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mb: 3,
              }}
            >
              {/* Project Name */}
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
                <Select
                  value={project}
                  label="Project"
                  onChange={e => setProject(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Alpha">Alpha</MenuItem>
                  <MenuItem value="Beta">Beta</MenuItem>
                  <MenuItem value="Gamma">Gamma</MenuItem>
                </Select>
              </FormControl>

              {/* Site Name */}
              <TextField
                label="Site Name"
                size="small"
                fullWidth
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* Site ID */}
              <TextField
                label="Site ID"
                size="small"
                fullWidth
                value={siteId}
                onChange={e => setSiteId(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* Address */}
              <TextField
                label="Address"
                size="small"
                fullWidth
                value={address}
                onChange={e => setAddress(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* Pincode */}
              <TextField
                label="Pincode"
                size="small"
                fullWidth
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* POC */}
              <TextField
                label="POC"
                size="small"
                fullWidth
                value={poc}
                onChange={e => setPoc(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* State */}
              <TextField
                label="State"
                size="small"
                fullWidth
                value={stateVal}
                onChange={e => setStateVal(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />

              {/* District */}
              <TextField
                label="District"
                size="small"
                fullWidth
                value={district}
                onChange={e => setDistrict(e.target.value)}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
                InputLabelProps={{ sx: { color: '#aaa' } }}
              />
            </Box>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  '&:hover': { bgcolor: '#D4A420' },
                }}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}
