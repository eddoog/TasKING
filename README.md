> Documentation On Progress

## Installation

> Make sure you have installed the LTS node version on https://nodejs.org/en or at least have node version >= 20.0.0. You can check your node version by typing `node -v` on your terminal. If you don't have the correct node version, you can refer to the link above.

1. Clone this repository

--- Server

2. Go to server directory

    ```sh
    yarn install
    ```

3. Create .env file in the server root folder and fill it with the following environment variables. Of course, you are free to change the value of each variable according to your needs.

    ```sh
     PORT=3001
     SECRET=636238f9-76cc-4aa8-a4a9-877b29e88b08
     DATABASE_URL=mysql://root:root@localhost:3306/tasking?schema=public
    ```

4. Run the server
    ```sh
    yarn dev
    ```

--- Client

5. Go to client directory, you can add new terminal or new tab on your terminal

    ```sh
    yarn install
    ```

6. Create .env file in the client root folder and fill it with the following environment variables

    ```sh
     API_URL=http://localhost:3001
    ```

7. Run the client

    ```sh
     yarn dev
    ```
