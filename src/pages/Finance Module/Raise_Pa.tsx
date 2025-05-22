import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function Raise_PA() {
  return (
    <MainLayout title="Raise PA" showRightPanel={false}>
      <Box sx={{ p: 2 }}>
        <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="#fff" gutterBottom>
              Raise PA
            </Typography>
            <Typography color="#888">
              Raise a new Purchase Authorization request here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}
