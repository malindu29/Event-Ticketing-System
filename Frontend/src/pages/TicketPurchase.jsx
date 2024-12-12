import { useEffect, useState } from "react";
import { Box, Grid, } from "@mui/material";
import PurchaseCard from "../components/PurchaseCard";

function TicketPurchase() {
  const [tickets, setTickets] = useState([]); // State to store fetched ticket data
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePurchase = async (ticketId, quantity) => {
    const buyerName = prompt("Enter your name for the purchase:");
    if (!buyerName) {
        alert("Purchase canceled: Buyer name is required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/ticketsPurchase/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticketId, buyerName, quantity }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to purchase ticket.");
        }

        const data = await response.json();
        alert(`Purchase successful! Total cost: LKR ${data.totalCost}`);
        // Optionally refresh ticket data here
        // Refresh the page
        window.location.reload();
    } catch (error) {
        console.error("Purchase error:", error);
        alert(`Purchase failed: ${error.message}`);
    }
};

useEffect(() => {
  fetch("http://localhost:5000/api/ticketsPurchase/available")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch ticket data");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched tickets:", data); // Log the fetched data
      const updatedTickets = data.map(ticket => ({
        ...ticket,
        ticket_price: parseFloat(ticket.ticket_price),
        service_fee_percentage: parseFloat(ticket.service_fee_percentage),
        event_date: new Date(ticket.event_date).toISOString().split('T')[0]
      }));
      setTickets(updatedTickets); // Set fetched data to state
    })
    .catch((error) => console.error("Error fetching tickets:", error));
}, []);

useEffect(() => {
  console.log("Tickets state updated:", tickets); // Log the state update
}, [tickets]);

  return (  
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 4,
        marginX: 4,
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          gap: 7.4,
          justifyContent: "start",
        }}
      >
        {tickets.map((ticket, index) => (
          <PurchaseCard
            key={index} // Use a unique key for each ticket
            event_name={ticket.event_name}
            event_venue={ticket.event_venue}
            event_date={ticket.event_date}
            ticket_price={ticket.ticket_price}
            service_fee_percentage={ticket.service_fee_percentage}
            initialQuantity={1} // Default initial quantity
            onPurchase={(quantity) => handlePurchase(ticket.id, quantity)}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default TicketPurchase;