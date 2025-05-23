// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import MainLayout from '../../layouts/MainLayout'
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Snackbar,
//   Alert,
// } from '@mui/material'

// export default function Generate_PA() {
//   const navigate = useNavigate()

//   const readonlyData = {
//     projectName: 'Gamma',
//     siteName: 'I&C Raipur Territory',
//     siteCode: 'S-203',
//     state: 'Chhattisgarh',
//     vendor: 'Vendor Z',
//     feName: 'Carol Ng',
//     completionDate: '2025-05-10',
//     paDate: '2025-05-23',
//   }

//   const [tableData, setTableData] = useState([
//     { description: '', quantity: '', unitPrice: '' },
//   ])
//   const [toastOpen, setToastOpen] = useState(false)

//   const handleInputChange = (index: number, field: string, value: string) => {
//     const updated = [...tableData]
//     updated[index][field as keyof typeof updated[0]] = value
//     setTableData(updated)
//   }

//   const handleClear = () => {
//     const cleared = tableData.map(() => ({
//       description: '',
//       quantity: '',
//       unitPrice: '',
//     }))
//     setTableData(cleared)
//   }

//   const handleAddRow = () => {
//     setTableData([...tableData, { description: '', quantity: '', unitPrice: '' }])
//   }

//   const handleGeneratePA = () => {
//     setToastOpen(true)
//     setTimeout(() => navigate('/pa-list'), 1200)
//   }

//   return (
//     <MainLayout title="Atlas Accounting" showRightPanel={false}>
//       <Box sx={{ p: 2 }}>
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h5" color="#fff" gutterBottom>
//               Generate PA
//             </Typography>
            
//             {/* Readonly Fields in 2-column Layout */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: 1,
//                 mb: 3,
//               }}
//             >
//               {Object.entries(readonlyData).map(([label, value]) => (
//                 <TextField
//                   key={label}
//                   label={label.replace(/([A-Z])/g, ' $1')}
//                   value={value}
//                   InputProps={{ readOnly: true }}
//                   variant="outlined"
//                   size="small"
//                   sx={{
//                     flex: '1 1 300px',
//                     input: { color: '#fff' },
//                     label: { color: '#aaa' },
//                     '& .MuiOutlinedInput-root': {
//                       bgcolor: '#2A2A2D',
//                       borderRadius: 1,
//                       '& fieldset': { borderColor: '#444' },
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             {/* Button Actions */}
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 onClick={handleClear}
//                 sx={{
//                   color: '#fff',
//                   borderColor: '#555',
//                   textTransform: 'none',
//                   '&:hover': {
//                     borderColor: '#888',
//                     bgcolor: '#2D2D2D',
//                   },
//                 }}
//               >
//                 Clear
//               </Button>
//               <Button
//                 size="small"
//                 variant="contained"
//                 onClick={handleAddRow}
//                 sx={{
//                   bgcolor: '#EF4444',
//                   color: '#fff',
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: '#DC2626' },
//                 }}
//               >
//                 Add More +
//               </Button>
//             </Box>

//             {/* Scrollable Table */}
//             <Box sx={{ maxHeight: 280, overflowY: 'auto', mb: 3 }}>
//               <TableContainer sx={{ bgcolor: '#2A2A2D', borderRadius: 1 }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       {['Site', 'Description', 'Quantity', 'Unit Price'].map(header => (
//                         <TableCell
//                           key={header}
//                           sx={{
//                             color: '#fff',
//                             fontWeight: 600,
//                             fontSize: 13,
//                             borderBottom: '1px solid #444',
//                           }}
//                         >
//                           {header}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {tableData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell sx={{ color: '#ccc' }}>{readonlyData.siteName}</TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={row.description}
//                             onChange={e =>
//                               handleInputChange(index, 'description', e.target.value)
//                             }
//                             size="small"
//                             sx={inputSx}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={row.quantity}
//                             onChange={e => handleInputChange(index, 'quantity', e.target.value)}
//                             size="small"
//                             sx={inputSx}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             fullWidth
//                             value={row.unitPrice}
//                             onChange={e => handleInputChange(index, 'unitPrice', e.target.value)}
//                             size="small"
//                             sx={inputSx}
//                           />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>

//             {/* Generate Button */}
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <Button
//                 variant="contained"
//                 onClick={handleGeneratePA}
//                 sx={{
//                   bgcolor: '#FFC300',
//                   color: '#000',
//                   textTransform: 'none',
//                   px: 3,
//                   '&:hover': {
//                     bgcolor: '#D4A420',
//                   },
//                 }}
//               >
//                 Generate PA
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Toast */}
//       <Snackbar
//         open={toastOpen}
//         autoHideDuration={1200}
//         onClose={() => setToastOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={() => setToastOpen(false)}
//           severity="success"
//           variant="outlined"
//           sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
//         >
//           Purchase Authorization generated
//         </Alert>
//       </Snackbar>
//     </MainLayout>
//   )
// }

