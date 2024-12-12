import { useState } from "react";
import { Box, Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import Table from "../components/Table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "../styles/theme";

const handleDelete = (id) => {
  console.log('Delete row with id:', id);
  // Add logic to delete the row
  // Example: Show confirmation and then remove the row from the state
};

function VendorManagement() {

  const [open, setOpen] = useState(false); // Modal state
  const [newVendor, setNewVendor] = useState({
    vendorId: '',
    vendorName: '',
    phoneNumber: '',
    ticketCount: '',
    availableTicketCount: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('New Vendor Data:', newVendor);
    // Add logic to save vendor data, such as updating state or calling an API
    handleClose();
  };

  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [editVendor, setEditVendor] = useState(null); // State for the vendor being edited

  const handleEditOpen = (row) => {
    setEditVendor(row); // Set the selected row data
    setEditModalOpen(true); // Open the modal
  };

  const handleEditClose = () => {
    setEditModalOpen(false); // Close the modal
    setEditVendor(null); // Clear the data
  };

  const handleEditSubmit = () => {
    console.log("Edited Vendor Data:", editVendor);
    // Add logic to update the vendor data in your state or API
    handleEditClose();
  };

  const columns = [
    {
      field: 'vendorId',
      headerName: 'Vendor Id',
      flex: 1, // Dynamically divide column width
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'vendorName',
      headerName: 'Vendor Name',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'ticketCount',
      headerName: 'Ticket Count',
      flex: 1,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'availableTicketCount',
      headerName: 'Available Ticket Count',
      flex: 1,
      type: 'number',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      flex: 0,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={() => handleEditOpen(params.row)} // Pass row data
        >
          <EditIcon />
        </IconButton>
      ),
    },  
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  
  const rows = [
    { id: 1, vendorId: 1, vendorName: 'Snow', phoneNumber: 1234567890, ticketCount: 35, availableTicketCount: 35 },
    { id: 2, vendorId: 2, vendorName: 'Lannister', phoneNumber: 1234567890, ticketCount: 42, availableTicketCount: 40 },
    { id: 3, vendorId: 3, vendorName: 'Lannister', phoneNumber: 1234567890, ticketCount: 45, availableTicketCount: 43 },
    { id: 4, vendorId: 4, vendorName: 'Stark', phoneNumber: 1234567890, ticketCount: 16, availableTicketCount: 13 },
    { id: 5, vendorId: 5, vendorName: 'Targaryen', phoneNumber: 1234567890, ticketCount: null, availableTicketCount: null },
    { id: 6, vendorId: 6, vendorName: 'Melisandre', phoneNumber: null, ticketCount: 150, availableTicketCount: 120 },
    { id: 7, vendorId: 7, vendorName: 'Clifford', phoneNumber: 1234567890, ticketCount: 44, availableTicketCount: null },
    { id: 8, vendorId: 8, vendorName: 'Frances', phoneNumber: 1234567890, ticketCount: 36, availableTicketCount: 35 },
    { id: 9, vendorId: 9, vendorName: 'Roxie', phoneNumber: 1234567890, ticketCount: 65, availableTicketCount: 56 },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: '99.8%',
          bgcolor: theme.palette.white.main, // Updated
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          width: '100%',
          marginBottom: 3,
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', }}>All Vendors</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" sx={{ bgcolor: 'primary.main', marginRight: 2, }} onClick={handleOpen}>Add Vendor</Button>
          <Button variant="outlined" color="error">delete</Button>
        </Box>
        <Table
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Centers content within cells
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5', // header background color
            },
          }}
        />
      </Box>
      {/* Add Vendor Modal */}
      <Dialog open={open} onClose={handleClose} sx={{ 
        '& .MuiPaper-root': { // Targeting the Paper component inside the Dialog
          borderRadius: 6, // Adjust the radius value as needed
        },
        textAlign: 'center', 
      }}>
        <DialogTitle variant="h5" sx={{
          marginTop: 5,
          marginX: 5,
          fontWeight: 'bold',
        }}>Add New Vendor</DialogTitle>
        <DialogContent sx={{
           marginX: 5,
        }}>
          <TextField
            margin="dense"
            label="Vendor ID"
            name="vendorId"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Vendor Name"
            name="vendorName"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Ticket Count"
            name="ticketCount"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: 8, marginX: 5, }}>
          <Button onClick={handleClose} variant="outlined" color="error" sx={{ width: '45%', }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ width: '45%', }}>
            Add Vendor
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editModalOpen}
        onClose={handleEditClose}
        sx={{ 
          '& .MuiPaper-root': { // Targeting the Paper component inside the Dialog
            borderRadius: 6, // Adjust the radius value as needed
          },
          textAlign: 'center', 
      }}
      >
        <DialogTitle variant="h5"
          sx={{
            marginTop: 5,
            marginX: 5,
            fontWeight: 'bold',
        }}>Edit Vendor</DialogTitle>
        <DialogContent sx={{
           marginX: 5,
        }}>
          <TextField
            margin="dense"
            label="Vendor ID"
            name="vendorId"
            fullWidth
            variant="outlined"
            value={editVendor?.vendorId || ''} // Pre-fill with selected data
            onChange={(e) =>
              setEditVendor({ ...editVendor, vendorId: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Vendor Name"
            name="vendorName"
            fullWidth
            variant="outlined"
            value={editVendor?.vendorName || ''}
            onChange={(e) =>
              setEditVendor({ ...editVendor, vendorName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            variant="outlined"
            value={editVendor?.phoneNumber || ''}
            onChange={(e) =>
              setEditVendor({ ...editVendor, phoneNumber: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Ticket Count"
            name="ticketCount"
            fullWidth
            variant="outlined"
            value={editVendor?.ticketCount || ''}
            onChange={(e) =>
              setEditVendor({ ...editVendor, ticketCount: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Available Ticket Count"
            name="availableTicketCount"
            fullWidth
            variant="outlined"
            value={editVendor?.availableTicketCount || ''}
            onChange={(e) =>
              setEditVendor({ ...editVendor, availableTicketCount: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: 8, marginX: 5, }} >
          <Button
            onClick={handleEditClose}
            variant="outlined"
            color="error"
            sx={{ width: '45%', }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            sx={{ width: '45%', }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default VendorManagement
