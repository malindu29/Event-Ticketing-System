package oop.ticketingsys.cli;



import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    private static final String LOG_FILE = "system.log";
    private static final String RED = "\u001B[31m";
    private static final String RESET = "\u001B[0m";



    // Log an error message in red on the console, plain text in the file
    public static synchronized void logError(String message) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String logMessage = timestamp + " " + message;
        System.out.println(RED + logMessage + RESET); // Print in red
        writeToFile(logMessage);
    }

    // Helper method to write logs to the file
    private static void writeToFile(String logMessage) {
        try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
            writer.write(logMessage + "\n");
        } catch (IOException e) {
            System.err.println("Failed to write log: " + e.getMessage());
        }
    }
}


