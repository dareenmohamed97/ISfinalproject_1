# Information Security

![Logo](https://ycdn.space/f/bi/bitwise_4.png)

## Intranet Security Website

### About

This repository is the security project for business informatics' **Rania, Dareen, Nour, Mariam**.

### How to install

#### Prerequisites

* [Node.js Download page](https://nodejs.org/en/)
* [MongoDB Download page](https://www.mongodb.com/download-center?jmp=nav#community)

#### Initial setup

##### Setting up the mongodb database

1. Navigate to "C:\"
2. Create a directory named "data"
3. Navigate to "C:\data"
4. Create two subdirectories:
    1. Create folder named "db"
    2. Create folder named "log"

##### Setting up the node modules and Vue.js

1. Clone the repository
2. cd to the repository's folder in the terminal
3. Install node modules using: ```npm install```
4. Install vue using: ```npm install -g vue-cli```

### Running a localhost instance in dev mode with hot reload

1. Navigate to "C:\Program Files\MongoDB\Server\3.6\bin" (or the directory to which MongoDB was installed in) and run "mongod.exe"
2. Navigate to the cloned repository's folder
3. Run the nodejs backend using: ```npm run server```
4. Start a new terminal and run the Vue.js frontend using: ```npm run dev```

### Running a localhost instance in production mode

1. Navigate to "C:\Program Files\MongoDB\Server\3.6\bin" (or the directory to which MongoDB was installed in) and run "mongod.exe"
2. Navigate to the cloned repository's folder
3. Run the nodejs backend using: ```npm run server```
4. Start a new terminal and compile the production build using: ```npm run build```
5. Serve the compiled build using: ```npm run client```
