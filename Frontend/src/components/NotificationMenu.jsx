import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, List, ListItemAvatar, Avatar, ListItemText, Divider, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NotificationMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch the JSON file
    fetch("../../mock-data/notifications.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return response.json();
      })
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ marginTop: 7, marginLeft: 2 }}
    >
      <Box
        sx={{
          marginX: 2,
          marginTop: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Notifications
        </Typography>
        <Typography
          color="primary.main"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/notifications'); // Navigate to the /notification page
            onClose(); // Close the menu
          }}
        >
          See All
        </Typography>
      </Box>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginX: 2 }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <Button
              variant="text"
              alignItems="flex-start"
              sx={{
                textAlign: 'left',
                textTransform: 'none',
              }}
            >
              <ListItemAvatar>
                <Avatar alt={notification.title} src={notification.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {notification.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Button>
            {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Menu>
  );
};

NotificationMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationMenu;