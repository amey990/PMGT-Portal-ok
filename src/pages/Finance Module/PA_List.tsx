import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function PA_List() {
  return (
    <MainLayout title="PA List" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="#fff" gutterBottom>
              PA List
            </Typography>
            <Typography color="#888">
              Here you can view all Purchase Authorizations.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
