import rateLimit from  'express-rate-limit';

export const loginLimiter=rateLimit({
    window:60*100,
    max:5,
    message:{message:"Too many login attempts, please try again later."},
    standardHeader:true,
    legacyHeaders:false
})