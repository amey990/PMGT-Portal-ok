import { Card, CardContent, Typography } from '@mui/material'
import MainLayout from '../layouts/MainLayout'

export default function UpdateTicket() {
  return (
   
      <MainLayout title="Update Ticket">
      <Card sx={{ width:300, p:2, bgcolor:'#1E1E2F' }}>
        <CardContent>
          <Typography variant="h5" color="white" gutterBottom>
            Welcome to UpdateTicket
          </Typography>
          <Typography variant="body2" color="grey.400">
            This is your main workspace. Here you’ll see your key metrics and tasks.
          </Typography>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
