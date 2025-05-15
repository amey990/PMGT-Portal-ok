// src/pages/UserProfile.tsx
import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Typography,
  Snackbar,
  Alert,
  useTheme,

} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

export default function UserProfile() {
  const theme = useTheme();
  const AVATAR_SIZE = 140;

  // Avatar state
  const [preview, setPreview] = useState<string | null>(null);
  const [canRemove, setCanRemove] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setCanRemove(true);
    }
  };
  const handleRemoveImage = () => {
    setPreview(null);
    setCanRemove(false);
  };
  const handleEnableEditImage = () => {
    setCanRemove(true);
  };

  // Form state
  const [username, setUsername] = useState('John Doe');
  const [editingUsername, setEditingUsername] = useState(false);
  const [role]          = useState('Admin');
  const [email]         = useState('user@example.com');
  const [phone, setPhone]    = useState('123-456-7890');
  const [designation, setDesignation] = useState('Project Manager');

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSave = () => {
    // TODO: actual save logic
    setOpenSnackbar(true);
    // after save, switch to pencil mode
    setCanRemove(false);
  };
 
  // const handleCloseSnackbar = (
  //   event: React.SyntheticEvent<any, Event> | Event,
  //   reason?: string
  // ) => {
  //   if (reason === 'clickaway') return;
  //   setOpenSnackbar(false);
  // };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent<any, Event> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  

  // Shared filled-input style
  const inputSx = {
    '& .MuiFilledInput-root':   { bgcolor: '#2A2A2A', borderRadius: 1 },
    '& .MuiFilledInput-input':  { color: '#E0E0E0' },
    '& .MuiInputLabel-root':    { color: '#888' },
  };

  return (
    <MainLayout title="User Profile" showRightPanel={false}>
      <Box sx={{ pt: 11, px: 3 }}>
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

          {/* Avatar + edit/remove toggle */}
          <Box
            sx={{
              position: 'absolute',
              top: `-${AVATAR_SIZE / 2}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
            }}
          >
            <input
              type="file"
              accept="image/*"
              id="profile-image-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image-input">
              <Avatar
                src={preview ?? undefined}
                sx={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  bgcolor: preview ? 'transparent' : 'grey.700',
                  border: `4px solid ${theme.palette.background.paper}`,
                  cursor: 'pointer',
                }}
              >
                {!preview && (
                  <PersonIcon
                    sx={{ fontSize: AVATAR_SIZE * 0.5, color: '#555' }}
                  />
                )}
              </Avatar>
            </label>

            {preview && canRemove && (
              <IconButton
                size="small"
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  bgcolor: 'error.main',
                  color: 'common.white',
                  '&:hover': { bgcolor: 'error.dark' },
                }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}

            {preview && !canRemove && (
              <IconButton
                size="small"
                onClick={handleEnableEditImage}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                  color: 'common.white',
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>

          {/* Fields */}
          <CardContent
            sx={{
              pt: `${AVATAR_SIZE / 2 + 20}px`,
              pb: 0,
              flex: 1,
              overflowY: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Left column */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Username"
                  variant="filled"
                  fullWidth
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    readOnly: !editingUsername,
                    endAdornment:
                      !editingUsername && (
                        <Button size="small" onClick={() => setEditingUsername(true)}>
                          Edit
                        </Button>
                      ),
                  }}
                  sx={inputSx}
                />
                <TextField
                  label="Role"
                  variant="filled"
                  fullWidth
                  value={role}
                  InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="caption" color="textSecondary">
                          Read-only
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
                <TextField
                  label="Email"
                  variant="filled"
                  fullWidth
                  value={email}
                  InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="caption" color="textSecondary">
                          Read-only
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputSx}
                />
              </Box>

              {/* Right column */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Contact No"
                  variant="filled"
                  fullWidth
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  sx={inputSx}
                />
                <TextField
                  select
                  label="Designation"
                  variant="filled"
                  fullWidth
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  sx={inputSx}
                >
                  <MenuItem value="Project Manager">Project Manager</MenuItem>
                  <MenuItem value="BDM">BDM</MenuItem>
                  <MenuItem value="NOC Engineer">NOC Engineer</MenuItem>
                  <MenuItem value="SCM">SCM</MenuItem>
                </TextField>
              </Box>
            </Box>
          </CardContent>

          {/* Save area */}
          <Box sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ 
                bgcolor: '#FFC300', 
                color: '#fff', px: 4 }}
            >
              Save
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Global toast */}
            
          <Snackbar
              open={openSnackbar}
              autoHideDuration={1200}
              onClose={handleCloseSnackbar}            // now matches expected type
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert
                // onClose={handleCloseSnackbar}          // also works here
                onClose={() => setOpenSnackbar(false)} 
                severity="success"
                variant="outlined"
                sx={{
                  bgcolor: 'background.paper',
                  borderColor: '#4caf50',
                  boxShadow: 1,
                }}
              >
                User profile updated successfully
              </Alert>
            </Snackbar>

    </MainLayout>
  );
}
