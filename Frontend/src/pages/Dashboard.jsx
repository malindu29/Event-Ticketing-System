import MainCard from '../components/MainCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LineChart, PieChart } from '@mui/x-charts';
import TotalEarnings from '../assets/Total-Earnings.png';
import Bookings from '../assets/Bookings.png';
import TodayEarnings from '../assets/Today-Earnings.png';
import Orders from '../assets/Orders.png';
import theme from '../styles/theme';

function Dashboard() {
  const cardsData = [
    {
      icon: TotalEarnings,
      title: "Total Earnings",
      subtitle: "$ 3450",
      bgcolor: 'primary.one',
    },
    {
      icon: Bookings,
      title: "Today's Booking",
      subtitle: 234,
      bgcolor: 'primary.two',
    },
    {
      icon: TodayEarnings,
      title: "Today's Earnings",
      subtitle: "$ 14500",
      bgcolor: 'primary.three',
    },
    {
      icon: Orders,
      title: "Completed Orders",
      subtitle: 874,
      bgcolor: 'primary.four',
    },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MainCard bgcolor={card.bgcolor} icon={card.icon} title={card.title} subtitle={card.subtitle} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          justifyContent: 'start',
          width: '100%',
          borderRadius: 4,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: 'fit-content',
            bgcolor: theme.palette.white.main,
            borderRadius: 4,
          }}
        >
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={700}
            height={450}
          />
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
            width: 'fit-content',
            bgcolor: theme.palette.white.main,
            borderRadius: 4,
            padding: 2,
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, },
                  { id: 1, value: 15, },
                  { id: 2, value: 20, },
                ],
              },
            ]}
            width={400}
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
