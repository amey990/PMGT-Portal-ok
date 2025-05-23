// import React, { useState, useMemo } from 'react'
// import MainLayout from '../../layouts/MainLayout'
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   TablePagination,
// } from '@mui/material'
// import DownloadIcon from '@mui/icons-material/Download'

// export default function PAList() {
//   const [search, setSearch] = useState('')
//   const [filterProj, setFilterProj] = useState('')
//   const [openDialog, setOpenDialog] = useState<{ type: string; index: number | null }>({ type: '', index: null })
//   const [selectedStatus, setSelectedStatus] = useState('')
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   const [rows, setRows] = useState([
//     { paNo: 'PA-001', project: 'Gamma', date: '2025-05-23', site: 'Raipur', code: 'S-203', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-002', project: 'Alpha', date: '2025-05-20', site: 'Delhi', code: 'D-102', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-003', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-301', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-004', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-302', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-005', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-303', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-006', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-304', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-007', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-305', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-008', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-306', paStatus: '', paymentStatus: '' },
//     { paNo: 'PA-009', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-307', paStatus: '', paymentStatus: '' },
//   ])

//   const filtered = useMemo(() => {
//     return rows.filter(r =>
//       r.project.toLowerCase().includes(search.toLowerCase()) &&
//       (filterProj ? r.project === filterProj : true)
//     )
//   }, [search, filterProj, rows])

//   const handleStatusClick = (type: string, index: number) => {
//     setOpenDialog({ type, index })
//     setSelectedStatus('')
//   }

//   const handleStatusUpdate = () => {
//     if (openDialog.index !== null) {
//       const updated = [...rows]
//       updated[openDialog.index][openDialog.type === 'pa' ? 'paStatus' : 'paymentStatus'] = selectedStatus
//       setRows(updated)
//     }
//     setOpenDialog({ type: '', index: null })
//   }

//   const handleChangePage = (_: any, newPage: number) => setPage(newPage)
//   const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(e.target.value, 10))
//     setPage(0)
//   }

//   return (
//     <MainLayout title="Atlas Accounting" showRightPanel={false}>
//       <Box sx={{ pt: 2, px: 2 }}>
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
//           <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>PA List</Typography>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <TextField
//                   size="small"
//                   placeholder="Search..."
//                   variant="outlined"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}
//                   sx={searchSx}
//                 />
//                 <FormControl size="small" sx={{ minWidth: 140 }}>
//                   <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Project</InputLabel>
//                   <Select
//                     value={filterProj}
//                     label="Project"
//                     onChange={e => setFilterProj(e.target.value)}
//                     sx={selectSx}
//                     MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
//                   >
//                     <MenuItem value="">All</MenuItem>
//                     {[...new Set(rows.map(r => r.project))].map(p => (
//                       <MenuItem key={p} value={p}>{p}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Button variant="contained" sx={exportBtnSx}>Export</Button>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto' }}>
//               <TableContainer      
//               >
//                 {/* <Table stickyHeader> */}
//                  <Table stickyHeader sx={{ minWidth: 1000 }}>
//                   <TableHead>
//                     <TableRow>
//                       {["Sr No", "PA No", "Project Name", "PA Date", "Site Name", "Site Code", "Download", "PA Status", "Payment Status"].map((h, i) => (
//                         <TableCell key={i} align="center" sx={headCellSx}>{h}</TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filtered
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((r, i) => (
//                         <TableRow key={i}>
//                           <TableCell align="center" sx={cellSx}>{page * rowsPerPage + i + 1}</TableCell>
//                           <TableCell align="center" sx={cellSx}>{r.paNo}</TableCell>
//                           <TableCell align="center" sx={cellSx}>{r.project}</TableCell>
//                           <TableCell align="center" sx={cellSx}>{r.date}</TableCell>
//                           <TableCell align="center" sx={cellSx}>{r.site}</TableCell>
//                           <TableCell align="center" sx={cellSx}>{r.code}</TableCell>
//                           <TableCell align="center" sx={cellSx}>
//                             <IconButton sx={{ color: '#FFC300' }}><DownloadIcon fontSize="small" /></IconButton>
//                           </TableCell>
//                           <TableCell align="center" sx={cellSx}>
//                             {r.paStatus ? r.paStatus : (
//                               <Button
//                                 size="small"
//                                 variant="contained"
//                                 sx={redBtnSx}
//                                 onClick={() => handleStatusClick('pa', page * rowsPerPage + i)}
//                               >Update</Button>
//                             )}
//                           </TableCell>
//                           <TableCell align="center" sx={cellSx}>
//                             {r.paymentStatus ? r.paymentStatus : (
//                               <Button
//                                 size="small"
//                                 variant="contained"
//                                 sx={redBtnSx}
//                                 onClick={() => handleStatusClick('payment', page * rowsPerPage + i)}
//                               >Update</Button>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>

//             <Box sx={{ pt: 1 }}>
//               <TablePagination
//                 component="div"
//                 count={filtered.length}
//                 page={page}
//                 rowsPerPage={rowsPerPage}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[10, 20, 50]}
//                 sx={{
//                   '.MuiTablePagination-toolbar': { minHeight: 48, px: 0 },
//                   '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { color: '#fff', fontSize: 12 },
//                   '.MuiTablePagination-select': { color: '#fff' },
//                   '.MuiTablePagination-actions button': { color: '#fff' },
//                 }}
//               />
//             </Box>

            
//           </CardContent>
//         </Card>
//       </Box>

//       <Dialog
//         open={!!openDialog.type}
//         onClose={() => setOpenDialog({ type: '', index: null })}
//         PaperProps={{ sx: { bgcolor: '#1E1E1E', color: '#fff' } }}
//       >
//         <DialogTitle sx={{ color: '#fff' }}>
//           Update {openDialog.type === 'pa' ? 'PA' : 'Payment'} Status
//         </DialogTitle>
//         <DialogContent>
//           <RadioGroup
//             value={selectedStatus}
//             onChange={e => setSelectedStatus(e.target.value)}
//           >
//             {['DISCARD', 'APPROVED', 'NOT APPROVED'].map(opt => (
//               <FormControlLabel
//                 key={opt}
//                 value={opt}
//                 control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#FFC300' } }} />}
//                 label={opt}
//               />
//             ))}
//           </RadioGroup>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog({ type: '', index: null })} sx={{ color: '#fff' }}>Cancel</Button>
//           <Button variant="contained" onClick={handleStatusUpdate} sx={exportBtnSx}>Update</Button>
//         </DialogActions>
//       </Dialog>
//     </MainLayout>
//   )
// }

// const searchSx = {
//   width: 200,
//   bgcolor: '#1C1C1E',
//   '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #333' },
//   '& .MuiOutlinedInput-root': { height: 32 },
//   '& .MuiOutlinedInput-input': { color: '#fff', fontSize: 12 },
// }
// const selectSx = {
//   bgcolor: '#1C1C1E',
//   color: '#fff',
//   border: '1px solid #333',
//   borderRadius: 1,
//   height: 32,
//   fontSize: 12,
//   '& .MuiSelect-select': { py: 0.5, px: 1 },
//   '& .MuiSelect-icon': { color: '#888', fontSize: 16 },
// }
// const exportBtnSx = {
//   bgcolor: '#FFC300',
//   color: '#000',
//   textTransform: 'none',
//   px: 2,
//   py: 0.5,
//   '&:hover': { bgcolor: '#D4A420' },
// }
// const headCellSx = {
//   color: '#fff',
//   backgroundColor: '#0F0F0F',
//   borderBottom: '1px solid #333',
//   fontSize: 12,
//   textAlign: 'center',
//   px: 2,
//   py: 1.5,
// }
// const cellSx = {
//   color: '#E0E0E0',
//   borderBottom: '1px solid #333',
//   fontSize: 12,
//   textAlign: 'center',
//   px: 2,
//   py: 1.5,
// }
// const redBtnSx = {
//   bgcolor: '#EF4444',
//   color: '#fff',
//   textTransform: 'none',
//   '&:hover': { bgcolor: '#DC2626' },
// }


import React, { useState, useMemo } from 'react'
import MainLayout from '../../layouts/MainLayout'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

export default function PAList() {
  const [search, setSearch] = useState('')
  const [filterProj, setFilterProj] = useState('')
  const [openDialog, setOpenDialog] = useState<{ type: string; index: number | null }>({ type: '', index: null })
  const [selectedStatus, setSelectedStatus] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [rows, setRows] = useState([
    { paNo: 'PA-001', project: 'Gamma', date: '2025-05-23', site: 'Raipur', code: 'S-203', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-002', project: 'Alpha', date: '2025-05-20', site: 'Delhi', code: 'D-102', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-003', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-301', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-004', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-302', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-005', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-303', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-006', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-304', paStatus: '', paymentStatus: '' },
    { paNo: 'PA-007', project: 'Beta', date: '2025-05-18', site: 'Mumbai', code: 'M-305', paStatus: '', paymentStatus: '' },
  ])

  const filtered = useMemo(() => {
    return rows.filter(r =>
      r.project.toLowerCase().includes(search.toLowerCase()) &&
      (filterProj ? r.project === filterProj : true)
    )
  }, [search, filterProj, rows])

  const paginated = useMemo(() => {
    const start = page * rowsPerPage
    return filtered.slice(start, start + rowsPerPage)
  }, [filtered, page, rowsPerPage])

  const handleStatusClick = (type: string, index: number) => {
    setOpenDialog({ type, index })
    setSelectedStatus('')
  }

  const handleStatusUpdate = () => {
    if (openDialog.index !== null) {
      const updated = [...rows]
      updated[openDialog.index][openDialog.type === 'pa' ? 'paStatus' : 'paymentStatus'] = selectedStatus
      setRows(updated)
    }
    setOpenDialog({ type: '', index: null })
  }

  const handleChangePage = (_: any, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <MainLayout title="Atlas Accounting" showRightPanel={false}>
      <Box sx={{ pt: 2, px: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, height: 'calc(100vh - 80px)', overflow: 'hidden' }}>
          <CardContent sx={{ px: 2, pt: 2, pb: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>PA List</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{
                    width: 200,
                    bgcolor: '#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline': { border: '1px solid #333', borderRadius: 1 },
                    '& .MuiOutlinedInput-root': { height: 32 },
                    '& .MuiOutlinedInput-input': { color: '#fff', fontSize: 12, py: '4px' },
                  }}
                />
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
                      '& .MuiSelect-icon': { color: '#888', fontSize: 16 },
                    }}
                    MenuProps={{ PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {[...new Set(rows.map(r => r.project))].map(p => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  py: 0.5,
                  '&:hover': { bgcolor: '#D4A420' },
                }}>
                  Export
                </Button>
              </Box>
            </Box>

            {/* Scrollable Table with sticky headers */}
            <TableContainer sx={{
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: 3 },
            }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Sr No", "PA No", "Project Name", "PA Date", "Site Name", "Site Code", "Download", "PA Status", "Payment Status"].map((h, i, arr) => (
                      <TableCell
                        key={h}
                        sx={{
                          color: '#fff',
                          backgroundColor: '#0F0F0F',
                          borderBottom: '1px solid #333',
                          fontSize: 12,
                          textAlign: 'center',
                          px: 2,
                          py: 1.5,
                          borderTopLeftRadius: i === 0 ? '8px' : 0,
                          borderTopRightRadius: i === arr.length - 1 ? '8px' : 0,
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginated.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell align="center" sx={cellSx}>{page * rowsPerPage + i + 1}</TableCell>
                      <TableCell align="center" sx={cellSx}>{r.paNo}</TableCell>
                      <TableCell align="center" sx={cellSx}>{r.project}</TableCell>
                      <TableCell align="center" sx={cellSx}>{r.date}</TableCell>
                      <TableCell align="center" sx={cellSx}>{r.site}</TableCell>
                      <TableCell align="center" sx={cellSx}>{r.code}</TableCell>
                      <TableCell align="center" sx={cellSx}>
                        <IconButton sx={{ color: '#FFC300' }}><DownloadIcon fontSize="small" /></IconButton>
                      </TableCell>
                      <TableCell align="center" sx={cellSx}>
                        {r.paStatus || (
                          <Button size="small" variant="contained" sx={redBtnSx} onClick={() => handleStatusClick('pa', i)}>Update</Button>
                        )}
                      </TableCell>
                      <TableCell align="center" sx={cellSx}>
                        {r.paymentStatus || (
                          <Button size="small" variant="contained" sx={redBtnSx} onClick={() => handleStatusClick('payment', i)}>Update</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ py: 1.2, px: 1 }}>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={filtered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  bgcolor: '#1C1C1E',
                  '& .MuiTablePagination-toolbar': { minHeight: '48px' },
                  '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                    color: '#fff',
                    fontSize: 12,
                  },
                  '& .MuiSelect-select, .MuiInputBase-input': {
                    color: '#fff',
                    fontSize: 12,
                  },
                  '& .MuiTablePagination-actions button': {
                    color: '#fff',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Status Update Dialog */}
      <Dialog
        open={!!openDialog.type}
        onClose={() => setOpenDialog({ type: '', index: null })}
        PaperProps={{ sx: { bgcolor: '#1C1C1E', color: '#fff' } }}
      >
        <DialogTitle sx={{ color: '#fff' }}>
          Update {openDialog.type === 'pa' ? 'PA' : 'Payment'} Status
        </DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
            {['DISCARD', 'APPROVED', 'NOT APPROVED'].map(opt => (
              <FormControlLabel key={opt} value={opt} control={<Radio sx={{ color: '#fff' }} />} label={opt} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ type: '', index: null })} sx={{ color: '#fff' }}>Cancel</Button>
          <Button variant="contained" onClick={handleStatusUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  )
}

const cellSx = {
  color: '#E0E0E0',
  borderBottom: '1px solid #333',
  fontSize: 12,
  textAlign: 'center',
  px: 2,
  py: 1.5,
}

const redBtnSx = {
  bgcolor: '#EF4444',
  color: '#fff',
  textTransform: 'none',
  '&:hover': { bgcolor: '#DC2626' },
}
