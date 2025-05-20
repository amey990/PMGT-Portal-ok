// import React, { useState } from 'react'
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
//   Divider,
//   Snackbar,
//   Alert,
//   SelectChangeEvent
// } from '@mui/material'
// import { format, subDays, subMonths } from 'date-fns'
// import MainLayout from '../layouts/MainLayout'

// import ListAltIcon      from '@mui/icons-material/ListAlt';
// import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
// import AccessTimeIcon   from '@mui/icons-material/AccessTime';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// import ChartDataLabels from 'chartjs-plugin-datalabels'
// ChartJS.register( ChartDataLabels )

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions
// } from 'chart.js'
// import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'

// // at the top of Analytics.tsx

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

// import type { Context } from 'chartjs-plugin-datalabels'


// // Chart.js setup
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// )

// // simple helper to get N random ints (for demo)
// const randoms = (n: number) =>
//   Array.from({ length: n }, () => Math.floor(5 + Math.random() * 20))

// // activity categories + colors
// const categories = [
//   'Breakdown',
//   'New Installation',
//   'Upgrades',
//   'Corrective Maintenance',
//   'Preventive Maintenance',
//   'Revisit',
//   'Site Survey',
// ]
// const categoryColors = [
//   '#22C55E',
//   '#FBDF3B',
//   '#EF4444',
//   '#888888',
//   '#F59E0B',
//   '#3B82F6',
//   '#D946EF',
// ]

// type TL = 'today' | 'lastWeek' | '15Days' | '30Days' | '3Months' | '6Months'

// export default function Analytics() {
//   // ==== top filters ====
//   const [project, setProject] = useState<string>('RRB')
//   const [selectedSite, setSelectedSite] = useState<string>('All')
//   const [fromDate, setFromDate] = useState<string>(
//     new Date().toISOString().slice(0, 10)
//   )
//   const [toDate, setToDate] = useState<string>(
//     new Date().toISOString().slice(0, 10)
//   )
//   const [exportToast, setExportToast] = useState(false)
//   const handleExport = () => {
//     setExportToast(true)
//     // TODO: download logic
//   }
//   const handleClear = () => {
//     setProject('')
//     setSelectedSite('All')
//     setFromDate('')
//     setToDate('')
//   }

//   // above your buildStackedData helper
// const [catTimeline, setCatTimeline] = useState<TL>('today');

// const handleCatTimelineChange = (e: SelectChangeEvent<TL>) => {
//   const tl = e.target.value as TL;
//   setCatTimeline(tl);
//   setStackedData(buildStackedData(tl));
// };



//   // ==== KPI cards ====
//    const [selectedProject, setSelectedProject] = useState<string>('RRB');
//   const kpis = [
//     { label: 'Total Activities', value: 128, icon: ListAltIcon },
//     { label: 'Completed',        value:  92, icon: CheckCircleIcon },
//     { label: 'Pending',          value:  24, icon: AccessTimeIcon },
//     { label: 'Failed',           value:  12, icon: ErrorOutlineIcon },
//   ] as const;


//   // ==== Line (Activity Trend) ====
//   const [timeline, setTimeline] = useState<TL>('today')
//   const [lineData, setLineData] = useState<ChartData<'line'>>({
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Activities',
//         data: [12, 19, 8, 14, 22, 18, 9],
//         borderColor: '#22C55E',
//         backgroundColor: 'rgba(34,197,94,0.3)',
//         tension: 0.3,
//       },
//     ],
//   })

//   const handleTimelineChange = (e: SelectChangeEvent<TL>) => {
//     const tl = e.target.value as TL
//     setTimeline(tl)

//     const today = new Date()
//     let labels: string[] = []
//     let data: number[] = []

