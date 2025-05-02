# QuickKick

**QuickKick** is a web application designed to manage and follow futsal matches in real-time. It allows users to create and manage teams and matches, track live scores, configure match settings, and separate control and display functionality for better real-time monitoring.  
It was developed specifically for organizing and supporting the **Memorial Futsal Tournament "Andrej Mitev"**, providing an efficient digital platform to streamline match logistics and enhance the spectator experience.

---

## Features

### ✅ Team Management
- Add, edit, and delete futsal teams  
- Assign players to teams with detailed player profiles (name, position, jersey number, etc.)

### ✅ Match Management
- Create, update, delete, and view matches  
- Filter matches by status: Scheduled, Playing, or Finished  
- Start matches with configurable settings like:
  - Half-time duration  
  - Pause time between halves  
  - Timeout duration  

### ✅ Live Match Tracking
- Real-time stopwatch/timer for matches  
- Live scoreboard view (for audience or projectors) on a separate screen  
- Admin controls for starting/stopping timers and updating scores  

### ✅ Statistics & Analytics
- Group-based statistics for teams (wins, losses, goals scored, goals conceded)  
- Real-time and cumulative match stats  
- Top 10 players leaderboard (based on goals)  
- Match history tracking for players and teams  

### ✅ UX and Admin Tools
- Intuitive admin panel for managing all data  
- Smart match sorting 
- Macedonian language support (MK localization)  
- Mobile-friendly layout (planned)  

### 🛠️ Planned & Advanced
- Authentication and user roles (admin, viewer)  
- Graphical dashboards for quick performance insights  
- CI/CD integration with GitHub Actions  
- Future UI improvements  

---

## 🧱 Tech Stack

- **Frontend:** React  
- **Backend:** Java Spring Boot  
- **Database:** PostgreSQL  
- **Styling:** CSS  

---

## 🚀 Getting Started Locally

### Backend

1. Clone the repository:  
   ```bash
   git clone https://github.com/nikol4e2/QuickKickApp.git
   
  - Open the pom.xml and start the project
  - Make sure PostgreSQL is set up and configured properly.

### Frontend


 - Navigate to the frontend directory: ```bash

       cd frontend
 - Install dependencies: ```bash

        npm install
 - Start the frontend: ```bash

       npm start
