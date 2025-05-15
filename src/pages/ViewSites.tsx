import React, { useState, useMemo } from 'react';
import MainLayout from '../layouts/MainLayout';
import {
  Box, Card, CardContent, Typography, Divider,
  FormControl, InputLabel, Select, MenuItem,
  TextField, Button, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody,
  Snackbar, Alert
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UpdateSiteModal, { SiteRow } from '../components/UpdateSiteModal';

export default function ViewSites() {
  const [rows, setRows] = useState<SiteRow[]>([
    { id:1, project:'Alpha', siteName:'Site A', siteId:'A001', address:'123 Main St', pincode:'110001', poc:'John Doe', state:'CA', district:'North' },
    { id:2, project:'Beta',  siteName:'Site B', siteId:'B002', address:'456 Oak Ave', pincode:'220002', poc:'Jane Roe', state:'TX', district:'East' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
     { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:3, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
    { id:24, project:'Gamma', siteName:'Site C', siteId:'C003', address:'789 Pine Rd', pincode:'330003', poc:'Jim Boe', state:'NY', district:'West' },
   
  ]);
  const [filterProj, setFilterProj] = useState('');
  const [search, setSearch]         = useState('');
  const [exportToast, setExportToast] = useState(false);

  // for update/delete modal
  const [editing, setEditing] = useState<SiteRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionToast, setActionToast] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const displayed = useMemo(() =>
    rows
      .filter(r => filterProj ? r.project === filterProj : true)
      .filter(r => r.siteName.toLowerCase().includes(search.toLowerCase()))
  , [rows, filterProj, search]);

  const handleExport = () => setExportToast(true);

  const handleUpdate = (updated: SiteRow) => {
    setRows(rs => rs.map(r => r.id === updated.id ? updated : r));
    setActionMsg('Site updated successfully');
    setActionToast(true);
  };
  const handleDelete = (id: number) => {
    setRows(rs => rs.filter(r => r.id !== id));
    setActionMsg('Site deleted successfully');
    setActionToast(true);
  };

  return (
    <MainLayout title="Project Sites" showRightPanel={false}>
      <Box sx={{ pt:2, px:2 }}>
        <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2, height:'calc(100vh - 77px)', overflow:'hidden' }}>
          <CardContent sx={{ px:2, py:1.5 }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:2 }}>
              <Typography sx={{ color:'#fff', fontSize:18, fontWeight:600 }}>Sites List</Typography>
              <Box sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>
                <FormControl size="small" sx={{ minWidth:120 }}>
                  <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Project</InputLabel>
                  <Select
                    value={filterProj}
                    onChange={e => setFilterProj(e.target.value)}
                    sx={{
                      bgcolor:'#1C1C1E', color:'#fff',
                      border:'1px solid #333', borderRadius:1,
                      height:32, fontSize:12,
                      '& .MuiSelect-select':{ py:0.5, px:1 },
                      '& .MuiSelect-icon':{ color:'#888', fontSize:16 }
                    }}
                    MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Alpha">Alpha</MenuItem>
                    <MenuItem value="Beta">Beta</MenuItem>
                    <MenuItem value="Gamma">Gamma</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{
                    width:200,
                    bgcolor:'#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline':{ border:'1px solid #333', borderRadius:1 },
                    '& .MuiOutlinedInput-root':{ height:32 },
                    '& .MuiOutlinedInput-input':{ color:'#fff', py:'4px', fontSize:12 }
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    bgcolor:'#22C55E',
                    height:32,
                    color:'#fff',
                    textTransform:'none',
                    '&:hover':{ bgcolor:'#16A34A' }
                  }}
                >
                  Export
                </Button>
              </Box>
            </Box>

            <Divider sx={{ borderColor:'#333', my:1 }} />

            <TableContainer sx={{
              flex:1,
              overflowY:'auto',
              '&::-webkit-scrollbar':{ width:6 },
              '&::-webkit-scrollbar-thumb':{ background:'#333', borderRadius:3 }
            }}>
              <Table stickyHeader sx={{ minWidth:920 }}>
                <TableHead>
                  <TableRow>
                    {[
                      'Sr No','Project','Site Name','Site ID','Address',
                      'Pincode','POC','State','District','Update'
                    ].map((col,i)=>
                      <TableCell
                        key={col}
                        sx={{
                          color:'#fff', backgroundColor:'#0F0F0F',
                          borderBottom:'1px solid #333',
                          fontSize:12, textAlign:'center',
                          px:2, py:1.5,
                          borderTopLeftRadius:  i===0?'8px':0,
                          borderTopRightRadius:i===9?'8px':0
                        }}
                      >
                        {col}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayed.map(r=>(
                    <TableRow key={r.id} hover>
                      {[
                        r.id,r.project,r.siteName,r.siteId,r.address,
                        r.pincode,r.poc,r.state,r.district,
                        <Button
                          size="small" variant="outlined"
                          onClick={() => { setEditing(r); setModalOpen(true); }}
                          sx={{
                            color:'#fff', borderColor:'#555',
                            textTransform:'none',
                            '&:hover':{ borderColor:'#777' }
                          }}
                        >
                          Update
                        </Button>
                      ].map((cell,idx)=>
                        <TableCell
                          key={idx}
                          sx={{
                            color:'#E0E0E0',
                            borderBottom:'1px solid #333',
                            fontSize:12, textAlign:'center',
                            px:2, py:1.5
                          }}
                        >
                          {cell}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Export toast */}
      <Snackbar
        open={exportToast}
        autoHideDuration={2000}
        onClose={() => setExportToast(false)}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={() => setExportToast(false)}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          Sites exported successfully
        </Alert>
      </Snackbar>

      {/* Update/Delete toast */}
      <Snackbar
        open={actionToast}
        autoHideDuration={2000}
        onClose={() => setActionToast(false)}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={() => setActionToast(false)}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          {actionMsg}
        </Alert>
      </Snackbar>

      {/* Edit modal */}
      <UpdateSiteModal
        open={modalOpen}
        row={editing}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

