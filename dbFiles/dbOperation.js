const config = require('./dbConfig'),
        sql = require('mssql');



const getNotes = async() =>{
    try{
        let pool = await sql.connect(config);
        let notes = pool.request().query(`SELECT * from dbo.tb_notes`);
        return notes;
    }
    catch(err){
        console.log(err);
    }
}


const getUserByName = async ({name}) => {
    try{
        let pool = await sql.connect(config);
        let user = pool .request().query(`SELECT TOP 1 * from dbo.tb_user WHERE name='${name}'`);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const insertUser = async ({name, hash}) => {
    try{
        let pool = await sql.connect(config);

        let result = pool.request()
        .query(`
            INSERT INTO dbo.tb_user (name, password) VALUES
            ('${name}', '${hash}')
        `);

        return result;
    }
    catch(err){
        console.log(err);
    }
}




module.exports={
    getNotes,
    getUserByName,
    insertUser,
}