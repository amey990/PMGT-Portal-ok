// src/pages/ProjectDetails.tsx
import React, { useState } from 'react';
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
  Alert
} from '@mui/material';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// register the pieces we need
ChartJS.register(ArcElement, Tooltip, Legend);

// enable rotate + scale animations
const chartOpts = {
  cutout: '70%',
  maintainAspectRatio: false,
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 800,
    easing: 'easeOutQuart'
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  }
};


// Project-modal
import UpdateProjectModal, { ProjectRow } from '../components/UpdateProjectModal';
// Site-modal
import UpdateSiteModal, { SiteRow } from '../components/UpdateActivityModal';

// register Chart.js pieces
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectDetails() {
  // ─── PROJECT MODAL & TOAST ───
  const [projEditOpen, setProjEditOpen] = useState(false);
  const openProjEdit  = () => setProjEditOpen(true);
  const closeProjEdit = () => setProjEditOpen(false);

  // ─── SITE MODAL & TOAST ───
  const [siteEditOpen, setSiteEditOpen]         = useState(false);
  const [selectedSite, setSelectedSite]         = useState<SiteRow | null>(null);
  const openSiteEdit   = (r: SiteRow) => { setSelectedSite(r); setSiteEditOpen(true); };
  const closeSiteEdit  = () => setSiteEditOpen(false);

  // ─── SHARED TOAST ───
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info';
  }>({ open: false, message: '', severity: 'success' });

  const handleToastClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setToast(t => ({ ...t, open: false }));
  };

  // ─── PROJECT DATA ───
  const project: ProjectRow = {
    id: 1,
    projectName: 'RRB',
    customer: 'Acme Corp',
    projectCode: 'AC-001',
    projectType: 'Implementation',
    projectManager: 'John Doe',
    bdm: 'Bob Smith',
    startDate: '01/07/2025',
    endDate: '31/07/2025',
    amcYear: '1',
    amcMonths: '6'
  };

  // ─── SITE-STATS CHART ───
  const siteStats = { completed:20, failed:5, inProgress:15, canceled:10 };
  const total     = Object.values(siteStats).reduce((a,b)=>a+b, 0);
  const data = {
    labels: ['Completed','Failed','In Progress','Canceled'],
    datasets: [{
      data: [
        siteStats.completed,
        siteStats.failed,
        siteStats.inProgress,
        siteStats.canceled
      ],
      backgroundColor: ['#22C55E','#EF4444','#FBDF3B','#888888'],
      hoverOffset: 4
    }]
  };
  const chartOpts = {
    cutout: '70%',
    maintainAspectRatio: false,
    plugins: { legend: { display:false }}
  };

  // ─── DUMMY SITE ROWS (now state so we can update/delete) ───
  const [siteRows, setSiteRows] = useState<SiteRow[]>([
    {
      id:1,
      tNo:'T-1001',
      date:'07/01/2025',
      project:'RRB',
      activity:'Inspection',
      state:'CA',
      district:'North',
      city:'Los Angeles',
      bName:'Bob Smith',
      bCode:'BS-01',
      pm:'John Doe',
      vendor:'Vendor A',
      feName:'Jane Smith',
      feContact:'123-456-7890',
      nocEngineer:'NOC Eng',
      remarks:'All good',
      status:'Pending'
    },
    {
      id:1,
      tNo:'T-1001',
      date:'07/01/2025',
      project:'RRB',
      activity:'Inspection',
      state:'CA',
      district:'North',
      city:'Los Angeles',
      bName:'Bob Smith',
      bCode:'BS-01',
      pm:'John Doe',
      vendor:'Vendor A',
      feName:'Jane Smith',
      feContact:'123-456-7890',
      nocEngineer:'NOC Eng',
      remarks:'All good',
      status:'Pending'
    },
    {
      id:1,
      tNo:'T-1001',
      date:'07/01/2025',
      project:'RRB',
      activity:'Inspection',
      state:'CA',
      district:'North',
      city:'Los Angeles',
      bName:'Bob Smith',
      bCode:'BS-01',
      pm:'John Doe',
      vendor:'Vendor A',
      feName:'Jane Smith',
      feContact:'123-456-7890',
      nocEngineer:'NOC Eng',
      remarks:'All good',
      status:'Pending'
    },
    
   
    
  ]);

  // ─── FILTER & SEARCH ───
  const [statusFilter, setStatusFilter] = useState('');
  const [siteSearch,    setSiteSearch]  = useState('');
  const displayedSites = siteRows
    .filter(r => statusFilter ? r.status===statusFilter : true)
    .filter(r => r.activity.toLowerCase().includes(siteSearch.toLowerCase()));

  // ─── PROJECT modal callbacks ───
  const handleProjUpdate = (updated: ProjectRow) => {
    console.log('project saved', updated);
    setToast({ open:true, message:'Project updated successfully', severity:'success' });
    closeProjEdit();
  };
  const handleProjDelete = (id: number) => {
    console.log('project deleted', id);
    setToast({ open:true, message:'Project deleted successfully', severity:'info' });
    closeProjEdit();
  };

  // ─── SITE modal callbacks ───
  const handleSiteUpdate = (upd: SiteRow) => {
    setSiteRows(rows => rows.map(r => r.id===upd.id ? upd : r));
    setToast({ open:true, message:'Activity updated successfully', severity:'success' });
    closeSiteEdit();
  };
  const handleSiteDelete = (id: number) => {
    setSiteRows(rows => rows.filter(r => r.id!==id));
    setToast({ open:true, message:'Activity deleted successfully', severity:'info' });
    closeSiteEdit();
  };

  return (
    <MainLayout title="Project Details" showRightPanel={false}>
      <Box sx={{ pt:2, px:2, display:'flex', flexDirection:'column', gap:2 }}>


{/* ─── Top Card: Project Info + Chart + “Update” ─── */}

<Card
  sx={{
    bgcolor: '#1C1C1E',
    borderRadius: 2,
    height: 200,
     position: 'relative',    // <-- make this relative
    overflow: 'hidden',
  }}
>
  <CardContent
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 2,
      py: 1,
    }}
  >

    {/* Left */}
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ color: '#FBDF3B', fontSize: 16, fontWeight: 600, mb: 0.5 }}>
        {project.projectName}
      </Typography>
      <Divider sx={{ borderColor: '#333', mb: 1 }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0.5,
          fontSize: 12,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>Customer: {project.customer}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>Code: {project.projectCode}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>Type: {project.projectType}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>Manager: {project.projectManager}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>BDM: {project.bdm}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>Start: {project.startDate}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>End: {project.endDate}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>AMC Yr: {project.amcYear}</Typography>
          <Typography sx={{ color: '#E0E0E0',fontSize:15 }}>AMC Mo: {project.amcMonths}</Typography>
        </Box>
      </Box>
    </Box>

    {/* Middle: smaller Doughnut */}
    <Box sx={{ width: 150, height: 150, position: 'relative' }}>
      <Doughnut data={data} options={chartOpts} />

      {/* center total */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center', pointerEvents: 'none'
        }}
      >
        <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
          {total}
        </Typography>
        <Typography sx={{ color: '#888', fontSize: 10 }}>
          Sites
        </Typography>
      </Box>

      {/* smaller bubbles */}
      {[
        { pct: Math.round(siteStats.completed/total*100), color: '#22C55E', sx: { top: '-2%', left: '70%', transform: 'translateX(-10%)' } },
        { pct: Math.round(siteStats.failed/total*100),    color: '#EF4444', sx: { bottom: '-8%', left: '67%', transform: 'translateX(-50%)' } },
        { pct: Math.round(siteStats.inProgress/total*100),color: '#FBDF3B', sx: { top: '70%', left: '-8%', transform: 'translateY(-70%)' } },
        { pct: Math.round(siteStats.canceled/total*100),  color: '#888888', sx: { top: '17%', left: '2%', transform: 'translateY(-70%)' } }
      ].map((b, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 30, height: 30,
            borderRadius: '50%',
            bgcolor: b.color,
            border: '2px solid #fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...b.sx
          }}
        >
          <Typography sx={{ color: '#000', fontSize: 10, fontWeight: 600 }}>
            {b.pct}%
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Right legend (smaller) */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 100 }}>
      {[
        { label: 'Completed',  color: '#22C55E', value: siteStats.completed },
        { label: 'Failed',     color: '#EF4444', value: siteStats.failed    },
        { label: 'In Progress',color: '#FBDF3B', value: siteStats.inProgress},
        { label: 'Canceled',   color: '#888888', value: siteStats.canceled  }
      ].map(({ label, color, value }) => (
        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
          <Typography sx={{ color: '#fff', fontSize: 12 }}>
            {label}: {value}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Update button */}
    <Box
    sx={{
      position: 'absolute',
      bottom: 16,
      right: 16,
    }}
  >
    <Button
      size="small"
      variant="contained"
      onClick={openProjEdit}
      sx={{
        bgcolor: '#FBDF3B',
        color: '#000',
        textTransform: 'none',
        '&:hover': { bgcolor: '#F9C600' }
      }}
    >
      Update
    </Button>
  </Box>

  </CardContent>
</Card>


        {/* ─── Bottom Card: Activity Summary ─── */}

       
        
        <Card sx={{
          bgcolor:'#1C1C1E',
          borderRadius:2,
          height:'calc(100vh - 290px)',  // keep it fixed
          overflow:'hidden'
        }}>
          <CardContent sx={{
            px:1.5, py:1,
            height:'100%',
            display:'flex',
            flexDirection:'column'
          }}>

        

            {/* header */}
            <Box sx={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              flexWrap:'wrap',
              gap:2,
              mb:1
            }}>
              <Typography sx={{color:'#fff',fontSize:18,fontWeight:600}}>
                Activity Summary
              </Typography>
              <Box sx={{display:'flex',gap:2,flexWrap:'wrap'}}>
                <FormControl size="small" sx={{
                  minWidth:120,
                  bgcolor:'#1C1C1E',
                  borderRadius:1,
                  border:'1px solid #333'
                }}>
                  <InputLabel sx={{color:'#aaa',fontSize:12}}>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={e=>setStatusFilter(e.target.value)}
                    sx={{
                      color:'#fff',
                      '& .MuiSelect-select':{ py:0.5,px:1 },
                      '& .MuiSelect-icon':{ color:'#888' }
                    }}
                    MenuProps={{ PaperProps:{ sx:{bgcolor:'#28282B',color:'#fff'} } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  placeholder="Search..."
                  variant="outlined"
                  value={siteSearch}
                  onChange={e=>setSiteSearch(e.target.value)}
                  sx={{
                    width:200,
                    bgcolor:'#1C1C1E',
                    '& .MuiOutlinedInput-notchedOutline':{border:'1px solid #333',borderRadius:1},
                    '& .MuiOutlinedInput-root':{height:32},
                    '& .MuiOutlinedInput-input':{color:'#fff',py:'4px',fontSize:12}
                  }}
                />
              </Box>
            </Box>
            <Divider sx={{borderColor:'#333',mb:1}} />

            {/* <TableContainer
  sx={{
    flex: 1,
    backgroundColor: '#1C1C1E',
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 245px)',   // match your card height minus header
    '&::-webkit-scrollbar': {
      width: '6px',    // vertical
      height: '6px',   // horizontal
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#333',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#1C1C1E',  // so you can see the track
    },
    // pb: 2,
  }}
>
  <Table stickyHeader sx={{ minWidth: 1800 }}>
    <TableHead>
      <TableRow>
        {[
          'Sr No','T No','Date','Project','Activity','State','District','City',
          'B Name','B Code','PM','Vendor','FE Name','FE Mobile','NOC Eng',
          'Remarks','Status','Update'
        ].map((col, idx, arr) => (
          <TableCell
            key={col}
            sx={{
              color: '#fff',
              backgroundColor: '#0F0F0F',
              borderBottom: '1px solid #333',
              fontSize: 12,
              whiteSpace: 'nowrap',
              padding: '12px 16px',
              textAlign: 'center',
              // optional: round the corners on first/last header cell
              borderTopLeftRadius: idx === 0 ? 3 : 0,
              borderTopRightRadius: idx === arr.length - 1 ? 3 : 0,
            }}
          >
            {col}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {displayedSites.map(r => (
        <TableRow key={r.id} hover>
          {[
            r.id, r.tNo, r.date, r.project, r.activity, r.state, r.district, r.city,
            r.bName, r.bCode, r.pm, r.vendor, r.feName, r.feContact, r.nocEngineer,
            r.remarks, r.status,
            <Button
              key="upd"
              size="small"
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#555',
                textTransform: 'none',
                '&:hover': { borderColor: '#777' },
              }}
              onClick={() => openSiteEdit(r)}
            >
              Update
            </Button>
          ].map((cell, i) => (
            <TableCell
              key={i}
              sx={{
                color: i === 16 ? '#22C55E' : '#E0E0E0', // highlight status if you like
                borderBottom: '1px solid #333',
                fontSize: 12,
                whiteSpace: 'nowrap',
                padding: '12px 16px',
                textAlign: 'center',
                verticalAlign: 'middle',
                ...(i === 17 && { padding: '0 8px' }), // tighter for the button
              }}
            >
              {cell}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer> */}

 <TableContainer
   sx={{
     width: '100%',          // <— prevent it from stretching wider
     flex: 1,
     overflowX: 'auto',
     overflowY: 'auto',
     maxHeight: 'calc(100vh - 245px)',  // keep your vertical constraint
     '&::-webkit-scrollbar': {
       width: '6px',
       height: '6px',
     },
     '&::-webkit-scrollbar-thumb': {
       background: '#333',
       borderRadius: '3px',
     },
     '&::-webkit-scrollbar-track': {
       background: '#1C1C1E',
     },
     pb: 2,
   }}
 >
  <Table stickyHeader sx={{ minWidth: 1800 }}>
    <TableHead>
      <TableRow>
        {[
          'Sr No','T No','Date','Project','Activity','State','District','City',
          'B Name','B Code','PM','Vendor','FE Name','FE Mobile','NOC Eng',
          'Remarks','Status','Update'
        ].map((col, idx, arr) => (
          <TableCell
            key={col}
            sx={{
              color: '#fff',
              backgroundColor: '#0F0F0F',
              borderBottom: '1px solid #333',
              fontSize: 12,
              whiteSpace: 'nowrap',
              padding: '12px 16px',
              textAlign: 'center',
              borderTopLeftRadius: idx === 0 ? 3 : 0,
              borderTopRightRadius: idx === arr.length - 1 ? 3 : 0,
            }}
          >
            {col}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {displayedSites.map(r => (
        <TableRow key={r.id} hover>
          {[
            r.id, r.tNo, r.date, r.project, r.activity, r.state, r.district, r.city,
            r.bName, r.bCode, r.pm, r.vendor, r.feName, r.feContact, r.nocEngineer,
            r.remarks, r.status,
            <Button
              key="upd"
              size="small"
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: '#555',
                textTransform: 'none',
                '&:hover': { borderColor: '#777' },
              }}
              onClick={() => openSiteEdit(r)}
            >
              Update
            </Button>
          ].map((cell, i) => (
            <TableCell
              key={i}
              sx={{
                color: i === 16 ? '#22C55E' : '#E0E0E0',
                borderBottom: '1px solid #333',
                fontSize: 12,
                whiteSpace: 'nowrap',
                padding: i === 17 ? '0 8px' : '12px 16px',
                textAlign: 'center',
                verticalAlign: 'middle',
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
    
      {/* ─── Modals ─── */}
      <UpdateProjectModal
        open={projEditOpen}
        row={project}
        onClose={closeProjEdit}
        onUpdate={handleProjUpdate}
        onDelete={handleProjDelete}
      />
      <UpdateSiteModal
        open={siteEditOpen}
        row={selectedSite}
        onClose={closeSiteEdit}
        onUpdate={handleSiteUpdate}
        onDelete={handleSiteDelete}
      />

      {/* ─── Shared Toast ─── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          variant="outlined"
          sx={{
            bgcolor:'background.paper',
            borderColor: toast.severity==='success' ? '#4caf50' : '#2196f3',
            boxShadow:1
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