//     switch (tl) {
//       case 'today':
//         labels = [format(today, 'MM/dd')]
//         data = randoms(1)
//         break
//       case 'lastWeek':
//         labels = Array.from({ length: 7 }, (_, i) =>
//           format(subDays(today, 6 - i), 'MM/dd')
//         )
//         data = randoms(7)
//         break
//       case '15Days':
//         labels = Array.from({ length: 15 }, (_, i) =>
//           format(subDays(today, 14 - i), 'MM/dd')
//         )
//         data = randoms(15)
//         break
//       case '30Days':
//         labels = Array.from({ length: 6 }, (_, i) => {
//           const start = format(subDays(today, 30 - 1 - i * 5), 'MM/dd')
//           const end = format(subDays(today, 30 - 5 - i * 5), 'MM/dd')
//           return `${start}-${end}`
//         })
//         data = randoms(6)
//         break
//       case '3Months':
//         labels = Array.from({ length: 3 }, (_, i) =>
//           format(subMonths(today, 2 - i), 'MMM yyyy')
//         )
//         data = randoms(3)
//         break
//       case '6Months':
//         labels = Array.from({ length: 6 }, (_, i) =>
//           format(subMonths(today, 5 - i), 'MMM yyyy')
//         )
//         data = randoms(6)
//         break
//     }

//     setLineData({
//       labels,
//       datasets: [
//         {
//           ...lineData.datasets[0],
//           data,
//         },
//       ],
//     })
//   }

//   // ==== Stacked bar helper ====
//   const buildStackedData = (tl: TL): ChartData<'bar'> => {
//     // get the same time-buckets as the line chart
//     const today = new Date()
//     let labels: string[] = []
//     switch (tl) {
//       case 'today':
//         labels = [format(today, 'MM/dd')]
//         break
//       case 'lastWeek':
//         labels = Array.from({ length: 7 }, (_, i) =>
//           format(subDays(today, 6 - i), 'MM/dd')
//         )
//         break
//       case '15Days':
//         labels = Array.from({ length: 15 }, (_, i) =>
//           format(subDays(today, 14 - i), 'MM/dd')
//         )
//         break
//       case '30Days':
//         labels = Array.from({ length: 6 }, (_, i) => {
//           const start = format(subDays(today, 30 - 1 - i * 5), 'MM/dd')
//           const end = format(subDays(today, 30 - 5 - i * 5), 'MM/dd')
//           return `${start}-${end}`
//         })
//         break
//       case '3Months':
//         labels = Array.from({ length: 3 }, (_, i) =>
//           format(subMonths(today, 2 - i), 'MMM yyyy')
//         )
//         break
//       case '6Months':
//         labels = Array.from({ length: 6 }, (_, i) =>
//           format(subMonths(today, 5 - i), 'MMM yyyy')
//         )
//         break
//     }

//     return {
//       labels,
//       datasets: categories.map((cat, idx) => ({
//         label: cat,
//         data: randoms(labels.length),
//         backgroundColor: categoryColors[idx],
//         stack: 'stack1',
//       })),
//     }
//   }
//   const [stackedData, setStackedData] =
//     useState<ChartData<'bar'>>(buildStackedData('today'))

//   const handleStackedTimelineChange = (e: SelectChangeEvent<TL>) => {
//     const tl = e.target.value as TL
//     setTimeline(tl)
//     setStackedData(buildStackedData(tl))
//   }

//   // ==== Doughnut & Scatter stubs ====
//   const doughnutData = {
//     labels: ['Completed', 'Pending', 'Failed'],
//     datasets: [
//       {
//         data: [92, 24, 12],
//         backgroundColor: ['#22C55E', '#FBDF3B', '#EF4444'],
//       },
//     ],
//   }
//   const scatterData = {
//     datasets: [
//       {
//         label: 'Duration vs Cost',
//         data: [
//           { x: 5, y: 2000 },
//           { x: 10, y: 5000 },
//           { x: 3, y: 1500 },
//           { x: 8, y: 3500 },
//           { x: 12, y: 7000 },
//         ],
//         backgroundColor: '#22C55E',
//       },
//     ],
//   }

