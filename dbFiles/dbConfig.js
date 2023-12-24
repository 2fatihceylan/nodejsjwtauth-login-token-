require('dotenv').config()


const config = {
    user: process.env.userDB,
    password: process.env.passwordDB,
    server: process.env.serverDB,
    database: process.env.databaseDB,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
    },
    port: 1433,
}

module.exports = config;