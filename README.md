## 🗓️ What is Planz?

Planz is a collaborative calendar web app built by Lane Richardson using Next.js App Router, React Big Calendar, and PostgreSQL. The app allows users to create and manage events, invite contacts, and view their schedules with a clean, responsive UI — complete with dark mode. You can [check it out here](https://calendar-app-y2h7.onrender.com)!

## ℹ️ Overview

### ✨ Feature Highlights

JWT-based Authentication
- Register, login, and logout with persistent session handling using JSON Web Tokens.

Interactive Calendar
- View monthly/weekly/daily schedules using React Big Calendar.
- Click on a date to create an event.
- Select event start and end times via datetime picker.
- Delete events through a confirmation modal.

Contact Management
- Add and manage a contact list.
- Invite contacts to shared events.

Responsive UI
- Real-Time UI Refresh.
- Events dynamically refresh on add/delete without needing a page reload.

### 💻 Tech Stack

- Frontend: Next.js (App Router), React, Styled Components
- Backend: Next.js API routes, Sequelize ORM
- Database: PostgreSQL
- Auth: JWT 
- Calendar UI: React Big Calendar
- Deployment: Render or Vercel

### ⚒️ Author

I'm Lane Richardson and I built Planz as a challenge and as a practice project for working with NextJS App Router, using NextJS API routes, and familiarizing myself better with all the features NextJS has to offer. I also used this project to broaden my understanding of how to work with JSON Web Tokens (JWT) and cookies to make user experience on the app better. Despite the challenge and the learning curve, I'm happy with how the app turned out! 

## 💿 Setup Instructions:

To start using the app, follow these instructions by typing these commands in your terminal:

1. Clone the repo:

    ```
    git clone https://github.com/LaneLR/calendar-app.git
    cd calendar-app
    ```

2. Install the dependencies:

    ```
    npm install
    ```

3. Create a .env file with the following:

    ```
    DATABASE_URL=postgresql://<path-to-your-database>:<port>
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    NEXTAUTH_URL=http://localhost:3000
    JWT_SECRET=Type-Your-Own-Very-Long-Secret-Phrase-Here
    ```

4. Run the app:

    ```
    npm run dev
    ```

## 🔑 Using the App

The app is minimal by design, having only four pages so far—Calendar, Contacts, Login and Register. It behaves very similarly to most apps and websites where you can register an account and log in to access the rest of the features Planz has to offer.

### 📝 Register and Login

In the header, you can select the login or register buttons to take you to either form. Of course, if you don't have an account you will need to register one before signing into it. The forms are simple: you only need a username and password to create and account and sign in.

### 🏠 Calendar Page

The home page is the calendar and you must have an account and be signed in to use it. To use the calendar, you simply have to click on the date(s) you want to make a plan and a modal will appear where you can select the start and end times of your plans. If you have contacts associated with your account, you will be able to add them to the plan too (if you want to make it a group event) by selecting them at the bottom of the form. 

Once an event is created, it will show on your calendar (and on the calendars of your invited contacts). If you have so many plans that you can't see them all on the 'Month' view, you can select the 'Week', 'Day', and 'Agenda' views to see all of your plans listed out and their corresponding start times.

To delete an event, simply click on the event in your calendar. A modal will appear and show you details of the event: title, start and end times, and contacts who have been invited. Clicking delete will remove the event from your and the invited contacts' calendars.

### 🙋🏻 Contacts

On the Contacts page, you'll see a list of people who are your contacts. If you have no contacts yet, don't worry! Using the search bar above your contacts list, you can search for other users by their username! Only people who have an account with Planz (and in your database) can be added as a contact. 

You can remove contacts by clicking the trashcan (delete) icon next to their username. Note, however, that this won't remove them from events that they've been invited to.

## 📅 Planned Features:

Planz was built in a week, and because of this time constraint there are more features that I would like to add to make the app better:

- Email reminders via Nodemailer.
- Group events by category type.
- Plan/invite notifications system.
- UI responsiveness on mobile.

And this isn't an exhaustive list. Of course, you or any contributor can add or remove features as you like!

## 💭 TL;DR

Planz is an app made in a week to challenge myself with learning more of NextJS and its features. The app includes:
- A registration and login page where you can register and account or sign into an existing account.
- JWT for Auth and utilizes NextJS server components for security and optimization. 
- A calendar that lets you create events, invite contacts to those events, and delete events.
- A contacts page where you can see all of your contacts, remove existing contacts, and search for new contacts.

I hope you have fun working with what I've made! 




