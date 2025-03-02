# Bandle-Game

My recreation of the popular game Bandle! Built using TypeScript, React, Python FastAPI and the Demucs Music Source Separation AI Model.


## How to access
You can either run the application locally or access the hosted version online:
* Hosted Version: https://bandle-game.vercel.app/

## Installation Instructions (For Local Setup)

After unzipping the file `https://github.com/glebezh/Bandle-Game.git` execute the following command in your terminal
```
npm install
```
Next execute the following in your terminal
```
npm run dev
```
Open your browser and go to http://localhost:5173/

## Instructions

<p style={{margin: "30px"}}>Guess the correct song by listening to different instrument tracks! </p>
            <ul>
              <li>The game randomly selects a song, but you won’t know which one.</li>
              <li>The first round starts with just the drums playing.</li>
              <li>With each incorrect guess, a new instrument is added.</li>
              <li>After listening, type your guess in the search box and submit it.</li>
              <li>If your guess is correct, you win! 🎉</li>
              <li>If you reach the final round and still guess incorrectly, game over!</li>
            </ul>

## Gameplay Demo

### Winning the Game
https://github.com/user-attachments/assets/1a2c5663-78d3-4d30-8619-f2a01d3bb949

### Losing the Game
https://github.com/user-attachments/assets/b383fab5-9e6b-43b4-8731-72c66c4bdb2c



## Current future plans
- Youtube API to scrape data and provide hints to user (similar to actual Bandle site)
- Allow user to add their own song and the app would process it and then allow them to play an instance with the song being their game?
