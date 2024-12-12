import * as React from 'react';
import axios from 'axios'; 
import { Box, TextField, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, FormControlLabel, Checkbox, Button, useTheme, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import backgroundImage from '../assets/bg-image.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const vendor = 'Vendor';
  const customer = 'Customer';

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleSignUp = () => {
    navigate('/signup');
  };

  // const handleForgotPassword = () => {
  //   navigate('/ForgotPassword/EnterEmail');
  // };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async () => {
    if (!role || !username || !password) {
      alert('Please fill all fields!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        role,
        username,
        password,
      });
  
      // Save the JWT token in localStorage
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      alert('Login successful!');
      if (role === vendor) {
        navigate('/create-ticket');
      } else if (role === customer) {
        navigate('/ticket-purchase');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
    }
  };  

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(19, 62, 135, 0.8)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          width: '40%',
          height: 'fit-content',
          paddingY: '30px',
          backgroundColor: theme.palette.white.main,
          borderRadius: '20px',
          zIndex: 2,
          backdropFilter: 'blur(100px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <h1>Login</h1>
        <Box sx={{ minWidth: '70%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={vendor}>Vendor</MenuItem>
              <MenuItem value={customer}>Customer</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          size="medium"
          style={{
            width: '70%',
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ width: '70%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box
          sx={{
            width: '68%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <FormControlLabel control={<Checkbox />} label="Remember Me" />
           <Button variant="text" onClick={handleForgotPassword}>
            Forgot Password?
          </Button> */}
        </Box>
        <Button
          sx={{
            width: '70%',
            marginTop: '20px',
          }}
          variant="contained"
          size="large"
          onClick={handleLogin}
        >
          Login
        </Button>
        <h4 style={{ fontWeight: 'semi-bold' }}>
          Don&apos;t have an account?
          <Button variant="text" onClick={handleSignUp}>
            Sign Up
          </Button>
        </h4>
      </Box>
    </div>
  );
}

export default Login;