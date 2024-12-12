package oop.ticketingsys.cli;

public class Customer implements Runnable {
    private TicketPool ticketPool;
    private int customerRetrievalRate;
    private int ticketQuantity;

    public Customer(TicketPool ticketPool, int customerRetrievalRate, int ticketQuantity) {
        this.ticketPool = ticketPool;
        this.customerRetrievalRate = customerRetrievalRate;
        this.ticketQuantity = ticketQuantity;
    }


    @Override
    public void run() {
        for (int i = 0; i < ticketQuantity; i++) {
            Ticket ticket =ticketPool.removeTicket();
            try {
                Thread.sleep(customerRetrievalRate*1000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e.getMessage());
            }
        }
    }
}
