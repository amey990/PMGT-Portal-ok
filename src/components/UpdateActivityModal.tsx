import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, FormControl,
  InputLabel, Select, MenuItem, Button, SelectChangeEvent
} from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';

export interface SiteRow {
  id: number;
  tNo: string;
  date: string;         // mm/dd/yyyy
  project: string;
  activity: string;
  state: string;
  district: string;
  city: string;
  address: string; 
  bName: string;
  bCode: string;
  pm: string;
  vendor: string;
  feName: string;
  feContact: string;
  nocEngineer: string;
  remarks: string;
  status: string;
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
  const [form, setForm] = useState<SiteRow>(
    {
    id:0, tNo:'', date:'', project:'', activity:'',
    state:'', district:'', city:'', address: '', bName:'', bCode:'',
    pm:'', vendor:'', feName:'', feContact:'',
    nocEngineer:'', remarks:'', status:''
  }
);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // populate when row changes
  useEffect(() => {
    if (row) setForm(row);
  }, [row]);

  const handleInput =
    (k: keyof Omit<SiteRow,'status'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSelect =
    (k: 'status') =>
    (e: SelectChangeEvent<string>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    onUpdate(form);
    onClose();
  };

  const handleDel = () => {
    if (row) onDelete(row.id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)', width:500,
        bgcolor:'#1C1C1E', borderRadius:2, p:3,
        outline:'none', color:'#fff'
      }}>
        <Typography variant="h6" gutterBottom>Update Site</Typography>

        <Box component="form" sx={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, mb:3
        }}>
         
          {/* Row 1 */}
  <TextField
    label="Ticket No"
    size="small"
    value={form.tNo}
    onChange={handleInput('tNo')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="Date"
    type="date"
    size="small"
    value={form.date.split('/').reverse().join('-')}
    onChange={e => {
      const [y,m,d] = e.target.value.split('-');
      setForm(f => ({ ...f, date: `${m}/${d}/${y}` }));
    }}
    InputLabelProps={{ shrink:true, sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 2 */}
  <TextField
    label="Project"
    size="small"
    value={form.project}
    onChange={handleInput('project')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="Activity"
    size="small"
    value={form.activity}
    onChange={handleInput('activity')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 3 */}
  <TextField
    label="State"
    size="small"
    value={form.state}
    onChange={handleInput('state')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="District"
    size="small"
    value={form.district}
    onChange={handleInput('district')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 4 */}
  <TextField
    label="City"
    size="small"
    value={form.city}
    onChange={handleInput('city')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 4.1: Address */}
<TextField
  label="Address"
  size="small"
  value={form.address}
  onChange={handleInput('address')}
  InputLabelProps={{ sx: { color: '#aaa' } }}
  sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
/>

  <TextField
    label="B Name"
    size="small"
    value={form.bName}
    onChange={handleInput('bName')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 5 */}
  <TextField
    label="B Code"
    size="small"
    value={form.bCode}
    onChange={handleInput('bCode')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="PM"
    size="small"
    value={form.pm}
    onChange={handleInput('pm')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 6 */}
  <TextField
    label="Vendor"
    size="small"
    value={form.vendor}
    onChange={handleInput('vendor')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="FE Name"
    size="small"
    value={form.feName}
    onChange={handleInput('feName')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 7 */}
  <TextField
    label="FE Contact"
    size="small"
    value={form.feContact}
    onChange={handleInput('feContact')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />
  <TextField
    label="NOC Engineer"
    size="small"
    value={form.nocEngineer}
    onChange={handleInput('nocEngineer')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
  />

  {/* Row 8 */}
  <FormControl size="small" sx={{ bgcolor:'#28282B' }}>
    <InputLabel sx={{ color:'#aaa' }}>Status</InputLabel>
    <Select
      value={form.status}
      label="Status"
      onChange={handleSelect('status')}
      sx={{ color:'#fff' }}
    >
      <MenuItem value="Pending">Pending</MenuItem>
      <MenuItem value="In Progress">In Progress</MenuItem>
      <MenuItem value="Completed">Completed</MenuItem>
      <MenuItem value="Canceled">Canceled</MenuItem>
    </Select>
  </FormControl>
  <TextField
    label="Remarks / Issue"
    size="small"
    value={form.remarks}
    onChange={handleInput('remarks')}
    InputLabelProps={{ sx:{ color:'#aaa' } }}
    sx={{
      bgcolor:'#28282B',
      input:{ color:'#fff' },
      gridColumn:'1 / -1'
    }}
  />

        </Box>

        <Box sx={{ display:'flex', justifyContent:'space-between' }}>
          <Button
            variant="outlined"
            sx={{
              color:'#EF4444',
              borderColor:'#EF4444',
              '&:hover':{background:'rgba(239,68,68,0.1)'}
            }}
            onClick={()=>setConfirmOpen(true)}
          >
            Delete
          </Button>
          <Box>
            <Button onClick={onClose} sx={{ mr:1, color:'#aaa' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ bgcolor:'#22C55E','&:hover':{bgcolor:'#16A34A'} }}
            >
              Update
            </Button>
          </Box>
        </Box>

        <ConfirmationDialog
          open={confirmOpen}
          onClose={()=>setConfirmOpen(false)}
          onConfirm={handleDel}
          title="Delete Site"
          message="Are you sure you want to delete this site?"
        />
      </Box>
    </Modal>
  );
}
