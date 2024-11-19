import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, register } from '../controllers/userController.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import { userValidationRules, taskValidationRules, validate } from '../middleware/validation.js';

const router = express.Router();

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after a minute",
    headers: true
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many login attempts, please try again later.",
});

// User routes
router.post('/register', generalLimiter, userValidationRules, validate, register);

router.post('/login', loginLimiter, userValidationRules, validate, login);

// Task routes
router.get('/tasks', auth, getTasks);

router.post('/tasks', generalLimiter, auth, taskValidationRules, validate, createTask);

router.patch('/tasks/:id', generalLimiter, auth, updateTask);

router.delete('/tasks/:id', generalLimiter, auth, deleteTask);

export { router };