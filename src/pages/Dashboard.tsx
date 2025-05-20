// import React, { useState } from 'react'
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   ToggleButtonGroup,
//   ToggleButton,
//   TextField,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Button
// } from '@mui/material'
// import ContentCopyIcon from '@mui/icons-material/ContentCopy'
// import MainLayout from '../layouts/MainLayout'

// export default function Dashboard() {
//   const [selectedProject, setSelectedProject] = useState('RRB')
//   const [todayCount] = useState(35)
//   const [statusFilter, setStatusFilter] = useState('')
//   const [dateRange, setDateRange] = useState<'today'|'week'|'month'|'year'|'all'>('week')

//   const stats = [
//     { label: 'Completed Activities',   value: 34 },
//     { label: 'Pending Activities',     value: 23 },
//     { label: 'In-Progress Activities', value: 9  },
//     { label: 'Failed Activities',      value: 3  },
//     { label: 'Rescheduled Activities', value: 0  },
//   ]

//   const dummyData = Array.from({ length: 6 }, (_, i) => ({
//     srNo: i + 1,
//     date: '07-Feb-2025',
//     project: 'Project X',
//     ticketNo: '1231',
//     activity: 'Development',
//     state: 'California',
//     city: 'Los Angeles',
//     siteName: `Site ${i + 1}`,
//     pm: 'John Doe',
//     vendorName: 'Vendor A',
//     feName: 'Jane Smith',
//     feContact: '123-456-7890',
//     nocEngineer: 'NOC Eng',
//     remarks: 'All good',
//     status: ['Pending','In Progress','Completed'][i % 3],
//     update: (
//       <Button
//         variant="contained"
//         size="small"
//         sx={{
//           backgroundColor: '#FFC000',
//           color: 'white',
//           textTransform: 'none',
//           fontSize: 12,
//           px: 1.5,
//           py: 0.5,
//           minWidth: 80,
//           '&:hover': {
//             backgroundColor: '#D4A420',
//           },
//         }}
//       >
//         Update
//       </Button>
//     ),
//   }));

//   return (
//     <MainLayout title="Dashboard">

//       {/* ─── Top row: two cards ─── */}
//       <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>

//         {/* Card #1 */}
//         <Box sx={{ flex: '1 1 calc(5% - 50px)', minWidth: 240 }}>
//           <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
//             <CardContent sx={{ display: 'flex', alignItems: 'center', py: 0.4, px: 2, gap: 1 }}>
//               <Typography color="white" fontWeight={600} fontSize={16}>
//                 Project – {selectedProject}
//               </Typography>
//               <IconButton size="small" sx={{ color: '#888' }}>
//                 <ContentCopyIcon fontSize="small" />
//               </IconButton>
//             </CardContent>
//             <Divider sx={{ bgcolor: '#333' }} />
//             <CardContent sx={{ py: 0.9, px: 2 }}>
//               <Typography color="#F4C430" fontWeight={600} fontSize={14}>
//                 Today’s Activities – {todayCount}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Box>

//         {/* Card #2 */}
//         <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: 240 }}>
//           <Card sx={{ 
//             bgcolor: '#1C1C1E', 
//             borderRadius: 2 
//             }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 overflowX: 'auto',
//                 py: 2.8,
//                 px: 2,
//                 gap: 1,
//                 '&::-webkit-scrollbar': { height: '6px' },
//                 '&::-webkit-scrollbar-thumb': {
//                   background: '#333',
//                   borderRadius: '3px',
//                 },
//               }}
//             >
//               {stats.map((s, i) => (
//                 <React.Fragment key={s.label}>
//                   <Box sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       color: '#fff',
//                       whiteSpace: 'nowrap',
//                     }}>
//                     <Typography variant="body2" sx={{ mb: 0.5 }}>
//                       {s.label}
//                     </Typography>
//                     <Typography fontWeight={600} fontSize={14}>
//                       ({s.value})
//                     </Typography>
//                   </Box>
//                   {i < stats.length - 1 && (
//                     <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333', mx: 0.2 }} />
//                   )}
//                 </React.Fragment>
//               ))}
//             </Box>
//           </Card>
//         </Box>

//       </Box>


//       {/* ─── Bottom: full‐height card with table ─── */}

