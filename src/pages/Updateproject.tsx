
// // src/pages/UpdateProject.tsx
// import React, { useState } from 'react';
// import MainLayout from '../layouts/MainLayout';
// import { 
//   Box, 
//   Card, 
//   CardContent, 
//   Typography,
//   Divider,
//   Button,
//   Snackbar,
//   Alert
// } from '@mui/material';

// // Chart imports
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Modal & types
// import UpdateProjectModal, { ProjectRow } from '../components/UpdateProjectModal';

// // register the pieces we need
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function ProjectDetails() {
//   // now matches ProjectRow exactly
//   const project: ProjectRow = {
//     id: 1,
//     projectName: 'RRB',
//     customer: 'Acme Corp',
//     projectCode: 'AC-001',
//     projectType: 'Implementation',
//     projectManager: 'John Doe',
//     bdm: 'Bob Smith',
//     startDate: '01/07/2025',
//     endDate: '31/07/2025',
//     amcYear: '1',
//     amcMonths: '6'
//   };

//   const siteStats = {
//     completed: 20,
//     failed:    5,
//     inProgress:15,
//     canceled:  10
//   };
//   const total = Object.values(siteStats).reduce((a,b) => a + b, 0);

//   const data = {
//     labels: ['Completed','Failed','In Progress','Canceled'],
//     datasets: [{
//       data: [
//         siteStats.completed,
//         siteStats.failed,
//         siteStats.inProgress,
//         siteStats.canceled
//       ],
//       backgroundColor: [
//         '#22C55E',
//         '#EF4444',
//         '#FBDF3B',
//         '#888888'
//       ],
//       hoverOffset: 4,
//     }]
//   };

//   const options = {
//     cutout: '70%',
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom' as const,
//         labels: { color: '#fff', boxWidth: 12, padding: 16 }
//       }
//     }
//   };

//   // modal state + handlers
//   const [editOpen, setEditOpen] = useState(false);
//   const handleOpen  = () => setEditOpen(true);
//   const handleClose = () => setEditOpen(false);

//    // toast state
//  const [toastOpen, setToastOpen] = useState(false);
//  const [toastMsg, setToastMsg]   = useState('');

//   const handleUpdate = (updated: ProjectRow) => {
//     console.log('saved', updated);
//      setToastMsg('Project updated successfully');
//      setToastOpen(true);
//   };
//   const handleDelete = (id: number) => {
//     console.log('deleted', id);
//    setToastMsg('Project deleted successfully');
//    setToastOpen(true);
//   };

//    const handleToastClose = (_?: any, reason?: string) => {
//    if (reason === 'clickaway') return;
//    setToastOpen(false);
//  };


//   return (
//     <MainLayout title="Project Details" showRightPanel={false}>
//       <Box sx={{ pt: 1.5, px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

//         {/* ─── Top Card ─── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
//           <CardContent sx={{ display: 'flex', gap: 4, px: 3, py: 2 }}>

//             {/* Left: Project info */}
//             <Box sx={{ flex: 1 }}>
//               <Typography sx={{ color: '#FBDF3B', fontSize: 18, fontWeight: 600, mb: 1 }}>
//                 {project.projectName}
//               </Typography>
//               <Divider sx={{ borderColor: '#333', mb: 2 }} />

//               <Box sx={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: 1
//               }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Customer: {project.customer}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Project Name: {project.projectName}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Project Code: {project.projectCode}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Project Type: {project.projectType}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Project Manager: {project.projectManager}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>BDM: {project.bdm}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>Start Date: {project.startDate}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>End Date: {project.endDate}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>AMC Year: {project.amcYear}</Typography>
//                   <Typography sx={{ color: '#E0E0E0',fontSize:14 }}>AMC Months: {project.amcMonths}</Typography>
//                 </Box>
//               </Box>
//             </Box>

//             {/* Right: Doughnut chart + custom legend */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>

//               <Box sx={{ width: 200, height: 200, position: 'relative' }}>
//                 <Doughnut
//                   data={data}
//                   options={{
//                     ...options,
//                     plugins: { ...options.plugins, legend: { display: false } }
//                   }}
//                 />

//                 {/* center total */}
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     textAlign: 'center',
//                     pointerEvents: 'none'
//                   }}
//                 >
//                   <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
//                     {total}
//                   </Typography>
//                   <Typography sx={{ color: '#888', fontSize: 12 }}>
//                     Sites
//                   </Typography>
//                 </Box>

//                 {/* overlay circles */}
//                 {[
//                   { pct: Math.round(siteStats.completed  / total * 100), color: '#22C55E', sx: { top: '-2%',  left: '70%', transform: 'translateX(-10%)' } },
//                   { pct: Math.round(siteStats.failed     / total * 100), color: '#EF4444', sx: { bottom: '-9%', left: '67%', transform: 'translateX(-50%)' } },
//                   { pct: Math.round(siteStats.inProgress / total * 100), color: '#FBDF3B', sx: { top: '70%',  left: '-8%', transform: 'translateY(-70%)' } },
//                   { pct: Math.round(siteStats.canceled   / total * 100), color: '#888888', sx: { top: '17%',  left: '+2%', transform: 'translateY(-70%)' } },
//                 ].map(({ pct, color, sx }, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       position: 'absolute',
//                       width: 40,
//                       height: 40,
//                       borderRadius: '50%',
//                       bgcolor: color,
//                       border: '2px solid #fff',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       ...sx
//                     }}
//                   >
//                     <Typography sx={{ color: '#000', fontSize: 14, fontWeight: 600 }}>
//                       {pct}%
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>

//               {/* -- Custom legend on the right -- */}
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 120 }}>
//                 {[
//                   { label: 'Completed',  color: '#22C55E', value: siteStats.completed },
//                   { label: 'Failed',     color: '#EF4444', value: siteStats.failed },
//                   { label: 'In Progress',color: '#FBDF3B', value: siteStats.inProgress },
//                   { label: 'Canceled',   color: '#888888', value: siteStats.canceled },
//                 ].map(({ label, color, value }) => (
//                   <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: color }} />
//                     <Typography sx={{ color: '#fff', fontSize: 14 }}>
//                       {label}: {value}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Box>

