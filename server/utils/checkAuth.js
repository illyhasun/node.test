import jwt from 'jsonwebtoken'
export const checkAuth = (res, req, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.userId

            next()
        }
        catch(e){
            return res.status(400).json({
                message: 'У вас немає доступу'
            })
        }
    }
    else{
        return res.status(400).json({
            message: 'У вас немає доступу'
        })
    }
}