//       <Box sx={{ 
//         px: 2, 
//         pb: 3, 
//         flexGrow: 1, 
//         display: 'flex', 
//         flexDirection: 'column',
//         height: 'calc(100vh - 180px)' // Add fixed height for parent container
//         }}>

//         <Card
//           sx={{
//             bgcolor: '#1C1C1E',
//             height: '100%',
//             borderRadius: 2,
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <CardContent
//             sx={{
//               pb: 0,
//               pt: 2,
//               flex: 1,
//               display: 'flex',
//               flexDirection: 'column',
//               overflow: 'hidden', // Keep this to contain child elements
//             }}

          
//           >
//             {/* header + controls */}

//             <Box sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               flexWrap: 'wrap',
//               gap: 2,
//               pl: 1
//             }}>
//               <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
//                 Activities
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                 <TextField
//                   size="small"
//                   placeholder="Search..."
//                   variant="outlined"
//                   sx={{
//                     width: 200,
//                     bgcolor: '#1C1C1E',
//                     '& .MuiOutlinedInput-notchedOutline': {
//                       border: '1px solid #333',
//                       borderRadius: 1
//                     },
//                     '& .MuiOutlinedInput-root': { height: 32 },
//                     '& .MuiOutlinedInput-input': {
//                       color: '#fff', py: '4px', fontSize: 12
//                     }
//                   }}
//                 />
//                 <FormControl size="small" sx={{ minWidth: 120 }}>
//                   <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Project</InputLabel>
//                   <Select
//                     value={selectedProject}
//                     label="Project"
//                     onChange={(e) => setSelectedProject(e.target.value)}
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
//                     MenuProps={{
//                     PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } }
//                   }}
//                   >
//                     <MenuItem value="RRB">RRB</MenuItem>
//                     <MenuItem value="CBI">CBI</MenuItem>
//                     <MenuItem value="Nelco">Nelco</MenuItem>
//                     <MenuItem value="TCTS">TCTS</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <FormControl size="small" sx={{ minWidth: 120 }}>
//                   <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Status</InputLabel>
//                   <Select
//                     value={statusFilter}
//                     label="Status"
//                     onChange={(e) => setStatusFilter(e.target.value)}
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
//                     MenuProps={{
//                     PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } }
//                   }}
//                   >
//                     <MenuItem value="Completed">Completed</MenuItem>
//                     <MenuItem value="In progress">In Progress</MenuItem>
//                     <MenuItem value="Closed">Closed</MenuItem>
//                     <MenuItem value="Failed">Failed</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <ToggleButtonGroup
//                   value={dateRange}
//                   exclusive
//                   onChange={(_, v) => v && setDateRange(v)}
//                   size="small"
//                   sx={{
//                     bgcolor: '#242424',
//                     border: '1px solid #333',
//                     borderRadius: 1,
//                     py: 0.2,
//                     px: 0.2,
//                     '& .MuiToggleButton-root': {
//                       textTransform: 'none',
//                       fontSize: 12,
//                       color: '#888',
//                       border: 'none',
//                       minWidth: 56,
//                       height: 26,
//                       px: 1,
//                       '&:hover': { bgcolor: '#333' },
//                     },
//                     '& .MuiToggleButton-root.Mui-selected': {
//                       bgcolor: '#000',
//                       color: '#22C55E',
//                     },
//                   }}
//                 >
//                   <ToggleButton value="today">TODAY</ToggleButton>
//                   <ToggleButton value="week">WEEK</ToggleButton>
//                   <ToggleButton value="month">MONTH</ToggleButton>
//                   <ToggleButton value="year">YEAR</ToggleButton>
//                   <ToggleButton value="all">ALL</ToggleButton>
//                 </ToggleButtonGroup>
//               </Box>
//             </Box>

//             <Divider sx={{ bgcolor: '#333', my: 1.4 }} />

//       {/* ─── scrollable table ─── */}
  
//       <TableContainer
//         sx={{
//           flex: 1,
//           backgroundColor: '#1C1C1E',
//           overflowX: 'auto',
//           overflowY: 'auto',
//           maxHeight: 'calc(100vh - 250px)', // Fixed height with vertical scroll
//           // borderRadius: '8px', 
//           '&::-webkit-scrollbar': {
//             width: '6px',
//             height: '6px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#333',
//             borderRadius: '3px',
//           },
//         }}
//       >
//         <Table stickyHeader sx={{ 
//           minWidth: 1400, 
          
