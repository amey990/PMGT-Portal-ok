// src/pages/AddTicket.tsx
import React, { useState } from 'react';
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
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import MainLayout from '../layouts/MainLayout';

const menuSx = {
  PaperProps: {
    sx: {
      bgcolor: '#28282B',
      color: '#fff',
      '& .MuiListItem-button': { color: '#fff' },
      '& .MuiListItem-root.Mui-selected': { bgcolor: '#3a3a3c' },
      '& .MuiListItem-root.Mui-selected:hover': { bgcolor: '#505050' },
    }
  }
};

export default function AddTicket() {
  const projects   = ['RRB', 'Alpha', 'Beta'];
  const categories = ['Inspection', 'Maintenance', 'Repair'];
  const states     = ['CA','TX','NY'];
  const districts  = ['North','East','South','West'];
  const cities     = ['Los Angeles','San Francisco','Houston'];
  const branches   = ['Branch A','Branch B','Branch C'];
  const managers   = ['John Doe','Jane Roe','Jim Boe'];
  const vendors    = ['Vendor A','Vendor B','Vendor C'];
  const statuses   = ['Pending','In Progress','Completed','Canceled'];

  const [form, setForm] = useState({
    ticketNo: `T-${Math.floor(1000 + Math.random()*9000)}`,
    date: new Date().toISOString().slice(0,10),
    project:'', category:'', state:'', district:'', city:'',
    address:'', branch:'', bcode:'', manager:'', vendor:'',
    feName:'', feMobile:'', noc:'', remarks:'', status:''
  });
  const [toast, setToast] = useState<{open:boolean,message:string}>({ open:false, message:'' });
  const handleToastClose = () => setToast(t => ({ ...t, open:false }));

   const handleChange = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  const handleAdd = () => {
    console.log('create activity', form);
    setToast({ open:true, message:'Activity created successfully!' });
  };

  return (
    <MainLayout title="Add Ticket" showRightPanel={false}>
      <Box sx={{ pt:2, px:2 }}>
        <Card
          sx={{
            bgcolor: '#1C1C1E',
            borderRadius: 2,
            height: 'calc(100vh - 85px)',  // pulled in to make room for the Add button
            overflow: 'hidden'
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* header */}
            <Typography sx={{ color:'#fff', fontSize:20, fontWeight:600, mb:1 }}>
              Create New Activity
            </Typography>
            <Divider sx={{ borderColor:'#333', mb:2 }} />

            {/* form body */}
            <Box
              component="form"
              sx={{
                flex: 1,
                overflowY: 'auto',
                pr: 1,
                pt: 1,
                pb: 8,                     // extra bottom padding
                display: 'grid',
                gridTemplateColumns: { xs:'1fr', sm:'1fr 1fr' },
                gap: 2,
                '&::-webkit-scrollbar': { width:6 },
                '&::-webkit-scrollbar-thumb': { background:'#333', borderRadius:3 }
              }}
            >
              <TextField
                label="Ticket No"
                size="small"
                value={form.ticketNo}
                InputProps={{ readOnly:true }}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <TextField
                label="Date"
                type="date"
                size="small"
                value={form.date}
                onChange={handleChange('date')}
                InputLabelProps={{ shrink:true, sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Project</InputLabel>
                <Select
                  value={form.project}
                  label="Project"
                  onChange={handleChange('project')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {projects.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Activity Category</InputLabel>
                <Select
                  value={form.category}
                  label="Activity Category"
                  onChange={handleChange('category')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>State</InputLabel>
                <Select
                  value={form.state}
                  label="State"
                  onChange={handleChange('state')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {states.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>District</InputLabel>
                <Select
                  value={form.district}
                  label="District"
                  onChange={handleChange('district')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {districts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>City</InputLabel>
                <Select
                  value={form.city}
                  label="City"
                  onChange={handleChange('city')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="Address"
                size="small"
                value={form.address}
                onChange={handleChange('address')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Branch Name</InputLabel>
                <Select
                  value={form.branch}
                  label="Branch Name"
                  onChange={handleChange('branch')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {branches.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="Branch Code"
                size="small"
                value={form.bcode}
                onChange={handleChange('bcode')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Project Manager</InputLabel>
                <Select
                  value={form.manager}
                  label="Project Manager"
                  onChange={handleChange('manager')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {managers.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Vendor</InputLabel>
                <Select
                  value={form.vendor}
                  label="Vendor"
                  onChange={handleChange('vendor')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {vendors.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="FE Name"
                size="small"
                value={form.feName}
                onChange={handleChange('feName')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <TextField
                label="FE Mobile"
                size="small"
                value={form.feMobile}
                onChange={handleChange('feMobile')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <TextField
                label="NOC Engineer"
                size="small"
                value={form.noc}
                onChange={handleChange('noc')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <TextField
                label="Remarks"
                size="small"
                value={form.remarks}
                onChange={handleChange('remarks')}
                InputLabelProps={{ sx:{ color:'#aaa' } }}
                sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
              />

              <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Status</InputLabel>
                <Select
                  value={form.status}
                  label="Status"
                  onChange={handleChange('status')}
                  sx={{ color:'#fff' }}
                  MenuProps={menuSx}
                >
                  {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            {/* Add button */}
            <Box sx={{ pb:1,mb:2,mr:1,mt:1, textAlign:'right' }}>
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{ 
                   backgroundColor: '#FFC000',
                   color: '#000',
                  '&:hover':{ bgcolor:'#D4A420' } 
                
                }}
              >
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

 {/* ─── Shared Toast ─── */}
<Snackbar
  open={toast.open}
  autoHideDuration={1200}
  onClose={handleToastClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert
    onClose={handleToastClose}
    severity="success"
    variant="outlined"
    sx={{
      bgcolor: 'background.paper',
      borderColor: '#4caf50',
      boxShadow: 1,
    }}
  >
    {toast.message}
  </Alert>
</Snackbar>

      
    </MainLayout>
  );
}
