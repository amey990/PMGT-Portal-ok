// src/components/UpdateProjectModal.tsx
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
  Button,
  SelectChangeEvent,
} from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

export interface ProjectRow {
  id: number;
  customer: string;
  projectCode: string;
  projectName: string;
  projectType: string;
  projectManager: string;
  bdm: string;
  startDate: string; // mm/dd/yyyy
  endDate: string;   // mm/dd/yyyy
  amcYear: string;
  amcMonths: string;
}

interface UpdateProjectModalProps {
  open: boolean;
  row: ProjectRow | null;          // <- renamed from `project`
  onClose: () => void;
  onUpdate: (r: ProjectRow) => void;
  onDelete: (id: number) => void;
}

// Helpers for date conversion between mm/dd/yyyy and yyyy-mm-dd
const parseDateForInput = (mdy: string) => {
  let [m, d, y] = mdy.split('/');
  // if someone passed you “31/07/2025” swap month/day
  if (parseInt(m, 10) > 12) {
    [m, d] = [d, m];
  }
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};


const formatDateForDisplay = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
};

export default function UpdateProjectModal({
  open,
  row,
  onClose,
  onUpdate,
  onDelete
}: UpdateProjectModalProps) {
  const [form, setForm] = useState<ProjectRow>({
    id: 0,
    customer: '',
    projectCode: '',
    projectName: '',
    projectType: '',
    projectManager: '',
    bdm: '',
    startDate: '',
    endDate: '',
    amcYear: '',
    amcMonths: ''
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Populate form when `row` changes
  useEffect(() => {
    if (row) {
      setForm({
        ...row,
        startDate: parseDateForInput(row.startDate),
        endDate:   parseDateForInput(row.endDate),
      });
    }
  }, [row]);

  // Text inputs
  const handleInputChange = (key: keyof Pick<ProjectRow, 'customer'|'projectCode'|'projectName'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value } as ProjectRow));
    };

  // Date inputs
  const handleDateChange = (key: 'startDate' | 'endDate') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value } as ProjectRow));
    };

  // Selects
  const handleSelectChange = (key: keyof Pick<ProjectRow, 'projectType'|'projectManager'|'bdm'|'amcYear'|'amcMonths'>) =>
    (e: SelectChangeEvent<string>) => {
      setForm(f => ({ ...f, [key]: e.target.value } as ProjectRow));
    };

  const handleUpdate = () => {
    onUpdate({
      ...form,
      startDate: formatDateForDisplay(form.startDate),
      endDate:   formatDateForDisplay(form.endDate),
    });
    onClose();
  };

  const handleDeleteConfirm = () => {
    if (row) onDelete(row.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
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
          Update Project
        </Typography>

        <Box component="form" sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          mb: 3
        }}>
          {/* Customer Name (full width) */}
          <TextField
            label="Customer Name"
            size="small"
            value={form.customer}
            onChange={handleInputChange('customer')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{ 
              bgcolor: '#28282B', 
              input: { color: '#fff' }, 
              gridColumn: '1 / -1' 
            }}
          />

          {/* Project Code */}
          <TextField
            label="Project Code"
            size="small"
            value={form.projectCode}
            onChange={handleInputChange('projectCode')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Project Name */}
          <TextField
            label="Project Name"
            size="small"
            value={form.projectName}
            onChange={handleInputChange('projectName')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Project Type */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Project Type</InputLabel>
            <Select
              value={form.projectType}
              label="Project Type"
              onChange={handleSelectChange('projectType')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Implementation">Implementation</MenuItem>
              <MenuItem value="Upgrade">Upgrade</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>

          {/* Project Manager */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Project Manager</InputLabel>
            <Select
              value={form.projectManager}
              label="Project Manager"
              onChange={handleSelectChange('projectManager')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Roe">Jane Roe</MenuItem>
              <MenuItem value="Jim Boe">Jim Boe</MenuItem>
              <MenuItem value="Ann Coe">Ann Coe</MenuItem>
              <MenuItem value="Tim Moe">Tim Moe</MenuItem>
            </Select>
          </FormControl>

          {/* BDM */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>BDM</InputLabel>
            <Select
              value={form.bdm}
              label="BDM"
              onChange={handleSelectChange('bdm')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Bob Smith">Bob Smith</MenuItem>
              <MenuItem value="Carol Nguyen">Carol Nguyen</MenuItem>
              <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
            </Select>
          </FormControl>

          {/* Start Date */}
          <TextField
            label="Start Date"
            type="date"
            size="small"
            value={form.startDate}
            onChange={handleDateChange('startDate')}
            InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* End Date */}
          <TextField
            label="End Date"
            type="date"
            size="small"
            value={form.endDate}
            onChange={handleDateChange('endDate')}
            InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* AMC Year */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>AMC Year</InputLabel>
            <Select
              value={form.amcYear}
              label="AMC Year"
              onChange={handleSelectChange('amcYear')}
              sx={{ color: '#fff' }}
            >
              {[...Array(6)].map((_, i) => (
                <MenuItem key={i} value={`${i}`}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* AMC Months */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>AMC Months</InputLabel>
            <Select
              value={form.amcMonths}
              label="AMC Months"
              onChange={handleSelectChange('amcMonths')}
              sx={{ color: '#fff' }}
            >
              {[...Array(12)].map((_, m) => (
                <MenuItem key={m} value={`${m}`}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          title="Delete Project"
          message="Are you sure you want to delete this project?"
        />
      </Box>
    </Modal>
  );
}
