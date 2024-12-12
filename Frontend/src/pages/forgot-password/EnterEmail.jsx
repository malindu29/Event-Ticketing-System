// import * as React from 'react';
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from '../../assets/bg-image.jpg';
import { useNavigate } from 'react-router-dom';


function EnterEmail() {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSendOTP = () => {
        navigate('/ForgotPassword/EnterOTP');
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
                paddingY: '70px',
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
                }}>Forgot Password</h1>
                <TextField
                    id="input-with-icon-textfield"
                    label="Email"
                    variant="outlined"
                    style={{
                        width: '70%',
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button sx={{
                    width: '70%',
                    marginTop: '20px',
                    }}
                    variant="contained" 
                    size="large"
                    onClick={handleSendOTP}
                >
                    Send OTP Code
                </Button>
                <h4 style={{
                    fontWeight: 'semi-bold',
                }}>
                    Remember your password? 
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

export default EnterEmail
