> How to run this project

## Installation

> Make sure you have installed the LTS node version on https://nodejs.org/en or at least have node version >= 20.0.0. You can check your node version by typing `node -v` on your terminal. If you don't have the correct node version, you can refer to the link above.

> Make sure you have installed yarn on your machine. You can check your yarn version by typing `yarn -v` on your terminal. If you don't have yarn, you can install it by typing `npm install -g yarn` on your terminal.

1. Clone this repository

--- Server

2.  Go to server directory

    ```sh
    yarn install
    ```

3.  Run script to setup docker (you can skip this step if you don't want to use docker)

    ```sh
    yarn docker-up
    ```

4.  If you wish not to use docker, you need to install mysql on your machine. Then, setup the database and table manually. You can refer to the script below.

        Create database named `tasking` on your mysql server (using command line or GUI) by running this script

        ```sh
        CREATE DATABASE tasking;
        ```

5.  Create .env file in the server root folder and fill it with the following environment variables. Of course, you are free to change the value of each variable according to your needs.

    ```sh
     PORT=3001
     SECRET=636238f9-76cc-4aa8-a4a9-877b29e88b08
    ```

    If you are using docker, you can use the following environment variables

    ```sh
     DATABASE_URL=mysql://root:root@localhost:3307/tasking?schema=public
    ```

    If you are not using docker, you can use the following environment variables

    ```sh
     DATABASE_URL=mysql://root:root@localhost:3306/tasking?schema=public
    ```

6.  Before running the server, you need to run the migration script to create the table on your database. You can run the script by typing the following command on your terminal

        ```sh
        yarn prisma db push && yarn prisma generate
        ```

    > Note: if you are using docker, I'm not sure why but it keeps giving me error when running the migration script (Error: P1017: Server has closed the connection.). You need to wait for a few minutes (5-6 minutes) and run the script again. I'm still trying to figure out why this happens. The script should run smoothly if you are not using docker.

7.  Run the server
    ```sh
    yarn dev
    ```

--- Client

1. Go to client directory, you can add new terminal or new tab on your terminal

    ```sh
    yarn install
    ```

2. Create .env file in the client root folder and fill it with the following environment variables

    ```sh
    VITE_API_URL=http://localhost:3001
    ```

3. Run the client

    ```sh
     yarn dev
    ```
