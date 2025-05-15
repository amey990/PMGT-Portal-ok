// src/pages/Analytics.tsx

import { Card, CardContent, Typography } from '@mui/material'
import MainLayout from '../layouts/MainLayout'

export default function Analytics() {
  return (
    
     <MainLayout title="Analytics" showRightPanel={false} >
      <Card sx={{ width:300, p:2, bgcolor:'#1E1E2F' }}>
        <CardContent>
          <Typography variant="h5" color="white" gutterBottom>
            Welcome to Analytics
          </Typography>
          <Typography variant="body2" color="grey.400">
            Your analytics overview will live here.
          </Typography>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
