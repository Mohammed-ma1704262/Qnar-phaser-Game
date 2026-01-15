# Knowledge Leap

An educational platformer game built with Phaser and React that combines learning with gameplay. Practice math skills while collecting stars and avoiding obstacles!

##  Game Overview

Knowledge Leap a small interactive learning game where players answer math questions while navigating through a classic platformer environment. Each star collected presents a new question - answer correctly to continue, answer incorrectly and face game over!

## Current Features
 
### Main Menu System
- **Start Screen**: Initial welcome screen
- **Main Menu**: 
  - New Game
  - Options (placeholder)
  - Exit
- **Subject Selection**: Currently supports Math
- **Math Mode Selection**:
  - Addition
  - Subtraction
  - Multiplication
  - Division
  - Simple Powers
  - Frenzy Mode (randomizes all types)

### Gameplay
-Endless Runner Gameplay: Side-scrolling Flappy Bird-style mechanics
-Controls: Tap, spacebar, or up arrow to flap
-Collectibles:

-Small rings: +5 points each
-Large blue challenge rings: Trigger math questions


##Question Mechanics:

-Game pauses when passing through red rings
-Correct answer rewards:

-+20 points
-3 seconds of immunity (green tint)
-3x speed boost


-Wrong answer penalty: +10 points , 0.1 second stun, then continue


##Obstacles:

-Pipes with gaps to navigate
-Floating bombs with random movement
-Top and bottom boundaries


-Dynamic Difficulty: Speed increases with correct answers
-Pause System: All spawning and movement freezes during questions
## Demo Video

A Demo video Can be found here on the google drive link , the same video is uploaded to github


 https://drive.google.com/file/d/1BvLl4T20iIDqEYErfA6wLe5vosz0K30o/view?usp=sharing

 A new Demo of the updated game: 

 
https://drive.google.com/file/d/1NZXD6pRtVCf60jOW8YtMdZB09SBWOk0Z/view?usp=sharing
##  Installation & Setup

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Installation Steps

1. **Create the project using Phaser template:**
```bash
npm create @phaserjs/game@latest
```

**Template Selection:**
- Project Name: `knowl-leap` (or your preferred name)
- Option: Web Bundler (Vite)
- Template: vite
- Project Type: Complete
- Language: JavaScript

2. **Navigate to project directory:**
```bash
cd knowl-leap
```

3. **Install dependencies:**
```bash
npm install
```

4. **Install Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

5. **Install Phaser (if not already included):**
```bash
npm install phaser
```

### Tailwind Configuration

Update your `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update your `vite/config.dev.mjs`:
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), tailwindcss()],

    server: {
        port: 8080,
    },
});


```

Add Tailwind directives to your main CSS file:
```css
@import "tailwindcss";
 
```

## 🎯 Running the Game

Start the development server:
```bash
npm install
npm run dev
```

The game will be available at `http://localhost:8080` (or the port shown in your terminal).

## 📁 Project Structure

```
knowl-leap/
├── public/
│   └── assets/          # Game assets (images, sprites)
│       ├── sky.png
│       ├── platform.png
│       ├── star.png
│       ├── bomb.png
│       └── dude.png
├── src/
│   ├── game/
│   │   └── scenes/
│   │       ├── firstGame.js      # Main game logic
│   │       ├── thirdGame.js      # new game logic
│   │       ├── MainScreen.jsx    # React wrapper component
│   │       └── QuestionMenu.jsx  # Question UI component
│   ├── components/
│   │   └── CustomButton.jsx      # Reusable button component
│   ├── functions/
│   │   └── mathFunctions.js      # Question generation logic
│   └── styles/
│       └── global.css            # Tailwind and custom styles
├── package.json
└── README.md
```

## How to Play

### Flappy Bird Mode
1. **Navigate to Game**: Follow same menu path as platformer
2. **Control the Bird**:
   - **Spacebar/Up Arrow/Click**: Flap upward
3. **Collect Rings**: 
   - Small rings: +5 points (no pause)
   - Large red rings: Triggers question (game pauses)
4. **Navigate Obstacles**: 
   - Fly through pipe gaps
   - Avoid bombs
   - Stay within top/bottom boundaries
5. **Answer Questions**:
   - **Correct**: +20 points, 3s immunity (green), 3x speed
   - **Wrong**: 0.1s stun, then continue
6. **Survive**: Keep flying and answering to increase your score!

##🔧 Technical Details

### Technologies Used
- **Phaser 3**: Game engine for 2D game development
- **React**: UI framework for menus and overlays
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling

### Key Files

**thirdGame.js** - Flappy Bird mode:
- Endless runner mechanics
- Dynamic spawning system with pause control
- Immunity and speed boost system
- Challenge ring detection
- Callback: `onChallengeRingPassed`, `onGameOver`

**MainScreen.jsx** - React component:
- Menu state management
- Question display logic
- Game-React communication bridge
- Restart functionality

**QuestionMenu.jsx** - Question UI:
- Displays math problems
- Handles answer selection
- Communicates results back to game

**mathFunctions.js** - Question generator:
- Generates random math problems
- Creates multiple choice options
- Supports different operation types

## Original Concept vs Current Implementation

### Original Vision (from design doc)
- Flying character launched from a launcher
- Checkpoints trigger questions in mid-air
- Correct answers grant speed boosts through 3 checkpoints
- Incorrect answers cause stun with recovery mechanic
- Ground collision = game over
- Detailed scoring system with distance, duration, and accuracy

### Current Implementation
- Classic platformer with jump mechanics
- Star collection triggers questions
- Game pauses for question display
- Correct answers continue gameplay
- Incorrect answers = immediate game over
- Simple score tracking based on correct answers

##   Future Enhancements

### Flappy Bird Mode Enhancements
- [ ] Progressive difficulty (increasing speed over time)
- [ ] Different bird skins
- [ ] Varied obstacle patterns
- [ ] Combo system for consecutive correct answers
- [ ] Leaderboard

##   Known Issues

- Asset paths may need adjustment based on your folder structure
- Score resets on page refresh (no persistence yet)
- Limited to math questions only
- Mouse click input may register multiple times (use spacebar for better control)

##   Educational Value

- **Math Practice**: Reinforces arithmetic skills
- **Quick Thinking**: Time pressure encourages fast mental calculation
- **Reward System**: Positive reinforcement for correct answers
- **Low Stakes**: Wrong answers don't end the game immediately (in Flappy mode)
- **Engagement**: Game mechanics keep learning fun and interactive

##   Development Notes
 

### Callback System
The game uses a callback system to communicate between Phaser and React:
```javascript
export var gameCallbacks = {
    onStarCollected: null,  // Triggered when star is collected
    onGameOver: null,       // Triggered on game over
};
```
##   Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---
