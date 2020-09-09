require('dotenv').config({path: '/Users/zhenyizhang/Documents/Project.nosync/gather-server/process.env'});

const EnvVariables = {
    MAIL_NAME: process.env.MAIL_NAME,
    MAIL_PASS: process.env.MAIL_PASS,
    PASSPORT_SECRET: process.env.PASSPORT_SECRET,
    DB_URL: process.env.DB_URL,
};

export default EnvVariables;