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

export interface Reminder {
  srNo: number;
  date: string;  // Display format: "07-Apr-2025"
  time: string;  // Display format: "09:00 AM"
  project: string;
  type: 'Team' | 'Personal';
  description: string;
}

interface UpdateReminderModalProps {
  open: boolean;
  reminder: Reminder | null;
  onClose: () => void;
  onUpdate: (r: Reminder) => void;
  onDelete: (srNo: number) => void;
}

// Date/time conversion utilities
const parseDateForInput = (displayDate: string) => {
  const months: { [key: string]: string } = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const [day, month, year] = displayDate.split('-');
  return `${year}-${months[month]}-${day.padStart(2, '0')}`;
};

const parseTimeForInput = (displayTime: string) => {
  const [time, modifier] = displayTime.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (modifier === 'PM' && hours !== '12') {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }
  
  return `${hours.padStart(2, '0')}:${minutes}`;
};

const formatDateForDisplay = (inputDate: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = inputDate.split('-');
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
};

const formatTimeForDisplay = (inputTime: string) => {
  let [hours, minutes] = inputTime.split(':');
  const modifier = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
  hours = String(parseInt(hours, 10) % 12 || 12);
  return `${hours.padStart(2, '0')}:${minutes} ${modifier}`;
};

export default function UpdateReminderModal({
  open,
  reminder,
  onClose,
  onUpdate,
  onDelete,
}: UpdateReminderModalProps) {
  const [form, setForm] = useState<Reminder>({
    srNo: 0,
    date: '',
    time: '',
    project: '',
    type: 'Team',
    description: '',
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (reminder) {
      setForm({
        ...reminder,
        date: parseDateForInput(reminder.date),
        time: parseTimeForInput(reminder.time)
      });
    }
  }, [reminder]);


const handleChange = (key: keyof Reminder) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
      const value = 'target' in e ? e.target.value : (e as SelectChangeEvent<string>).target.value;
      setForm((f) => ({
        ...f,
        [key]: key === 'srNo' ? Number(value) : value,
      }));
    };
  

  const handleUpdate = () => {
    onUpdate({
      ...form,
      date: formatDateForDisplay(form.date),
      time: formatTimeForDisplay(form.time)
    });
    onClose();
  };

  const handleDeleteConfirm = () => {
    if (reminder) {
      onDelete(reminder.srNo);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
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
          Update Reminder
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
          <TextField
            label="Date"
            type="date"
            size="small"
            value={form.date}
            onChange={handleChange('date')}
            InputLabelProps={{
              shrink: true,
              sx: { color: '#aaa' },
            }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />
          <TextField
            label="Time"
            type="time"
            size="small"
            value={form.time}
            onChange={handleChange('time')}
            InputLabelProps={{
              shrink: true,
              sx: { color: '#aaa' },
            }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
            <Select
              value={form.project}
              label="Project"
              onChange={handleChange('project')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Alpha">Alpha</MenuItem>
              <MenuItem value="Beta">Beta</MenuItem>
              <MenuItem value="Gamma">Gamma</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Type</InputLabel>
            <Select
              value={form.type}
              label="Type"
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  type: e.target.value as 'Team' | 'Personal',
                }))
              }
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Team">Team</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            multiline
            rows={2}
            size="small"
            fullWidth
            value={form.description}
            onChange={handleChange('description')}
            InputLabelProps={{ sx: { color: '#aaa' } }}
            sx={{
              gridColumn: '1 / -1',
              bgcolor: '#28282B',
              textarea: { color: '#fff' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#EF4444',
              borderColor: '#EF4444',
              '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' },
            }}
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete
          </Button>

          <Box>
            <Button
              onClick={onClose}
              sx={{ mr: 1, color: '#aaa' }}
            >
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

        <ConfirmationDialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Reminder"
          message="Are you sure you want to delete this reminder permanently?"
        />
      </Box>
    </Modal>
  );
}