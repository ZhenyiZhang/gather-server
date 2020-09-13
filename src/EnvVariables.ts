require('dotenv').config({path: '/Users/zhenyizhang/Documents/Project.nosync/gather-server/process.env'});

const EnvVariables = {
    MAIL_NAME: process.env.MAIL_NAME,
    MAIL_PASS: process.env.MAIL_PASS,
    PASSPORT_SECRET: process.env.PASSPORT_SECRET,
    DB_URL: process.env.DB_URL,
    GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI: process.env.GMAIL_REDIRECT_URI,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    
};

export default EnvVariables;