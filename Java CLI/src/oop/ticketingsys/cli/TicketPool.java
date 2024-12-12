package oop.ticketingsys.cli;

import java.util.LinkedList;
import java.util.Queue;

public class TicketPool {
    private Queue<Ticket> ticketQueue;
    private int maxTicketCapacity;
    private int nextTicketId;

    public TicketPool(int maxTicketCapacity) {
        ticketQueue = new LinkedList<>();
        this.maxTicketCapacity = maxTicketCapacity;
        this.nextTicketId = 1;

    }

    //Vendor is called addTickets() method
    public synchronized void addTicket(Ticket ticket) {
        while (ticketQueue.size() >= maxTicketCapacity) {
            try{
                Logger.logError(Thread.currentThread().getName() + " waiting as ticket pool is full...");
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace(); // For command line interface (CLI)
                throw new RuntimeException(e.getMessage()); // For Client-Server application
            }
        }
        this.ticketQueue.add(ticket);
        notifyAll();
        Logger.logError("Ticket added by - " + Thread.currentThread().getName() + " - current size is - " + ticketQueue.size());

    }

    //Customer is called removeTicket() method
    public synchronized Ticket removeTicket() {
        while (ticketQueue.isEmpty()){
            try {
                Logger.logError(Thread.currentThread().getName() + " waiting as no tickets are available...");
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        }

        Ticket ticket = ticketQueue.poll();
        if (ticket != null) {
            ticket.setTicketId(nextTicketId++); // Assign a unique ticket ID
        }
        notifyAll();
        Logger.logError("Ticket bought by - " + Thread.currentThread().getName() + " - current size is - " + ticketQueue.size() + " - Ticket is - " + ticket);
        return ticket;
    }
}
