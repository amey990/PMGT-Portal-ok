
// v2 //
// import React, { useState, ChangeEvent } from 'react'
import { useState } from 'react'
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
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  Fade,
  Alert,
} from '@mui/material'

import MainLayout from '../layouts/MainLayout'
import UpdateReminderModal, { Reminder } from '../components/UpdateReminderModal'


// Conversion utilities for create form
const formatCreatedDate = (inputDate: string) => {
  const [year, month, day] = inputDate.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`
}

const formatCreatedTime = (inputTime: string) => {
  let [hours, minutes] = inputTime.split(':');
  const modifier = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
  hours = String(parseInt(hours, 10) % 12 || '12');
  return `${hours.padStart(2, '0')}:${minutes} ${modifier}`;
};

export default function Reminders() {
  // Create-form state
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [project, setProject] = useState('')
  const [remType, setRemType] = useState<'Team'|'Personal'>('Team')
  const [desc, setDesc] = useState('')

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'Team'|'Personal'>('Team')

  // snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);



  const handleCreate = () => {
    const newRem: Reminder = {
      srNo: tabReminders.length + 1,
      date: formatCreatedDate(date),
      time: formatCreatedTime(time),
      project,
      type: remType,
      description: desc,
    }
    
    if (tab === 'Team') {
      setTeamReminders((r) => [...r, newRem])
    } else {
      setPersonalReminders((r) => [...r, newRem])
    }
    setOpenSnackbar(true)
    handleClearAll()
  }
  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const handleClearAll = () => {
    setDate('')
    setTime('')
    setProject('')
    setRemType('Team')
    setDesc('')
  }

  // reminders lists (stateful so we can update/delete)
  const [teamReminders, setTeamReminders] = useState<Reminder[]>(
    Array.from({ length: 7 }, (_, i) => ({
      srNo: i + 1,
      date: '07-Jun-2025',
      time: ['09:00 AM','10:30 AM','12:15 PM','02:45 PM','04:00 PM','05:30 PM','06:45 PM'][i],
      project: 'Alpha',
      type: 'Team',
      description: `Reminder description ${i+1}`,
    }))
  )
  const [personalReminders, setPersonalReminders] = useState<Reminder[]>(
    Array.from({ length: 3 }, (_, i) => ({
      srNo: i + 1,
      date: '07-Apr-2025',
      time: ['09:15 AM','11:00 AM','01:45 PM'][i],
      project: 'Alpha',
      type: 'Personal',
      description: `Personal reminder ${i+1}`,
    }))
  )

  const tabReminders = tab === 'Team' ? teamReminders : personalReminders

  // modal editing
  const [editing, setEditing] = useState<Reminder|null>(null)

  const handleUpdate = (updated: Reminder) => {
    const updater = tab === 'Team' ? setTeamReminders : setPersonalReminders;
    updater((list) =>
      list.map((r) =>
        r.srNo === updated.srNo ? updated : r
      )
    );
    setOpenUpdateSnackbar(true); // Add this line
  };
  
  // Update handleDelete function
  const handleDelete = (srNo: number) => {
    const updater = tab === 'Team' ? setTeamReminders : setPersonalReminders;
    updater((list) => list.filter((r) => r.srNo !== srNo));
    setOpenDeleteSnackbar(true); // Add this line    
  };
  
  return (
    <MainLayout title="Reminders" showRightPanel={false}>
      <Box
        sx={{
          pt: 2, px: 2, pb: 3,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 80px)',
          gap: 2,
        }}
      >
        {/* Create card */}
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" color="white">
                Create Reminders
              </Typography>
              <Button
                variant="text"
                onClick={handleClearAll}
                sx={{
                  color: '#888',
                  textTransform: 'none',
                  '&:hover': { color: '#fff' },
                  '&:focus': { outline: 'none' },
                }}
              >
                Clear All
              </Button>
            </Box>
            <Divider sx={{ width: 170, borderColor: '#333', mb: 2 }} />

            <Box
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <TextField
                label="Date"
                type="date"
                size="small"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#aaa' },
                }}
                sx={{
                  bgcolor: '#28282B',
                  input: { color: '#fff', py: '6px' },
                  svg: { color: '#888' },
                  minWidth: 120,
                }}
              />
              <TextField
                label="Time"
                type="time"
                size="small"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  sx: { color: '#aaa' },
                }}
                sx={{
                  bgcolor: '#28282B',
                  input: { color: '#fff', py: '6px' },
                  svg: { color: '#888' },
                  minWidth: 100,
                }}
              />
              <FormControl size="small" sx={{ bgcolor: '#28282B', minWidth: 140 }}>
                <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
                <Select
                  value={project}
                  label="Project"
                  onChange={(e) => setProject(e.target.value)}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Alpha">Alpha</MenuItem>
                  <MenuItem value="Beta">Beta</MenuItem>
                  <MenuItem value="Gamma">Gamma</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ bgcolor: '#28282B', minWidth: 140 }}>
                <InputLabel sx={{ color: '#aaa' }}>Type</InputLabel>
                <Select
                  value={remType}
                  label="Type"
                  onChange={(e) => setRemType(e.target.value as any)}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Team">Team</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                size="small"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                InputLabelProps={{ sx: { color: '#aaa' } }}
                sx={{
                  bgcolor: '#28282B',
                  input: { color: '#fff', py: '6px' },
                  flexGrow: 1,
                  minWidth: 200,
                }}
              />
              <Button
                variant="contained"
                onClick={handleCreate}
                sx={{
                  bgcolor: '#FFC000',
                  color: '#000',
                  textTransform: 'none',
                  px: 3,
                  '&:hover': { bgcolor: '#D4A420' },
                }}
              >
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Table card */}
        <Card
          sx={{
            bgcolor: '#1C1C1E',
            borderRadius: 2,
            height: 'calc(100vh - 180px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              pt: 2,
              pb: 0,
              px: 2,
            }}
          >
            {/* centred toggle */}
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
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
                    px: 3,
                    py: 0.8,
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

            <TextField
              placeholder="Search…"
              size="small"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                marginLeft: 'auto',
                width: 200,
                bgcolor: '#1C1C1E',
                border: '1px solid #333',
                borderRadius: 1,
                '& .MuiOutlinedInput-input': {
                  color: '#fff',
                  py: '6px',
                  fontSize: 12,
                },
              }}
            />
          </CardContent>

          <Box sx={{ flex: 1, px: 2, pt: 1 }}>
            <Fade in timeout={300}>
              <TableContainer
                sx={{
                  backgroundColor: '#1C1C1E',
                  overflowX: 'auto',
                  overflowY: 'auto',
                  maxHeight: 'calc(100vh - 300px)',
                  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
                  '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: '3px' },
                  
                }}
              >
                <Table stickyHeader sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow>
                      {['Sr No', 'Date', 'Time', 'Project', 'Description', 'Update'].map(
                        (col,index) => (
                          <TableCell
                            key={col}
                            sx={{
                              color: '#fff',
                              backgroundColor: '#0F0F0F',
                              borderBottom: '1px solid #333',
                              fontSize: 12,
                              whiteSpace: 'nowrap',
                              padding: '12px 16px',
                              textAlign: 'center',
                              borderTopLeftRadius: index === 0 ? '3px' : '0',
                              borderTopRightRadius: index === 15 ? '3px' : '0',
                              
                            }}
                          >
                            {col}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tabReminders
                      .filter((r) =>
                        r.description.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((row) => (
                        <TableRow key={row.srNo} hover>
                          <TableCell sx={{
                            color: '#fff', borderBottom:'1px solid #333',
                            fontSize:12, padding:'12px 16px', textAlign:'center'
                          }}>
                            {row.srNo}
                          </TableCell>
                          <TableCell sx={{
                            color: '#fff', borderBottom:'1px solid #333',
                            fontSize:12, padding:'12px 16px', textAlign:'center'
                          }}>
                            {row.date}
                          </TableCell>
                          <TableCell sx={{
                            color: '#fff', borderBottom:'1px solid #333',
                            fontSize:12, padding:'12px 16px', textAlign:'center'
                          }}>
                            {row.time}
                          </TableCell>
                          <TableCell sx={{
                            color: '#fff', borderBottom:'1px solid #333',
                            fontSize:12, padding:'12px 16px', textAlign:'center'
                          }}>
                            {row.project}
                          </TableCell>
                          <TableCell sx={{
                            color: '#fff', borderBottom:'1px solid #333',
                            fontSize:12, padding:'12px 16px', textAlign:'center'
                          }}>
                            {row.description}
                          </TableCell>
                          <TableCell sx={{
                            borderBottom:'1px solid #333',
                            padding:'12px 16px', textAlign:'center'
                          }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => setEditing(row)}
                              sx={{
                                backgroundColor: '#FFC000',
                                color: '#000',
                                textTransform: 'none',
                                fontSize: 12,
                                px: 1.5,
                                py: 0.5,
                                '&:hover': { backgroundColor: '#D4A420' },
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          </Box>
        </Card>

        {/* create-snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1200}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              borderColor: '#4caf50',
              boxShadow: 1,
            }}
          >
            Reminder created successfully
          </Alert>
        </Snackbar>
      </Box>

      {/* update-snackbar */}
<Snackbar
  open={openUpdateSnackbar}
  autoHideDuration={1200}
  onClose={() => setOpenUpdateSnackbar(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert
    onClose={() => setOpenUpdateSnackbar(false)}
    severity="success"
    variant="outlined"
    sx={{
      bgcolor: 'background.paper',
      borderColor: '#4caf50',
      boxShadow: 1,
    }}
  >
    Reminder updated successfully
  </Alert>
</Snackbar>

{/* delete-snackbar */}
<Snackbar
  open={openDeleteSnackbar}
  autoHideDuration={1200}
  onClose={() => setOpenDeleteSnackbar(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert
    onClose={() => setOpenDeleteSnackbar(false)}
    severity="success"
    variant="outlined"
    sx={{
      bgcolor: 'background.paper',
      borderColor: '#4caf50',
      boxShadow: 1,
    }}
  >
    Reminder deleted successfully
  </Alert>
</Snackbar>

      {/* update modal */}
      {editing && (
        <UpdateReminderModal
          open={!!editing}
          reminder={editing}
          onClose={() => setEditing(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  )
}













































































