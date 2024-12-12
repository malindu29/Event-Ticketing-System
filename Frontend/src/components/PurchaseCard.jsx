import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Typography, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function PurchaseCard({
  event_name = 'Event Name',
  event_venue, 
  event_date,
  ticket_price = 49.99,
  service_fee_percentage = 10,
  initialQuantity = 1,
  onPurchase = () => {}
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const serviceFee = (ticket_price * quantity * service_fee_percentage) / 100;
  const total = ticket_price * quantity + serviceFee;

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3, borderRadius: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
        {event_name}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
        {event_venue}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'center' }}>
        {event_date}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        How many tickets would you like?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleDecrement}
          sx={{ minWidth: '40px', fontSize: '18px' }}
        >
          -
        </Button>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            minWidth: '30px',
            textAlign: 'center',
          }}
        >
          {quantity} 
        </Typography>
        <Button
          variant="outlined"
          onClick={handleIncrement}
          sx={{ minWidth: '40px', fontSize: '18px' }}
        >
          +
        </Button>
      </Box>

      <CardContent sx={{ bgcolor: '#f9f9f9', borderRadius: 2, p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
          🎟 Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography>Tickets ({quantity} × LKR {ticket_price.toFixed(2)})</Typography>
          <Typography>LKR {(ticket_price * quantity).toFixed(2)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography>Service Fee ({service_fee_percentage}%)</Typography>
          <Typography>LKR {serviceFee.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Total
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            LKR {total.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>

      <Button
        onClick={() => onPurchase(quantity, total)}
        variant="contained"
        color="primary"
        sx={{ mt: 3, width: '100%', fontWeight: 'bold' }}
        startIcon={<ShoppingCartIcon />}
      >
        Purchase Tickets
      </Button>
    </Card>
  );
}

PurchaseCard.propTypes = {
    event_name: PropTypes.string,
    event_venue: PropTypes.string,
    event_date: PropTypes.string,
    ticket_price: PropTypes.number,
    service_fee_percentage: PropTypes.number,
    initialQuantity: PropTypes.number,
    onPurchase: PropTypes.func,
};