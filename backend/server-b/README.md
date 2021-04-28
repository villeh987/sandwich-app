# Server B

This directory is for the code of the _server B_. The server subscribes to RabbitMQ queue and "completes" sandwich orders by waiting 10 seconds. After this, the completed order is sent to another queue, which the server-a listens. The server runs inside a Docker container (see Dockerfile).
