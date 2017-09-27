module.exports = function getRedirectHttp(){
    return function redirectHttp(req, res, next){
        if(req.headers['x-forwarded-proto'] === https) next();//eslint-disable-line
        else res.redirect(`https://${req.hostname}${req.url}`);
    };
};