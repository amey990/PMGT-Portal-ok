// // src/pages/ViewAllProjects.tsx
// import React, { useState, useMemo } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import type { SnackbarCloseReason } from '@mui/material';
// import UpdateProjectModal, { ProjectRow } from '../components/UpdateProjectModal';


// // interface ProjectRow {
// //   id: number;
// //   customer: string;
// //   projectCode: string;
// //   projectName: string;
// //   projectType: string;
// //   projectManager: string;
// //   bdm: string;
// //   startDate: string;
// //   endDate: string;
// //   amcYear: string;
// //   amcMonths: string;
// // }

// export default function ViewAllProjects() {
//   // ─── Table data + filters + toast ────────────────
//   const [rows, setRows] = useState<ProjectRow[]>([
//     { id: 1,  customer: 'Acme Corp',    projectCode: 'AC-001', projectName: 'Alpha',   projectType: 'Implementation', projectManager: 'John Doe',    bdm: 'Bob Smith',     startDate: '07/01/2025', endDate: '07/31/2025', amcYear: '1', amcMonths: '6' },
//     { id: 2,  customer: 'Beta LLC',     projectCode: 'BT-002', projectName: 'Beta',    projectType: 'Upgrade',        projectManager: 'Jane Roe',    bdm: 'Carol Nguyen',  startDate: '06/15/2025', endDate: '07/15/2025', amcYear: '2', amcMonths: '0' },
//     { id: 3,  customer: 'Gamma Inc',    projectCode: 'GM-003', projectName: 'Gamma',   projectType: 'Maintenance',    projectManager: 'Jim Boe',     bdm: 'Alice Johnson', startDate: '05/10/2025', endDate: '05/20/2025', amcYear: '3', amcMonths: '3' },
//     { id: 4,  customer: 'Delta Co',     projectCode: 'DL-004', projectName: 'Delta',   projectType: 'Implementation', projectManager: 'Ann Coe',     bdm: 'Bob Smith',     startDate: '04/01/2025', endDate: '04/30/2025', amcYear: '1', amcMonths: '0' },
//     { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//       { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
//    { id: 23,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
 
//   ]);
//   const [filterProj, setFilterProj] = useState('');
//   const [search, setSearch]         = useState('');
//   const [toastOpen, setToastOpen]   = useState(false);

//   // ─── Edit‐modal state ─────────────────────────────
//   const [modalOpen, setModalOpen]   = useState(false);
//   const [editRow, setEditRow]       = useState<ProjectRow | null>(null);

//   // ─── Filtered + searched rows ────────────────────
//   const displayed = useMemo(
//     () => rows
//       .filter(r => filterProj ? r.projectName === filterProj : true)
//       .filter(r => r.projectName.toLowerCase().includes(search.toLowerCase())),
//     [rows, filterProj, search]
//   );

//   // ─── Handlers ────────────────────────────────────
//   const handleExport = () => setToastOpen(true);
//   const handleCloseToast = (_: any, reason?: SnackbarCloseReason) => {
//     if (reason === 'clickaway') return;
//     setToastOpen(false);
//   };

//   const openEditModal = (row: ProjectRow) => {
//     setEditRow(row);
//     setModalOpen(true);
//   };
//   const closeEditModal = () => {
//     setModalOpen(false);
//     setEditRow(null);
//   };
//   const handleUpdate = (updated: ProjectRow) => {
//     setRows(rs => rs.map(r => r.id === updated.id ? updated : r));
//   };
//   const handleDelete = (id: number) => {
//     setRows(rs => rs.filter(r => r.id !== id));
//   };

//   return (
//     <MainLayout title="All Projects" showRightPanel={false}>
//       <Box sx={{ pt: 2, px: 2 }}>
//         <Card
//           sx={{
//             bgcolor: '#1C1C1E',
//             borderRadius: 2,
//             height: 'calc(100vh - 80px)',
//             overflow: 'hidden',
//           }}
//         >
//           {/* wrap both header and table in the same CardContent, with px */}
//           <CardContent sx={{ px: 2, pt: 2, pb: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
//             {/* Header row */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//                 All Projects
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <FormControl size="small" sx={{ minWidth: 140 }}>
//                   <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Project</InputLabel>
//                   <Select
//                     value={filterProj}
//                     label="Project"
//                     onChange={e => setFilterProj(e.target.value)}
//                     sx={{
//                       bgcolor: '#1C1C1E',
//                       color: '#fff',
//                       border: '1px solid #333',
//                       borderRadius: 1,
//                       height: 32,
//                       fontSize: 12,
//                       '& .MuiSelect-select': { py: 0.5, px: 1 },
//                       '& .MuiSelect-icon': { color: '#888', fontSize: 16 },
//                     }}
//                     MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {Array.from(new Set(rows.map(r => r.projectName))).map(p => (
//                       <MenuItem key={p} value={p}>{p}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <TextField
//                   size="small"
//                   placeholder="Search..."
//                   variant="outlined"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                   sx={{
//                     width: 200,
//                     bgcolor: '#1C1C1E',
//                     '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #333', borderRadius: 1 },
//                     '& .MuiOutlinedInput-root': { height: 32 },
//                     '& .MuiOutlinedInput-input': { color: '#fff', py: '4px', fontSize: 12 },
//                   }}
//                 />