//           }}>

          
// <TableHead>
//   <TableRow>
//     {[
//       'Sr No','Date','Project','Ticket No','Activity',
//       'State','City','Site Name','PM','Vendor Name',
//       'FE Name','FE Contact No','NOC Engineer','Remarks',
//       'Status','Update',
//     ].map((col, index) => (
//       <TableCell
//         key={col}
//         sx={{
//           color: '#fff',
//           backgroundColor: '#0F0F0F',
//           borderBottom: '1px solid #333',
//           fontSize: 12,
//           whiteSpace: 'nowrap',
//           borderTopLeftRadius: index === 0 ? '3px' : '0',
//           borderTopRightRadius: index === 15 ? '3px' : '0',
//           // Add these properties
//           padding: '12px 16px', // Match body cell padding
//           textAlign: 'center', // Explicit alignment
//           minWidth: index === 0 ? '60px' : 'auto', // Prevent column shrinking
//         }}
//       >
//         {col}
//       </TableCell>
//     ))}
//   </TableRow>
// </TableHead>


// <TableBody>
//   {dummyData.map((row) => (
//     <TableRow key={row.srNo} hover>
//       {Object.entries(row).map(([key, val]) => (
//         <TableCell
//           key={key}
//           sx={{
//             color: key === 'status' ? '#22C55E' : '#fff',
//             borderBottom: '1px solid #333',
//             fontSize: 12,

//              // Add these properties
//           padding: '12px 16px', // Match header padding
//           textAlign: 'center', // Match header alignment
//           whiteSpace: 'nowrap', // Prevent text wrapping
//           verticalAlign: 'middle', // Vertical centering
//             // Add this conditional for button cell
//             ...(key === 'update' && {
//               py: 0, // Reduce padding since button has its own
//               px:1,
//                 '& .MuiButton-root': {
//                 color: '#000'    // override the text colour to black
//               }
//             }),
//           }}
//         >
//           {key === 'update' ? (
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center' }}>
//               {val}
//             </Box>
//           ) : (
//             val
//           )}
//         </TableCell>
//       ))}
//     </TableRow>
//   ))}
// </TableBody>
//         </Table>
//       </TableContainer>
 

//           </CardContent>
//         </Card>
//       </Box>
//     </MainLayout>
//   )
// }


