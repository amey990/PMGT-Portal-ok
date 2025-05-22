import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function Freelancers_List() {
  return (
    <MainLayout title="Freelancers List" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="#fff" gutterBottom>
              Freelancers List
            </Typography>
            <Typography color="#888">
              Manage your list of registered freelancers here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
