// // src/pages/Finance Module/Raise_Pa.tsx
// import React, { useState, useMemo } from 'react'
// import { useNavigate } from 'react-router-dom'
// import MainLayout from '../../layouts/MainLayout'
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   TextField,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TablePagination,
//   Button,
// } from '@mui/material'

// interface Row {
//   id: number
//   date: string
//   project: string
//   branchName: string
//   branchCode: string
//   city: string
//   district: string
//   state: string
//   vendor: string
//   projectManager: string
//   feName: string
//   feMobile: string
// }

// export default function Raise_PA() {
//   const navigate = useNavigate()

//   // ─── dummy data ───────────────────────────────
//   const [rows] = useState<Row[]>([
//     // …10+ sample rows…
//     { id: 1, date:'2025-05-01', project:'Alpha',   branchName:'Branch A', branchCode:'B-A1', city:'NY', district:'North', state:'NY', vendor:'Vendor X', projectManager:'John Doe', feName:'Alice Kim', feMobile:'123-456-7890' },
//     { id: 2, date:'2025-05-02', project:'Beta',    branchName:'Branch B', branchCode:'B-B2', city:'LA', district:'West',  state:'CA', vendor:'Vendor Y', projectManager:'Jane Roe', feName:'Bob Lee',   feMobile:'234-567-8901' },
//     { id: 3, date:'2025-05-03', project:'Gamma',   branchName:'Branch C', branchCode:'B-C3', city:'CHI',district:'East',  state:'IL', vendor:'Vendor Z', projectManager:'Jim Boe',  feName:'Carol Ng', feMobile:'345-678-9012' },
//     { id: 4, date:'2025-05-04', project:'Delta',   branchName:'Branch D', branchCode:'B-D4', city:'HOU',district:'South', state:'TX', vendor:'Vendor X', projectManager:'Ann Coe',  feName:'Dave Li',  feMobile:'456-789-0123' },
//     { id: 5, date:'2025-05-05', project:'Epsilon', branchName:'Branch E', branchCode:'B-E5', city:'PHX',district:'North', state:'AZ', vendor:'Vendor Y', projectManager:'Tim Moe',  feName:'Eve Pat',  feMobile:'567-890-1234' },
//     { id: 6, date:'2025-05-06', project:'Zeta',    branchName:'Branch F', branchCode:'B-F6', city:'PHL',district:'East',  state:'PA', vendor:'Vendor Z', projectManager:'Sam Ray',  feName:'Fay Wu',   feMobile:'678-901-2345' },
//     { id: 7, date:'2025-05-07', project:'Eta',     branchName:'Branch G', branchCode:'B-G7', city:'SAT',district:'West',  state:'TX', vendor:'Vendor X', projectManager:'Pat Zee',  feName:'Gus Li',   feMobile:'789-012-3456' },
//     { id: 8, date:'2025-05-08', project:'Theta',   branchName:'Branch H', branchCode:'B-H8', city:'SD', district:'South', state:'CA', vendor:'Vendor Y', projectManager:'Kim Tay',  feName:'Hank Yu',  feMobile:'890-123-4567' },
//     { id: 9, date:'2025-05-09', project:'Iota',    branchName:'Branch I', branchCode:'B-I9', city:'DAL',district:'North', state:'TX', vendor:'Vendor Z', projectManager:'Lee Sun',  feName:'Ivy Wu',   feMobile:'901-234-5678' },
//     { id:10, date:'2025-05-10', project:'Kappa',   branchName:'Branch J', branchCode:'B-J10',city:'SJ', district:'East',  state:'CA', vendor:'Vendor X', projectManager:'Max Roe',  feName:'Jay Lim',  feMobile:'012-345-6789' },
//   ])

//   // ─── search + pagination state ────────────────
//   const [search, setSearch]           = useState('')
//   const [page, setPage]               = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   // ─── filtered rows ────────────────────────────
//   const filtered = useMemo(
//     () =>
//       rows.filter(r =>
//         r.project.toLowerCase().includes(search.toLowerCase()) ||
//         r.branchName.toLowerCase().includes(search.toLowerCase())
//       ),
//     [rows, search]
//   )

//   // ─── pagination handlers ───────────────────────
//   const handleChangePage = (_: any, newPage: number) => setPage(newPage)
//   const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(e.target.value, 10))
//     setPage(0)
//   }

