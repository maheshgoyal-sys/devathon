// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     maxlength: 20
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   userType: {
//     type: String,
//     enum: ['Old', 'New', 'Oth'],
//     default: 'Old'
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   lastLogin: {
//     type: Date
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Old', 'New', 'Oth'],
    default: 'Old'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  // Dashboard stats
  completedLessons: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 10 },
  vocabLearned: { type: Number, default: 0 },
  currentStreak: { type: Number, default: 0 },
  testsTaken: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },

  grammarProgress: { type: Number, default: 0 },
  vocabProgress: { type: Number, default: 0 },
  speakingProgress: { type: Number, default: 0 },
  writingProgress: { type: Number, default: 0 },

  recentActivity: [
    {
      type: {
        type: String,
        enum: ['lesson', 'vocab', 'test', 'speaking'],
        required: true
      },
      title: { type: String, required: true },
      timeAgo: { type: String },
      xp: { type: Number }
    }
  ],

  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
