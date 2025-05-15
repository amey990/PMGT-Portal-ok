// // src/pages/AddProject.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
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
//   IconButton,
//   Snackbar,
//   Alert,
//   SelectChangeEvent
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// export default function AddProject() {
//   const navigate = useNavigate();

//   // ─── Top card state ─────────────────────────────
//   const [project, setProject] = useState('');
//   const [file, setFile]       = useState<File | null>(null);

//   // ─── Bottom card state ──────────────────────────
//   const [customer, setCustomer]   = useState('');
//   const [code, setCode]           = useState('');
//   const [name, setName]           = useState('');
//   const [type, setType]           = useState('');
//   const [pm, setPm]               = useState('');
//   const [bdm, setBdm]             = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate]     = useState('');
//   const [amcYear, setAmcYear]     = useState('');
//   const [amcMonth, setAmcMonth]   = useState('');

//   // toast
//   const [toastMsg, setToastMsg] = useState<string | null>(null);

//   // ─── Top handlers ───────────────────────────────
//   const handleProjectChange = (e: SelectChangeEvent<string>) =>
//     setProject(e.target.value);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] ?? null;
//     if (f && /\.(xls|xlsx|csv)$/i.test(f.name)) setFile(f);
//     else setFile(null);
//   };
//   const clearTop = () => {
//     setProject('');
//     setFile(null);
//   };
//   const handleUpload = () => {
//     console.log('upload', project, file);
//     setToastMsg('Sites uploaded successfully');
//     clearTop();
//   };
//   const handleAddSite  = () => navigate('/projects/sites/new');
//   const handleViewSites = () => navigate('/projects/sites');

//   // ─── Bottom handlers ────────────────────────────
//   const clearBottom = () => {
//     setCustomer('');
//     setCode('');
//     setName('');
//     setType('');
//     setPm('');
//     setBdm('');
//     setStartDate('');
//     setEndDate('');
//     setAmcYear('');
//     setAmcMonth('');
//   };
//   const handleSave = () => {
//     console.log({ customer, code, name, type, pm, bdm, startDate, endDate, amcYear, amcMonth });
//     setToastMsg('Project saved successfully');
//     clearBottom();
//   };
//   const handleViewAllProjects = () => navigate('/projects');

//   // ─── Toast close ────────────────────────────────
//   const handleCloseToast = () => setToastMsg(null);

//   return (
//     <MainLayout title="Add Project" showRightPanel={false}>
//       <Box sx={{ pt: 1.3, px: 2 }}>

//         {/* ─── Top Card ────────────────────────────────── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, mb: 1.6 }}>
//           <CardContent>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//                 Add Sites
//               </Typography>
//               <Button sx={{ color: '#aaa', textTransform: 'none', fontSize: 12 }} onClick={clearTop}>
//                 Clear
//               </Button>
//             </Box>
//             <Divider sx={{ borderColor: '#333', my: 1.3 }} />

//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//               <FormControl size="small" sx={{ minWidth: 140, bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
//                 <Select
//                   value={project}
//                   label="Project"
//                   onChange={handleProjectChange}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   <MenuItem value=""><em>None</em></MenuItem>
//                   <MenuItem value="Alpha">Alpha</MenuItem>
//                   <MenuItem value="Beta">Beta</MenuItem>
//                   <MenuItem value="Gamma">Gamma</MenuItem>
//                 </Select>
//               </FormControl>

//               <Box sx={{ position: 'relative', flex: '1 1 200px', minWidth: 200 }}>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     width: '100%',
//                     bgcolor: '#28282B',
//                     color: file ? '#FFD700' : '#888',
//                     borderColor: '#333',
//                     textTransform: 'none',
//                     justifyContent: 'space-between',
//                     px: 2, py: 1,
//                     '&:hover': { borderColor: '#555' },
//                   }}
//                 >
//                   {file ? file.name : 'Choose File'}
//                   <input type="file" hidden accept=".xls,.xlsx,.csv" onChange={handleFileChange} />
//                 </Button>
//                 {file && (
//                   <IconButton
//                     size="small"
//                     onClick={() => setFile(null)}
//                     sx={{ position: 'absolute', top: -6, right: -6, bgcolor: '#333', color: '#fff', p: 0.3, '&:hover': { bgcolor: '#555' } }}
//                   >
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 )}
//               </Box>

//               <Button variant="contained" onClick={handleUpload} sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#D4A420' } }}>
//                 Upload
//               </Button>
//               <Button variant="contained" onClick={handleAddSite} sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#D4A420' } }}>
//                 Add Site
//               </Button>
//               <Button variant="contained" onClick={handleViewSites} sx={{ bgcolor: '#1976d2', color: '#fff', textTransform: 'none', px: 2, py: 1, '&:hover': { bgcolor: '#115293' } }}>
//                 View Sites
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* ─── Bottom Card ─────────────────────────────── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, height: 'calc(100vh - 220px)' }}>
//           <CardContent sx={{ px: 2, pt: 2, pb: 0 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//                 Add New Project
//               </Typography>
//               <Button sx={{ color: '#aaa', textTransform: 'none', fontSize: 12 }} onClick={clearBottom}>
//                 Clear
//               </Button>
//             </Box>
//             <Divider sx={{ borderColor: '#333', mb: 2 }} />

