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
  Button
} from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

export interface SiteRow {
  id: number;
  project: string;
  siteName: string;
  siteId: string;
  address: string;
  pincode: string;
  poc: string;
  state: string;
  district: string;
}

interface UpdateSiteModalProps {
  open: boolean;
  row: SiteRow | null;
  onClose: () => void;
  onUpdate: (r: SiteRow) => void;
  onDelete: (id: number) => void;
}

export default function UpdateSiteModal({
  open, row, onClose, onUpdate, onDelete
}: UpdateSiteModalProps) {
  const [form, setForm] = useState<SiteRow>({
    id: 0,
    project: '',
    siteName: '',
    siteId: '',
    address: '',
    pincode: '',
    poc: '',
    state: '',
    district: ''
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (row) {
      setForm(row);
    }
  }, [row]);

  const handleInputChange = (key: keyof Omit<SiteRow,'id'|'project'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
    };

  // Only for MUI <Select> fields
  const handleSelectChange = (key: 'project') =>
    (e: SelectChangeEvent<string>) => {
      setForm(f => ({ ...f, [key]: e.target.value } as typeof form));
    };

  const handleUpdate = () => {
    onUpdate(form);
    onClose();
  };

  const handleDeleteConfirm = () => {
    onDelete(form.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 500,
        bgcolor: '#1C1C1E',
        borderRadius: 2,
        p: 3,
        boxShadow: 24,
        outline: 'none',
        color: '#fff'
      }}>
        <Typography variant="h6" gutterBottom>
          Update Site
        </Typography>
        <Box component="form" sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          mb: 3
        }}>
          {/* Project */}
          <FormControl size="small" fullWidth sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
            <Select
              value={form.project}
              label="Project"
              onChange={handleSelectChange('project')}
              sx={{ color: '#fff' }}
            >
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
            value={form.siteName}
            onChange={handleInputChange('siteName')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Site ID */}
          <TextField
            label="Site ID"
            size="small"
            fullWidth
            value={form.siteId}
            onChange={handleInputChange('siteId')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Address */}
          <TextField
            label="Address"
            size="small"
            fullWidth
            value={form.address}
            onChange={handleInputChange('address')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Pincode */}
          <TextField
            label="Pincode"
            size="small"
            fullWidth
            value={form.pincode}
            onChange={handleInputChange('pincode')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* POC */}
          <TextField
            label="POC"
            size="small"
            fullWidth
            value={form.poc}
            onChange={handleInputChange('poc')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* State */}
          <TextField
            label="State"
            size="small"
            fullWidth
            value={form.state}
            onChange={handleInputChange('state')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* District */}
          <TextField
            label="District"
            size="small"
            fullWidth
            value={form.district}
            onChange={handleInputChange('district')}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#EF4444',
              borderColor: '#EF4444',
              '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' }
            }}
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
              sx={{ bgcolor: '#22C55E', '&:hover': { bgcolor: '#16A34A' } }}
            >
              Update
            </Button>
          </Box>
        </Box>

        <ConfirmationDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Site"
          message="Are you sure you want to delete this site?"
        />
      </Box>
    </Modal>
  );
}
