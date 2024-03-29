const express = require('express')
const { requireAdmin, requireUser } = require('./utils');
const usersRouter = express.Router();


const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        //console.log('user info from token:', req.user);
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

usersRouter.get('/me/:userId', requireUser, async (req, res, next) => {
    try {

        res.send(req.user);
    } catch (err) {
        next(err)
    }
})
usersRouter.get('/:userId', requireUser, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


usersRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({ email, password });
        if (user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token,
                id: user.id
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
})

module.exports = usersRouter;