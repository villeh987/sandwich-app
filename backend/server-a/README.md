# Server A

This directory is for the code and documentation of the _server A_. The server listens to the client and receives sandwich orders. These orders are added to the RabbitMQ queue and to database. After the orders are completed on server-b, server-a subscribes the queue for completed orders. Order status is then updated to the database. The server runs in a Docker container (see Dockerfile).
