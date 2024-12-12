import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import theme from "../styles/theme"

MainCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    bgcolor: PropTypes.string.isRequired,
  };

export default function MainCard({ icon, title, subtitle, bgcolor }) {
  return (
    <Card sx={{ minWidth: 275, paddingX: '10px', paddingY: '8px', borderRadius: 4, bgcolor }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Icon */}
            <Box>
                <img src={icon} style={{
                    width: '50px',
                    height: '50px',
                }}/>
            </Box>
            {/* Title and Subtitle */}
            <Box>
                <Typography variant="h6" component="div" sx={{ color: theme.palette.white.main, fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: theme.palette.white.main, fontWeight: 'bold' }}>
                    {subtitle}
                </Typography>
            </Box>
        </CardContent>
    </Card>
  );
}
