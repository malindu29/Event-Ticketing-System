import * as React from 'react';
import backgroundImage from '../assets/bg-image.jpg';
import { Box, TextField, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, Button, useTheme, Select, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";

function SignUp() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const vendor = 'vendor';
  const customer = 'customer';

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        role,
        username,
        email,
        password,
      });
      alert("Registration successful!");

      // Reset the form fields
        setRole('');
        setUsername('');
        setEmail('');
        setPassword('');
        // Refresh the page
        window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };
  
  const handleMouseUpPassword = (event) => {
      event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = () => {
      navigate('/login');
  };

  const handleChange = (event) => {
    setRole(event.target.value);
};
  
  return (
    <div style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <div
          style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(19, 62, 135, 0.8)', // #133E87 with 20% opacity
          zIndex: 1,
          }}
      />
      <Box sx={{
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
      }}>
        <h1 style={{
        }}>Create New Account</h1>
        <Box sx={{ minWidth: "70%" }}>
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
            id="username" 
            label="Username" 
            variant="outlined"
            size="medium"
            style={{ width: '70%' }}
            value={username} // Bind the state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <PersonIcon />
                    </InputAdornment>
                ),
            }}
        />
        <TextField 
            id="email" 
            label="Email" 
            variant="outlined"
            size="medium"
            style={{ width: '70%' }}
            value={email} // Bind the state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <EmailIcon />
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
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                    }
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
        <Button sx={{
            width: '70%',
            marginTop: '20px',
            }} 
            variant="contained"
            size="large"
            onClick={handleRegister}
        >
            Sign Up
        </Button>
        <h4 style={{
            fontWeight: 'semi-bold',
        }}>
            Already have an account? 
            <Button 
                variant='text'
                onClick={handleLogin}
            >
                Login
            </Button>
        </h4>
      </Box>
    </div>
  )
}

export default SignUp