//             <Box component="form" sx={{ 
//               display: 'grid', 
//               gridTemplateColumns: '1fr 1fr', 
//               gap: 2 
//               }}>
//               <TextField
//                 label="Customer Name" 
//                 size="small"
//                 value={customer}
//                 onChange={e => setCustomer(e.target.value)}
//                 sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//                  InputLabelProps={{

//     sx: { color: '#aaa' }
//   }}
//               />
//               <TextField
//                 label="Project Code"
//                 size="small"
//                 value={code}
//                 onChange={e => setCode(e.target.value)}
//                 sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//                 InputLabelProps={{

//     sx: { color: '#aaa' }
//   }}
//               />
//               <TextField
//                 label="Project Name"
//                 size="small"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//                 InputLabelProps={{

//     sx: { color: '#aaa' }
//   }}
//               />

//               {/* dark dropdowns */}
//               <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>Project Type</InputLabel>
//                 <Select
//                   value={type}
//                   label="Project Type"
//                   onChange={e => setType(e.target.value)}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   <MenuItem value="Internal">Internal</MenuItem>
//                   <MenuItem value="External">External</MenuItem>
//                   <MenuItem value="Pilot">Pilot</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>Project Manager</InputLabel>
//                 <Select
//                   value={pm}
//                   label="Project Manager"
//                   onChange={e => setPm(e.target.value)}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   <MenuItem value="John Doe">John Doe</MenuItem>
//                   <MenuItem value="Jane Smith">Jane Smith</MenuItem>
//                   <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>BDM</InputLabel>
//                 <Select
//                   value={bdm}
//                   label="BDM"
//                   onChange={e => setBdm(e.target.value)}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   <MenuItem value="Bob Smith">Bob Smith</MenuItem>
//                   <MenuItem value="Carol Nguyen">Carol Nguyen</MenuItem>
//                 </Select>
//               </FormControl>

//               <TextField
//                 label="Start Date"
//                 type="date"
//                 size="small"
//                 value={startDate}
//                 onChange={e => setStartDate(e.target.value)}
//                 InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
//                 sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//               />
//               <TextField
//                 label="End Date"
//                 type="date"
//                 size="small"
//                 value={endDate}
//                 onChange={e => setEndDate(e.target.value)}
//                 InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
//                 sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//               />

//               <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>AMC Year</InputLabel>
//                 <Select
//                   value={amcYear}
//                   label="AMC Year"
//                   onChange={e => setAmcYear(e.target.value)}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   <MenuItem value="1">1 Year</MenuItem>
//                   <MenuItem value="2">2 Years</MenuItem>
//                   <MenuItem value="3">3 Years</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
//                 <InputLabel sx={{ color: '#aaa' }}>AMC Months</InputLabel>
//                 <Select
//                   value={amcMonth}
//                   label="AMC Months"
//                   onChange={e => setAmcMonth(e.target.value)}
//                   sx={{ color: '#fff' }}
//                   MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                 >
//                   {Array.from({ length: 11 }, (_, i) => (
//                     <MenuItem key={i+1} value={`${i+1}`}>
//                       {i+1} Month{i+1>1?'s':''}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>

//             <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={handleViewAllProjects}
//                 sx={{ bgcolor: '#1976d2', color: '#fff', textTransform: 'none', px: 2, py: 1, '&:hover': { bgcolor: '#115293' } }}
//               >
//                 View All Projects
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleSave}
//                 sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#D4A420' } }}
//               >
//                 Save
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//       </Box>

//       {/* ─── Toast ─────────────────────────────────── */}
//       <Snackbar
//         open={!!toastMsg}
//         autoHideDuration={2000}
//         onClose={handleCloseToast}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleCloseToast}
//           severity="success"
//           variant="outlined"
//           sx={{ bgcolor: '#28282B', color: '#fff', borderColor: '#4caf50' }}
//         >
//           {toastMsg}
//         </Alert>
//       </Snackbar>
//     </MainLayout>
//   );
// }





////////////////////////////// v2 //////////////
// // src/pages/AddProject.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SelectChangeEvent } from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material';

