# New Profile Page's Project

Alternative profile page on the SportSee application, with sessions's number and burned calories.


## 1. Prerequisites

- [NodeJS (**version 12.18**)](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

If you are working with several versions of NodeJS, we recommend you install [nvm](https://github.com/nvm-sh/nvm). This tool will allow you to easily manage your NodeJS versions.


## 2. How to Install and Run the Project

This project function with a front and a back, each in it pown folder.
Install first the back, then the front.

**Note about the mocked data**
This project need the back for it perfect fonctionment, but you can run it with the mocked data in the sportsee folder, without the back.
If you want it, go directly in 2.2.


### 2.1 Install and run the back

Open a first terminal (localhost:3000 port) and go to the folder : SportSee-Back.
This folder contains all the source code to run the micro API for the sports analytics dashboard SportSee.
The `yarn` command will allow you to install the dependencies.
The `yarn dev` command will allow you to run the micro API.
For more informations about the API adn its endpoints, go to the README of SportSee-Back.


### 2.2 Install and run the front

Open a second terminal and go to the folder : sportsee.
The `yarn start` command will allow to run the app in the development mode.
Open [http://localhost:3001/user/${userId}](http://localhost:3001/user/${userId}) to view it in your browser.
For exemple, [http://localhost:3001/user/18] allow you to see the alternative profile page of the user of wich the id is egal to 18.

**Note about the mocked data**
If you want to work with the mocked data, go to './src/services/dataFormatter.service' and change the constant 'isMockedData' from 'false' at 'true'.