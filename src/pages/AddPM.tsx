import { useState } from 'react';
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
  Button,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from '@mui/material';

export default function AddPM() {
  // form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [assigned, setAssigned] = useState<string[]>([]);

  // sample projects
  const projects = ['Alpha', 'Beta', 'Gamma'];

  // toast state
  const [open, setOpen] = useState(false);
  const handleCreate = () => {
    // TODO: call your create-PM API
    setOpen(true);
    handleClear();
  };
  // for Snackbar (two-arg handler) 
  const handleCloseSnackbar = (
    _event: React.SyntheticEvent<any, Event> | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  // for Alert (one-arg handler)
  const handleCloseAlert = () => {
    setOpen(false);
  };

  // clear fields except role
  const handleClear = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setAssigned([]);
  };

  // filled-input style
  const inputSx = {
    '& .MuiFilledInput-root':  { bgcolor: '#2A2A2A', borderRadius: 1 },
    '& .MuiFilledInput-input': { color: '#E0E0E0' },
    '& .MuiInputLabel-root':   { color: '#888' },
  };

  return (
    <MainLayout title="Add Project Manager" showRightPanel={false}>
      <Box sx={{ pt: 5, px: 3 }}>
        <Card
          sx={{
            position: 'relative',
            overflow: 'visible',
            width: '100%',
            height: 'calc(100vh - 155px)',
            bgcolor: '#1C1C1E',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header + Clear */}
          <CardContent sx={{ pt: 2, px: 3, pb: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="white">
                Create Project Manager
              </Typography>
              <Button
                onClick={handleClear}
                sx={{ color: '#fff', textTransform: 'none', fontSize: 14 }}
              >
                Clear
              </Button>
            </Box>
            <Divider sx={{ borderColor: '#333', my: 2 }} />

            {/* Two‐column fields */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Left column */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  variant="filled"
                  fullWidth
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  sx={inputSx}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="filled"
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  sx={inputSx}
                />
                <TextField
                  label="Contact No"
                  variant="filled"
                  fullWidth
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  sx={inputSx}
                />
              </Box>

              {/* Right column */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Role"
                  variant="filled"
                  fullWidth
                  value="Project Manager (PM)"
                  InputProps={{ disableUnderline: true, readOnly: true }}
                  sx={inputSx}
                />

                <FormControl variant="filled" fullWidth sx={inputSx}>
                  <InputLabel sx={{ color: '#888' }}>
                    Assign to Projects
                  </InputLabel>
                  {/* <Select
                    multiple
                    value={assigned}
                    onChange={e => {
                      const v = e.target.value;
                      setAssigned(typeof v === 'string' ? v.split(',') : v);
                    }}
                    renderValue={selected => (selected as string[]).join(', ')}
                  > */}

                <Select
                   multiple
                   value={assigned}
                   onChange={e => {
                     const v = e.target.value;
                     setAssigned(typeof v === 'string' ? v.split(',') : v);
                  }}
                   renderValue={sel => (sel as string[]).join(', ')}
                   MenuProps={{
                     PaperProps: {
                       sx: {
                         bgcolor: '#2A2A2A',
                         color: '#E0E0E0',
                       }
                     },
                   }}
                 >
                    {projects.map(proj => (
                      <MenuItem key={proj} value={proj}>
                        <Checkbox
                          checked={assigned.indexOf(proj) > -1}
                          sx={{
                            color: 'white',
                            '&.Mui-checked': { color: '#FFC300' },
                          }}
                        />
                        {proj}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </CardContent>

          {/* Create button pinned bottom‐right */}
          <Box sx={{ px: 3, py: 15, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                bgcolor: '#FFC300',
                color: '#000',
                px: 4,
                textTransform: 'none',
              }}
            >
              Create
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Success toast */}
      <Snackbar
        open={open}
        autoHideDuration={1200}
        onClose={handleCloseSnackbar}              // two-arg
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAlert}               // one-arg
          severity="success"
          variant="outlined"
          sx={{
            bgcolor: 'background.paper',
            borderColor: '#4caf50',
            boxShadow: 1,
          }}
        >
          Project manager created successfully
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
