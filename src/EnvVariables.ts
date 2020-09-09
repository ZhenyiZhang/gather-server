require('dotenv').config();

const EnvVariables = {
    MAIL_NAME: process.env.MAIL_NAME,
    MAIL_PASS: process.env.MAIL_PASS,
    PASSPORT_SECRET: process.env.PASSPORT_SECRET,
    DB_URL: process.env.DB_URL,
};

export default EnvVariables;