const moviesRouter = require('../api/movies');
const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password, role = 'user' }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [ user ] } = await db.query(`
        INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, role]);

        return user;
    } catch (err) {
        throw err;
    }
}



const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        // const {id, name, email, role } = user; //
        delete user.password;
        return user; //{ id, name, email, role }; //user;
    } catch (err) {
        throw err;
    }
}



const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

async function getUserById(userId) {
    try {
        const { rows: [ user ]} = await db.query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [userId])

        if(!user) return null;

        return user
    } catch(err) {
        throw err
    }
}

const getAllUsers = async () => {
    try {
        const { rows: users } = await db.query(`
        SELECT id, name, email, role
        FROM users;
        `);
        return users;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    getAllUsers
};