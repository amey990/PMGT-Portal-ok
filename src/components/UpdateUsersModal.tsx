// src/components/UpdateUsersModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

export interface User {
  name: string;
  role: string;
  email: string;
  projects: string[];
  contact: string;
}

interface UpdateUsersModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onUpdate: (u: User) => void;
  onDelete: (email: string) => void;
}

const PROJECT_OPTIONS = ['Alpha', 'Beta', 'Gamma'];

export default function UpdateUsersModal({
  open,
  user,
  onClose,
  onUpdate,
  onDelete,
}: UpdateUsersModalProps) {
  // Local form state
  const [form, setForm] = useState<User>({
    name: '',
    role: '',
    email: '',
    projects: [],
    contact: '',
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Load in the passed-in user when it changes
  useEffect(() => {
    if (user) {
      setForm({ ...user });
    }
  }, [user]);

  // Handler for text inputs: name, email, contact
  const handleInputChange =
    (field: 'name' | 'email' | 'contact') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  // Handler for multi-select projects
  const handleProjectsChange = (e: SelectChangeEvent<string[]>) => {
    setForm((f) => ({ ...f, projects: e.target.value as string[] }));
  };

  const handleUpdate = () => {
    onUpdate(form);
    onClose();
  };

  const handleDeleteConfirm = () => {
    if (user) onDelete(user.email);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: '#1C1C1E',
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          outline: 'none',
          color: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update User
        </Typography>

        <Box
          component="form"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            mb: 3,
          }}
        >
          {/* Name */}
          <TextField
            label="Name"
            size="small"
            value={form.name}
            onChange={handleInputChange('name')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{
              bgcolor: '#28282B',
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />

          {/* Role (read-only) */}
          <TextField
            label="Role"
            size="small"
            value={form.role}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{
              bgcolor: '#28282B',
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />

          {/* Email */}
          <TextField
            label="Email"
            size="small"
            value={form.email}
            onChange={handleInputChange('email')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{
              bgcolor: '#28282B',
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />

          {/* Assigned Projects (multi-select) */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Projects</InputLabel>
            <Select<string[]>
              multiple
              value={form.projects}
              onChange={handleProjectsChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
              MenuProps={{
                PaperProps: {
                  sx: { bgcolor: '#28282B', color: '#fff' },
                },
              }}
              sx={{
                color: '#fff',
                '& .MuiSelect-icon': { color: '#888' },
              }}
            >
              {PROJECT_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  <Checkbox
                    checked={form.projects.includes(opt)}
                    sx={{ color: '#fff' }}
                  />
                  <ListItemText primary={opt} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Contact No */}
          <TextField
            label="Contact No"
            size="small"
            value={form.contact}
            onChange={handleInputChange('contact')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{
              bgcolor: '#28282B',
              '& .MuiInputBase-input': { color: '#fff' },
            }}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>

          <Box>
            <Button onClick={onClose} sx={{ mr: 1, color: '#aaa' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                bgcolor: '#22C55E',
                '&:hover': { bgcolor: '#16A34A' },
              }}
            >
              Update
            </Button>
          </Box>
        </Box>

        {/* Confirm delete */}
        <ConfirmationDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          message="Are you sure you want to delete this user?"
        />
      </Box>
    </Modal>
  );
}