//   // ==== render ====
//   return (
//     <MainLayout title="Analytics" showRightPanel={false}>
//       <Box
//         sx={{
//           pt: 2,
//           px: 2,
//           height: 'calc(100vh - 90px)',
//           overflowY: 'auto',
//         }}
//       >
//         {/* ── Generate Report ── */}
//         <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, mb: 2, p: 2 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               mb: 1,
//             }}
//           >
//             <Typography variant="h6" color="#fff">
//               Generate Report
//             </Typography>
//             <Button
//               size="small"
//               onClick={handleClear}
//               sx={{
//                 textTransform: 'none',
//                 color: '#aaa',
//                 '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
//               }}
//             >
//               Clear All
//             </Button>
//           </Box>
//           <Divider sx={{ borderColor: '#333', mb: 2 }} />
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 2,
//               alignItems: 'center',
//             }}
//           >
//             <FormControl size="small" sx={{ minWidth: 140, bgcolor: '#28282B' }}>
//               <InputLabel sx={{ color: '#aaa' }}>Project</InputLabel>
//               <Select
//                 value={project}
//                 label="Project"
//                 onChange={(e) => setProject(e.target.value)}
//                 sx={{ color: '#fff' }}
//                 MenuProps={{
//                   PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } },
//                 }}
//               >
//                 {['RRB', 'Alpha', 'Beta'].map((p) => (
//                   <MenuItem key={p} value={p}>
//                     {p}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl size="small" sx={{ minWidth: 140, bgcolor: '#28282B' }}>
//               <InputLabel sx={{ color: '#aaa' }}>Site</InputLabel>
//               <Select
//                 value={selectedSite}
//                 label="Site"
//                 onChange={(e) => setSelectedSite(e.target.value)}
//                 sx={{ color: '#fff' }}
//                 MenuProps={{
//                   PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } },
//                 }}
//               >
//                 <MenuItem value="All">All</MenuItem>
//                 {['Site 1', 'Site 2', 'Site 3'].map((s) => (
//                   <MenuItem key={s} value={s}>
//                     {s}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               label="From"
//               type="date"
//               size="small"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
//               sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//             />
//             <TextField
//               label="To"
//               type="date"
//               size="small"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               InputLabelProps={{ shrink: true, sx: { color: '#aaa' } }}
//               sx={{ bgcolor: '#28282B', input: { color: '#fff' } }}
//             />
//             <Button
//               variant="contained"
//               onClick={handleExport}
//               sx={{
//                 bgcolor: '#FBDF3B',
//                 color: '#000',
//                 textTransform: 'none',
//                 '&:hover': { bgcolor: '#F9C600' },
//               }}
//             >
//               Export
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleExport}
//               sx={{
//                 bgcolor: '#FBDF3B',
//                 color: '#000',
//                 textTransform: 'none',
//                 '&:hover': { bgcolor: '#F9C600' },
//               }}
//             >
//               Export All
//             </Button>
//           </Box>
//         </Card>

//         {/* ── KPI Cards ── */}
//        <Box sx={{
//           display:'flex',
//           flexWrap:'wrap',
//           gap:2,
//           mb:3
//         }}>
//           {kpis.map(k=>{
//             const IconComp = k.icon;
//             return (
//               <Card key={k.label} sx={{ bgcolor:'#1C1C1E', flex:'1 1 200px', position:'relative' }}>
//                 <CardContent sx={{ textAlign:'right' }}>
//                   <Typography variant="body2" color="#888">{k.label}</Typography>
//                   <Typography fontWeight={600} fontSize={20} color="#fff">
//                     {k.value}
//                   </Typography>
//                 </CardContent>
//                 <Box sx={{
//                   position:'absolute',
//                   bottom:8,
//                   left:8,
//                   display:'flex',
//                   flexDirection:'column',
//                   gap:1
//                 }}>
//                   {k.label==='Total Activities' && (
//                     <FormControl size="small" sx={{ minWidth:120, bgcolor:'#28282B', borderRadius:1 }}>
//                       <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Project</InputLabel>
//                       <Select
//                         value={selectedProject}
//                         label="Project"
//                         onChange={e=>setSelectedProject(e.target.value)}
//                         sx={{
//                           color:'#fff',
//                           '& .MuiSelect-select':{ py:0.5, px:1 },
//                           '& .MuiSelect-icon':{ color:'#888' }
//                         }}
//                         MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
//                       >
//                         {['RRB','Alpha','Beta'].map(p=>(
//                           <MenuItem key={p} value={p}>{p}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   )}
//                   <IconComp sx={{ fontSize:20, color:'#888' }}/>
//                 </Box>
//               </Card>
//             );
//           })}
//         </Box>

