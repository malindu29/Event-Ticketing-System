const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import your database connection

// POST route to create a new ticket
router.post('/create', async (req, res) => {
    const {
        vendor_username,
        eventName,
        eventVenue,
        totalTicket,
        tIcketReleaseRate,
        ticketPrice,
        serviceFeePercentage,
        eventDate,
        eventDescription,
    } = req.body;

    if (
        // !vendor_username ||        // Uncomment this line if you want to require vendor_username
        !eventName ||
        !eventVenue ||
        !totalTicket ||
        !ticketPrice ||
        !serviceFeePercentage ||
        !eventDate
    ) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
    }

    try {
        const query = `
            INSERT INTO Tickets 
            (vendor_username, event_name, event_venue, total_tickets, ticket_release_rate, 
            ticket_price, service_fee_percentage, event_date, event_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(query, [
            vendor_username,
            eventName,
            eventVenue,
            totalTicket,
            tIcketReleaseRate,
            ticketPrice,
            serviceFeePercentage,
            eventDate,
            eventDescription,
        ]);

        res.status(201).json({ message: 'Ticket created successfully!' });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'error' });
    }
});

// GET route to fetch ticket creation history
router.get('/history', async (req, res) => {
    const query = `
        SELECT
            create_date,
            event_name,
            event_venue,
            total_tickets,
            ticket_release_rate,
            ticket_price,
            service_fee_percentage,
            event_date,
            event_description
        FROM Tickets
        ORDER BY create_date DESC;
    `;

    try {
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching ticket history:', error);
        res.status(500).json({ message: 'Failed to fetch ticket history' });
    }
});

module.exports = router;