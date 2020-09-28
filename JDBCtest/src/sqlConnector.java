import java.util.Scanner;

import java.sql.*;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;



public class sqlConnector {
    /**
     * getSHA and toHexString functions were found on geeksforgeeks.
     * At URL :https://www.geeksforgeeks.org/sha-256-hash-in-java/
     */
    public static byte[] getSHA(String input) throws NoSuchAlgorithmException{
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return md.digest(input.getBytes(StandardCharsets.UTF_8));
    }

    public static String toHexString(byte[] hash){
        BigInteger number = new BigInteger(1, hash);
        StringBuilder hexString = new StringBuilder(number.toString(16));
        while(hexString.length() < 32){
            hexString.insert(0, '0');
        }
        return hexString.toString();
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        int tries = 0;
        int maxTries = 3;
        while(true) {
            Connection conn = null;
            String url = "jdbc:mysql://localhost:3306/sys?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
            String user = "root";
            /**
             * INSERT YOUR PASSWORD
             * FOR YOUR LOCAL MACHINE
             * BELOW (String password:)
             */
            String password = "";
            Scanner userName = new Scanner(System.in);
            System.out.println("Enter Username:");
            String username = userName.nextLine();
            Scanner passWord = new Scanner(System.in);
            System.out.println("Enter Password:");
            String pass = passWord.nextLine();
            Scanner firstName = new Scanner(System.in);
            System.out.println("Enter First Name:");
            String fName = firstName.nextLine();
            Scanner lastName = new Scanner(System.in);
            System.out.println("Enter Last Name:");
            String lName = lastName.nextLine();
            Scanner emailladdress = new Scanner(System.in);
            System.out.println("Enter Email Address:");
            String email = emailladdress.nextLine();

            String hashedPass = toHexString(getSHA(pass));


            try {
                conn = DriverManager.getConnection(url, user, password);
                CallableStatement stmnt = conn.prepareCall("{call createUserAccount(?,?,?,?,?)}");
                stmnt.setString(1, username);
                stmnt.setString(2, hashedPass);
                stmnt.setString(3, fName);
                stmnt.setString(4, lName);
                stmnt.setString(5, email);
                stmnt.execute();
                stmnt.close();
                break;
            } catch (SQLIntegrityConstraintViolationException e) {
                System.out.println("Username is already taken. Please try again");
                tries++;
                if (tries == maxTries) {
                    e.printStackTrace();
                }
            } catch (SQLException e) {
                tries++;
                if (tries == 0) {
                    e.printStackTrace();
                }
            }

        }
    }

}


