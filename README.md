# Live Chat App

A real-time chat application built with Socket.IO and Express. Users can join different chat rooms and communicate with each other instantly.

## Features

- **Real-time Chat**: Users can send and receive messages in real-time.
- **Multiple Rooms**: Users can join different chat rooms and have separate conversations.
- **User Notifications**: Notifications are displayed when users join or leave a room.
- **User Listing**: Displays the list of users connected to the current room.
- **Responsive Design**: The application is designed to work seamlessly on different screen sizes.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NathanMartinez/live-chat-app.git
   ```

2. Install the dependencies:

   ```bash
   cd live-chat-app
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## Usage

1. Enter a username in the prompt and click **Join Chat**.
2. Enter a custom room name or leave it blank to join the default "general" room.
3. Start sending and receiving messages in real-time.

## Configuration

The application can be configured using environment variables. Create a `.env` file in the root directory and set the following variables:

- `PORT`: The port number to run the server (default is `3000`).
- `SESSION_SECRET`: The secret key used for session encryption.

## Technologies Used

- **Socket.IO**: Enables real-time bidirectional event-based communication between the server and clients.
- **Express**: A fast and minimalist web application framework for Node.js.
- **HTML**: The standard markup language for creating web pages.
- **CSS**: The language used for styling the application.
- **JavaScript**: The programming language used for client-side functionality.
- **npm**: The package manager for Node.js and JavaScript.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
