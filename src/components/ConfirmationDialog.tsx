
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1C1C1E',
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          outline: 'none',
          color: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ color: '#aaa', borderColor: '#333' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            sx={{
              bgcolor: '#EF4444',
              '&:hover': { bgcolor: '#DC2626' },
            }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}