import { Box, Grid } from "@mui/material"
import theme from "../styles/theme"

function Notifications() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      bgcolor: theme.palette.grey.main,
      paddingTop: 0.5,
      paddingX: 3,
      borderRadius: 3,
    }}>
      <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid sx={{
          bgcolor: theme.palette.white.main,
          borderRadius: 2,
          paddingY: 0.01,
          paddingX: 2,
        }}>
          <h1>NOtification</h1>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Notifications
