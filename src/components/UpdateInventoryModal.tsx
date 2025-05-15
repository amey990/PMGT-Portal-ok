// // src/components/UpdateInventoryModal.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   SelectChangeEvent,
// } from '@mui/material';
// import ConfirmationDialog from './ConfirmationDialog';

// export interface InventoryRow {
//   id: number;
//   date: string;    // dd/mm/yyyy
//   project: string;
//   site: string;
//   docType: string;
//   fileName: string;
// }

// interface UpdateInventoryModalProps {
//   open: boolean;
//   row: InventoryRow | null;
//   onClose: () => void;
//   onUpdate: (r: InventoryRow) => void;
//   onDelete: (id: number) => void;
// }

// // Helpers to convert between display and <input type="date">
// const parseDateForInput = (dmy: string) => {
//   const [d, m, y] = dmy.split('/');
//   return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
// };
// const formatDateForDisplay = (iso: string) => {
//   const [y, m, d] = iso.split('-');
//   return `${d}/${m}/${y}`;
// };

// export default function UpdateInventoryModal({
//   open, row, onClose, onUpdate, onDelete
// }: UpdateInventoryModalProps) {
//   const [form, setForm] = useState<InventoryRow>({
//     id: 0, date: '', project: '', site: '', docType: '', fileName: ''
//   });
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   // When the row changes, populate the form
//   useEffect(() => {
//     if (row) {
//       setForm({
//         ...row,
//         date: parseDateForInput(row.date),
//       });
//     }
//   }, [row]);

//   // Only for text inputs (date & fileName)
//   const handleInputChange = (key: 'date' | 'fileName') =>
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;
//       setForm(f => ({ ...f, [key]: value } as InventoryRow));
//     };

//   // Only for MUI <Select> fields
//   const handleSelectChange = (key: 'project' | 'site' | 'docType') =>
//     (e: SelectChangeEvent<string>) => {
//       const value = e.target.value;
//       setForm(f => ({ ...f, [key]: value } as InventoryRow));
//     };

//   const handleUpdate = () => {
//     onUpdate({
//       ...form,
//       date: formatDateForDisplay(form.date),
//     });
//     onClose();
//   };

//   const handleDeleteConfirm = () => {
//     if (row) onDelete(row.id);
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 450,
//         bgcolor: '#1C1C1E',
//         borderRadius: 2,
//         p: 3,
//         boxShadow: 24,
//         outline: 'none',
//         color: '#fff',
//       }}>
//         <Typography variant="h6" gutterBottom>
//           Update Inventory
//         </Typography>

//         <Box component="form" sx={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr',
//           gap: 2,
//           mb: 3,
//         }}>
//           {/* Date */}
//           <TextField
//             label="Date"
//             type="date"
//             size="small"
//             value={form.date}
//             onChange={handleInputChange('date')}
//             InputLabelProps={{
//               shrink: true,
//               sx: { color: '#aaa' },
//             }}
//             sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//           />

//           {/* Project */}
//           <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
//             <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
//             <Select
//               value={form.project}
//               label="Project"
//               onChange={handleSelectChange('project')}
//               sx={{ color: '#fff' }}
//             >
//               <MenuItem value="Alpha">Alpha</MenuItem>
//               <MenuItem value="Beta">Beta</MenuItem>
//               <MenuItem value="Gamma">Gamma</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Site */}
//           <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
//             <InputLabel sx={{ color: '#aaa' }}>Site</InputLabel>
//             <Select
//               value={form.site}
//               label="Site"
//               onChange={handleSelectChange('site')}
//               sx={{ color: '#fff' }}
//             >
//               <MenuItem value="Site A">Site A</MenuItem>
//               <MenuItem value="Site B">Site B</MenuItem>
//               <MenuItem value="Site C">Site C</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Doc Type */}
//           <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
//             <InputLabel sx={{ color: '#aaa' }}>Doc Type</InputLabel>
//             <Select
//               value={form.docType}
//               label="Doc Type"
//               onChange={handleSelectChange('docType')}
//               sx={{ color: '#fff' }}
//             >
//               <MenuItem value="Signoff Report">Signoff Report</MenuItem>
//               <MenuItem value="HLD">HLD</MenuItem>
//               <MenuItem value="LLD">LLD</MenuItem>
//               <MenuItem value="Project Plan">Project Plan</MenuItem>
//             </Select>
//           </FormControl>

//           {/* File Name */}
//           <TextField
//             label="File Name"
//             size="small"
//             fullWidth
//             value={form.fileName}
//             onChange={handleInputChange('fileName')}
//             InputLabelProps={{ sx: { color: '#aaa' } }}
//             sx={{ bgcolor: '#28282B', input: { color: '#fff' }, gridColumn: '1 / -1' }}
//           />
//         </Box>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Button
//             variant="outlined"
//             sx={{
//               color: '#EF4444',
//               borderColor: '#EF4444',
//               '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' },
//             }}
//             onClick={() => setConfirmOpen(true)}
//           >
//             Delete
//           </Button>
//           <Box>
//             <Button onClick={onClose} sx={{ mr: 1, color: '#aaa' }}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleUpdate}
//               sx={{ bgcolor: '#22C55E', '&:hover': { bgcolor: '#16A34A' } }}
//             >
//               Update
//             </Button>
//           </Box>
//         </Box>

