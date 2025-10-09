const User = require('../models/User');

// Generate random 4-digit captcha
const generateCaptcha = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Show login page
exports.showLogin = (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha;

  res.render('login', {
    title: 'GLA English Learning Platform Login',
    captcha: captcha,
    error: null
  });
};

// Handle login
exports.login = async (req, res) => {
  try {
    const { userId, password, userType, captcha } = req.body;

    // Validate inputs
    if (!userId || !userId.trim()) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Please Enter Your User ID'
      });
    }

    if (!password) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Please Enter Your Password'
      });
    }

    if (!captcha || captcha.length !== 4) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Please Enter Valid Captcha'
      });
    }

    // Verify captcha
    if (captcha !== req.session.captcha) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Invalid Captcha. Please try again.'
      });
    }

    // Find user by userId and userType (if userType provided in form)
    const query = userType ? { userId: userId.trim(), userType } : { userId: userId.trim() };
    const user = await User.findOne(query);

    if (!user) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Invalid User ID or Password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Your account is inactive. Please contact administrator.'
      });
    }

    // === PLAINTEXT password check (development-only) ===
    if (user.password !== password) {
      const newCaptcha = generateCaptcha();
      req.session.captcha = newCaptcha;
      return res.render('login', {
        title: 'GLA English Learning Platform Login',
        captcha: newCaptcha,
        error: 'Invalid User ID or Password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set session
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userType = user.userType;

    // Redirect to English Learning Dashboard
    return res.redirect('/dashboard');

  } catch (error) {
    console.error('Login error:', error);
    const newCaptcha = generateCaptcha();
    req.session.captcha = newCaptcha;
    return res.render('login', {
      title: 'GLA English Learning Platform Login',
      captcha: newCaptcha,
      error: 'An error occurred. Please try again.'
    });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
};

// Refresh captcha (AJAX endpoint)
exports.refreshCaptcha = (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha;
  res.json({ captcha });
};
