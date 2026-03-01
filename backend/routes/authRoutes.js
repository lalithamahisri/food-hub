const express = require('express');
const { body, validationResult } = require('express-validator');
const { register, login, getUserProfile, updateUserProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Helper to run validations and send 400 on error
const validate = (rules) => [
    ...rules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
        }
        next();
    },
];

// Auth routes
router.post(
    '/register',
    validate([
        body('firstName').trim().notEmpty().withMessage('First name is required'),
        body('lastName').trim().notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('phone').trim().notEmpty().withMessage('Phone is required'),
    ]),
    register
);

router.post(
    '/login',
    validate([
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ]),
    login
);

// Protected routes
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, upload.single('profileImage'), updateUserProfile);

module.exports = router;
