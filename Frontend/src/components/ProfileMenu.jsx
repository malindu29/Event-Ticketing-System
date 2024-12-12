import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ProfilePic from '../assets/profilePic.jpeg';
import LogoutIconImg from '../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProfileMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.username);
      setUserRole(user.role);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: 7, marginLeft: 2 }}
    >
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: 2,
          cursor: 'default',
          marginX: 2,
        }}
      >
        {/* Profile Picture */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default',
          }}
        >
          <img
            src={ProfilePic}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
        </Box>
      </MenuItem>
      <MenuItem
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'default',
          marginX: 2,
        }}
      >
        <Typography variant="body1">
          {username}
        </Typography>
      </MenuItem>
      <MenuItem
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'default',
          marginX: 2,
        }}
      >
        {userRole}
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: 2,
          marginX: 2,
          color: 'error.main',
        }}
      >
        <img
          src={LogoutIconImg}
          alt="Logout"
          style={{ width: 20, height: 20, marginRight: 5 }}
        />
        Logout
      </MenuItem>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileMenu;