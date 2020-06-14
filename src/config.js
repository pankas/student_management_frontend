let config = {};

if(process.env.NODE_ENV==="development"){   
        config.login = "http://localhost:5000/api/login"
        config.signup = "http://localhost:5000/api/register"
        config.forgotPass = "http://localhost:5000/api/forgot-pass"
        config.getUsers = "http://localhost:5000/api/users"
        config.update = "http://localhost:5000/api/update"
        config.sendMail = "http://localhost:5000/api/send-mail"
        // config.login = "http://quiet-bayou-33585.herokuapp.com/api/login"
        // config.signup = "http://quiet-bayou-33585.herokuapp.com/api/register"
        // config.forgotPass = "http://quiet-bayou-33585.herokuapp.com/api/forgot-pass"
        // config.getUsers = "http://quiet-bayou-33585.herokuapp.com/api/users"
        // config.update = "http://quiet-bayou-33585.herokuapp.com/api/update"
        // config.sendMail = "http://quiet-bayou-33585.herokuapp.com/api/send-mail"
    }
else
{
    // config.login = "https://quiet-bayou-33585.herokuapp.com/api/login"
    // config.signup = "https://quiet-bayou-33585.herokuapp.com/api/register"
    // config.forgotPass = "https://quiet-bayou-33585.herokuapp.com/api/forgot-pass"
    // config.getUsers = "https://quiet-bayou-33585.herokuapp.com/api/users"
    // config.update = "https://quiet-bayou-33585.herokuapp.com/api/update"
    // config.sendMail = "https://quiet-bayou-33585.herokuapp.com/api/send-mail"

}

export default config;