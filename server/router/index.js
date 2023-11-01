const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const postController = require('../controllers/post-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({ // 5 запросов в 15 минут
  windowMs: 15 * 60 * 1000,
  max: 500, // 5
  message: "Слишком много запросов с вашего IP адреса. Попробуйте позже.",
});

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', limiter, userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/posts', authMiddleware, postController.getPosts);
router.get('/posts/:id', authMiddleware, postController.getPost);

module.exports = router
