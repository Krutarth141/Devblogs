const {validatetoken} = require('../services/authentication');
function checkforauthenticationcookie(cookiename){
    return(req,res,next) => {
        const tokencookieval = req.cookies[cookiename]
        if(!tokencookieval) {
           return next();
        }

        try{
            const userpayload = validatetoken(tokencookieval);
            req.user = userpayload;
        }catch(error){}
        return next();
    };
}

module.exports = {
    checkforauthenticationcookie,
};