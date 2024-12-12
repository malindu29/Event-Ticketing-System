import { Box, Button, FormControl, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomTextField from "../components/CustomTextField";
import theme from "../styles/theme";
import HistoryTable from "../components/ConfigurationComponents/HistoryTable";
import axios from 'axios';
import { useState, useEffect } from 'react';

function Configuration() {

  const { control, handleSubmit } = useForm();
  const [ticketHistory, setTicketHistory] = useState([]); 

  const columns = [
    "Create Date",
    "Event Name",
    "Event Venue",
    "Total Tickets",
    "Ticket Release Rate",
    "Ticket Price",
    "Service Fee Percentage %",
    "Event Date",
    "Event Description",
  ];

  // const rows = [
  //   {
  //     "Event Name": "Kandy Esala Perahera",
  //     "Event Venue": "Sri Dalada Maligawa, Kandy",
  //     "Total Tickets": 5000,
  //     "Ticket Release Rate": "200 per day",
  //     "Ticket Price": "LKR 1500",
  //     "Service Fee Percentage": 20,
  //     "Event Date": "2024-08-10",
  //     "Event Description": "One of the grandest cultural and religious processions in Sri Lanka, showcasing traditional dancers, drummers, and elephants."
  //   },
  //   {
  //     "Event Name": "Galle Literary Festival",
  //     "Event Venue": "Dutch Fort, Galle",
  //     "Total Tickets": 3000,
  //     "Ticket Release Rate": "100 per day",
  //     "Ticket Price": "LKR 1000",
  //     "Service Fee Percentage": 3,
  //     "Event Date": "2024-01-20",
  //     "Event Description": "An international literary event featuring authors, poets, and literary enthusiasts from around the world."
  //   },
  //   {
  //     "Event Name": "Colombo Fashion Week",
  //     "Event Venue": "Shangri-La Hotel, Colombo",
  //     "Total Tickets": 2000,
  //     "Ticket Release Rate": "150 per day",
  //     "Ticket Price": "LKR 3000",
  //     "Service Fee Percentage": 5,
  //     "Event Date": "2024-05-15",
  //     "Event Description": "An annual fashion event highlighting the work of Sri Lanka's leading designers and promoting ethical fashion."
  //   },
  //   {
  //     "Event Name": "Ella Adventure Festival",
  //     "Event Venue": "Ella Town, Ella",
  //     "Total Tickets": 1500,
  //     "Ticket Release Rate": "50 per day",
  //     "Ticket Price": "LKR 2000",
  //     "Service Fee Percentage": 1,
  //     "Event Date": "2024-06-25",
  //     "Event Description": "A thrilling outdoor festival offering hiking, ziplining, and other adventure activities in the scenic hills of Ella."
  //   },
  //   {
  //     "Event Name": "Jaffna Food Festival",
  //     "Event Venue": "Jaffna Cultural Centre, Jaffna",
  //     "Total Tickets": 2500,
  //     "Ticket Release Rate": "75 per day",
  //     "Ticket Price": "LKR 800",
  //     "Service Fee Percentage": 10,
  //     "Event Date": "2024-11-12",
  //     "Event Description": "A celebration of Jaffna's unique culinary heritage, featuring authentic Tamil dishes and cooking demonstrations."
  //   }
  // ]; 
  
  // Fetch ticket history from the backend when the component mounts
  useEffect(() => {
    const fetchTicketHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets/history');
        setTicketHistory(response.data);  // Set the fetched data
      } catch (error) {
        console.error("Error fetching ticket history:", error);
        alert('Failed to load ticket history');
      }
    };
    fetchTicketHistory(); // Call the function to fetch the data
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleAddTicket = async (data) => {
    console.log("Data being sent to the backend:", data); // Debugging
    try {
        const vendorUsername = "vendor_username"; // Replace with actual vendor username
        const response = await axios.post('http://localhost:5000/api/tickets/create', {
            ...data,
            vendor_username: vendorUsername,
        });
        alert(response.data.message || 'Ticket added successfully!');

        // Refresh the page
        window.location.reload();

    } catch (error) {
        console.error("Error:", error); // Log the actual error
        alert(error.response?.data?.message || 'Failed to add ticket!');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        gap: 4,
        maxWidth: '100%',
        p: 0,
        m: 0,
        bgcolor: theme.palette.grey.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingY: 8,
          alignItems: 'center',
          height: 'fit-content',
          width: '100%',
          bgcolor: theme.palette.white.main,
          borderRadius: 3,
        }}
      >
        <FormControl sx={{ display: "flex", gap: 2, }}>
          <Box sx={{ display: "flex", flexDirection: 'row', gap: 3 }}>
            <Box>
              <CustomTextField
                  required
                  type={"text"}
                  name="eventName"
                  label="Event Name"
                  control={control}
                  fullWidth
                />
            </Box>
            <Box>
              <CustomTextField
                    required
                    type={"text"}
                    name="eventVenue"
                    label="Event Venue"
                    control={control}
                    fullWidth
                  />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: 'row', gap: 3 }}>
            <Box>
              <CustomTextField
                  required
                  type={"number"}
                  name="totalTicket"
                  label="Total Ticket"
                  control={control}
                  fullWidth
                />
            </Box>
            <Box>
              <CustomTextField
                    required
                    type={"number"}
                    name="tIcketReleaseRate"
                    label="Ticket Release Rate"
                    control={control}
                    fullWidth
                  />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: 'row', gap: 3 }}>
            <Box>
              <CustomTextField
                  required
                  type={"number"}
                  name="ticketPrice"
                  label="Ticket Price"
                  control={control}
                  fullWidth
                />
            </Box>
            <Box>
              <CustomTextField
                    required
                    type={"number"}
                    name="serviceFeePercentage"
                    label="Service Fee Percentage"
                    control={control}
                    fullWidth
                  />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: 'row', gap: 3 }}>
            <Box>
              <CustomTextField
                  required
                  type={"date"}
                  name="eventDate"
                  label="Event Date"
                  control={control}
                  fullWidth
                />
            </Box>
            <Box>
              <CustomTextField
                type={"textArea"}
                name="eventDescription"
                label="Event Description"
                control={control}
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 2, }}>
            <Button variant="outlined" color="error" sx={{ width: '50%' }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ width: '50%' }} onClick={handleSubmit(handleAddTicket)} >
              Add Ticket
            </Button>
          </Box>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingY: 4,
          paddingX: 4,
          alignItems: 'center',
          height: 'fit-content',
          width: '100%',
          bgcolor: theme.palette.white.main,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, }}>
          Ticket Create History
        </Typography>
        <Box sx={{ width: '100%' }}>
          <HistoryTable columns={columns} rows={ticketHistory} />
        </Box>
      </Box>
    </Box>
  );
}

export default Configuration;