// src/pages/Dashboard.tsx
import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MainLayout from '../layouts/MainLayout'

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState('RRB')
  const [todayCount] = useState(35)
  const [statusFilter, setStatusFilter] = useState('')
  const [dateRange, setDateRange] = useState<'today'|'week'|'month'|'year'|'all'>('week')

  const stats = [
    { label: 'Completed Activities',   value: 34 },
    { label: 'Pending Activities',     value: 23 },
    { label: 'In-Progress Activities', value: 9  },
    { label: 'Failed Activities',      value: 3  },
    { label: 'Rescheduled Activities', value: 0  },
  ]

  // now matching your Add Ticket form fields:
  const dummyData = Array.from({ length: 6 }, (_, i) => ({
    srNo:        i + 1,
    ticketNo:    `T-100${i+1}`,
    date:        '2025-07-0' + (i+1),
    project:     `Project ${String.fromCharCode(65+i)}`,
    category:    ['Inspection','Maintenance','Repair','Inspection','Maintenance','Repair'][i],
    state:       ['CA','TX','NY','CA','TX','NY'][i],
    district:    ['North','East','South','West','North','East'][i],
    city:        ['Los Angeles','Houston','New York','San Diego','Austin','Buffalo'][i],
    address:     `${100+i} Main St`,
    branch:      ['Branch A','Branch B','Branch C','Branch A','Branch B','Branch C'][i],
    bcode:       `B-00${i+1}`,
    manager:     ['John Doe','Jane Roe','Jim Boe','John Doe','Jane Roe','Jim Boe'][i],
    vendor:      ['Vendor A','Vendor B','Vendor C','Vendor A','Vendor B','Vendor C'][i],
    feName:      ['Jane Smith','Bob Lee','Alice Kim','Jane Smith','Bob Lee','Alice Kim'][i],
    feMobile:    ['123-456-7890','234-567-8901','345-678-9012','123-456-7890','234-567-8901','345-678-9012'][i],
    noc:         ['NOC Eng','NOC Eng','NOC Eng','NOC Eng','NOC Eng','NOC Eng'][i],
    remarks:     ['All good','Check OK','Revisit','All good','Check OK','Revisit'][i],
    status:      ['Pending','In Progress','Completed','Canceled','Pending','In Progress'][i],
    update: (
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: '#FFC000',
          color: 'white',
          textTransform: 'none',
          fontSize: 12,
          px: 1.5,
          py: 0.5,
          minWidth: 80,
          '&:hover': { backgroundColor: '#D4A420' }
        }}
      >
        Update
      </Button>
    ),
  }))

  return (
    <MainLayout title="Dashboard">

      {/* ─── Top row: two cards ─── */}
      <Box sx={{ p:2, display:'flex', gap:2, flexWrap:'wrap' }}>

        {/* Card #1 */}
        <Box sx={{ flex:'1 1 calc(5% - 50px)', minWidth:240 }}>
          <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2 }}>
            <CardContent sx={{ display:'flex', alignItems:'center', py:0.4, px:2, gap:1 }}>
              <Typography color="white" fontWeight={600} fontSize={16}>
                Project – {selectedProject}
              </Typography>
              <IconButton size="small" sx={{ color:'#888' }}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </CardContent>
            <Divider sx={{ bgcolor:'#333' }} />
            <CardContent sx={{ py:0.9, px:2 }}>
              <Typography color="#F4C430" fontWeight={600} fontSize={14}>
                Today’s Activities – {todayCount}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Card #2 */}
        <Box sx={{ flex:'1 1 calc(50% - 16px)', minWidth:240 }}>
          <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2 }}>
            <Box
              sx={{
                display:'flex',
                overflowX:'auto',
                py:2.8,
                px:2,
                gap:1,
                '&::-webkit-scrollbar': { height:'6px' },
                '&::-webkit-scrollbar-thumb': {
                  background:'#333',
                  borderRadius:'3px'
                },
              }}
            >
              {stats.map((s,i) => (
                <React.Fragment key={s.label}>
                  <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', color:'#fff', whiteSpace:'nowrap' }}>
                    <Typography variant="body2" sx={{ mb:0.5 }}>{s.label}</Typography>
                    <Typography fontWeight={600} fontSize={14}>({s.value})</Typography>
                  </Box>
                  {i < stats.length-1 && (
                    <Divider orientation="vertical" flexItem sx={{ bgcolor:'#333', mx:0.2 }} />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Card>
        </Box>

      </Box>


      {/* ─── Bottom: full‐height card with table ─── */}
      <Box sx={{
        px:2,
        pb:3,
        flexGrow:1,
        display:'flex',
        flexDirection:'column',
        height:'calc(100vh - 180px)'
      }}>

        <Card sx={{
          bgcolor:'#1C1C1E',
          height:'100%',
          borderRadius:2,
          display:'flex',
          flexDirection:'column'
        }}>
          <CardContent sx={{
            pb:0,
            pt:2,
            flex:1,
            display:'flex',
            flexDirection:'column',
            overflow:'hidden'
          }}>

            {/* header + controls */}
            <Box sx={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              flexWrap:'wrap',
              gap:2,
              pl:1
            }}>
              <Typography sx={{ color:'#fff', fontSize:18, fontWeight:600 }}>
                Activities
              </Typography>
              <Box sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  sx={{
                    width:200,
                    bgcolor:'#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline': { border:'1px solid #333', borderRadius:1 },
                    '& .MuiOutlinedInput-root': { height:32 },
                    '& .MuiOutlinedInput-input': { color:'#fff', py:'4px', fontSize:12 }
                  }}
                />
                <FormControl size="small" sx={{ minWidth:120 }}>
                  <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Project</InputLabel>
                  <Select
                    value={selectedProject}
                    label="Project"
                    onChange={e => setSelectedProject(e.target.value)}
                    sx={{
                      bgcolor:'#1C1C1E',
                      color:'#fff',
                      border:'1px solid #333',
                      borderRadius:1,
                      height:32,
                      fontSize:12,
                      '& .MuiSelect-select': { py:0.5, px:1 },
                      '& .MuiSelect-icon': { color:'#888', fontSize:16 }
                    }}
                    MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' }}}}
                  >
                    <MenuItem value="RRB">RRB</MenuItem>
                    <MenuItem value="CBI">CBI</MenuItem>
                    <MenuItem value="Nelco">Nelco</MenuItem>
                    <MenuItem value="TCTS">TCTS</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth:120 }}>
                  <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={e => setStatusFilter(e.target.value)}
                    sx={{
                      bgcolor:'#1C1C1E',
                      color:'#fff',
                      border:'1px solid #333',
                      borderRadius:1,
                      height:32,
                      fontSize:12,
                      '& .MuiSelect-select': { py:0.5, px:1 },
                      '& .MuiSelect-icon': { color:'#888', fontSize:16 }
                    }}
                    MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' }}}}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>

                <ToggleButtonGroup
                  value={dateRange}
                  exclusive
                  onChange={(_, v) => v && setDateRange(v)}
                  size="small"
                  sx={{
                    bgcolor: '#242424',
                    border: '1px solid #333',
                    borderRadius: 1,
                    py: 0.2,
                    px: 0.2,
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      fontSize: 12,
                      color: '#888',
                      border: 'none',
                      minWidth: 56,
                      height: 26,
                      px: 1,
                      '&:hover': { bgcolor: '#333' },
                    },
                    '& .MuiToggleButton-root.Mui-selected': {
                      bgcolor: '#000',
                      color: '#22C55E',
                    },
                  }}
                >
                  <ToggleButton value="today">TODAY</ToggleButton>
                  <ToggleButton value="week">WEEK</ToggleButton>
                  <ToggleButton value="month">MONTH</ToggleButton>
                  <ToggleButton value="year">YEAR</ToggleButton>
                  <ToggleButton value="all">ALL</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <Divider sx={{ bgcolor:'#333', my:1.4 }} />

            {/* ─── scrollable table ─── */}
            <TableContainer
              sx={{
                flex:1,
                backgroundColor:'#1C1C1E',
                overflowX:'auto',
                overflowY:'auto',
                '&::-webkit-scrollbar': { width:'6px', height:'6px' },
                '&::-webkit-scrollbar-thumb': { background:'#333', borderRadius:'3px' }
              }}
            >
              <Table stickyHeader sx={{ minWidth: 1800 }}>
                <TableHead>
                  <TableRow>
                    {[
                      'Sr No','Ticket No','Date','Project','Activity','State',
                      'District','City','Address','Branch Name','Branch Code',
                      'Project Manager','Vendor','FE Name','FE Mobile',
                      'NOC Engineer','Remarks','Status','Update'
                    ].map((col, idx) => (
                      <TableCell
                        key={col}
                        sx={{
                          color:'#fff',
                          backgroundColor:'#0F0F0F',
                          borderBottom:'1px solid #333',
                          fontSize:12,
                          whiteSpace:'nowrap',
                          padding:'12px 16px',
                          textAlign:'center',
                          borderTopLeftRadius:  idx===0 ? 3:0,
                          borderTopRightRadius: idx===18? 3:0
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dummyData.map(row => (
                    <TableRow key={row.srNo} hover>
                      {[
                        row.srNo,
                        row.ticketNo,
                        row.date,
                        row.project,
                        row.category,
                        row.state,
                        row.district,
                        row.city,
                        row.address,
                        row.branch,
                        row.bcode,
                        row.manager,
                        row.vendor,
                        row.feName,
                        row.feMobile,
                        row.noc,
                        row.remarks,
                        row.status,
                        row.update
                      ].map((cell, i) => (
                        <TableCell
                          key={i}
                          sx={{
                            color: i===17 ? '#22C55E' : '#E0E0E0',
                            borderBottom:'1px solid #333',
                            fontSize:12,
                            whiteSpace:'nowrap',
                            padding:'12px 16px',
                            textAlign:'center',
                            verticalAlign:'middle',
                            ...(i===18 && 
                              {
                                 padding:'0 8px' ,
                                
                '& .MuiButton-root': {
                color: '#000'    
              }
                                 
                                
                                })
                          }}
                        >
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
    </MainLayout>
  )
}
