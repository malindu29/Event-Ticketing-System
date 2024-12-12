package oop.ticketingsys.cli;

public class Ticket {
    private int ticketId;
    private String event;
    private int ticketPrice;

    public Ticket(){}

    public Ticket(int ticketId, String event, int ticketPrice) {
        this.ticketId = ticketId;
        this.event = event;
        this.ticketPrice = ticketPrice;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public int getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(int ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", event='" + event + '\'' +
                ", ticketPrice=" + ticketPrice +
                '}';
    }
}
