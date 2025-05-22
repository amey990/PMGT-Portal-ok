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
  Button,
  IconButton,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert
} from '@mui/material';
import type { SnackbarCloseReason } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import UpdateInventoryModal, { InventoryRow } from '../components/UpdateInventoryModal';

export default function Inventory() {
  // ─── Top form state ───────────────────────────────
  const [project, setProject]     = useState('');
  const [site, setSite]           = useState('');
  const [docType, setDocType]     = useState('');
  const [files, setFiles]         = useState<(File | null)[]>([null, null, null, null]);

  // ─── Table data + filters + toast + modal ────────
  const [rows, setRows]           = useState<InventoryRow[]>([
    { id: 1, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Signoff Report', fileName: 'alpha_signoff.pdf' },
    { id: 2, date: '07/06/2025', project: 'Beta',  site: 'Site B', docType: 'HLD',            fileName: 'beta_hld.docx' },
    { id: 3, date: '07/06/2025', project: 'Gamma', site: 'Site C', docType: 'LLD',            fileName: 'gamma_lld.docx' },
    { id: 4, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id: 5, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id: 6, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id: 7, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:20, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
      { id: 8, date: '07/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },
    { id:50, date: '11/06/2025', project: 'Alpha', site: 'Site A', docType: 'Project Plan',  fileName: 'alpha_plan.xlsx' },

  ]);
  const [filterProj, setFilterProj]     = useState('');
  const [search, setSearch]             = useState('');
  const [toastOpen, setToastOpen]       = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [modalRow, setModalRow]         = useState<InventoryRow | null>(null);

  // ─── File pickers ─────────────────────────────────
  const handleSelectFile = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFiles(fs => { const c=[...fs]; c[i]=f; return c; });
  };
  const handleClearFile = (i: number) => () =>
    setFiles(fs => { const c=[...fs]; c[i]=null; return c; });

  // ─── Upload: one row per chosen file ─────────────
  const handleUpload = () => {
    const today = new Date().toLocaleDateString('en-GB');
    let nextId = rows.length + 1;
    const newRows: InventoryRow[] = [];
    files.forEach(f => {
      if (f) {
        newRows.push({
          id:       nextId++,
          date:     today,
          project,
          site,
          docType,
          fileName: f.name,
        });
      }
    });
    if (newRows.length) {
      setRows(r => [...newRows, ...r]);
      setProject(''); setSite(''); setDocType(''); setFiles([null,null,null,null]);
      setToastMessage('Files uploaded successfully');
      setToastOpen(true);
    }
  };

  // ─── Handle download click ───────────────────────
  const handleDownload = (fileName: string) => {
    // TODO: actually trigger download logic here
    setToastMessage(`File downloaded successfully`);
    setToastOpen(true);
  };

  // ─── Filter + search ─────────────────────────────
  const displayed = useMemo(() =>
    rows
      .filter(r => filterProj ? r.project === filterProj : true)
      .filter(r => r.fileName.toLowerCase().includes(search.toLowerCase()))
  , [rows, filterProj, search]);

  // ─── Toast close handler ──────────────────────────
  const handleCloseToast = (
    _e: React.SyntheticEvent<any> | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason==='clickaway') return;
    setToastOpen(false);
  };

  // ─── Modal callbacks ─────────────────────────────
  const handleModalUpdate = (updated: InventoryRow) => {
    setRows(rs => rs.map(r => r.id===updated.id ? updated : r));
    setModalRow(null);
    setToastMessage('Inventory updated successfully');
    setToastOpen(true);
  };
  const handleModalDelete = (id: number) => {
    setRows(rs => rs.filter(r => r.id!==id));
    setModalRow(null);
    setToastMessage('Inventory deleted successfully');
    setToastOpen(true);
  };

  return (
    <MainLayout title="Inventory" showRightPanel={false}>
      <Box sx={{ pt:2, px:2 }}>

        {/* ─── Upload Files Card ─────────────────────── */}
        <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2, mb:1 }}>
          <CardContent sx={{ py:2 }}>
            <Typography sx={{ color:'#fff', fontSize:18, fontWeight:600 }}>
              Upload Files
            </Typography>
            <Divider sx={{ borderColor:'#333', my:1 }} />

            <Box component="form" sx={{
              display:'flex', alignItems:'center', gap:2, flexWrap:'wrap'
            }}>
              {/* Project */}
              <FormControl size="small" sx={{ minWidth:140, bgcolor:'#28282B', borderRadius:1 }}>
                <InputLabel sx={{ color:'#aaa' }}>Project</InputLabel>
                <Select
                  value={project}
                  label="Project"
                  onChange={e=>setProject(e.target.value)}
                  sx={{ color:'#fff' }}
                  MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff'} } }}
                >
                  <MenuItem value="Alpha">Alpha</MenuItem>
                  <MenuItem value="Beta">Beta</MenuItem>
                  <MenuItem value="Gamma">Gamma</MenuItem>
                </Select>
              </FormControl>

              {/* Site */}
              <FormControl size="small" sx={{ minWidth:140, bgcolor:'#28282B', borderRadius:1 }}>
                <InputLabel sx={{ color:'#aaa' }}>Site</InputLabel>
                <Select
                  value={site}
                  label="Site"
                  onChange={e=>setSite(e.target.value)}
                  sx={{ color:'#fff' }}
                  MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff'} } }}
                >
                  <MenuItem value="Site A">Site A</MenuItem>
                  <MenuItem value="Site B">Site B</MenuItem>
                  <MenuItem value="Site C">Site C</MenuItem>
                </Select>
              </FormControl>

              {/* Doc Type */}
              <FormControl size="small" sx={{ minWidth:160, bgcolor:'#28282B', borderRadius:1 }}>
                <InputLabel sx={{ color:'#aaa' }}>Document Type</InputLabel>
                <Select
                  value={docType}
                  label="Document Type"
                  onChange={e=>setDocType(e.target.value)}
                  sx={{ color:'#fff' }}
                  MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff'} } }}
                >
                  <MenuItem value="Signoff Report">Signoff Report</MenuItem>
                  <MenuItem value="HLD">HLD</MenuItem>
                  <MenuItem value="LLD">LLD</MenuItem>
                  <MenuItem value="Project Plan">Project Plan</MenuItem>
                </Select>
              </FormControl>

              {/* Four file pickers */}
              {files.map((f, idx) => (
                <Box key={idx} sx={{ position:'relative', flex:'1 1 120px', minWidth:120 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width:'100%',
                      bgcolor:'#28282B',
                      color: f?'#FFD700':'#888',
                      borderColor:'#333',
                      textTransform:'none',
                      px:1, py:0.6,
                      justifyContent:'space-between',
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      '&:hover':{ borderColor:'#555' },
                    }}
                  >
                    {f?f.name:'Choose File'}
                    <input type="file" hidden onChange={handleSelectFile(idx)} />
                  </Button>
                  {f && (
                    <IconButton
                      size="small"
                      onClick={handleClearFile(idx)}
                      sx={{
                        position:'absolute', top:-6, right:-6,
                        bgcolor:'#333', color:'#fff', p:0.3,
                        '&:hover':{ bgcolor:'#555' }
                      }}
                    >
                      <CloseIcon fontSize="small"/>
                    </IconButton>
                  )}
                </Box>
              ))}

              <Button
                variant="contained"
                onClick={handleUpload}
                sx={{
                  bgcolor:'#FFC300', color:'#000', textTransform:'none',
                  px:3, py:0.6, '&:hover':{ bgcolor:'#D4A420'}
                }}
              >
                Upload
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* ─── Inventory Table Card ──────────────────── */}
        <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2, height:'calc(100vh - 210px)' }}>
          <CardContent sx={{
            px:1.6, pt:2, pb:0,
            display:'flex', flexDirection:'column', height:'100%'
          }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <Typography sx={{ color:'#fff', fontSize:18, fontWeight:600 }}>
                Inventory
              </Typography>
              <Box sx={{ display:'flex', gap:2 }}>
                <FormControl size="small" sx={{ minWidth:120 }}>
                  <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Select project</InputLabel>
                  <Select
                    value={filterProj}
                    onChange={e=>setFilterProj(e.target.value)}
                    sx={{
                      bgcolor:'#1C1C1E', color:'#fff',
                      border:'1px solid #333', borderRadius:1,
                      height:32, fontSize:12,
                      '& .MuiSelect-select':{py:0.5,px:1},
                      '& .MuiSelect-icon':{ color:'#888', fontSize:16 }
                    }}
                    MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff'} } }}
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
                  onChange={e=>setSearch(e.target.value)}
                  sx={{
                    width:200,
                    bgcolor:'#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline':{ border:'1px solid #333', borderRadius:1 },
                    '& .MuiOutlinedInput-root':{ height:32 },
                    '& .MuiOutlinedInput-input':{ color:'#fff', py:'4px', fontSize:12 }
                  }}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor:'#333', my:1.5 }} />

            <TableContainer sx={{
              flex:1,
              overflowY:'auto',
              pb:2,                                   // padding so last row isn’t flush
              '&::-webkit-scrollbar':{ width:6 },
              '&::-webkit-scrollbar-thumb':{ background:'#333', borderRadius:3 },
            }}>
              <Table stickyHeader sx={{ minWidth:900 }}>
                <TableHead>
                  <TableRow>
                    {[
                      'Sr No','Date','Project','Site','Doc Type','File','Download','Update'
                    ].map((col,i)=>(
                      <TableCell
                        key={col}
                        sx={{
                          color:'#fff',
                          backgroundColor:'#0F0F0F',
                          borderBottom:'1px solid #333',
                          fontSize:12,
                          whiteSpace:'nowrap',
                          textAlign:'center',
                          px:2, py:1.5,
                          borderTopLeftRadius:  i===0? '8px' : 0,
                          borderTopRightRadius: i===7? '8px' : 0,
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayed.map(r=>(
                    <TableRow key={r.id} hover>
                      {[
                        r.id,
                        r.date,
                        r.project,
                        r.site,
                        r.docType,
                        r.fileName,
                        <IconButton
                          size="small"
                          onClick={()=>handleDownload(r.fileName)}
                          sx={{ color:'#FFC300' }}
                        >
                          <DownloadIcon/>
                        </IconButton>,
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={()=>setModalRow(r)}
                          sx={{
                            color:'#fff',
                            borderColor:'#555',
                            textTransform:'none',
                            '&:hover':{borderColor:'#777'}
                          }}
                        >
                          Update
                        </Button>
                      ].map((cell,idx)=>(
                        <TableCell
                          key={idx}
                          sx={{
                            color:'#E0E0E0',
                            borderBottom:'1px solid #333',
                            fontSize:12,
                            textAlign:'center',
                            px:2, py:1.5,
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

      {/* Update Modal */}
      <UpdateInventoryModal
        open={!!modalRow}
        row={modalRow}
        onClose={()=>setModalRow(null)}
        onUpdate={handleModalUpdate}
        onDelete={handleModalDelete}
      />

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={()=>setToastOpen(false)}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