// const inputSx = {
//   '& .MuiOutlinedInput-root': {
//     bgcolor: '#1C1C1E',
//     color: '#fff',
//     fontSize: 13,
//     borderRadius: 1,
//     '& fieldset': {
//       borderColor: '#444',
//     },
//   },
//   '& .MuiInputBase-input': {
//     color: '#fff',
//   },
// }


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function Generate_PA() {
  const navigate = useNavigate()

  const readonlyData = {
    projectName: 'Gamma',
    siteName: 'I&C Raipur Territory',
    siteCode: 'S-203',
    state: 'Chhattisgarh',
    vendor: 'Vendor Z',
    feName: 'Carol Ng',
    completionDate: '2025-05-10',
    paDate: '2025-05-23',
  }

  const [tableData, setTableData] = useState([
    { description: '', quantity: '', unitPrice: '' },
  ])
  const [toastOpen, setToastOpen] = useState(false)

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...tableData]
    updated[index][field as keyof typeof updated[0]] = value
    setTableData(updated)
  }

  const handleClear = () => {
    const cleared = tableData.map(() => ({
      description: '',
      quantity: '',
      unitPrice: '',
    }))
    setTableData(cleared)
  }

  const handleAddRow = () => {
    setTableData([...tableData, { description: '', quantity: '', unitPrice: '' }])
  }

  const handleRemoveRow = (index: number) => {
    const updated = [...tableData]
    updated.splice(index, 1)
    setTableData(updated)
  }

  const handleGeneratePA = () => {
    setToastOpen(true)
    setTimeout(() => navigate('/pa-list'), 1200)
  }

  return (
    <MainLayout title="Atlas Accounting" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, height: 'calc(100vh - 90px)' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" color="#fff" gutterBottom>
              Generate PA
            </Typography>
            
            <Divider sx={{ borderColor: '#333', my: 0.1 }} />,
           
            {/* Readonly Fields */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 2,
              }}
            >
              {Object.entries(readonlyData).map(([label, value]) => (
                <TextField
                  key={label}
                  label={label.replace(/([A-Z])/g, ' $1')}
                  value={value}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  size="small"
                  sx={{
                    flex: '1 1 300px',
                    input: { color: '#fff' },
                    label: { color: '#aaa' },
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#2A2A2D',
                      borderRadius: 1,
                      '& fieldset': { borderColor: '#444' },
                    },
                  }}
                />
              ))}
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleClear}
                sx={{
                  color: '#fff',
                  borderColor: '#555',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#888',
                    bgcolor: '#2D2D2D',
                  },
                }}
              >
                Clear
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddRow}
                sx={{
                  bgcolor: '#EF4444',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#DC2626' },
                }}
              >
                Add
              </Button>
            </Box>

            {/* Scrollable Table */}
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
              <TableContainer sx={{ bgcolor: '#2A2A2D', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {['Site', 'Description', 'Quantity', 'Unit Price', ''].map(header => (
                        <TableCell
                          key={header}
                          align="center"
                          sx={{
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: 13,
                            borderBottom: '1px solid #444',
                            // backgroundColor: '#1C1C1E',
                          }}
                        >
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" sx={{ color: '#ccc' }}>
                          {readonlyData.siteName}
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.description}
                            onChange={e =>
                              handleInputChange(index, 'description', e.target.value)
                            }
                            size="small"
                            sx={inputSx}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.quantity}
                            onChange={e =>
                              handleInputChange(index, 'quantity', e.target.value)
                            }
                            size="small"
                            sx={inputSx}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            fullWidth
                            value={row.unitPrice}
                            onChange={e =>
                              handleInputChange(index, 'unitPrice', e.target.value)
                            }
                            size="small"
                            sx={inputSx}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleRemoveRow(index)}
                            sx={{ color: '#f87171' }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Generate Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              pb:4,
              
              }}>
              <Button
                variant="contained"
                onClick={handleGeneratePA}
                sx={{
                  bgcolor: '#FFC300',
                  color: '#000',
                  textTransform: 'none',
                  px: 3,
                  '&:hover': {
                    bgcolor: '#D4A420',
                  },
                }}
              >
                Generate PA
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={1200}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
        >
          Purchase Authorization generated
        </Alert>
      </Snackbar>
    </MainLayout>
  )
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#1C1C1E',
    color: '#fff',
    fontSize: 13,
    borderRadius: 1,
    '& fieldset': {
      borderColor: '#444',
    },
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}
