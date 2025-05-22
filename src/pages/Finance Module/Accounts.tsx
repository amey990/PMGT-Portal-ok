// import React from 'react'
// import MainLayout from '../../layouts/MainLayout'
// import { Box, Card, CardContent, Typography } from '@mui/material'

// export default function Accounts() {
//   return (
//     <MainLayout title="Accounts" showRightPanel={false}>
//       <Box sx={{ p: 2 }}>
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h5" color="#fff" gutterBottom>
//               Accounts
//             </Typography>
//             <Typography color="#888">
//               This is your accounts overview page.
//             </Typography>
//           </CardContent>
//         </Card>
//       </Box>
//     </MainLayout>
//   )
// }
// src/pages/FinanceModule/Accounts.tsx
import React, { useState, useMemo } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
import DownloadIcon from '@mui/icons-material/Download';
import type { SnackbarCloseReason } from '@mui/material';

interface AccountRow {
  id: number;
  customer: string;
  projectCode: string;
  projectName: string;
  projectType: string;
  manager: string;
  bdm: string;
  startDate: string;
  endDate: string;
}

export default function Accounts() {
  // ─── State ──────────────────────────────────────
  const [rows] = useState<AccountRow[]>([
    {
      id: 1,
      customer: 'Acme Corp',
      projectCode: 'AC-001',
      projectName: 'Alpha',
      projectType: 'Implementation',
      manager: 'John Doe',
      bdm: 'Bob Smith',
      startDate: '07/01/2025',
      endDate: '07/31/2025',
    },
    {
      id: 2,
      customer: 'Beta LLC',
      projectCode: 'BT-002',
      projectName: 'Beta',
      projectType: 'Upgrade',
      manager: 'Jane Roe',
      bdm: 'Carol Nguyen',
      startDate: '06/15/2025',
      endDate: '07/15/2025',
    },
    // …add more rows as needed…
  ]);

  const [filterProj, setFilterProj] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [exportToast, setExportToast] = useState(false);
  const [actionToast, setActionToast] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  // ─── Filtering ──────────────────────────────────
  const displayed = useMemo(
    () =>
      rows
        .filter(r => (filterProj ? r.projectName === filterProj : true))
        .filter(r =>
          r.projectName.toLowerCase().includes(search.toLowerCase())
        ),
    [rows, filterProj, search]
  );

  // ─── Handlers ───────────────────────────────────
  const handleExport = () => setExportToast(true);
  const handleCloseExport = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setExportToast(false);
  };

  const handleDownload = (r: AccountRow) => {
    setActionMsg(`Downloaded PA list for ${r.projectName}`);
    setActionToast(true);
  };
  const handleRaisePA = (r: AccountRow) => {
    setActionMsg(`Raised PA for ${r.projectName}`);
    setActionToast(true);
  };
  const handleCloseAction = () => setActionToast(false);

  // ─── Render ────────────────────────────────────
  return (
    <MainLayout title="Accounts" showRightPanel={false}>
      <Box sx={{ pt: 2, px: 2 }}>
        <Card
          sx={{
            bgcolor: '#1C1C1E',
            borderRadius: 2,
            height: 'calc(100vh - 80px)',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              px: 2,
              pt: 2,
              pb: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ─── Header Controls ───────────────────────── */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}
              >
                Accounts
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Search */}
                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{
                    width: 200,
                    bgcolor: '#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid #333',
                      borderRadius: 1,
                    },
                    '& .MuiOutlinedInput-root': { height: 32 },
                    '& .MuiOutlinedInput-input': {
                      color: '#fff',
                      py: '4px',
                      fontSize: 12,
                    },
                  }}
                />

                {/* Project filter */}
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>
                    Project
                  </InputLabel>
                  <Select
                    value={filterProj}
                    label="Project"
                    onChange={(e: SelectChangeEvent) =>
                      setFilterProj(e.target.value)
                    }
                    sx={{
                      bgcolor: '#1C1C1E',
                      color: '#fff',
                      border: '1px solid #333',
                      borderRadius: 1,
                      height: 32,
                      fontSize: 12,
                      '& .MuiSelect-select': { py: 0.5, px: 1 },
                      '& .MuiSelect-icon': { color: '#888', fontSize: 16 },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: { bgcolor: '#28282B', color: '#fff' },
                      },
                    }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(rows.map(r => r.projectName))).map(
                      p => (
                        <MenuItem key={p} value={p}>
                          {p}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                {/* Export */}
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    bgcolor: '#FFC300',
                    color: '#000',
                    textTransform: 'none',
                    px: 2,
                    py: 0.5,
                    '&:hover': { bgcolor: '#D4A420' },
                  }}
                >
                  Export
                </Button>
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#333', my: 1 }} />

            {/* ─── Table ─────────────────────────────────── */}
            <TableContainer
              sx={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 170px)',
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-thumb': {
                  background: '#333',
                  borderRadius: 3,
                },
              }}
            >
              <Table stickyHeader sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    {[
                      'Sr No',
                      'Customer',
                      'Code',
                      'Name',
                      'Type',
                      'Manager',
                      'BDM',
                      'Start',
                      'End',
                      'Download PA List',
                      'Raise PA',
                    ].map((col, idx, arr) => (
                      <TableCell
                        key={col}
                        sx={{
                          color: '#fff',
                          backgroundColor: '#0F0F0F',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                          borderTopLeftRadius: idx === 0 ? '8px' : 0,
                          borderTopRightRadius:
                            idx === arr.length - 1 ? '8px' : 0,
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayed.map(r => (
                    <TableRow key={r.id} hover>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.customer}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.projectCode}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.projectName}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.projectType}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.manager}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.bdm}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.startDate}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                        }}
                      >
                        {r.endDate}
                      </TableCell>

                      {/* Download PA List */}
                      <TableCell
                        sx={{
                          borderBottom: '1px solid #333',
                          textAlign: 'center',
                        }}
                      >
                        <IconButton
                          onClick={() => handleDownload(r)}
                          sx={{
                            bgcolor: '#FFC300',
                            color: '#000',
                            width: 32,
                            height: 32,
                            '&:hover': { bgcolor: '#D4A420' },
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                      {/* Raise PA */}
                      <TableCell
                        sx={{
                          borderBottom: '1px solid #333',
                          textAlign: 'center',
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleRaisePA(r)}
                          sx={{
                            bgcolor: '#EF4444',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#DC2626' },
                          }}
                        >
                          Raise PA
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Export Snackbar */}
      <Snackbar
        open={exportToast}
        autoHideDuration={1200}
        onClose={handleCloseExport}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseExport}
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
        >
          project List exported successfully
        </Alert>
      </Snackbar>

      {/* Download / Raise PA Snackbar */}
      <Snackbar
        open={actionToast}
        autoHideDuration={1200}
        onClose={handleCloseAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAction}
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
        >
          {actionMsg}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
