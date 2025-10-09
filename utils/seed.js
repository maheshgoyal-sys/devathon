const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Exam = require('../models/Exam');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gla_exam_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Sample data
const sampleUsers = [
  {
    userId: 'student001',
    password: 'password123',
    userType: 'Old',
    name: 'John Doe',
    email: 'john@example.com',
    isActive: true
  },
  {
    userId: 'student002',
    password: 'password123',
    userType: 'Old',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isActive: true
  },
  {
    userId: 'newstudent001',
    password: 'password123',
    userType: 'New',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    isActive: true
  }
];

const sampleExams = [
  {
    title: 'Mathematics Mid-Term Exam',
    subject: 'Mathematics',
    duration: 60,
    totalMarks: 100,
    startTime: new Date(),
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    questions: [
      {
        questionText: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        marks: 5
      },
      {
        questionText: 'What is the square root of 16?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        marks: 5
      }
    ],
    isActive: true
  },
  {
    title: 'Computer Science Quiz',
    subject: 'Computer Science',
    duration: 45,
    totalMarks: 50,
    startTime: new Date(),
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    questions: [
      {
        questionText: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
        correctAnswer: 0,
        marks: 5
      }
    ],
    isActive: true
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Exam.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log('✅ Sample users created');

    // Insert sample exams
    await Exam.insertMany(sampleExams);
    console.log('✅ Sample exams created');

    console.log('\n📊 Database seeded successfully!');
    console.log('\n👤 Sample Login Credentials:');
    console.log('   User ID: student001');
    console.log('   Password: password123');
    console.log('   User Type: Regular Student\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
