import MainLayout from '../layouts/MainLayout';
import { Box, Card, CardContent, Typography } from '@mui/material';

export default function AddTicket() {
  return (
     <MainLayout title="Accounts" showRightPanel={false}>
          <Box sx={{ pt: 3, px: 2 }}>
            <Card sx={{ bgcolor: '#1C1C1E', borderRadius: 2, p: 3 }}>
              <CardContent>
                <Typography variant="h5" color="white" gutterBottom>
                  Add ticket
                </Typography>
                <Typography variant="body2" color="grey.400">
                  This is your accounts page.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </MainLayout>
  )
}