//         {/* ── Chart Grid ── */}
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           {/* Activity Trend */}
//           <Card sx={{ bgcolor: '#1C1C1E', height: 300, display: 'flex', flexDirection: 'column' }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 px: 2,
//                 pt: 2,
//                 pb: 1,
//               }}
//             >
//               <Typography color="#fff" fontWeight={600}>
//                 Activity Trend
//               </Typography>
//               <FormControl size="small" sx={{ minWidth: 120, bgcolor: '#28282B' }}>
//                 <InputLabel sx={{ color: '#aaa' }}>Timeline</InputLabel>
//                 <Select
//                   value={timeline}
//                   label="Timeline"
//                   onChange={handleTimelineChange}
//                   sx={{ color: '#fff', height: 32 }}
//                   MenuProps={{
//                     PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } },
//                   }}
//                 >
//                   <MenuItem value="today">Today</MenuItem>
//                   <MenuItem value="lastWeek">Last Week</MenuItem>
//                   <MenuItem value="15Days">15 Days</MenuItem>
//                   <MenuItem value="30Days">30 Days</MenuItem>
//                   <MenuItem value="3Months">3 Months</MenuItem>
//                   <MenuItem value="6Months">6 Months</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <Box sx={{ flex: 1, px: 2, pb: 2 }}>
//               <Line
//                 data={lineData}
//                 options={{
//                   maintainAspectRatio: false,
//                   plugins: { legend: { display: false } },
//                   scales: { y: { ticks: { stepSize: 5 } } },
//                 }}
//               />
//             </Box>
//           </Card>


//  <Card sx={{ bgcolor: '#1C1C1E', height: 300 }}>
//   <CardContent sx={{ display: 'flex', height: '100%', p: 0 }}>
//     {/* ─── Left: chart + title + dropdown ─── */}
//     <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           px: 2,
//           pt: 2,
//           pb: 1,
//         }}
//       >
//         <Typography color="#fff" fontWeight={600}>
//           Activities performed by Category
//         </Typography>
//         <FormControl
//           size="small"
//           sx={{
//             minWidth: 120,
//             bgcolor: '#28282B',
//             borderRadius: 1,
//           }}
//         >
//           <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>
//             Timeline
//           </InputLabel>
//           <Select
//             value={catTimeline}
//             label="Timeline"
//             onChange={handleCatTimelineChange}
//             sx={{ color: '#fff', height: 32 }}
//             MenuProps={{
//               PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } },
//             }}
//           >
//             <MenuItem value="today">Today</MenuItem>
//             <MenuItem value="lastWeek">Last Week</MenuItem>
//             <MenuItem value="15Days">15 Days</MenuItem>
//             <MenuItem value="30Days">30 Days</MenuItem>
//             <MenuItem value="3Months">3 Months</MenuItem>
//             <MenuItem value="6Months">6 Months</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* extra padding on sides & bottom so x-axis labels are fully visible */}
//       <Box sx={{ flex: 1, px: 2, pb: 2 }}>
//         <Bar
//           data={stackedData}
//           options={{
//             maintainAspectRatio: false,
//             plugins: { legend: { display: false } },
//             scales: {
//               x: { stacked: true },
//               y: { stacked: true },
//             },
//           }}
//         />
//       </Box>
//     </Box>

//     {/* ─── Right: vertical legend ─── */}
//     <Box
//       sx={{
//         width: 120,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         gap: 1,
//         pr: 2,
//       }}
//     >
//       {categories.map((cat, i) => (
//         <Box
//           key={cat}
//           sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//         >
//           <Box
//             sx={{
//               width: 12,
//               height: 12,
//               bgcolor: categoryColors[i],
//               borderRadius: 0.5,
//             }}
//           />
//           <Typography color="#fff" fontSize={12}>
//             {cat}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   </CardContent>
// </Card>

//         </Box>

//         {/* ── Next row: Doughnut & Scatter ── */}
//         <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
//           {/* ─── Status Distribution Card ─── */}



//           <Card sx={{ bgcolor: '#1C1C1E', height: 300 }}>
//             <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
//               <Typography color="#fff" mb={1}>
//                 Cost vs Duration
//               </Typography>
//               <Box sx={{ flex: 1, position: 'relative' }}>
//                 <Scatter
//                   data={scatterData}
//                   options={{
//                     maintainAspectRatio: false,
//                     scales: {
//                       x: { title: { display: true, text: 'Duration (hrs)', color: '#aaa' } },
//                       y: { title: { display: true, text: 'Cost (USD)', color: '#aaa' } },
//                     },
//                     plugins: { legend: { display: false } },
//                   }}
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>

//       {/* toast */}
//       <Snackbar
//         open={exportToast}
//         autoHideDuration={2000}
//         onClose={() => setExportToast(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={() => setExportToast(false)}
//           severity="success"
//           variant="outlined"
//           sx={{ bgcolor: 'background.paper', borderColor: '#4caf50', boxShadow: 1 }}
//         >
//           Project data exported successfully
//         </Alert>
//       </Snackbar>
//     </MainLayout>
//   )
// }



// src/pages/Analytics.tsx

import React, { useState } from 'react'
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
  Divider,
  Snackbar,
  Alert,
  SelectChangeEvent
} from '@mui/material'
import { format, subDays, subMonths } from 'date-fns'
import MainLayout from '../layouts/MainLayout'

import ListAltIcon      from '@mui/icons-material/ListAlt'
import CheckCircleIcon  from '@mui/icons-material/CheckCircle'
import AccessTimeIcon   from '@mui/icons-material/AccessTime'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'

// register Chart.js components & plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
)

// helper to get N random ints
const randoms = (n: number) =>
  Array.from({ length: n }, () => Math.floor(5 + Math.random() * 20))

// activity categories + colors for the stacked bar
const categories = [
  'Breakdown',
  'New Installation',
  'Upgrades',
  'Corrective Maintenance',
  'Preventive Maintenance',
  'Revisit',
  'Site Survey',
]
const categoryColors = [
  '#22C55E',
  '#FBDF3B',
  '#EF4444',
  '#888888',
  '#F59E0B',
  '#3B82F6',
  '#D946EF',
]

// statuses for the doughnut
const statuses = [
  { label: 'Completed',    value:  55, color: '#22C55E' },
  { label: 'In Progress',  value:  20, color: '#FBDF3B' },
  { label: 'Failed',       value:  12, color: '#EF4444' },
  { label: 'Closed',       value:   8, color: '#888888' },
  { label: 'Cancelled',    value:   5, color: '#F59E0B' },
]

type TL = 'today' | 'lastWeek' | '15Days' | '30Days' | '3Months' | '6Months'