//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleExport}
//                   sx={{
//                     bgcolor: '#22C55E',
//                     color: '#fff',
//                     textTransform: 'none',
//                     px: 2,
//                     py: 0.5,
//                     '&:hover': { bgcolor: '#16A34A' },
//                   }}
//                 >
//                   Export
//                 </Button>
//               </Box>
//             </Box>

//             <Divider sx={{ borderColor: '#333', my: 1 }} />

//             {/* Table */}
//             <TableContainer
//               sx={{
//                 flex: 1,           // fill remaining CardContent height
//                 overflowY: 'auto',
//                  maxHeight:'calc(100vh - 170px)',
//                 '&::-webkit-scrollbar': { width: 6 },
//                 '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 },
//               }}
//             >
//               <Table stickyHeader sx={{ minWidth: 1000 }}>
//                 <TableHead>
//                   <TableRow>
//                     {[
//                       'Sr No','Customer','Code','Name','Type',
//                       'Manager','BDM','Start','End','AMC Yr','AMC Mo','Update'
//                     ].map((col, i) => (
//                       <TableCell
//                         key={col}
//                         sx={{
//                           color: '#fff',
//                           backgroundColor: '#0F0F0F',
//                           borderBottom: '1px solid #333',
//                           fontSize: 12,
//                           textAlign: 'center',
//                           px: 2, py: 1.5,
//                           borderTopLeftRadius:  i === 0 ? '8px' : 0,
//                           borderTopRightRadius: i === 11 ? '8px' : 0,
//                         }}
//                       >
//                         {col}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {displayed.map(r => (
//                     <TableRow key={r.id} hover>
//                       {[
//                         r.id, r.customer, r.projectCode, r.projectName,
//                         r.projectType, r.projectManager, r.bdm,
//                         r.startDate, r.endDate, r.amcYear, r.amcMonths,
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           sx={{
//                             color: '#fff',
//                             borderColor: '#555',
//                             textTransform: 'none',
//                             '&:hover': { borderColor: '#777' }
//                           }}
//                         >
//                           Update
//                         </Button>
//                       ].map((cell, idx) => (
//                         <TableCell
//                           key={idx}
//                           sx={{
//                             color: '#E0E0E0',
//                             borderBottom: '1px solid #333',
//                             fontSize: 12,
//                             textAlign: 'center',
//                             px: 2, py: 1.5,
//                           }}
//                         >
//                           {cell}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       </Box>

//       <Snackbar
//         open={toastOpen}
//         autoHideDuration={1200}
//         onClose={handleCloseToast}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleCloseToast}
//           severity="success"
//           variant="outlined"
//           sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
//         >
//           Projects exported successfully
//         </Alert>
//       </Snackbar>
//     </MainLayout>
//   );
// }


// src/pages/ViewAllProjects.tsx
import React, { useState, useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import type { SnackbarCloseReason } from '@mui/material';
import UpdateProjectModal, { ProjectRow } from '../components/UpdateProjectModal';

export default function ViewAllProjects() {
  // ─── Table data + filters + toast ────────────────
  const [rows, setRows] = useState<ProjectRow[]>([
    { id: 1,  customer: 'Acme Corp',    projectCode: 'AC-001', projectName: 'Alpha',   projectType: 'Implementation', projectManager: 'John Doe',    bdm: 'Bob Smith',     startDate: '07/01/2025', endDate: '07/31/2025', amcYear: '1', amcMonths: '6' },
    { id: 2,  customer: 'Beta LLC',     projectCode: 'BT-002', projectName: 'Beta',    projectType: 'Upgrade',        projectManager: 'Jane Roe',    bdm: 'Carol Nguyen',  startDate: '06/15/2025', endDate: '07/15/2025', amcYear: '2', amcMonths: '0' },
    { id: 3,  customer: 'Gamma Inc',    projectCode: 'GM-003', projectName: 'Gamma',   projectType: 'Maintenance',    projectManager: 'Jim Boe',     bdm: 'Alice Johnson', startDate: '05/10/2025', endDate: '05/20/2025', amcYear: '3', amcMonths: '3' },
    { id: 4,  customer: 'Delta Co',     projectCode: 'DL-004', projectName: 'Delta',   projectType: 'Implementation', projectManager: 'Ann Coe',     bdm: 'Bob Smith',     startDate: '04/01/2025', endDate: '04/30/2025', amcYear: '1', amcMonths: '0' },
    { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
      { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 5,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
   { id: 23,  customer: 'Epsilon Ltd', projectCode: 'EP-005', projectName: 'Epsilon', projectType: 'Upgrade',        projectManager: 'Tim Moe',     bdm: 'Carol Nguyen',  startDate: '03/05/2025', endDate: '03/25/2025', amcYear: '2', amcMonths: '2' },
 
  ]);
  const [filterProj, setFilterProj] = useState('');
  const [search, setSearch]         = useState('');
  const [toastOpen, setToastOpen]   = useState(false);

  const [actionToastOpen, setActionToastOpen] = useState(false);
  const [actionMessage, setActionMessage] = useState('');


  // ─── Edit‐modal state ─────────────────────────────
  const [modalOpen, setModalOpen]   = useState(false);
  const [editRow, setEditRow]       = useState<ProjectRow | null>(null);

  // ─── Filtered + searched rows ────────────────────
  const displayed = useMemo(
    () => rows
      .filter(r => filterProj ? r.projectName === filterProj : true)
      .filter(r => r.projectName.toLowerCase().includes(search.toLowerCase())),
    [rows, filterProj, search]
  );

  // ─── Handlers ────────────────────────────────────
  const handleExport = () => setToastOpen(true);
  const handleCloseToast = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  const openEditModal = (row: ProjectRow) => {
    setEditRow(row);
    setModalOpen(true);
  };
  const closeEditModal = () => {
    setModalOpen(false);
    setEditRow(null);
  };
  
  const handleUpdate = (updated: ProjectRow) => {
  setRows(rs => rs.map(r => r.id === updated.id ? updated : r));
  setActionMessage('Project updated successfully');
  setActionToastOpen(true);
};

const handleDelete = (id: number) => {
  setRows(rs => rs.filter(r => r.id !== id));
  setActionMessage('Project deleted successfully');
  setActionToastOpen(true);
};


  return (
    <MainLayout title="All Projects" showRightPanel={false}>
      <Box sx={{ pt: 2, px: 2 }}>
        <Card sx={{
          bgcolor: '#1C1C1E',
          borderRadius: 2,
          height: 'calc(100vh - 80px)',
          overflow: 'hidden',
        }}>
          <CardContent sx={{
            px: 2, pt: 2, pb: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* ─── Header Controls ───────────────────────── */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography sx={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 600
              }}>
                All Projects
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Project</InputLabel>
                  <Select
                    value={filterProj}
                    label="Project"
                    onChange={e => setFilterProj(e.target.value)}
                    sx={{
                      bgcolor: '#1C1C1E',
                      color: '#fff',
                      border: '1px solid #333',
                      borderRadius: 1,
                      height: 32,
                      fontSize: 12,
                      '& .MuiSelect-select': { py: 0.5, px: 1 },
                      '& .MuiSelect-icon': { color: '#888', fontSize: 16 }
                    }}
                    MenuProps={{
                      PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } }
                    }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {Array.from(new Set(rows.map(r => r.projectName))).map(p => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{
                    width: 200,
                    bgcolor: '#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #333', borderRadius: 1 },
                    '& .MuiOutlinedInput-root': { height: 32 },
                    '& .MuiOutlinedInput-input': { color: '#fff', py: '4px', fontSize: 12 }
                  }}
                />

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
                    '&:hover': { bgcolor: '#D4A420' }
                  }}
                >
                  Export
                </Button>
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#333', my: 1 }} />

            {/* ─── Table ─────────────────────────────────── */}
            <TableContainer sx={{
              flex: 1,                  // fill vertical space
              overflowY: 'auto',
              maxHeight:'calc(100vh - 170px)',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 }
            }}>
              <Table stickyHeader sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    {[
                      'Sr No','Customer','Code','Name','Type',
                      'Manager','BDM','Start','End','AMC Yr','AMC Mo','Update'
                    ].map((col, i) => (
                      <TableCell key={col} sx={{
                        color: '#fff',
                        backgroundColor: '#0F0F0F',
                        borderBottom: '1px solid #333',
                        fontSize: 12,
                        textAlign: 'center',
                        px: 2, py: 1.5,
                        borderTopLeftRadius:  i === 0 ? '8px' : 0,
                        borderTopRightRadius: i === 11? '8px' : 0,
                      }}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayed.map(r => (
                    <TableRow key={r.id} hover>
                      {[
                        r.id, r.customer, r.projectCode, r.projectName,
                        r.projectType, r.projectManager, r.bdm,
                        r.startDate, r.endDate, r.amcYear, r.amcMonths,
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openEditModal(r)}
                          sx={{
                            color: '#fff',
                            borderColor: '#555',
                            textTransform: 'none',
                            '&:hover': { borderColor: '#777' }
                          }}
                        >
                          Update
                        </Button>
                      ].map((cell, idx) => (
                        <TableCell key={idx} sx={{
                          color: '#E0E0E0',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2, py: 1.5,
                        }}>
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* ─── Export toast ───────────────────────────── */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={1200}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
        >
          Projects exported successfully
        </Alert>
      </Snackbar>

      <Snackbar
  open={actionToastOpen}
  autoHideDuration={1200}
  onClose={() => setActionToastOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert
    onClose={() => setActionToastOpen(false)}
    severity="success"
    variant="outlined"
    sx={{
      bgcolor: 'background.paper',
      borderColor: '#4caf50',
      boxShadow: 1,
    }}
  >
    {actionMessage}
  </Alert>
</Snackbar>


      {/* ─── Edit modal ─────────────────────────────── */}
      <UpdateProjectModal
        open={modalOpen}
        row={editRow}
        onClose={closeEditModal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