//         <ConfirmationDialog
//           open={confirmOpen}
//           onClose={() => setConfirmOpen(false)}
//           onConfirm={handleDeleteConfirm}
//           title="Delete Entry"
//           message="Are you sure you want to delete this file record?"
//         />
//       </Box>
//     </Modal>
//   );
// }

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
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from './ConfirmationDialog';

export interface InventoryRow {
  id: number;
  date: string;      // dd/mm/yyyy
  project: string;
  site: string;
  docType: string;
  fileName: string;
}

interface UpdateInventoryModalProps {
  open: boolean;
  row: InventoryRow | null;
  onClose: () => void;
  onUpdate: (r: InventoryRow) => void;
  onDelete: (id: number) => void;
}

// Helpers to convert between display and <input type="date">
const parseDateForInput = (dmy: string) => {
  const [d, m, y] = dmy.split('/');
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
};
const formatDateForDisplay = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export default function UpdateInventoryModal({
  open, row, onClose, onUpdate, onDelete
}: UpdateInventoryModalProps) {
  const [form, setForm] = useState<InventoryRow>({
    id: 0, date: '', project: '', site: '', docType: '', fileName: ''
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (row) {
      setForm({
        ...row,
        date: parseDateForInput(row.date),
      });
    }
  }, [row]);

  // Only for date input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, date: e.target.value }));
  };

  // Only for MUI <Select> fields
  const handleSelectChange = (key: 'project' | 'site' | 'docType') =>
    (e: SelectChangeEvent<string>) => {
      setForm(f => ({ ...f, [key]: e.target.value } as InventoryRow));
    };

  // file picker
  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setForm(fm => ({ ...fm, fileName: f.name }));
  };
  const clearFile = () => {
    setForm(fm => ({ ...fm, fileName: '' }));
  };

  const handleUpdate = () => {
    onUpdate({ ...form, date: formatDateForDisplay(form.date) });
    onClose();
  };

  const handleDeleteConfirm = () => {
    if (row) onDelete(row.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450, bgcolor: '#1C1C1E', borderRadius: 2,
        p: 3, boxShadow: 24, outline: 'none', color: '#fff'
      }}>
        <Typography variant="h6" gutterBottom>
          Update Inventory
        </Typography>

        <Box component="form" sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          mb: 3
        }}>
          {/* Date */}
          <TextField
            label="Date"
            type="date"
            size="small"
            value={form.date}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
            sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
          />

          {/* Project */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
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

          {/* Site */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Site</InputLabel>
            <Select
              value={form.site}
              label="Site"
              onChange={handleSelectChange('site')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Site A">Site A</MenuItem>
              <MenuItem value="Site B">Site B</MenuItem>
              <MenuItem value="Site C">Site C</MenuItem>
            </Select>
          </FormControl>

          {/* Doc Type */}
          <FormControl size="small" sx={{ bgcolor: '#28282B' }}>
            <InputLabel sx={{ color: '#aaa' }}>Doc Type</InputLabel>
            <Select
              value={form.docType}
              label="Doc Type"
              onChange={handleSelectChange('docType')}
              sx={{ color: '#fff' }}
            >
              <MenuItem value="Signoff Report">Signoff Report</MenuItem>
              <MenuItem value="HLD">HLD</MenuItem>
              <MenuItem value="LLD">LLD</MenuItem>
              <MenuItem value="Project Plan">Project Plan</MenuItem>
            </Select>
          </FormControl>

          {/* File Picker */}
          <Box sx={{ gridColumn: '1 / -1', position: 'relative' }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                width: '100%',
                bgcolor: '#28282B',
                color: form.fileName ? '#FFD700' : '#888',
                borderColor: '#333',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                px: 1, py: 0.6,
                display: 'flex',
                justifyContent: 'space-between',
                '&:hover': { borderColor: '#555' },
              }}
            >
              {form.fileName || 'Choose File'}
              <input type="file" hidden onChange={handleFilePick} />
            </Button>
            {form.fileName && (
              <IconButton
                size="small"
                onClick={clearFile}
                sx={{
                  position: 'absolute',
                  top: -6, right: -6,
                  bgcolor: '#333', color: '#fff',
                  p: 0.3,
                  '&:hover': { bgcolor: '#555' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#EF4444',
              borderColor: '#EF4444',
              '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' },
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
          title="Delete Entry"
          message="Are you sure you want to delete this file record?"
        />
      </Box>
    </Modal>
  );
}