//             {/* ─── UPDATE BUTTON ─── */}
//             <Box sx={{ flex: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: 200 }}>
//               <Button
//                 variant="contained"
//                 onClick={handleOpen}
//                 sx={{
//                   bgcolor: '#FBDF3B',
//                   color: '#000',
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: '#F9C600' }
//                 }}
//               >
//                 Update
//               </Button>
//             </Box>

//           </CardContent>
//         </Card>

//         {/* ─── Bottom Card ─── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, flexGrow: 1 }}>
//           <CardContent sx={{ px: 3, py: 2 }}>
//             <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//               Site Activities
//             </Typography>
//             <Divider sx={{ borderColor: '#333', mt: 1 }} />
            
//           </CardContent>
//         </Card>
//       </Box>

//       {/* ─── The Update Modal ─── */}
//       <UpdateProjectModal
//         open={editOpen}
//         row={project}
//         onClose={handleClose}
//         onUpdate={handleUpdate}
//         onDelete={handleDelete}
//       />

//      {/* ─── Toast Snackbar ─── */}

//      <Snackbar
//   open={toastOpen}
//   autoHideDuration={1200}
//   onClose={handleToastClose}
//   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// >
//   <Alert
//     onClose={handleToastClose}
//     severity="success"
//     variant="outlined"
//     sx={{
//       bgcolor: 'background.paper',
//       borderColor: '#4caf50',
//       boxShadow: 1,
    
//     }}
//   >
//     {toastMsg}
//   </Alert>
// </Snackbar>

//     </MainLayout>
//   );
// }


//// v3 //

