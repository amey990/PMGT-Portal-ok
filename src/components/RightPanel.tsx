import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const activityData = [
  { name: 'Completed', value: 38, color: '#22C55E' },
  { name: 'In Progress', value: 14, color: '#3B82F6' },
  { name: 'Closed', value: 6, color: '#FACC15' },
  { name: 'Failed', value: 4, color: '#EF4444' },
];

const totalActivities = activityData.reduce((sum, item) => sum + item.value, 0);

export default function RightPanel() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 400,
        height: '100vh',
        borderLeft: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Activity Status */}
      <Box sx={{ px: 1.4, py: 2, borderBottom: '2px solid #333' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>
            Activity Status
          </Typography>
          <Typography
            onClick={() => navigate('/analytics')}
            sx={{ color: '#3B82F6', fontSize: 12, cursor: 'pointer' }}
          >
            View &gt;
          </Typography>
        </Box>

        {/* WRAP chart + legend in a scrollable row */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: '6px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#333',
              borderRadius: '4px',
            },
          }}
        >
          {/* Pie chart */}
          <Box sx={{ minWidth: 110, height: 110, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity="0.4"
                    />
                  </filter>
                </defs>
                <Pie
                  data={activityData}
                  dataKey="value"
                  innerRadius={34}
                  outerRadius={44}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={1.5}
                  filter="url(#shadow)"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="47%"
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: 16, fontWeight: 700 }}
                >
                  {totalActivities}
                </text>
                <text
                  x="50%"
                  y="60%"
                  fill="#aaa"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: 9 }}
                >
                  Total activities
                </text>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: 100,
              flexShrink: 0,
            }}
          >
            {activityData.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: item.color,
                  }}
                />
                <Typography sx={{ color: '#ccc', fontSize: 12, minWidth: 70 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ color: '#fff', fontSize: 12 }}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Reminders */}

      {/* <Box
  sx={{
    flex: 1,             // grow to fill remaining height
    px: 1.4,
    py: 1,
    pb: 2,               // extra bottom padding
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#333',
      borderRadius: '3px',
    },
  }}
> */}

 <Box
  sx={{
    flex: 1,             // use available space rather than a fixed % height
    px: 1.4,
    pt: 1,
    pb: 7,               // extra bottom padding so the last card never hugs the edge
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#333',
      borderRadius: '3px',
    },
  }}
