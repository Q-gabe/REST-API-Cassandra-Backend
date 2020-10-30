-- Create keyspace for Cassandra data replication on nodes
DROP KEYSPACE IF EXISTS mykeyspace;

CREATE KEYSPACE mykeyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE mykeyspace;

-- Create new table for pets
CREATE TABLE Pet(
    name text,
    species text,
    age int,
    status text,
    PRIMARY KEY (name)
);

-- Insert dummy pet data for tables
INSERT INTO Pet (name, species, age, status) VALUES ('Doggo' , 'dog', 6, 'Healthy');
INSERT INTO Pet (name, species, age, status) VALUES ('Minmo' , 'cat', 1, 'Playful');
INSERT INTO Pet (name, species, age, status) VALUES ('Mewtwo' , 'cat?', 99, 'Brooding');
INSERT INTO Pet (name, species, age, status) VALUES ('Bebe' , 'dog', 4, 'Sick (Awaiting vet)');
INSERT INTO Pet (name, species, age, status) VALUES ('King Poofy' , 'chinchilla', 2, 'Healthy');