import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function Generate_PA() {
  return (
    <MainLayout title="Generate PA" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="#fff" gutterBottom>
              Generate PA
            </Typography>
            <Typography color="#888">
              Use this form to create a new Purchase Authorization.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
