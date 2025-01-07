# 🎬 Movies Tinder App

A sleek and interactive movie browsing application that allows users to swipe through movies, mark them as favorites, or discard them. Built using modern web technologies, the app provides a smooth and engaging user experience.

---

## ✨ Features

- **Swipe to Interact:** Swipe from right to left to dislike and remove it from the movies list.  
- **Accept/Reject Buttons:** Manually accept (add to favorites) or reject (remove from the list) movies.  
- **Favorites Management:** Use the Remove button to delete movies from your favorites.  
- **Mock Backend:** Utilize a mock API with Mock Service Worker (MSW) for testing.  
- **Real-Time Notifications:** Show success or error messages using `react-hot-toast`.

---

## 🛠️ Tools & Libraries Used

- **Frameworks & Languages:** Next.js, TypeScript  
- **UI & Interactions:** Swiper, Lucide Icons, NextUI  
- **Notifications:** React Hot Toast  
- **Mock API:** Mock Service Worker (MSW)  

---

## 🚀 Installation & Setup

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v16 or later)  
- npm or yarn  

### Installation

#### 1. Clone the Repository  
```bash
git clone https://github.com/Vronx93/pragmatic-coders-zadanie-rekrutacyjne.git
cd pragmatic-coders-zadanie-rekrutacyjne
```

#### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```
#### 3. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open the application in your browser at http://localhost:3000.

#### 🧑‍💻 How It Works
Swipe or Reject: Swiping left (from right to left) or clicking the "Reject" button removes a movie from the list, marking it as disliked.  
Accept a Movie: Clicking the "Accept" button adds a movie to the favorites list.  
Remove from Favorites: Clicking the "Remove" button deletes a movie from the favorites list.

#### 🛡️ Testing with Mock API
The app uses Mock Service Worker (MSW) to simulate API responses.

