# Live Chat App

The Live Chat App is a real-time chat application that allows users to join chat rooms and communicate with each other instantly.

## Features

- Real-time messaging: Send and receive messages in real-time.
- Customizable username: Enter a username to identify yourself in the chat.
- Room selection: Enter a custom room name or join the default "general" room.
- User listing: See the list of users currently connected to the room.
- Notifications: Get notified when users join or leave the room.

## Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/NathanMartinez/live-chat-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd live-chat-app
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Start the server:

   ```shell
   npm start
   ```

   The server will start running at `http://localhost:3000`.

5. Connect to the server:

   - Open a web browser on the same device where the server is running.
   - Enter `http://localhost:3000` in the address bar.

6. Join the chat:

   - Enter a username in the prompt and click **Join Chat**.
   - Optionally, enter a custom room name or leave it empty to join the default "general" room.
   - Start sending and receiving messages in real-time.

## Connecting from other devices

To connect to the Live Chat App server from other devices on the same network, follow these steps:

1. Find the IP address of the device where the server is running:

   - On Windows, open the Command Prompt and run `ipconfig`. Look for the IPv4 address under your network adapter.
   - On macOS or Linux, open the Terminal and run `ifconfig`. Look for the IPv4 address under your network adapter.

2. On the other device (e.g., smartphone, tablet, or another computer), make sure it is connected to the same network as the server.

3. Open a web browser on the other device.

4. Enter the IP address of the server device, followed by `:3000`, in the address bar of the browser. For example:

   ```
   http://server-ip-address:3000
   ```

   Replace `server-ip-address` with the actual IP address of the server device.

5. The Live Chat App should load in the browser on the other device.

6. Follow the steps to join the chat as described above.

Now, you can connect to the Live Chat App server from multiple devices and have real-time communication across devices.

## Deploying to a public server

If you want to deploy the Live Chat App to a public server, you can follow these general steps:

1. Choose a hosting provider or a cloud platform to deploy your application. Some popular options include Heroku, AWS, Google Cloud, and DigitalOcean.

2. Set up an account and create a new server or instance.

3. Install Node.js and npm on the server.

4. Clone the repository onto the server using Git or upload the project files to the server.

5. Install the dependencies:

   ```shell
   npm install --production
   ```

6. Start the server:

   ```shell
   npm start
   ```

7. Configure any necessary environment variables or server settings as required by your hosting provider.

8. Access the server through the provided domain or IP address and the specified port (usually port 80 for HTTP).

   Example:

   ```
   http://your-domain.com:3000
   ```

   Replace `your-domain.com` with your actual domain or IP address.

9. Share the access URL with other users or open it in different devices to connect to the Live Chat App.

Now, the Live Chat App is deployed and accessible from any device with an internet connection. Users can join the chat and communicate in real-time.

Note: The specific deployment steps may vary depending on the hosting provider or cloud platform you choose. Please refer to their documentation for detailed instructions.

## Technologies Used

The Live Chat App is built using the following technologies:

- **Node.js**: A JavaScript runtime for executing server-side code.
- **Express**: A web framework for Node.js used to build the server.
- **Socket.IO**: A library that enables real-time, bidirectional communication between the server and clients.
- **HTML/CSS**: Used for the structure and styling of the web pages.
- **JavaScript**: Used for client-side scripting and interacting with the server.

## Credits

The Live Chat App is developed by Nathan Martinez and is available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you find any issues or want to enhance the functionality of the Live Chat App, feel free to open an issue or submit a pull request.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md) when contributing.

## License

The Live Chat App is licensed under the [MIT License](LICENSE).
