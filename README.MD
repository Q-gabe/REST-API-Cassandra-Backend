# REST-API-Cassandra-Backend

A simple REST API implementation using Express NodeJS with Cassandra for persistent data. [Express-Cassandra](https://github.com/masumsoft/express-cassandra) is used as a Cassandra ORM for data handling.

## Prerequisites
* Ensure that you have [Cassandra] installed.
  * Homebrew is recommended for Mac
    ```sh
    brew install cassandra
    ```
* Ensure you have Cassandra query language shell installed
  ```sh
  pip install cql
  ```
* Ensure you have [NodeJS](https://nodejs.org/en/download/) installed.

## Getting Started
1. Clone the repository and navigate to it.
   ```sh
   git clone https://github.com/Q-gabe/REST-API-Cassandra-Backend.git
   cd REST-API-Cassandra-Backend
   ```

### Cassandra Database
1. Launch Cassandra.
   ```sh
   cassandra
   ```
2. Enter Cassandra Query Language Shell (cqlsh).
   ```sh
   cqlsh
   ```
   (If you have issues with this step, check the Troubleshooting Errors section)
3. Enter the following command
   ```cql
   SOURCE './database/init.cql'
   ```
   (Ensure you are in the repository directory)
4. 

### API Server
1. Launch the server.
   ```
   yarn run start
   ```

2. You can now access endpoints as detailed by the API routes section.

### Clean up
1. Stop Cassandra.
   ```sh
   ps -ax | grep -i cassandra | awk '{print$1}' | xargs kill -9
   ```
2. Stop the API server using <kbd>Ctrl</kbd>+<kbd>C</kbd>

## API Routes
|Route Name |URL   	        |HTTP Verb   	|Description   	                        |
|---	    |---	        |---	        |---	                                |
|list   	|/api   	    |GET   	        |Shows all pets information.   	        |
|create   	|/api/   	    |POST  	        |Creates a pet information entry.       |
|show   	|/api/:name   	|GET   	        |Shows a specific pet's information.    |
|update   	|/api/:name   	|PUT   	        |Updates a pet's information.   	    |
|remove   	|/api/:name   	|DELETE         |Remove a pet's information.   	        |

# Troubleshooting Errors
If you see errors like this:
```sh
[0.001s][warning][gc] -Xloggc is deprecated. Will use -Xlog:gc:/usr/local/Cellar/cassandra/3.11.8/libexec/logs/gc.log instead.
intx ThreadPriorityPolicy=42 is outside the allowed range [ 0 ... 1 ]
Improperly specified VM option 'ThreadPriorityPolicy=42'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
```
This is because Cassandra in its current stable release at 3.11.8 only works with Java 8. (You can check your current Java version by running `java -version`).

Here's how to fix it:
```
# Install OpenJDK Java Version 8
brew tap homebrew/cask-versions
brew cask install homebrew/cask-versions/adoptopenjdk8
# Check if "AdoptOpenJDK 8" is present in your JVMs.
/usr/libexec/java_home -V
# Switch to JDK 8
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
# To return to your original JDK version, replace ORIGINAL_VERSION with original version number
export JAVA_HOME=`/usr/libexec/java_home -v ORIGINAL_VERSION`
```
Because `export` works only on the current shell, to avoid adding the change in java version to PATH, please use the terminal where you exported JAVA_HOME to launch Cassandra.

## Design Decisions
* Note that Cassandra is designed to be a query first columnar database, intended to scale across a highly distributed system with extremely large amounts of data and with availability as a top priority as opposed to data consistency. Do consider this in your own applications as this is merely a learning example.
* Express-Cassandra does not currently support Typescript. If this is a concern, you can simply avoid implementing the ORM.