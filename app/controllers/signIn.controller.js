module.exports = {
    get: (req, res) => {
        if(req.query.fail)
            res.render('signIn', {message: 'Algo deu errado!', tooltip: 'E-mail e/ou senha incorretos ou e-mail não confirmado'});
        else
            res.render('signIn', {message: null});
    }
}