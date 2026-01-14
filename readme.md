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
- Classic platformer controls (arrow keys, spacebar, or click/tap)
- Star collection triggers math questions
- Game pauses when question appears
- Correct answers increase score and continue gameplay
- Incorrect answers result in game over
- Restart functionality with score display
<video src="./small_demo_qnar_assignment%20.mp4" controls width="100%"></video>

<video src="https://github.com/Mohammed-ma1704262/Qnar-phaser-Game/blob/main/small_demo_qnar_assignment%20.mp4" controls width="100%"></video>

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

1. **Start the Game**: Click "Start Game" on the welcome screen
2. **Navigate Menus**: Select "Math" from subjects, then choose your preferred math operation
3. **Control Your Character**:
   - **Arrow Keys**: Move left/right
   - **Spacebar/Up Arrow**: Jump
   - **Mouse Click**: Alternative jump control
4. **Collect Stars**: Each star triggers a math question
5. **Answer Questions**: Select the correct answer from four options
6. **Continue or Retry**: 
   - Correct answer: Score increases, game continues
   - Wrong answer: Game over, view your final score
7. **Restart**: Click "Restart Game" to try again with the same math mode

##🔧 Technical Details

### Technologies Used
- **Phaser 3**: Game engine for 2D game development
- **React**: UI framework for menus and overlays
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling

### Key Files

**firstGame.js** - Core game logic:
- Phaser scene configuration
- Player physics and controls
- Star collection and collision detection
- Callback system for React integration

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

## 🚧 Future Enhancements

Planned features to align with original concept:
- [ ] Flying/launching mechanic
- [ ] Checkpoint-based question system
- [ ] Speed boost reward system
- [ ] Stun mechanic for wrong answers
- [ ] Distance and duration tracking
- [ ] Enhanced scoring system
- [ ] Flying obstacles
- [ ] Sound effects and background music

##  Known Issues

- Asset paths may need adjustment based on your folder structure
- Score resets on page refresh (no persistence yet)
- Limited to math questions only

##  Development Notes

### Callback System
The game uses a callback system to communicate between Phaser and React:
```javascript
export var gameCallbacks = {
    onStarCollected: null,  // Triggered when star is collected
    onGameOver: null,       // Triggered on game over
};
```

