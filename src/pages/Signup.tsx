// // ///////////////////////////////////////////////// Final Version working ///////////////////////////////////////

// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate,useLocation } from 'react-router-dom';

import slide1 from '../assets/ant3.jpg';
import slide2 from '../assets/satellite.jpg';
import slide3 from '../assets/opticcable.jpg';

// type AuthMode = 'signup' | 'login' | 'customer';

type AuthMode = 'signup' | 'login' | 'customer' | 'forgot';


const getInitialVariant = (mode: AuthMode) => ({
  x: mode === 'signup' ? 100 : -100,
  opacity: 0,
  position: 'absolute' as const,
});

const animateVariant = {
  x: 0,
  opacity: 1,
  position: 'relative' as const,
  transition: { duration: 0.5 },
};

const getExitVariant = (mode: AuthMode) => ({
  x: mode === 'signup' ? -100 : 100,
  opacity: 0,
  position: 'absolute' as const,
  transition: { duration: 0.5 },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const location  = useLocation();

  const images = [slide1, slide2, slide3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  // const [mode, setMode] = useState<AuthMode>('signup');

  // pick up “mode” from query?: if none, default to signup
   const params = new URLSearchParams(location.search);
   const initial: AuthMode = (params.get('mode') as AuthMode) || 'signup';
   const [mode, setMode] = useState<AuthMode>(initial);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const renderFields = (roleOptions: string[]) => (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
  <TextField
    fullWidth
    label={mode === 'customer' ? 'Company Name' : 'Username'}
    variant="filled"
    slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
    sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F' }}
  />

  <FormControl fullWidth variant="filled" sx={{ bgcolor: '#1E1E2F' }}>
    <InputLabel sx={{ color: '#ccc' }}>Role</InputLabel>
    <Select
      defaultValue=""
      sx={{ color: 'white', '.MuiSelect-icon': { color: '#ccc' } }}
    >
      {roleOptions.map((role) => (
        <MenuItem key={role} value={role}>
          {role}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


      <TextField
        fullWidth
        label="Email"
        variant="filled"
        slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
        sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F', mb: 2 }}
      />

      <TextField
        fullWidth
        label="Enter your password"
        type={showPassword ? 'text' : 'password'}
        variant="filled"
        slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
        sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F', mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                sx={{ color: 'white' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#1E1E2F',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: 5,
          width: '95%',
          height: '90%',
          maxWidth: '1400px',
          bgcolor: '#2A2A3F',
        }}
      >
        {/* Left Image */}
        <Box sx={{ flex: 1, p: 1.7 }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              backgroundImage: `url(${images[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
              position: 'relative',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                color: '#fff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 700,
              }}
            >
              Commedia
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: currentSlide === index ? 25 : 15,
                    height: 3,
                    bgcolor:
                      currentSlide === index
                        ? '#fff'
                        : 'rgba(255,255,255,0.5)',
                    borderRadius: 2,
                    transition: 'width 0.3s',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#2A2A3F',
            pr: 3,
            pl: 1,
            pt: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={getInitialVariant(mode)}
              animate={animateVariant}
              exit={getExitVariant(mode)}
            >

              {/* ========== SIGNUP ========== */}
              {mode === 'signup' && (
                <>
                  <Typography variant="h4" fontWeight={600} color="white" mb={1}>
                    Create an account
                  </Typography>
                  <Typography variant="body2" color="white" mb={2}>
                    Already have an account?{' '}
                    <span
                      onClick={() => setMode('login')}
                      style={{ color: '#9F8BFF', cursor: 'pointer' }}
                    >
                      Log in
                    </span>
                  </Typography>

                  {renderFields(['Admin', 'Project Manager', 'BDM' , 'Noc Enginner'])}

                  <FormControlLabel
                    control={<Checkbox sx={{ color: '#9F8BFF' }} />}
                    label={
                      <span style={{ color: '#ccc' }}>
                        I agree to the{' '}
                        <span style={{ color: '#9F8BFF' }}>
                          Terms & Conditions
                        </span>
                      </span>
                    }
                    sx={{ mb: 1 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: '#9F8BFF', py: 1.2, fontWeight: 600, mb: 2}}
                  >
                    CREATE ACCOUNT
                  </Button>

                </>
              )}

              {/* ========== CUSTOMER SIGNUP ========== */}
              {mode === 'customer' && (
                <>
                  <Typography variant="h4" fontWeight={600} color="white" mb={1}>
                    Customer Signup
                  </Typography>
                  <Typography variant="body2" color="white" mb={4}>
                    Already have an account?{' '}
                    <span
                      onClick={() => setMode('login')}
                      style={{ color: '#9F8BFF', cursor: 'pointer' }}
                    >
                      Log in
                    </span>
                  </Typography>

                  {renderFields(['Customer'])}

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ bgcolor: '#9F8BFF', py: 1.2, fontWeight: 600, mb: 3 }}
                  >
                    CREATE ACCOUNT
                  </Button>

                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'white' }}>
                    Not a customer?{' '}
                    <span
                      style={{ color: '#9F8BFF', cursor: 'pointer' }}
                      onClick={() => setMode('signup')}
                    >
                      Go back to User Signup
                    </span>
                  </Typography>

                </>
              )}

              {/* ========== Forgot password  ========== */}
              {mode === 'forgot' && (
                  <>
                    <Typography variant="h4" fontWeight={600} color="white" mb={1} mt={2}>
                      Enter your email
                    </Typography>

                    <TextField
                      fullWidth
                      label="Email"
                      variant="filled"
                      slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
                      sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F', mb: 3 }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ bgcolor: '#9F8BFF', py: 1.2, fontWeight: 600, mb: 2 }}
                    >
                      SEND LINK
                    </Button>

                    <Typography
                      variant="body2"
                      sx={{ textAlign: 'right', color: 'white', cursor: 'pointer', textDecoration:'underline'}}
                      onClick={() => setMode('login')}
                    >
                      Return to Login 
                    </Typography>
                  </>
                )}


              {/* ========== LOGIN ========== */}
              {mode === 'login' && (
                
                <>
                  <Typography variant="h4" fontWeight={600} color="white" mb={1} mt={2}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body2" color="white" mb={4}>
                    Don’t have an account?{' '}
                    <span
                      onClick={() => setMode('signup')}
                      style={{ color: '#9F8BFF', cursor: 'pointer' }}
                    >
                      Sign up
                    </span>
                  </Typography>

                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
                    sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F', mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    variant="filled"
                    slotProps={{ inputLabel: { style: { color: '#ccc' } } }}
                    sx={{ input: { color: 'white' }, bgcolor: '#1E1E2F' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: 'white' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

        
                  <Typography
                 variant="body2"
                  sx={{ 
                    color: '#9F8BFF', 
                    cursor: 'pointer', 
                    textAlign: 'right',
                    mt: 2, 
                    textDecoration:'underline'
                  }}
                  onClick={() => setMode('forgot')}
                >
                  Forgot password?
                </Typography>

                <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: '#9F8BFF', py: 1.2, fontWeight: 600, mt: 3 }}
                onClick={() => navigate('/dashboard')}
              >
                LOGIN
              </Button>

                </>
              )}

            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
 