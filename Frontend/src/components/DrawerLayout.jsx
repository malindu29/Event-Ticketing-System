import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import theme from "../styles/theme"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProfileMenu from './ProfileMenu'; // Import the new ProfileMenu component
import PropTypes from 'prop-types';
import ProfilePic from '../assets/profilePic.jpeg';
// import Notification from '../assets/Notification.png';
import NotificationMenu from './NotificationMenu';
import LogoutIconImg from '../assets/Logout.png';
import Logo from '../assets/images.png';

const drawerWidth = 250;

const DrawerLayout = ({ children, title }) => {

  const navigate = useNavigate(); // Initialize useNavigate

  const [menuItemsList1, setMenuItemsList1] = useState([]); // State for menuItemsList1
  // const [menuItemsList2, setMenuItemsList2] = useState([]); // State for menuItemsList2
  const [userRole, setUserRole] = useState(null); // State for user role

  const [anchorEl, setAnchorEl] = useState(null); // State to open/close the profile menu
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // State for notification menu
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  // Fetch menu items from JSON files
  useEffect(() => {
    // Fetch menuItemsList1.json
    fetch('../../mock-data/menuItemsList1.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch menuItemsList1');
        }
        return response.json();
      })
      .then((data) => setMenuItemsList1(data))
      .catch((error) => console.error('Error fetching menuItemsList1:', error));
      // Fetch user role from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserRole(user.role);
      }

    // // Fetch menuItemsList2.json
    // fetch('../../mock-data/menuItemsList2.json')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch menuItemsList2');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => setMenuItemsList2(data))
    //   .catch((error) => console.error('Error fetching menuItemsList2:', error));
  }, []);

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the path when ListItemButton is clicked
  };

   // Handle profile menu click and close
   const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileMenuOpen(true);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuOpen(false);
  };

  // Notification menu handlers
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setNotificationMenuOpen(true);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ bgcolor: theme.palette.white.main, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px}` }}
      >
        <Toolbar>
          <Typography sx={{ color: 'black', fontWeight: 'bold' }} variant="h5" noWrap component="div">
            {title || 'Realtime Ticketing System'}
          </Typography>
          {/* Profile Icon and Notification Icon on the right */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box 
            onClick={handleNotificationMenuOpen}
            sx={{
                width: '50px',
                height: '50px',
                marginRight: 2,
                padding: 1,
                bgcolor: 'grey.main',
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <img src={Notification} style={{
                width: '70%',
                cursor: 'pointer',
              }}/>
          </Box> */}
          <Box 
            onClick={handleProfileMenuOpen}
            sx={{
              width: '40px',
              borderRadius: '100%',
              cursor: 'pointer'
            }}>
            <img
              src={ProfilePic}
              alt="Profile"
              style={{ width: 45, height: 45, borderRadius: '50%', }}
            />
          </Box>
          {/* Profile Menu */}
          <ProfileMenu
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            width: '100%',
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
          variant="h5"
        >
          Realtime Ticketing System
        </Typography> */}
        <img src={Logo} />
        <Divider />
        {/* <List>
          {menuItemsList1.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(path)}>
                <ListItemIcon>
                  <img src={icon} alt={text} style={{ width: 20, height: 20 }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <List>
          {menuItemsList1.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              {userRole === 'Customer' && text === 'Ticket Purchase' ? (
                <ListItemButton onClick={() => handleNavigation(path)}>
                  <ListItemIcon>
                    <img src={icon} alt={text} style={{ width: 20, height: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ) : (
                userRole === 'Vendor' && text !== 'Ticket Purchase' && (
                  <ListItemButton onClick={() => handleNavigation(path)}>
                    <ListItemIcon>
                      <img src={icon} alt={text} style={{ width: 20, height: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {menuItemsList2.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(path)}>
                <ListItemIcon>
                  <img src={icon} alt={text} style={{ width: 20, height: 20 }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Box sx={{ flexGrow: 1 }} />
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <img src={LogoutIconImg} alt="Logout" style={{ width: 20, height: 20 }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: theme.palette.grey.main, p: 3, width: '100%', }}>
        <Toolbar />
        {children}
      </Box>
      {/* Notification Menu */}
      <NotificationMenu
        anchorEl={notificationAnchorEl}
        open={notificationMenuOpen}
        onClose={handleNotificationMenuClose}
      />
    </Box>
  );
};

DrawerLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default DrawerLayout;