export default function Analytics() {
  // ── top filters ──
  const [project, setProject]         = useState<string>('RRB')
  const [selectedSite, setSelectedSite] = useState<string>('All')
  const [fromDate, setFromDate]       = useState<string>(new Date().toISOString().slice(0,10))
  const [toDate, setToDate]           = useState<string>(new Date().toISOString().slice(0,10))
  const [exportToast, setExportToast] = useState(false)

  const handleExport = () => {
    setExportToast(true)
    // TODO: actually trigger the download
  }
  const handleClear = () => {
    setProject('')
    setSelectedSite('All')
    setFromDate('')
    setToDate('')
  }

  // ── KPI cards ──
  const [selectedProjectKPI, setSelectedProjectKPI] = useState('RRB')
  const kpis = [
    { label: 'Total Activities', value: 128, icon: ListAltIcon },
    { label: 'Completed',        value:  92, icon: CheckCircleIcon },
    { label: 'Pending',          value:  24, icon: AccessTimeIcon },
    { label: 'Failed',           value:  12, icon: ErrorOutlineIcon },
  ] as const

  // ── Activity Trend (Line) ──
  const [timeline, setTimeline] = useState<TL>('today')
  const [lineData, setLineData] = useState<ChartData<'line'>>({
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      label: 'Activities',
      data: [12,19,8,14,22,18,9],
      borderColor: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.3)',
      tension: 0.3
    }]
  })

  const handleTimelineChange = (e: SelectChangeEvent<TL>) => {
    const tl = e.target.value as TL
    setTimeline(tl)

    const today = new Date()
    let labels: string[] = [], data: number[] = []

    switch(tl) {
      case 'today':
        labels = [ format(today,'MM/dd') ]
        data   = randoms(1)
        break
      case 'lastWeek':
        labels = Array.from({length:7},(_,i)=>
          format(subDays(today,6-i),'MM/dd')
        )
        data = randoms(7)
        break
      case '15Days':
        labels = Array.from({length:15},(_,i)=>
          format(subDays(today,14-i),'MM/dd')
        )
        data = randoms(15)
        break
      case '30Days':
        labels = Array.from({length:6},(_,i)=>{
          const start = format(subDays(today,30-1-i*5),'MM/dd')
          const end   = format(subDays(today,30-5-i*5),'MM/dd')
          return `${start}-${end}`
        })
        data = randoms(6)
        break
      case '3Months':
        labels = Array.from({length:3},(_,i)=>
          format(subMonths(today,2-i),'MMM yyyy')
        )
        data = randoms(3)
        break
      case '6Months':
        labels = Array.from({length:6},(_,i)=>
          format(subMonths(today,5-i),'MMM yyyy')
        )
        data = randoms(6)
        break
    }

    setLineData({
      labels,
      datasets: [{
        ...lineData.datasets[0],
        data
      }]
    })
  }

  // ── Stacked Bar Data ──
  const buildStackedData = (tl: TL): ChartData<'bar'> => {
    const today = new Date()
    let labels: string[] = []

    switch(tl) {
      case 'today':
        labels = [ format(today,'MM/dd') ]
        break
      case 'lastWeek':
        labels = Array.from({length:7},(_,i)=>
          format(subDays(today,6-i),'MM/dd')
        )
        break
      case '15Days':
        labels = Array.from({length:15},(_,i)=>
          format(subDays(today,14-i),'MM/dd')
        )
        break
      case '30Days':
        labels = Array.from({length:6},(_,i)=>{
          const start = format(subDays(today,30-1-i*5),'MM/dd')
          const end   = format(subDays(today,30-5-i*5),'MM/dd')
          return `${start}-${end}`
        })
        break
      case '3Months':
        labels = Array.from({length:3},(_,i)=>
          format(subMonths(today,2-i),'MMM yyyy')
        )
        break
      case '6Months':
        labels = Array.from({length:6},(_,i)=>
          format(subMonths(today,5-i),'MMM yyyy')
        )
        break
    }

    return {
      labels,
      datasets: categories.map((cat,idx)=>({
        label: cat,
        data: randoms(labels.length),
        backgroundColor: categoryColors[idx],
        stack: 'a'
      }))
    }
  }
  const [stackedData, setStackedData] = useState<ChartData<'bar'>>(buildStackedData('today'))
  const handleCatTimelineChange = (e: SelectChangeEvent<TL>) => {
    const tl = e.target.value as TL
    setTimeline(tl)
    setStackedData(buildStackedData(tl))
  }

  // ── Status Distribution Doughnut ──
  const statusData: ChartData<'doughnut'> = {
    labels: statuses.map(s => s.label),
    datasets: [{
      data: statuses.map(s => s.value),
      backgroundColor: statuses.map(s => s.color),
      hoverOffset: 12,
      borderWidth: 2,
      borderColor: '#1C1C1E'
    }]
  }

  const statusOptions: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: { display: false },
    datalabels: {
      color: '#fff',
      font: { weight: 'bold', size: 12 },
      formatter: (value: number, ctx: any) => {
        // pull out your data array as numbers
        const dataArr = ctx.chart.data.datasets[0].data as number[];
        // now reduce with properly typed params
        const total = dataArr.reduce((acc: number, curr: number) => acc + curr, 0);
        return Math.round((value / total) * 100) + '%';
      }
    },
    tooltip: { enabled: true }
  }
}



  // ── render ──
  return (
    <MainLayout title="Analytics" showRightPanel={false}>
      <Box sx={{
        pt:2, px:2,
        height:'calc(100vh - 90px)',
        overflowY:'auto'
      }}>
        {/* Generate Report */}
        <Card sx={{ bgcolor:'#1C1C1E', borderRadius:2, mb:2, p:2 }}>
          <Box sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            mb:1
          }}>
            <Typography variant="h6" color="#fff">
              Generate Report
            </Typography>
            <Button
              size="small"
              onClick={handleClear}
              sx={{
                textTransform:'none',
                color:'#aaa',
                '&:hover':{ backgroundColor:'rgba(255,255,255,0.08)' }
              }}
            >
              Clear All
            </Button>
          </Box>
          <Divider sx={{ borderColor:'#333', mb:2 }}/>
          <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, alignItems:'center' }}>
            <FormControl size="small" sx={{ minWidth:140, bgcolor:'#28282B' }}>
              <InputLabel sx={{ color:'#aaa' }}>Project</InputLabel>
              <Select
                value={project}
                label="Project"
                onChange={e=>setProject(e.target.value)}
                sx={{ color:'#fff' }}
                MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
              >
                {['RRB','Alpha','Beta'].map(p=>(
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth:140, bgcolor:'#28282B' }}>
              <InputLabel sx={{ color:'#aaa' }}>Site</InputLabel>
              <Select
                value={selectedSite}
                label="Site"
                onChange={e=>setSelectedSite(e.target.value)}
                sx={{ color:'#fff' }}
                MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
              >
                <MenuItem value="All">All</MenuItem>
                {['Site 1','Site 2','Site 3'].map(s=>(
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="From" type="date" size="small"
              value={fromDate} onChange={e=>setFromDate(e.target.value)}
              InputLabelProps={{ shrink:true, sx:{ color:'#aaa' } }}
              sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
            />
            <TextField
              label="To" type="date" size="small"
              value={toDate} onChange={e=>setToDate(e.target.value)}
              InputLabelProps={{ shrink:true, sx:{ color:'#aaa' } }}
              sx={{ bgcolor:'#28282B', input:{ color:'#fff' } }}
            />
            <Button
              variant="contained"
              onClick={handleExport}
              sx={{
                bgcolor:'#FBDF3B',
                color:'#000',
                textTransform:'none',
                '&:hover':{ bgcolor:'#F9C600' }
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              onClick={handleExport}
              sx={{
                bgcolor:'#FBDF3B',
                color:'#000',
                textTransform:'none',
                '&:hover':{ bgcolor:'#F9C600' }
              }}
            >
              Export All
            </Button>
          </Box>
        </Card>

        {/* KPI Cards */}
        <Box sx={{ display:'flex', flexWrap:'wrap', gap:2, mb:3 }}>
          {kpis.map(k=>{
            const IconComp = k.icon
            return (
              <Card key={k.label} sx={{ bgcolor:'#1C1C1E', flex:'1 1 200px', position:'relative' }}>
                <CardContent sx={{ textAlign:'right' }}>
                  <Typography variant="body2" color="#888">{k.label}</Typography>
                  <Typography fontWeight={600} fontSize={20} color="#fff">
                    {k.value}
                  </Typography>
                </CardContent>
                <Box sx={{
                  position:'absolute', bottom:8, left:8,
                  display:'flex', flexDirection:'column', gap:1
                }}>
                  {k.label==='Total Activities' && (
                    <FormControl size="small" sx={{ minWidth:120, bgcolor:'#28282B', borderRadius:1 }}>
                      <InputLabel sx={{ color:'#aaa', fontSize:12 }}>Project</InputLabel>
                      <Select
                        value={selectedProjectKPI}
                        label="Project"
                        onChange={e=>setSelectedProjectKPI(e.target.value)}
                        sx={{ color:'#fff', '& .MuiSelect-icon':{ color:'#888' } }}
                        MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
                      >
                        {['RRB','Alpha','Beta'].map(p=>(
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  <IconComp sx={{ fontSize:20, color:'#888' }} />
                </Box>
              </Card>
            )
          })}
        </Box>

        {/* Top‐row charts */}
        <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, mb:2 }}>
          {/* Activity Trend */}
          <Card sx={{ bgcolor:'#1C1C1E', height:300, display:'flex', flexDirection:'column' }}>
            <Box sx={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              px:2, pt:2, pb:1
            }}>
              <Typography color="#fff" fontWeight={600}>Activity Trend</Typography>
              <FormControl size="small" sx={{ minWidth:120, bgcolor:'#28282B' }}>
                <InputLabel sx={{ color:'#aaa' }}>Timeline</InputLabel>
                <Select
                  value={timeline}
                  label="Timeline"
                  onChange={handleTimelineChange}
                  sx={{ color:'#fff', height:32 }}
                  MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="lastWeek">Last Week</MenuItem>
                  <MenuItem value="15Days">15 Days</MenuItem>
                  <MenuItem value="30Days">30 Days</MenuItem>
                  <MenuItem value="3Months">3 Months</MenuItem>
                  <MenuItem value="6Months">6 Months</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex:1, px:2, pb:2 }}>
              <Line
                data={lineData}
                options={{
                  maintainAspectRatio:false,
                  plugins:{ legend:{ display:false } },
                  scales:{ y:{ ticks:{ stepSize:5 } } }
                }}
              />
            </Box>
          </Card>

          {/* Stacked Bar */}
          <Card sx={{ bgcolor:'#1C1C1E', height:300 }}>
            <CardContent sx={{ display:'flex', height:'100%', p:0 }}>
              <Box sx={{ flex:1, display:'flex', flexDirection:'column' }}>
                <Box sx={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  px:2, pt:2, pb:1
                }}>
                  <Typography color="#fff" fontWeight={600}>
                    Activities performed by Category
                  </Typography>
                  <FormControl size="small" sx={{ minWidth:120, bgcolor:'#28282B' }}>
                    <InputLabel sx={{ color:'#aaa' }}>Timeline</InputLabel>
                    <Select
                      value={timeline}
                      label="Timeline"
                      onChange={handleCatTimelineChange}
                      sx={{ color:'#fff', height:32 }}
                      MenuProps={{ PaperProps:{ sx:{ bgcolor:'#28282B', color:'#fff' } } }}
                    >
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="lastWeek">Last Week</MenuItem>
                      <MenuItem value="15Days">15 Days</MenuItem>
                      <MenuItem value="30Days">30 Days</MenuItem>
                      <MenuItem value="3Months">3 Months</MenuItem>
                      <MenuItem value="6Months">6 Months</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex:1, px:2, pb:2 }}>
                  <Bar
                    data={stackedData}
                    options={{
                      maintainAspectRatio:false,
                      plugins:{ legend:{ display:false } },
                      scales:{ 
                        x:{ stacked:true }, 
                        y:{ stacked:true } }
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{
                width:120,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:1,
                pr:2
              }}>
                {categories.map((cat,i)=>(
                  <Box key={cat} sx={{ display:'flex', alignItems:'center', gap:1 }}>
                    <Box sx={{ width:12, height:12, bgcolor:categoryColors[i], borderRadius:0.5 }} />
                    <Typography color="#fff" fontSize={12}>{cat}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Bottom‐row charts */}
        <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
          {/* Status Distribution */}
          <Card sx={{ bgcolor:'#1C1C1E', height:300 }}>
            <CardContent sx={{ display:'flex', height:'100%', p:2 }}>
              <Box sx={{ flex:1, display:'flex', flexDirection:'column' }}>
                <Typography color="#fff" mb={1}>Status Distribution</Typography>
                <Box sx={{ flex:1, position:'relative' }}>
                  <Doughnut
                    data={statusData}
                    options={statusOptions}
                  />
                </Box>
              </Box>
              <Box sx={{
                width:140,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                gap:1,
                pl:0.4
              }}>
                {statuses.map(s=>(
                  <Box key={s.label} sx={{ display:'flex', alignItems:'center', gap:1 }}>
                    <Box sx={{ width:14, height:14, bgcolor:s.color, borderRadius:0.5 }} />
                    <Typography color="#fff" fontSize={14}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Cost vs Duration */}
          <Card sx={{ bgcolor:'#1C1C1E', height:300 }}>
            <CardContent sx={{ display:'flex', flexDirection:'column', height:'100%', p:2 }}>
              <Typography color="#fff" mb={1}>Cost vs Duration</Typography>
              <Box sx={{ flex:1, position:'relative' }}>
                <Scatter
                  data={{
                    datasets:[{
                      label:'Duration vs Cost',
                      data:[
                        { x:5, y:2000 },
                        { x:10, y:5000 },
                        { x:3, y:1500 },
                        { x:8, y:3500 },
                        { x:12, y:7000 },
                      ],
                      backgroundColor:'#22C55E'
                    }]
                  }}
                  options={{
                    maintainAspectRatio:false,
                    scales:{
                      x:{ title:{ display:true, text:'Duration (hrs)', color:'#aaa' } },
                      y:{ title:{ display:true, text:'Cost (USD)', color:'#aaa' } }
                    },
                    plugins:{ legend:{ display:false } }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* global toast */}
      <Snackbar
        open={exportToast}
        autoHideDuration={2000}
        onClose={()=>setExportToast(false)}
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
      >
        <Alert
          onClose={()=>setExportToast(false)}
          severity="success"
          variant="outlined"
          sx={{ bgcolor:'background.paper', borderColor:'#4caf50', boxShadow:1 }}
        >
          Project data exported successfully
        </Alert>
      </Snackbar>
    </MainLayout>
  )
}
