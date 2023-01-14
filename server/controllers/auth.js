import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'


export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if(user){
            return res.json({
                message: 'Такий логін вже використовується'
            })
        }
        const solt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, solt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign(
            {
                id: newUser._id 
            },
                process.env.JWT_SECRET,
                {expiresIn: '30d'}
        )

        await newUser.save()

        return res.json({
            newUser, message: 'Регестрація пройшла успішно'
        })

    }
    catch(e) {
        res.status(400).json({
            message: 'Невідома помилка при створенні користувача'
        })
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({ username })

        if(!user){
            return res.status(402).json({
                message: 'Такого користувача не було знайдено'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(402).json({
                message: 'Неправильний пароль'
            })
        }

        const token = jwt.sign(
        {
            id: user._id 
        },
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.status(200).json({
            token, user, message: 'Ви успішно залогінились'
        })
    }
    catch(e) {
        console.log(e)

        res.status(400).json({
            message: 'Невідома помилка при логіні'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(402).json({
                message: 'Такого користувача не було знайдено'
            })
        }

        const token = jwt.sign(
            {
                id: user._id 
            },
                process.env.JWT_SECRET,
                {expiresIn: '30d'}
        )

        res.status(200).json({
            user, token
        })
    }
    catch(e) {
        return res.status(400).json({
            message: 'У вас немає доступу'
        })
    }
}