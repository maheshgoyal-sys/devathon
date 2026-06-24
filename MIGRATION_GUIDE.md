
# Migration Guide: MERN to MEEN Stack

## What Changed?

### ❌ Removed (MERN Stack)
- React
- React DOM
- TypeScript
- Vite
- Supabase
- All React-related dependencies
- Client-side routing
- `src/` directory with React components
- `index.html` (Vite entry point)
- All TypeScript config files

### ✅ Added (MEEN Stack)
- Express.js server
- EJS templating engine
- MongoDB with Mongoose
- Server-side routing
- Session management
- Password hashing (bcryptjs)
- MVC architecture

## Architecture Changes

### Before (MERN)
```
Client (React) ←→ API Server ←→ MongoDB
```

### After (MEEN)
```
Browser ←→ Express Server (EJS) ←→ MongoDB
```

## File Structure Comparison

### MERN Stack (Old)
```
project/
├── src/
│   ├── App.tsx          # React component
│   ├── main.tsx         # React entry
│   └── index.css
├── index.html           # Vite entry
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### MEEN Stack (New)
```
project/
├── controllers/         # Business logic
├── models/             # Database schemas
├── routes/             # Route definitions
├── views/              # EJS templates
├── middleware/         # Custom middleware
├── utils/              # Helper functions
├── public/             # Static assets
├── server.js           # Entry point
└── package.json
```

## Key Differences

### 1. **Rendering**
- **MERN**: Client-side rendering with React
- **MEEN**: Server-side rendering with EJS

### 2. **State Management**
- **MERN**: React hooks (useState, useEffect)
- **MEEN**: Server sessions and database

### 3. **Routing**
- **MERN**: React Router (client-side)
- **MEEN**: Express Router (server-side)

### 4. **Data Flow**
- **MERN**: REST API calls from React
- **MEEN**: Direct server-side data passing to templates

### 5. **Authentication**
- **MERN**: JWT tokens / Supabase
- **MEEN**: Express sessions with MongoDB store

## Migration Steps Completed

1. ✅ Created Express server (`server.js`)
2. ✅ Set up MongoDB models (User, Exam)
3. ✅ Created controllers (authController, examController)
4. ✅ Defined routes (authRoutes, examRoutes)
5. ✅ Converted React components to EJS templates
6. ✅ Implemented authentication middleware
7. ✅ Updated package.json dependencies
8. ✅ Created database seeding script
9. ✅ Added environment configuration

## How to Run

### Old MERN Stack
```bash
npm run dev  # Started Vite dev server
```

### New MEEN Stack
```bash
npm install      # Install new dependencies
npm run seed     # Seed database (optional)
npm run dev      # Start with nodemon
# or
npm start        # Start in production
```

## Environment Setup

Create a `.env` file based on `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gla_exam_system
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

## Database Requirement

**IMPORTANT**: You must have MongoDB installed and running locally or provide a MongoDB Atlas connection string.

### Install MongoDB:
- **Windows**: Download from mongodb.com
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt-get install mongodb`

### Start MongoDB:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

## Features Preserved

✅ Same UI design (Tailwind CSS)
✅ Login functionality
✅ User authentication
✅ Captcha verification
✅ Form validation
✅ Responsive design

## New Features Added

✨ Server-side session management
✨ MongoDB integration
✨ Password hashing
✨ MVC architecture
✨ Database seeding
✨ Error handling middleware

## Testing the Application

1. Start MongoDB
2. Run `npm install`
3. Run `npm run seed` to create sample data
4. Run `npm run dev`
5. Open `http://localhost:3000`
6. Login with:
   - User ID: `student001`
   - Password: `password123`
   - User Type: Regular Student

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using port 3000

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

## Next Steps

Consider adding:
- [ ] Admin panel
- [ ] Real-time exam features
- [ ] Email notifications
- [ ] Result analytics
- [ ] PDF report generation
