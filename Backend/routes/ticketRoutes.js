const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import your database connection

// GET route to fetch all tickets
router.get('/available', async (req, res) => {
    try {
        const query = `
            SELECT
                id,
                event_name,
                event_venue,
                event_date,
                ticket_price,
                service_fee_percentage,
                total_tickets
            FROM Tickets
            WHERE total_tickets > 0; -- Only fetch tickets that are still available
        `;
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching available tickets:', error);
        res.status(500).json({ message: 'Failed to fetch available tickets' });
    }
});

// POST route to handle ticket purchase
router.post('/purchase', async (req, res) => {
    const { ticketId, buyerName, quantity } = req.body;

    console.log('Received purchase request:', { ticketId, buyerName, quantity }); // Log the received data

    if (!ticketId || !buyerName || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid purchase details!' });
    }

    try {
        // Start a transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();

        // Check if enough tickets are available
        const [ticketData] = await connection.query(
            `SELECT total_tickets, ticket_price, service_fee_percentage FROM Tickets WHERE id = ?`,
            [ticketId]
        );

        if (ticketData.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Ticket not found!' });
        }

        const { total_tickets, ticket_price, service_fee_percentage } = ticketData[0];
        if (total_tickets < quantity) {
            await connection.rollback();
            return res.status(400).json({ message: 'Not enough tickets available!' });
        }

        // Calculate total cost
        const ticketCost = ticket_price * quantity;
        const serviceFee = (ticketCost * service_fee_percentage) / 100;
        const totalCost = ticketCost + serviceFee;

        // Deduct tickets from inventory
        await connection.query(
            `UPDATE Tickets SET total_tickets = total_tickets - ? WHERE id = ?`,
            [quantity, ticketId]
        );

        // Save purchase details to the database
        const purchaseQuery = `
            INSERT INTO Purchases (ticket_id, buyer_name, quantity, total_cost, purchase_date)
            VALUES (?, ?, ?, ?, NOW())
        `;
        await connection.query(purchaseQuery, [ticketId, buyerName, quantity, totalCost]);

        // Commit the transaction
        await connection.commit();
        connection.release();

        res.status(201).json({
            message: 'Purchase successful!',
            totalCost: totalCost.toFixed(2),
        });
    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ message: 'Failed to process purchase' });
    }
});

module.exports = router;