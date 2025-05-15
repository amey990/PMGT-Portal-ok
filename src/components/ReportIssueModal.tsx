// src/components/ReportIssueModal.tsx
// import React, { useState, ChangeEvent } from 'react';

import { useState, ChangeEvent } from 'react';

import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

interface ReportIssueModalProps {
  open: boolean;
  onClose: () => void;
  userEmail?: string; // you can pass the logged-in email here
  onReportSuccess?: () => void;
}

export default function ReportIssueModal({
  open,
  onClose,
  userEmail = '',
  onReportSuccess,
}: ReportIssueModalProps) {
  const [name, setName] = useState('');
  const [email] = useState(userEmail);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'High' | 'Moderate' | 'Low'>('Moderate');
  const [module, setModule] = useState(
    'Dashboard' as
      | 'Project'
      | 'Activities'
      | 'Reminders'
      | 'User management'
      | 'Analytics'
      | 'Inventory'
  );
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // TODO: wire up your API / email logic here
    console.log({ name, email, title, priority, module, description, file });
    onReportSuccess?.();
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
          Report an Issue / Bug
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
            // InputLabelProps={{ sx: { color: '#aaa' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />
          <TextField
            label="Email"
            value={email}
            size="small"
            fullWidth
            disabled
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
            // InputLabelProps={{ sx: { color: '#aaa' } }}
            InputLabelProps={{ style: { color: '#aaa' } }}
          />

          <TextField
            label="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
            fullWidth
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
          />

          <FormControl size="small" fullWidth sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) =>
                setPriority(e.target.value as 'High' | 'Moderate' | 'Low')
              }
              sx={{ color: '#fff' }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Affected Module</InputLabel>
            <Select
              value={module}
              label="Affected Module"
              onChange={(e) =>
                setModule(
                  e.target.value as
                    | 'Project'
                    | 'Activities'
                    | 'Reminders'
                    | 'User management'
                    | 'Analytics'
                    | 'Inventory'
                )
              }
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Project">Project</MenuItem>
              <MenuItem value="Activities">Activities</MenuItem>
              <MenuItem value="Reminders">Reminders</MenuItem>
              <MenuItem value="User management">User management</MenuItem>
              <MenuItem value="Analytics">Analytics</MenuItem>
              <MenuItem value="Inventory">Inventory</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            multiline
            rows={4}
            fullWidth
            sx={{
              gridColumn: '1 / -1',
              bgcolor: '#28282B',
              textarea: { color: '#fff' },
            }}
            InputLabelProps={{ sx: { color: '#aaa' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button variant="outlined" component="label" size="small">
            Select File
            <input hidden type="file" onChange={handleFileChange} />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ fontSize: 12, color: '#ccc' }}>
              {file.name}
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Button onClick={onClose} sx={{ mr: 1, color: '#aaa' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
