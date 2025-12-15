# Christmas Fifteen Puzzle

## Group Member:

- Sophie Nguyen
- Cristofer Herrera-Mejia
- Karni Rathod

## Materials:

- [Proposal](https://drive.google.com/file/d/1JSzUx9ca-q43PROonzMlYfApQi8HPGhd/view?usp=drive_link)
- [Slides](https://docs.google.com/presentation/d/1vgL44gUwEz3H1BNx3jhFw44zeO5yxNauHNYnIc-nqAg/edit?usp=sharing)
- [Website](https://codd.cs.gsu.edu/~nnguyen177/Christmas-Fifteen-Puzzle/homepage/index.html)
- [Demo]()
- [Development Journal](https://drive.google.com/file/d/11oPdKGorGjffuHyXuHNQb0f3EC6RmK74/view?usp=sharing)

## Project Summary:

- This project focuses on developing an interactive sliding puzzle game known as the Christmas Fifteen Puzzle, inspired by the classic Fifteen Puzzle but enhanced with modern UI features and Christmas-themed visuals.
- Players interact with a 4×4 grid of numbered tiles (or other grid sizes), sliding them around to restore the correct order. 
- The game includes animated transitions, festive audio, visual feedback for movable tiles, and quality-of-life features to make gameplay intuitive and fun.


## How to Setup:

Please download the folder [assets]() and put it under the root folder. Then, run this file `Christmas-Fifteen-Puzzle/homepage/index.html`.


## Key Features:

- **Adaptive Gameplay Experience**:
  - Implement intelligent difficulty scaling that adjusts based on player performance.
  - Features include progressive puzzle generation and tracking of player skill improvement.
- **Dynamic Puzzle Mechanics**:
  - Support multi-size puzzles with a default 4×4 grid and additional sizes (3×3, 6×6, 8×8, 10×10).
  - Includes visual highlighting for movable tiles and enhanced row/column slide behavior.
- **Immersive Audio-Visual Experience**:
  - Add festive background music with intensity changes during gameplay.
  - Includes smooth tile-sliding animations and responsive hover effects for enhanced feedback.
- **Celebratory Completion System**:
  - Create a satisfying victory sequence with animations, themed visual effects, and sound cues that reward solving the puzzle.
- **Comprehensive Progress Tracking**:
  - Track player sessions, move counts, completion times, and difficulty scaling.
  - Store high scores and provide performance insights over time.
- **Strategic Assistance Features**:
  - Provide puzzle previews, magic hints, and limited-time assistance that adapts to puzzle difficulty.


## Functionalities:

- **Interactive Puzzle**: Players can move any tile adjacent to the empty space. System detects and restricts invalid moves.
- **Shuffle Feature**: Randomizes the puzzle into a solvable configuration using efficient algorithms. Resets the timer and moves the counter.
- **Timer & Move Counter**: Timer begins after the first tile move. Stops automatically when the puzzle is solved.
- **Settings Panel**: Choose grid size (3×3, 4×4, 6×6, etc.). Switch between Christmas-themed backgrounds. Enable/disable background music.
- **Background Music**: Optional festive soundtrack with dynamic volume/intensity.
