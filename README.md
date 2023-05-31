# tic-tac-toe

This is a game where two players each take turns to click a block, each player get's assigned an X or O. <br/>
First player to get 3 placements in a row wins. <br/>
If noone wins the game ends in a tie. <br/>
Demo: [https://alcinovanrooyen.github.io/tic-tac-toe](https://alcinovanrooyen.github.io/tic-tac-toe)

## Prerequisites

NodeJs 16.x <br/>
PNPM 8.x - You can find instructions for installing PNPM here [https://pnpm.io/installation](https://pnpm.io/installation)

## How to Install and Run the Project

First clone the project onto your local machine:
```shell
git clone https://github.com/alcinovanrooyen/tic-tac-toe.git
cd tic-tac-toe
```
Install some dependencies:
```shell
pnpm install
```
Install playwright browser dependencies:
```shell
pnpm exec playwright install --with-deps
```
To serve the project, you can run:
```shell
npm start
```

## Run tests

To run end-to-end tests:
```shell
pnpm exec playwright test
```
To run unit-tests:
```shell
pnpm exec vitest unit
```

# Have fun!