// import React, { useState } from 'react'
// import MainLayout from '../layouts/MainLayout'
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
//   TableBody
// } from '@mui/material'
// import UpdateProjectModal, { ProjectRow } from '../components/UpdateProjectModal'
// import { Doughnut } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js'

// ChartJS.register(ArcElement, Tooltip, Legend)

// export default function ProjectDetails() {
//     const project: ProjectRow = {
//     id: 1,
//     projectName: 'RRB',
//     customer: 'Acme Corp',
//     projectCode: 'AC-001',
//     projectType: 'Implementation',
//     projectManager: 'John Doe',
//     bdm: 'Bob Smith',
//     startDate: '01/07/2025',
//     endDate: '31/07/2025',
//     amcYear: '1',
//     amcMonths: '6'
//   };

//   // const [editOpen, setEditOpen] = useState(false)
//   // const handleOpen = () => setEditOpen(true)
//   // const handleClose = () => setEditOpen(false)

//     const siteStats = {
//     completed: 20,
//     failed:    5,
//     inProgress:15,
//     canceled:  10
//   };
//   const total = Object.values(siteStats).reduce((a,b) => a + b, 0);

//   const data = {
//     labels: ['Completed','Failed','In Progress','Canceled'],
//     datasets: [{
//       data: [
//         siteStats.completed,
//         siteStats.failed,
//         siteStats.inProgress,
//         siteStats.canceled
//       ],
//       backgroundColor: [
//         '#22C55E',
//         '#EF4444',
//         '#FBDF3B',
//         '#888888'
//       ],
//       hoverOffset: 4,
//     }]
//   };

//   const options = {
//     cutout: '70%',
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom' as const,
//         labels: { color: '#fff', boxWidth: 12, padding: 16 }
//       }
//     }
//   };

//   // modal state + handlers
//   const [editOpen, setEditOpen] = useState(false);
//   const handleOpen  = () => setEditOpen(true);
//   const handleClose = () => setEditOpen(false);

//    // toast state
//  const [toastOpen, setToastOpen] = useState(false);
//  const [toastMsg, setToastMsg]   = useState('');

//   const handleUpdate = (updated: ProjectRow) => {
//     console.log('saved', updated);
//      setToastMsg('Project updated successfully');
//      setToastOpen(true);
//   };
//   const handleDelete = (id: number) => {
//     console.log('deleted', id);
//    setToastMsg('Project deleted successfully');
//    setToastOpen(true);
//   };

//    const handleToastClose = (_?: any, reason?: string) => {
//    if (reason === 'clickaway') return;
//    setToastOpen(false);
//  };


//   // Dummy data for the bottom table
//   interface SiteRow {
//     srNo: number
//     ticketNo: string
//     date: string
//     project: string
//     activity: string
//     state: string
//     district: string
//     city: string
//     bName: string
//     bCode: string
//     pm: string
//     vendor: string
//     feName: string
//     feMobile: string
//     noc: string
//     remarks: string
//     status: string
//   }

//   const dummySites: SiteRow[] = [
//     {
//       srNo: 1,
//       ticketNo: 'T-1001',
//       date: '07/01/2025',
//       project: 'RRB',
//       activity: 'Inspection',
//       state: 'CA',
//       district: 'North',
//       city: 'Los Angeles',
//       bName: 'Bob Smith',
//       bCode: 'BS-01',
//       pm: 'John Doe',
//       vendor: 'Vendor A',
//       feName: 'Jane Smith',
//       feMobile: '123-456-7890',
//       noc: 'NOC Eng',
//       remarks: 'All good',
//       status: 'Pending'
//     },
//     // …add as many dummy rows as you like…
//   ]

//   const [statusFilter, setStatusFilter] = useState('')
//   const [search, setSearch] = useState('')

//   const displayedSites = dummySites
//     .filter(r => (statusFilter ? r.status === statusFilter : true))
//     .filter(r => r.activity.toLowerCase().includes(search.toLowerCase()))

//   // …your chart data, top‐card, etc. above…

