
import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material';

function Profile() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        bgcolor: 'background.default',
        borderRadius: 3, 
        paddingTop: 4, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={500} gutterBottom>
            Personal details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Update your information and find out how it's used.
          </Typography>
        </Box>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 30,
          }}
        >
          A
        </Avatar>
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          User Name:
        </Typography>
        <TextField
          name='userName'
          variant="outlined"
          size='small'
          sx={{ width: '70%' }}
        />
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Display Name:
        </Typography>
        <TextField
          name='displayName'
          variant="outlined"
          size='small'
          sx={{ width: '70%' }}
        />
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Email Address:
        </Typography>
        <TextField
          name='displayName'
          variant="outlined"
          size='small'
          sx={{ width: '70%' }}
        />
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Phone Number:
        </Typography>
        <TextField
          name='displayName'
          variant="outlined"
          size='small'
          sx={{ width: '70%' }}
        />
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Address:
        </Typography>
        <TextField
          name='displayName'
          variant="outlined"
          size='small'
          sx={{ width: '70%' }}
        />
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{ width: '45%' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: '45%' }}
        >
          Save
        </Button>
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={500} gutterBottom>
            Security settings
          </Typography>
          <Typography variant="body1" gutterBottom>
            Change your security settings, set up secure authentication or delete your account.
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Reset Password:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: '70%' }}
        >
          Reset Password
        </Button>
      </Box>
      <Divider sx={{ width: '70%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '70%',
          padding: 2,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{ padding: 2 }}
        >
          Deactivate Account:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: '70%' }}
        >
          Delete
        </Button>
      </Box>
      <Divider sx={{ width: '70%' }} />
    </Box>
  )
}

export default Profile