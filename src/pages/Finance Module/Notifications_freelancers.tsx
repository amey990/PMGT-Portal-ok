import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function Notifications_freelancers() {
  return (
    <MainLayout title="Notifications" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="#fff" gutterBottom>
              Notifications
            </Typography>
            <Typography color="#888">
              Here are your Finance-module notifications.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