//   return (
//     <MainLayout title="Project Details" showRightPanel={false}>
//       <Box sx={{ pt: 2, px: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
//         {/* ─── Top Card ─── */}
//         {/* …your existing top card goes here… */}

//         {/* ─── Bottom Card: Site Summary ─── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
//           <CardContent sx={{ px: 3, py: 2 }}>
//             {/* Header row: Title + filters + Update button */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 flexWrap: 'wrap',
//                 gap: 2,
//                 mb: 1
//               }}
//             >
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//                 Site Summary
//               </Typography>

//               <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                 <FormControl size="small" sx={{ minWidth: 120, bgcolor: '#1C1C1E', borderRadius: 1, border: '1px solid #333' }}>
//                   <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Status</InputLabel>
//                   <Select
//                     value={statusFilter}
//                     label="Status"
//                     onChange={e => setStatusFilter(e.target.value)}
//                     sx={{
//                       color: '#fff',
//                       '& .MuiSelect-select': { py: 0.5, px: 1 },
//                       '& .MuiSelect-icon': { color: '#888' }
//                     }}
//                     MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     <MenuItem value="Pending">Pending</MenuItem>
//                     <MenuItem value="In Progress">In Progress</MenuItem>
//                     <MenuItem value="Completed">Completed</MenuItem>
//                     <MenuItem value="Canceled">Canceled</MenuItem>
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
//                     '& .MuiOutlinedInput-input': { color: '#fff', py: '4px', fontSize: 12 }
//                   }}
//                 />

//                 <Button
//                   variant="contained"
//                   onClick={handleOpen}
//                   sx={{
//                     bgcolor: '#FBDF3B',
//                     color: '#000',
//                     textTransform: 'none',
//                     '&:hover': { bgcolor: '#F9C600' }
//                   }}
//                 >
//                   Update
//                 </Button>
//               </Box>
//             </Box>

//             <Divider sx={{ borderColor: '#333', mb: 1 }} />

//             {/* Table */}
//             <TableContainer
//               sx={{
//                 maxHeight: 'calc(100vh - 350px)',
//                 overflow: 'auto',
//                 '&::-webkit-scrollbar': { width: 6, height: 6 },
//                 '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 }
//               }}
//             >
//               <Table stickyHeader sx={{ minWidth: 1800 }}>
//                 <TableHead>
//                   <TableRow>
//                     {[
//                       'Sr No','T No','Date','Project','Activity','State','District',
//                       'City','B Name','B Code','PM','Vendor','FE Name','FE Mobile',
//                       'NOC Eng','Remarks','Status','Update'
//                     ].map(col => (
//                       <TableCell
//                         key={col}
//                         sx={{
//                           color: '#fff',
//                           backgroundColor: '#0F0F0F',
//                           borderBottom: '1px solid #333',
//                           fontSize: 12,
//                           textAlign: 'center',
//                           whiteSpace: 'nowrap',
//                           px: 2,
//                           py: 1.5
//                         }}
//                       >
//                         {col}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {displayedSites.map(r => (
//                     <TableRow key={r.srNo} hover>
//                       {/* render each cell in order */}
//                       {[
//                         r.srNo,
//                         r.ticketNo,
//                         r.date,
//                         r.project,
//                         r.activity,
//                         r.state,
//                         r.district,
//                         r.city,
//                         r.bName,
//                         r.bCode,
//                         r.pm,
//                         r.vendor,
//                         r.feName,
//                         r.feMobile,
//                         r.noc,
//                         r.remarks,
//                         r.status,
//                         <Button
//                           key="upd"
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
//                             px: 2,
//                             py: 1.5,
//                             ...(idx === 17 && { px: 1, py: 0 }) // tighter for button
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

//       {/* your UpdateProjectModal hookup */}
//         <UpdateProjectModal
//          open={editOpen}
//         row={project}
//         onClose={handleClose}
//         onUpdate={handleUpdate}
//         onDelete={handleDelete}
//       />

//     </MainLayout>
//   )
// }
