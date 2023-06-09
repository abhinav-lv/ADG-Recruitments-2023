/* IMPORT LIBRARIES AND MODELS */
require('dotenv').config()
const reader = require('xlsx')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/User')

/* FUNCTION TO SAVE USER TO DATABASE */
const addUser = async (user) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    bcrypt.genSalt(saltRounds, async function (err,salt) {
        if(err){
            console.error(err.message)
            return
        }
        bcrypt.hash(user.Password, salt, async function (err,hash) {
            if(err){
                console.error(err.message)
                return
            }
            const new_user = new User({
                regNo: user.RegisterNumber,
                password: hash,
            })
            try{
                await new_user.save()
            }
            catch(err){
                console.error(err.message)
            }
        })
    })
}

// Connect to database
mongoose.connect(`${process.env.MONGO_URI}`)
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB'))
db.on('error', (error) => console.error(error.message))

// Read excel file containing user details
const file = reader.readFile('/home/abhinav/Downloads/recruitment-portal-users/Users_pwd.xlsx')

// Get array of all users
const users = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
const testUsers = users.slice(0,4)

// ADd test users to database
testUsers.forEach((user) => { addUser(user) })