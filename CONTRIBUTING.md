# Introduction
## Project Name : Tic-Tac-Toe

## Introduction

Tic-Tac-Toe, a classic game of strategy and wit, pits two players against each other or against Computer in a battle for victory. With a simple grid and Xs and Os as markers, players strive to align three of their symbols in a row, testing their tactical skills and foresight.

## Issue #45- [Reset Board button doesn't reset the table everytime (wierd and glitchy)](https://github.com/yelynn1/tictactoe/issues/45)

## Fork Repo Link - https://github.com/tharinduj31/tictactoe/tree/dev-branch

## Pull Request - https://github.com/yelynn1/tictactoe/pull/135

When pressing the Reset Board button for the first time, it resets the game, and the AI plays first. Pressing it again allows you to play first, and pressing it a third time chooses a random player. Essentially, the button isn't functioning as intended; it should only reset the board.

To fix this bug, two separate buttons needs to be added. One button selects whether X or O plays first. For example, pressing the button for X resets the game, and X (the AI) places its symbol first. The same applies to the button for O.

### Detailed discussion of issue examined

* Button Implementation: Two buttons ("Play O first" and "Play X first") are added to HTML.
* Functionality: JavaScript functions handle button clicks, reset board, and randomize the starting player.
* Code Clarity: The code is structured and clear, improving maintainability and readability.

## Code

HTML Buttons:

Two HTML buttons are defined with IDs 'selectXButton' and 'selectOButton'. These buttons allow the user to choose to play as either X or O.

```
<button id="selectXButton" onclick="selectFirstPlayer('X')">Play O first</button>
<button id="selectOButton" onclick="selectFirstPlayer('O')">Play X first</button>
 ```

JavaScript Functions:

selectFirstPlayer Function:

```
const selectFirstPlayer = (symbol) => {
    reset_board(symbol);
}
```

 This function is triggered when one of the buttons ("Play as X" or "Play as O") is clicked. It takes a symbol ('X' or 'O') as a parameter and initiates the game by resetting the board with the selected first player.

 reset_board1 Function:

``` 
const reset_board1 = (firstPlayer) => {
    // Resetting game board and related elements
    // Clearing previous game state
    // Setting up the game for a new match
}
```
This function determines the starting player based on the user's choice and initiates the game.

Steps:

* Check if Game Board is Empty: Ensures that the game board is empty before determining the starting player.
* Handling First Player Preference: If firstPlayer parameter is provided (either 'X' or 'O'), the function sets the starting player accordingly.
* Initiating the Game: Calls functions such as showPlayer or addComputerMove to start the game with the chosen starting player.

## Code review and Outcomes:

To be done. 

## Reflection

By implementing separate buttons for selecting the starting player and modifying the code to handle the user's choice, I have effectively addressed the issue of inconsistent behavior in the game's starting player selection. The code now allows users to explicitly choose whether they want to play as X or O, ensuring clarity and consistency in the game initialization process. This modification enhances the user experience and eliminates the need for unnecessary randomization. 