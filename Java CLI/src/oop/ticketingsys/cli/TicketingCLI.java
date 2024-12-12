package oop.ticketingsys.cli;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class TicketingCLI {
    private static boolean running = false;

    private static final String CONFIG_FILE = "config.json";
    private static final List<Thread> threads = new ArrayList<>();

    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        Configuration config = new Configuration();

        config.configureSystem();

        config.saveToFile(CONFIG_FILE);


        TicketPool ticketPool = new TicketPool(config.getMaxTicketCapacity());


        while (true) {
            if (!running){
                System.out.println("Enter command (start/stop):");
            }

            String command = scanner.nextLine().toLowerCase();

            switch (command) {
                case "start":
                    if (!running) {
                        startTicketHandling(config, ticketPool);
                        running = true;
                    } else {
                        Logger.logError("Ticket handling is already running.");
                    }
                    break;
                case "stop":
                    if (running) {
                        stopTicketHandling();
                    }
                    Logger.logError("Exiting the application. Goodbye!");
                    scanner.close();
                    System.exit(0);
                    break;
                default:
                    if (!running){
                        Logger.logError("Invalid command. Please enter 'start' or 'stop'.");
                    }
            }
        }
    }
    private static void startTicketHandling(Configuration config, TicketPool ticketPool) {
        Logger.logError("Starting ticket handling operations...");
        running = true;

        // Create Vendors
        Vendor[] vendors = new Vendor[config.getNumOfVendors()]; // Creating array of vendors
        for (int i = 0; i < vendors.length; i++) {
            vendors[i] = new Vendor(ticketPool, config.getTotalTickets(), (int) config.getTicketReleaseRate());
            Thread vendorThread = new Thread(vendors[i], "Vendor ID-" + i);
            vendorThread.start();
        }

        // Create Customers
        Customer[] customers = new Customer[config.getNumOfCustomers()]; // Creating array of customers
        for (int i = 0; i < customers.length; i++) {
            // Assign each customer a random number of tickets between 1 and 10
            int ticketQuantity = 1;
            customers[i] = new Customer(ticketPool, (int) config.getCustomerRetrievalRate(),ticketQuantity); // Retrieval tickets from the pool
            Thread customerThread = new Thread(customers[i], "Customer ID-" + i);
            customerThread.start();
        }

    }

    private static void stopTicketHandling() {
        System.out.println("Stopping ticket handling operations...");
        running = false;
        for (Thread thread : threads) {
            try {
                thread.interrupt(); // Interrupt each thread
            } catch (Exception e) {
                System.out.println("Error stopping thread: " + thread.getName());
            }
        }
        threads.clear(); // Clear the list of threads
        Logger.logError("Ticket handling stopped.");

    }

}