export default function AddProject() {
  const navigate = useNavigate();

  // ─── Top card state ───────────────────────────────
  const [project, setProject] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // ─── Bottom card state ────────────────────────────
  const [customer, setCustomer]       = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projType, setProjType]       = useState('');
  const [projManager, setProjManager] = useState('');
  const [bdm, setBdm]                 = useState('');
  const [startDate, setStartDate]     = useState('');
  const [endDate, setEndDate]         = useState('');
  const [amcYear, setAmcYear]         = useState('');
  const [amcMonth, setAmcMonth]       = useState('');

  // ─── Toast ────────────────────────────────────────
  const [toastOpen, setToastOpen]     = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const handleCloseToast = (
    _event?: React.SyntheticEvent<any, any> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  // ─── Top card handlers ────────────────────────────
  const handleProjectChange = (e: SelectChangeEvent<string>) => {
    setProject(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    if (f && /\.(xls|xlsx|csv)$/i.test(f.name)) setFile(f);
    else setFile(null);
  };
  const clearTopFile = () => setFile(null);
  const handleUpload = () => {
    console.log('upload', project, file);
    setProject('');
    setFile(null);
    setToastMessage('Sites file uploaded successfully');
    setToastOpen(true);
  };

  const handleAddSite  = () => navigate('/projects/sites/new');
  const handleViewSites = () => navigate('/projects/sites');

    const clearTop = () => {
    setProject('');
    setFile(null);
  };

  // ─── Bottom card handler ─────────────────────────
  const handleSave = () => {
    console.log({
      customer,
      projectCode,
      projectName,
      projType,
      projManager,
      bdm,
      startDate,
      endDate,
      amcYear,
      amcMonth,
    });
    // reset
    setCustomer('');
    setProjectCode('');
    setProjectName('');
    setProjType('');
    setProjManager('');
    setBdm('');
    setStartDate('');
    setEndDate('');
    setAmcYear('');
    setAmcMonth('');
    setToastMessage('Project created successfully');
    setToastOpen(true);
  };
  const ClearBottom = () => {
    setCustomer('');
    setProjectCode('');
    setProjectName('');
    setProjType('');
    setProjManager('');
    setBdm('');
    setStartDate('');
    setEndDate('');
    setAmcYear('');
    setAmcMonth('');
  };
  const handleViewAll = () => navigate('/projects');

  return (
    <MainLayout title="Add Project" showRightPanel={false}>
      <Box sx={{ pt: 1.3, px: 2 }}>

        {/* ─── Top Card ──────────────────────────────── */}
        {/* <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, mb: 1.6 }}>
          <CardContent>
            <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
              Add Sites
            </Typography>
            <Divider sx={{ borderColor: '#333', my: 1.3 }} />

            <Box
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              
              <FormControl size="small" sx={{ minWidth: 140, bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
                <Select
                  value={project}
                  label="Project"
                  onChange={handleProjectChange}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Alpha">Alpha</MenuItem>
                  <MenuItem value="Beta">Beta</MenuItem>
                  <MenuItem value="Gamma">Gamma</MenuItem>
                </Select>
              </FormControl>

              
              <Box sx={{ position: 'relative', flex: '1 1 200px', minWidth: 200 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: '100%',
                    bgcolor: '#28282B',
                    color: file ? '#FFD700' : '#888',
                    borderColor: '#333',
                    textTransform: 'none',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                    '&:hover': { borderColor: '#555' },
                  }}
                >
                  {file ? file.name : 'Choose File'}
                  <input
                    type="file"
                    hidden
                    accept=".xls,.xlsx,.csv"
                    onChange={handleFileChange}
                  />
                </Button>
                {file && (
                  <IconButton
                    size="small"
                    onClick={clearTopFile}
                    sx={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      bgcolor: '#333',
                      color: '#fff',
                      p: 0.3,
                      '&:hover': { bgcolor: '#555' },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Button
                variant="contained"
                onClick={handleUpload}
                sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  '&:hover': { bgcolor: '#D4A420' },
                }}
              >
                Upload
              </Button>

              <Button
                variant="contained"
                onClick={handleAddSite}
                sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  '&:hover': { bgcolor: '#D4A420' },
                }}
              >
                Add Site
              </Button>

              <Button
                variant="contained"
                onClick={handleViewSites}
                sx={{
                  bgcolor: '#1976d2',
                  color: '#fff',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  '&:hover': { bgcolor: '#115293' },
                }}
              >
                View Sites
              </Button>

              <Button
                variant="text"
                onClick={clearTopForm}
                sx={{ color: '#aaa', ml: 'auto' }}
              >
                Clear
              </Button>
            </Box>
          </CardContent>
        </Card> */}


        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, mb: 1.3 }}>
           <CardContent>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
                 Add Sites
               </Typography>
               <Button sx={{ color: '#aaa', textTransform: 'none', fontSize: 14 }} onClick={clearTop}>
                 Clear
               </Button>
             </Box>
             <Divider sx={{ borderColor: '#333', my: 1.2 }} />

             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
               <FormControl size="small" sx={{ minWidth: 140, bgcolor: '#28282B', borderRadius: 1 }}>
                 <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
                 <Select
                  value={project}
                  label="Project"
                  onChange={handleProjectChange}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Alpha">Alpha</MenuItem>
                  <MenuItem value="Beta">Beta</MenuItem>
                  <MenuItem value="Gamma">Gamma</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ position: 'relative', flex: '1 1 200px', minWidth: 200 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    width: '100%',
                    bgcolor: '#28282B',
                    color: file ? '#FFD700' : '#888',
                    borderColor: '#333',
                    textTransform: 'none',
                    justifyContent: 'space-between',
                    px: 2, py: 1,
                    '&:hover': { borderColor: '#555' },
                  }}
                >
                  {file ? file.name : 'Choose File'}
                  <input type="file" hidden accept=".xls,.xlsx,.csv" onChange={handleFileChange} />
                </Button>
                {file && (
                  <IconButton
                    size="small"
                    onClick={() => setFile(null)}
                    sx={{ position: 'absolute', top: -6, right: -6, bgcolor: '#333', color: '#fff', p: 0.3, '&:hover': { bgcolor: '#555' } }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Button variant="contained" onClick={handleUpload} sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#D4A420' } }}>
                Upload
              </Button>
              <Button variant="contained" onClick={handleAddSite} sx={{ bgcolor: '#FFC300', color: '#000', textTransform: 'none', px: 3, py: 1, '&:hover': { bgcolor: '#D4A420' } }}>
                 Add Site
               </Button>
               <Button variant="contained" onClick={handleViewSites} sx={{ bgcolor: '#1976d2', color: '#fff', textTransform: 'none', px: 2, py: 1, '&:hover': { bgcolor: '#115293' } }}>
                 View Sites
               </Button>
            </Box>
          </CardContent>
        </Card>


        {/* ─── Bottom Card ───────────────────────────── */}
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, height: 'calc(100vh - 220px)' }}>
          <CardContent sx={{ px: 2, pt: 1, pb: 0 }}>

 <Box
   sx={{
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     mb: 1
   }}
 >
   <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
     Add New Project
   </Typography>
   <Button
     variant="text"
     onClick={ClearBottom}
     sx={{
       color: '#aaa',
       textTransform: 'none',
       fontSize: 14
     }}
   >
     Clear
   </Button>
 </Box>
            
            <Divider sx={{ borderColor: '#333', mb: 2 }} />

            <Box
              component="form"
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 2,
                mb: 2
              }}
            >
              <TextField
                label="Customer Name"
                size="small"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                InputLabelProps={{ sx: { color: '#aaa' } }}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
              />
              <TextField
                label="Project Code"
                size="small"
                value={projectCode}
                onChange={e => setProjectCode(e.target.value)}
                InputLabelProps={{ sx: { color: '#aaa' } }}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
              />
              <TextField
                label="Project Name"
                size="small"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                InputLabelProps={{ sx: { color: '#aaa' } }}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
              />
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>Project Type</InputLabel>
                <Select
                  value={projType}
                  label="Project Type"
                  onChange={(e) => setProjType(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value="Internal">Internal</MenuItem>
                  <MenuItem value="Client">Client</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>Project Manager</InputLabel>
                <Select
                  value={projManager}
                  label="Project Manager"
                  onChange={(e) => setProjManager(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>BDM</InputLabel>
                <Select
                  value={bdm}
                  label="BDM"
                  onChange={(e) => setBdm(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  <MenuItem value="Bob Smith">Bob Smith</MenuItem>
                  <MenuItem value="Carol Nguyen">Carol Nguyen</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                type="date"
                size="small"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
              />
              <TextField
                label="End Date"
                type="date"
                size="small"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
                sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
              />
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>AMC Year</InputLabel>
                <Select
                  value={amcYear}
                  label="AMC Year"
                  onChange={(e) => setAmcYear(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  {[...Array(6).keys()].map(y => (
                    <MenuItem key={y} value={`${y}`}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ bgcolor: '#28282B', borderRadius: 1 }}>
                <InputLabel sx={{ color: '#aaa' }}>AMC Months</InputLabel>
                <Select
                  value={amcMonth}
                  label="AMC Months"
                  onChange={(e) => setAmcMonth(e.target.value)}
                  sx={{ color: '#fff' }}
                  MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                >
                  {[...Array(12).keys()].map(m => (
                    <MenuItem key={m} value={`${m}`}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  '&:hover': { bgcolor: '#D4A420' },
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={handleViewAll}
                sx={{
                  bgcolor: '#1976d2',
                  color: '#fff',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  '&:hover': { bgcolor: '#115293' },
                }}
              >
                View All Projects
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
          sx={{
            bgcolor: 'background.paper',
            borderColor: '#4caf50',
            boxShadow: 1,
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