>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>
            Reminders
          </Typography>
          <Typography
            onClick={() => navigate('/reminders')}
            sx={{ color: '#3B82F6', fontSize: 12, cursor: 'pointer' }}
          >
            Manage &gt;
          </Typography>
        </Box>
        {[
          { time: '09:30 AM', title: 'Check test results', priority: 'Low', color: '#22C55E' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
            { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
          { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
         
         
          ].map((item, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: '#18181B',
              px: 2,
              py: 1.3,
              borderRadius: 2,
              mb: 1.2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.time}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ color: item.color, fontSize: 12 }}>{item.priority}</Typography>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
              </Box>
            </Box>
            <Typography sx={{ color: '#ccc', fontSize: 13, mt: 0.5 }}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}


// src/components/RightPanel.tsx
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// const activityData = [
//   { name: 'Completed',    value: 38, color: '#22C55E' },
//   { name: 'In Progress',  value: 14, color: '#3B82F6' },
//   { name: 'Closed',       value:  6, color: '#FACC15' },
//   { name: 'Failed',       value:  4, color: '#EF4444' },
// ];

// const totalActivities = activityData.reduce((sum, item) => sum + item.value, 0);

// export default function RightPanel() {
//   const navigate = useNavigate();

//   // you can wire this up to real projects if needed
//   const [statusProject, setStatusProject] = React.useState<string>('RRB');

//   return (
//     <Box
//       sx={{
//         width: 360,
//         height: '100vh',
//         borderLeft: '2px solid #333',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//       }}
//     >
//       {/* ─── Activity Status ─── */}
//       <Box sx={{ px: 1.4, py: 2, borderBottom: '2px solid #333', flexShrink: 0 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography sx={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>
//             Activity Status
//           </Typography>
//           <Typography
//             onClick={() => navigate('/analytics')}
//             sx={{ color: '#3B82F6', fontSize: 12, cursor: 'pointer' }}
//           >
//             View &gt;
//           </Typography>
//         </Box>

//         {/* Project selector dropdown */}
//         <FormControl size="small" sx={{ mb: 2, minWidth: 120, bgcolor: '#28282B', borderRadius: 1 }}>
//           <InputLabel sx={{ color: '#aaa', fontSize: 12 }}>Project</InputLabel>
//           <Select
//             value={statusProject}
//             label="Project"
//             onChange={e => setStatusProject(e.target.value)}
//             sx={{ color: '#fff', height: 32 }}
//             MenuProps={{
//               PaperProps: { sx: { bgcolor: '#28282B', color: '#fff' } }
//             }}
//           >
//             {['RRB','Alpha','Beta','CBI'].map(p => (
//               <MenuItem key={p} value={p}>{p}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* WRAP chart + legend in a scrollable row */}
//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             overflowX: 'auto',
//             pb: 1,
//             '&::-webkit-scrollbar': { height: '6px' },
//             '&::-webkit-scrollbar-thumb': {
//               backgroundColor: '#333',
//               borderRadius: '4px',
//             },
//           }}
//         >
//           {/* Pie chart */}
//           <Box sx={{ minWidth: 110, height: 110, flexShrink: 0 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <defs>
//                   <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//                     <feDropShadow
//                       dx="0"
//                       dy="2"
//                       stdDeviation="2"
//                       floodColor="#000"
//                       floodOpacity="0.4"
//                     />
//                   </filter>
//                 </defs>
//                 <Pie
//                   data={activityData}
//                   dataKey="value"
//                   innerRadius={34}
//                   outerRadius={44}
//                   startAngle={90}
//                   endAngle={-270}
//                   paddingAngle={1.5}
//                   filter="url(#shadow)"
//                 >
//                   {activityData.map((entry, index) => (
//                     <Cell key={index} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <text
//                   x="50%"
//                   y="47%"
//                   fill="#fff"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   style={{ fontSize: 16, fontWeight: 700 }}
//                 >
//                   {totalActivities}
//                 </text>
//                 <text
//                   x="50%"
//                   y="60%"
//                   fill="#aaa"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   style={{ fontSize: 9 }}
//                 >
//                   Total activities
//                 </text>
//               </PieChart>
//             </ResponsiveContainer>
//           </Box>

//           {/* Legend */}
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 1,
//               minWidth: 100,
//               flexShrink: 0,
//               justifyContent: 'center'
//             }}
//           >
//             {activityData.map((item, idx) => (
//               <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Box
//                   sx={{
//                     width: 10,
//                     height: 10,
//                     borderRadius: '50%',
//                     bgcolor: item.color,
//                   }}
//                 />
//                 <Typography sx={{ color: '#fff', fontSize: 13, minWidth: 80 }}>
//                   {item.name}
//                 </Typography>
//                 <Typography sx={{ color: '#fff', fontSize: 13 }}>
//                   {item.value}%
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>

//       {/* ─── Reminders ─── */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           px: 1.4,
//           py: 1,
//           overflowY: 'auto',
//           '&::-webkit-scrollbar': { width: '6px' },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: '#333',
//             borderRadius: '3px',
//           },
//         }}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography sx={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>
//             Reminders
//           </Typography>
//           <Typography
//             onClick={() => navigate('/reminders')}
//             sx={{ color: '#3B82F6', fontSize: 12, cursor: 'pointer' }}
//           >
//             Manage &gt;
//           </Typography>
//         </Box>
//         {/* example reminder items */}
//         {[
//           { time: '09:30 AM', title: 'Check test results', priority: 'Low', color: '#22C55E' },
//           { time: '10:00 AM', title: 'Client Presentation', priority: 'High', color: '#EF4444' },
//         ].map((item, index) => (
//           <Box
//             key={index}
//             sx={{
//               bgcolor: '#18181B',
//               px: 2,
//               py: 1.3,
//               borderRadius: 2,
//               mb: 1.2,
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
//                 {item.time}
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 <Typography sx={{ color: item.color, fontSize: 12 }}>
//                   {item.priority}
//                 </Typography>
//                 <Box
//                   sx={{
//                     width: 8,
//                     height: 8,
//                     borderRadius: '50%',
//                     bgcolor: item.color,
//                   }}
//                 />
//               </Box>
//             </Box>
//             <Typography sx={{ color: '#ccc', fontSize: 13, mt: 0.5 }}>
//               {item.title}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }
