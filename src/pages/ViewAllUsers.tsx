// src/pages/ViewAllUsers.tsx
import React, { useState, useMemo } from 'react';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from '@mui/material';

import UpdateUsersModal, { User } from '../components/UpdateUsersModal';

export default function ViewAllUsers() {
  const allUsers: User[] = [
    { name: 'Alice Johnson', role: 'Project Manager', email: 'alice@example.com', projects: ['Alpha', 'Beta'], contact: '123-456-7890' },
    { name: 'Bob Smith',     role: 'BDM',             email: 'bob@example.com',   projects: ['Beta'],        contact: '234-567-8901' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    { name: 'Carol Nguyen',  role: 'Field Engineer',  email: 'carol@example.com', projects: ['Gamma'],       contact: '345-678-9012' },
    
  ];

  const [search, setSearch]           = useState('');
  const [filterRole, setFilterRole]   = useState('');
  const [exportToastOpen, setExportToastOpen]   = useState(false);
  const [modalOpen, setModalOpen]     = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updateToastOpen, setUpdateToastOpen]   = useState(false);
  const [deleteToastOpen, setDeleteToastOpen]   = useState(false);

  const users = useMemo(() => allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterRole ? u.role === filterRole : true)
  ), [search, filterRole]);

  const handleExport = () => setExportToastOpen(true);
  const closeExportToast = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setExportToastOpen(false);
  };

  const openModal = (u: User) => {
    setSelectedUser(u);
    setModalOpen(true);
  };

  const handleUpdate = (u: User) => {
    // …your update logic…
    setModalOpen(false);
    setUpdateToastOpen(true);
  };
  const closeUpdateToast = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setUpdateToastOpen(false);
  };

  const handleDelete = (email: string) => {
    // …your delete logic…
    setModalOpen(false);
    setDeleteToastOpen(true);
  };
  const closeDeleteToast = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setDeleteToastOpen(false);
  };

  return (
    <MainLayout title="All Portal Users" showRightPanel={false}>
      <Box sx={{ pt: 3, px: 2 }}>
        <Card sx={{
          bgcolor: '#1C1C1E',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 100px)',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 0, px: 3, pt: 2 }}>
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>User Base</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                placeholder="Search..."
                variant="outlined"
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{
                  width: 200,
                  bgcolor: '#1C1C1E',
                  '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #333', borderRadius: 1 },
                  '& .MuiOutlinedInput-root': { height: 32 },
                  '& .MuiOutlinedInput-input': { color: '#fff', py: '4px', fontSize: 12 }
                }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Role</InputLabel>
                <Select
                  value={filterRole}
                  label="Role"
                  onChange={e => setFilterRole(e.target.value)}
                  sx={{
                    bgcolor: '#1C1C1E',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: 1,
                    height: 32,
                    fontSize: 12,
                    '& .MuiSelect-select': { py: 0.5, px: 1 },
                    '& .MuiSelect-icon': { color: '#888', fontSize: 16 }
                  }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Project Manager">Project Manager</MenuItem>
                  <MenuItem value="BDM">BDM</MenuItem>
                  <MenuItem value="Field Engineer">Field Engineer</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleExport}
                sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 2, py: 0.2, '&:hover': { bgcolor: '#D4A420' } }}
              >
                Export
              </Button>
            </Box>
          </CardContent>
          <Divider sx={{ mt: 1.3, borderColor: '#333' }} />

          <Box sx={{ flex: 1, overflowY: 'auto', px: 1, pb: 1, pt: 1.2 }}>
            <TableContainer sx={{
              bgcolor: '#1C1C1E',
              overflowX: 'auto',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 190px)',
              '&::-webkit-scrollbar': { width: '6px', height: '6px' },
              '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 },
            }}>
              <Table stickyHeader sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    {['Name','Role','Email','Assigned Projects','Contact No','Update'].map((col, i) => (
                      <TableCell
                        key={col}
                        sx={{
                          color: '#fff',
                          bgcolor: '#0F0F0F',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          whiteSpace: 'nowrap',
                          borderTopLeftRadius:  i === 0 ? '8px' : 0,
                          borderTopRightRadius: i === 5 ? '8px' : 0,
                          px: '16px', py: '12px',
                          textAlign: 'center',
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell sx={{ color:'#E0E0E0', borderBottom:'1px solid #333', textAlign:'center', py: '12px', px:'16px' }}>{u.name}</TableCell>
                      <TableCell sx={{ color:'#E0E0E0', borderBottom:'1px solid #333', textAlign:'center', py: '12px', px:'16px' }}>{u.role}</TableCell>
                      <TableCell sx={{ color:'#E0E0E0', borderBottom:'1px solid #333', textAlign:'center', py: '12px', px:'16px' }}>{u.email}</TableCell>
                      <TableCell sx={{ color:'#E0E0E0', borderBottom:'1px solid #333', textAlign:'center', py: '12px', px:'16px' }}>
                        {(Array.isArray(u.projects) ? u.projects.join(', ') : u.projects)}
                      </TableCell>
                      <TableCell sx={{ color:'#E0E0E0', borderBottom:'1px solid #333', textAlign:'center', py: '12px', px:'16px' }}>{u.contact}</TableCell>
                      <TableCell sx={{ borderBottom:'1px solid #333', textAlign:'center', py: '8px', px:'8px' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ color:'#fff', borderColor:'#555', textTransform:'none' }}
                          onClick={() => openModal(u)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Box>

      {/* Export toast */}
      <Snackbar
        open={exportToastOpen}
        autoHideDuration={1200}
        onClose={closeExportToast}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={closeExportToast}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          Users exported successfully
        </Alert>
      </Snackbar>

      {/* Update toast */}
      <Snackbar
        open={updateToastOpen}
        autoHideDuration={3000}
        onClose={closeUpdateToast}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={closeUpdateToast}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          User Details updated successfully
        </Alert>
      </Snackbar>

      {/* Delete toast */}
      <Snackbar
        open={deleteToastOpen}
        autoHideDuration={3000}
        onClose={closeDeleteToast}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={closeDeleteToast}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          User deleted successfully
        </Alert>
      </Snackbar>

      {/* Edit-user modal */}
      <UpdateUsersModal
        open={modalOpen}
        user={selectedUser}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdate}
        onDelete={(email) => handleDelete(email)}
      />
    </MainLayout>
  );
}

