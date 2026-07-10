# 🎯 Truth or Dare Web Game

A dynamic, browser-based **Truth or Dare** game built with vanilla JavaScript. It features dynamic player management, turn sequencing, streak prevention to keep gameplay exciting, and question tracking.

---

## ✨ Features

- **👥 Dynamic Player Management:** 
  - Add as many players as you like before starting.
  - Delete players with automatic index re-ordering.
  - Validation ensures player names aren't left blank.
- **🔄 Smart Turn Sequencing:**
  - Highlights the current player in **green** while keeping other players' names clear.
  - Enforces turn completion so players can't skip choosing Truth or Dare.
- **🔥 Anti-Spam / Streak Prevention:**
  - Tracks player streaks! If a player picks **Truth 3 times in a row**, the game forces them to take a **Dare** on their next turn.
- **📚 Question Deck Tracking:**
  - Prevents question overflows and lets players know when all Truths or Dares have been exhausted.

---