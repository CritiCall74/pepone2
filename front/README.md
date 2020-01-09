# Backend application

## Installation

### 1.Install Node.js

Install current Node.js LTS version [from here](https://nodejs.org/en/).

Run the following commands from your terminal to make sure everything is fine:

```
node -v
npm -v
```

### 2.Install dependencies

Open a terminal in the application target directory. Navigate to the `back` directory using:

`cd back`

Then install the application's dependencies using:

`npm install`

### 3.Setup your newsletter2go account

Create a .env file in the `back` directory. It should contain the following:

```
N2GO_USERNAME="<your account's email address>"
N2GO_PASSWORD="<your account's password>"
N2GO_AUTH_KEY="<your account's authentication key>"
```

### 4.Run the server

Still in the `back` directory, run the server using the following command:

`node server`

Navigating to `http://localhost:3000` should display the following message:

> Back-end application up and running!

You can now register to the newsletter from the site's homepage.
