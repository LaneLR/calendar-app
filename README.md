Planz is a calendar web app developed by Lane Richardson and built using NextJS's App Router, React Big Calendar, and PostgreSQL. Planz allows users to register an account, plan their own events or make plans with contacts, and manage schedules with dynamic themes like dark mode.

This app features:
•   Account registration, login, and logout using JWT.
•   An interactive big calendar where users can create events, select  event start and end times, and delete events altogether.
•   Add and manage contacts to invite them to events.
•   Responsive UI design with styled components.
•   Dark mode!


Setup Instructions:
1. Clone the repo
    in a terminal type:
        git clone https://github.com/LaneLR/calendar-app.git
        cd calendar-app

2. Install the dependencies
    in a terminal type:
        npm install

3. Create a .env file
    DATABASE_URL=postgresql://...
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    NEXTAUTH_URL=http://localhost:3000
    JWT_SECRET=Type-Your-Own-Secret-Phrase-Here
    
4. Run the app:
    in a terminal, type:
        npm run dev
