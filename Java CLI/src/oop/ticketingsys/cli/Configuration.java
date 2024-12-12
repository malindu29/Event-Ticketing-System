package oop.ticketingsys.cli;


import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.InputMismatchException;
import java.util.Scanner;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Configuration {
    private int totalTickets;
    private int ticketReleaseRate;
    private int customerRetrievalRate;
    private int maxTicketCapacity;
    private int numOfCustomers;
    private int numOfVendors;

    public Configuration() {}

    public void configureSystem() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("*****************************************************");
        System.out.println("*                TICKETING SYSTEM                   *");
        System.out.println("*****************************************************");


        this.totalTickets = getValidInput(scanner, "Enter total tickets: ");
        this.ticketReleaseRate = getValidInput(scanner, "Enter ticket release rate: ");
        this.customerRetrievalRate = getValidInput(scanner, "Enter customer retrieval rate: ");
        this.maxTicketCapacity = getValidInput(scanner, "Enter max ticket capacity: ");
        while (maxTicketCapacity < totalTickets) {
            System.out.println("Max ticket capacity must be greater than or equal to the total number of tickets.");
            this.maxTicketCapacity = getValidInput(scanner, "Enter max ticket capacity (positive integer, at least equal to total tickets): ");
        }
        this.numOfCustomers = getValidInput(scanner,"Enter number of customers: ");
        this.numOfVendors = getValidInput(scanner, "Enter number of vendors: ");

        System.out.println("\nConfiguration Completed...");
    }

    private int getValidInput(Scanner scanner, String prompt) {
        int input;
        while (true) {
            System.out.print(prompt);
            try {
                input = scanner.nextInt();
                if(input > 0){
                    return input;
                } else {
                    System.out.println("Enter positive integer");
                }
            }catch (InputMismatchException e) {
                System.out.println("input valid integer");
                scanner.next();
            }

        }
    }

    public Configuration(int totalTickets, int ticketReleaseRate, int customerRetrievalRate, int maxTicketCapacity) {
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.customerRetrievalRate = customerRetrievalRate;
        this.maxTicketCapacity = maxTicketCapacity;
        this.numOfCustomers = 0;
        this.numOfVendors = 0;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public double getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    public void setTicketReleaseRate(int ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    public double getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    public int getMaxTicketCapacity() {
        return maxTicketCapacity;
    }

    public void setMaxTicketCapacity(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }

    public int getNumOfCustomers() {
        return numOfCustomers;
    }

    public void setNumOfCustomers(int numOfCustomers) {
        this.numOfCustomers = numOfCustomers;
    }

    public int getNumOfVendors() {
        return numOfVendors;
    }

    public void setNumOfVendors(int numOfVendors) {
        this.numOfVendors = numOfVendors;
    }

    // Save configuration to JSON
    public void saveToFile(String CONFIG_FILE) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try (FileWriter writer = new FileWriter(CONFIG_FILE)) {
            gson.toJson(this, writer);
            System.out.println("Configuration saved successfully!");
        }catch (IOException e){
            System.err.println("Error saving configuration: " + e.getMessage());
        }
    }

    // Load configuration from JSON
    public static Configuration loadFromFile(String CONFIG_FILE) {
        Gson gson = new Gson();
        try (FileReader reader = new FileReader(CONFIG_FILE)) {
            return gson.fromJson(reader, Configuration.class);
        }catch (IOException e){
            System.err.println("Error loading configuration: " + e.getMessage());
        }
        return null;
    }

}

