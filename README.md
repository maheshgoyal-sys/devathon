# GLA University Online Examination System

A secure and efficient online examination system built with **MEEN Stack** (MongoDB, Express, EJS, Node.js).

## 🚀 Features

- **User Authentication**: Secure login with captcha verification
- **Multiple User Types**: Support for Regular Students, New Admissions, and Other Users
- **Exam Management**: Create and manage online exams
- **Session Management**: Secure session handling
- **Responsive Design**: Modern UI with Tailwind CSS
- **MongoDB Integration**: Robust database for storing user and exam data

## 📁 Project Structure

```
project/
├── controllers/          # Request handlers
│   ├── authController.js
│   └── examController.js
├── models/              # Database models
│   ├── User.js
│   └── Exam.js
├── routes/              # Route definitions
│   ├── authRoutes.js
│   └── examRoutes.js
├── views/               # EJS templates
│   ├── login.ejs
│   ├── dashboard.ejs
│   └── error.ejs
├── middleware/          # Custom middleware
│   └── auth.js
├── utils/               # Utility functions
│   └── seed.js
├── public/              # Static files (CSS, JS, images)
├── server.js            # Application entry point
├── package.json
└── .env.example
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` file with your configuration.

4. **Install and start MongoDB**
   - Make sure MongoDB is installed and running on your system
   - Default connection: `mongodb://localhost:27017/gla_exam_system`

5. **Seed the database** (Optional - creates sample data)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

7. **Access the application**
   Open your browser and navigate to: `http://localhost:3000`

## 👤 Sample Login Credentials

After running the seed script, you can use:

- **User ID**: `student001`
- **Password**: `password123`
- **User Type**: Regular Student

## 📦 Dependencies

### Production
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **ejs**: Templating engine
- **express-session**: Session management
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables
- **method-override**: HTTP method override
- **connect-mongo**: MongoDB session store

### Development
- **nodemon**: Auto-restart server on changes

## 🔒 Security Features

- Password hashing with bcrypt
- Session-based authentication
- Captcha verification
- Input validation
- Secure session cookies

## 🎨 UI Features

- Modern gradient design
- Responsive layout (mobile-friendly)
- Tailwind CSS styling
- Clean and intuitive interface
- Real-time captcha refresh

## 📝 API Endpoints

### Authentication
- `GET /` - Login page
- `POST /login` - Handle login
- `GET /logout` - Logout user
- `GET /refresh-captcha` - Refresh captcha

### Exam
- `GET /exam/dashboard` - User dashboard
- `GET /exam/:id` - Exam details
- `POST /exam/submit` - Submit exam

## 🔧 Configuration

Edit the `.env` file to configure:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret key for sessions
- `NODE_ENV`: Environment (development/production)

## 📚 Database Models

### User Model
- userId (unique)
- password (hashed)
- userType (Old/New/Oth)
- name
- email
- isActive
- lastLogin

### Exam Model
- title
- subject
- duration
- totalMarks
- startTime
- endTime
- questions (array)
- isActive

## 🚧 Future Enhancements

- [ ] Real-time exam monitoring
- [ ] Automated result generation
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Question bank management
- [ ] Analytics and reports
- [ ] Multi-language support

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with ❤️ using MEEN Stack (MongoDB, Express, EJS, Node.js)
