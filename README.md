# 📚 Booksphere

<p align="center">
  <strong>An Online Book Delivery Management System</strong>
</p>

<p align="center">
  Connecting readers with local libraries and book owners through a modern, secure, and user-friendly platform.
</p>

---

## 🌐 Live Demo

🔗 **https://booksphere-ashy.vercel.app**

---

## 📖 About the Project

Booksphere is a full-stack web application that streamlines the process of discovering, requesting, and delivering books. It provides a centralized platform where readers can browse books from local libraries and individual book owners, request home delivery, and manage their reading history.

The system also includes dedicated dashboards for librarians and administrators, making inventory management, delivery tracking, and platform administration efficient and intuitive.

---

## ✨ Key Features

### 👤 Authentication & Authorization

- Secure user authentication
- JWT-based protected routes
- Role-based dashboards
- User, Librarian, and Admin roles

### 📚 Book Management

- Browse and search books
- Filter by category
- Sort books
- Server-side pagination
- Detailed book information
- Book availability status

### 🚚 Delivery System

- Request book delivery
- Delivery tracking
- Delivery status updates
- Reading history

### ⭐ Review System

- Verified reviews
- Edit and delete reviews
- Ratings for delivered books only

### 📊 Dashboards

#### User Dashboard

- Reading history
- Pending deliveries
- Total books read
- Total spending
- Review management

#### Librarian Dashboard

- Inventory management
- Delivery management
- Earnings overview
- Book publishing

#### Admin Dashboard

- Manage users
- Manage books
- Book approval system
- View transactions
- Platform statistics

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- HeroUI
- DaisyUI
- Framer Motion

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- Better Auth
- JWT

### Deployment

- Vercel

### Image Hosting

- ImgBB

---

## 📂 Project Structure

```text
booksphere/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── hooks/
│
├── server/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/booksphere.git
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file and configure the following:

```env
NEXT_PUBLIC_SERVER_URI=

MONGODB_URI=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=

JWT_SECRET=
```

### Run the Development Server

```bash
npm run dev
```

---

## 🎯 Future Improvements

- Wishlist
- Email notifications
- Real-time delivery tracking
- Recommendation system
- Advanced analytics
- Dark mode

---

## 📸 Screenshots

> Screenshots will be added soon.

---

## 👩‍💻 Author

**Sanjana Moon**

- LinkedIn: https://www.linkedin.com/in/sanjana-moon-6956863b4
- Email: sanjanamoonliya@gmail.com

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It motivates me to continue building and improving open-source projects.

---

## 📄 License

This project is licensed under the MIT License.