//   return (
//     <MainLayout title="Raise PA" showRightPanel={false}>
//       <Box sx={{ pt: 2, px: 2 }}>
//         <Card
//           sx={{
//             bgcolor: '#1C1C1E',
//             borderRadius: 2,
//             height: 'calc(100vh - 80px)',
//             overflow: 'hidden',
//           }}
//         >
//           <CardContent
//             sx={{
//               px: 2,
//               pt: 2,
//               pb: 0,
//               display: 'flex',
//               flexDirection: 'column',
//               height: '100%',
//             }}
//           >
//             {/* ─── Header ─────────────────────────────── */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <Typography color="#fff" fontSize={18} fontWeight={600}>
//                 Raise PA
//               </Typography>
//               <TextField
//                 size="small"
//                 placeholder="Search…"
//                 variant="outlined"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 sx={{
//                   width: 200,
//                   bgcolor: '#1C1C1E',
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     border: '1px solid #333',
//                     borderRadius: 1,
//                   },
//                   '& .MuiOutlinedInput-input': {
//                     color: '#fff',
//                     fontSize: 12,
//                     py: '4px',
//                   },
//                 }}
//               />
//             </Box>
//             <Divider sx={{ borderColor: '#333', my: 1 }} />

//             {/* ─── Table + Pagination Container ─────────── */}
//             <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//               <TableContainer
//                 sx={{
//                   flex: 1,
//                   overflowY: 'auto',
//                   px: 2,
//                   '&::-webkit-scrollbar': { width: 6 },
//                   '&::-webkit-scrollbar-thumb': {
//                     background: '#333',
//                     borderRadius: 3,
//                   },
//                 }}
//               >
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       {[
//                         'Date','Project','Branch Name','Branch Code',
//                         'City','District','State','Vendor',
//                         'Project Manager','FE Name','FE Mobile','PA'
//                       ].map((col, i, arr) => (
//                         <TableCell
//                           key={col}
//                           align="center"
//                           sx={{
//                             color: '#fff',
//                             background: '#0F0F0F',
//                             fontSize: 12,
//                             px: 2, py: 1.5,
//                             borderBottom: '1px solid #333',
//                             borderTopLeftRadius:  i === 0           ? 1 : 0,
//                             borderTopRightRadius: i === arr.length-1 ? 1 : 0,
//                           }}
//                         >
//                           {col}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filtered
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map(r => (
//                         <TableRow key={r.id} hover>
//                           {[
//                             r.date, r.project, r.branchName, r.branchCode,
//                             r.city, r.district, r.state, r.vendor,
//                             r.projectManager, r.feName, r.feMobile,
//                           ].map((val, idx) => (
//                             <TableCell
//                               key={idx}
//                               align="center"
//                               sx={{
//                                 color: '#E0E0E0',
//                                 borderBottom: '1px solid #333',
//                                 fontSize: 12,
//                                 px: 2, py: 1.5,
//                               }}
//                             >
//                               {val}
//                             </TableCell>
//                           ))}
//                           <TableCell align="center" sx={{ borderBottom: '1px solid #333' }}>
//                             <Button
//                               size="small"
//                               variant="contained"
//                               onClick={() => navigate('/generate-pa')}
//                               sx={{
//                                 bgcolor:'#22C55E',
//                                 color:'#fff',
//                                 textTransform:'none',
//                                 '&:hover':{ bgcolor:'#16A34A' }
//                               }}
//                             >
//                               Generate PA
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <TablePagination
//                 component="div"
//                 count={filtered.length}
//                 page={page}
//                 rowsPerPage={rowsPerPage}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[10,20,50]}
//                 sx={{
//                   bgcolor: '#1C1C1E',
//                   '.MuiTablePagination-toolbar': { minHeight: 48, px: 2 },
//                   '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
//                     color: '#fff', fontSize: 12
//                   },
//                   '.MuiTablePagination-select': { color: '#fff' },
//                   '.MuiTablePagination-actions button': { color:'#fff' }
//                 }}
//               />
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </MainLayout>
//   )
// }


// src/pages/Finance Module/Raise_Pa.tsx
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
} from '@mui/material'

interface Row {
  id: number
  date: string
  project: string
  branchName: string
  branchCode: string
  city: string
  district: string
  state: string
  vendor: string
  projectManager: string
  feName: string
  feMobile: string
}

export default function Raise_PA() {
  const navigate = useNavigate()

  // ─── dummy data ───────────────────────────────
  const [rows] = useState<Row[]>([
    { id: 1, date:'2025-05-01', project:'Alpha',   branchName:'Branch A', branchCode:'B-A1', city:'NY',  district:'North', state:'NY', vendor:'Vendor X', projectManager:'John Doe', feName:'Alice Kim', feMobile:'123-456-7890' },
    { id: 2, date:'2025-05-02', project:'Beta',    branchName:'Branch B', branchCode:'B-B2', city:'LA',  district:'West',  state:'CA', vendor:'Vendor Y', projectManager:'Jane Roe', feName:'Bob Lee',   feMobile:'234-567-8901' },
    { id: 3, date:'2025-05-03', project:'Gamma',   branchName:'Branch C', branchCode:'B-C3', city:'CHI',district:'East',  state:'IL', vendor:'Vendor Z', projectManager:'Jim Boe',  feName:'Carol Ng', feMobile:'345-678-9012' },
    { id: 4, date:'2025-05-04', project:'Delta',   branchName:'Branch D', branchCode:'B-D4', city:'HOU',district:'South', state:'TX', vendor:'Vendor X', projectManager:'Ann Coe',  feName:'Dave Li',  feMobile:'456-789-0123' },
    { id: 5, date:'2025-05-05', project:'Epsilon', branchName:'Branch E', branchCode:'B-E5', city:'PHX',district:'North', state:'AZ', vendor:'Vendor Y', projectManager:'Tim Moe',  feName:'Eve Pat',  feMobile:'567-890-1234' },
    { id: 6, date:'2025-05-06', project:'Zeta',    branchName:'Branch F', branchCode:'B-F6', city:'PHL',district:'East',  state:'PA', vendor:'Vendor Z', projectManager:'Sam Ray',  feName:'Fay Wu',   feMobile:'678-901-2345' },
    { id: 7, date:'2025-05-07', project:'Eta',     branchName:'Branch G', branchCode:'B-G7', city:'SAT',district:'West',  state:'TX', vendor:'Vendor X', projectManager:'Pat Zee',  feName:'Gus Li',   feMobile:'789-012-3456' },
    { id: 8, date:'2025-05-08', project:'Theta',   branchName:'Branch H', branchCode:'B-H8', city:'SD', district:'South', state:'CA', vendor:'Vendor Y', projectManager:'Kim Tay',  feName:'Hank Yu',  feMobile:'890-123-4567' },
    { id: 9, date:'2025-05-09', project:'Iota',    branchName:'Branch I', branchCode:'B-I9', city:'DAL',district:'North', state:'TX', vendor:'Vendor Z', projectManager:'Lee Sun',  feName:'Ivy Wu',   feMobile:'901-234-5678' },
    { id:10, date:'2025-05-10', project:'Kappa',   branchName:'Branch J', branchCode:'B-J10',city:'SJ', district:'East',  state:'CA', vendor:'Vendor X', projectManager:'Max Roe',  feName:'Jay Lim',  feMobile:'012-345-6789' },
  ])

  // ─── search + pagination state ────────────────
  const [search, setSearch]           = useState('')
  const [page, setPage]               = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ─── filtered rows ────────────────────────────
  const filtered = useMemo(
    () =>
      rows.filter(r =>
        r.project.toLowerCase().includes(search.toLowerCase()) ||
        r.branchName.toLowerCase().includes(search.toLowerCase())
      ),
    [rows, search]
  )

  // ─── pagination handlers ───────────────────────
  const handleChangePage = (_: any, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <MainLayout title="Atlas Accounting" showRightPanel={false}>
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
              px: 2, pt: 2, pb: 0,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {/* ─── Header ─────────────────────────────── */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography color="#fff" fontSize={18} fontWeight={600}>
                Completed Activities List
              </Typography>
              <TextField
                size="small"
                placeholder="Search…"
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
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                    fontSize: 12,
                    py: '4px',
                  },
                }}
              />
            </Box>
            <Divider sx={{ borderColor: '#333', my: 1 }} />

            {/* ─── Table + Pagination Container ─────────── */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
             <TableContainer
                sx={{
                 flex: 1,
                 overflowY: 'auto',
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-thumb': {
                  background: '#333',
                  borderRadius: 3,
                  },
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {[
                        'Date','Project','Branch Name','Branch Code',
                        'City','District','State','Vendor',
                        'Project Manager','FE Name','FE Mobile','PA'
                      ].map((col, i, arr) => (
                       <TableCell
  key={col}
  align="center"
  sx={{
    color: '#fff',
    background: '#0F0F0F',
    fontSize: 12,
    px: 2,
    py: 1.5,
    borderBottom: '1px solid #333',
    borderTopLeftRadius: i === 0 ? '8px' : 0,
    borderTopRightRadius: i === arr.length - 1 ? '8px' : 0,
  }}
>
  {col}
</TableCell>

                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(r => (
                        <TableRow key={r.id} hover>
                          {[
                            r.date, r.project, r.branchName, r.branchCode,
                            r.city, r.district, r.state, r.vendor,
                            r.projectManager, r.feName, r.feMobile,
                          ].map((val, idx) => (
                            <TableCell
                              key={idx}
                              align="center"
                              sx={{
                                color: '#E0E0E0',
                                borderBottom: '1px solid #333',
                                fontSize: 12,
                                px: 2, py: 1.5,
                              }}
                            >
                              {val}
                            </TableCell>
                          ))}
                          <TableCell align="center" sx={{ borderBottom: '1px solid #333' }}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => navigate('/generate-pa')}
                              sx={{
                                // bgcolor: '#22C55E',
                                // color: '#fff',
                                // textTransform: 'none',
                                // '&:hover': { bgcolor: '#16A34A' },
                                 bgcolor: '#EF4444',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#DC2626' },
                              }}
                            >
                              Generate PA
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* ─── Pinned Pagination ──────────────────── */}
              <Box sx={{ py: 2, px: 1 }}>
  <TablePagination
    component="div"
    count={filtered.length}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[10, 20, 50]}
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

            </Box>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
