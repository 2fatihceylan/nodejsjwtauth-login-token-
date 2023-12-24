const express = require('express');
const cors = require('cors');

require('dotenv').config();
const bcrypt =require('bcrypt');
const cookieParser = require('cookie-parser');
const {createTokens, validateToken} = require('./dbFiles/JWT');

const API_PORT = process.env.PORT || 5000;
const dbOperation = require('./dbFiles/dbOperation');




const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());




app.post('/register',(request,response)=>{

    const {name, password} = request.body;


    bcrypt.hash(password, 10 , (err, hash) => {


        dbOperation.insertUser({name, hash}).then(res=>{
            response.json('User registered');
        }).catch((err)=>{
            if(err.number===2627){
                response.status(400).json({error: 'user_already_exist'});
            }
            else{
                response.status(400).json({error: err});
            }
        })

    })

})



app.post('/login', async(request,response)=>{
    
    const {name, password} = request.body;


    dbOperation.getUserByName({name}).then(res=>{
        
        const user = res.recordset[0];

        if(!user) {response.status(400).json({error: "User_does_not_exist"});}
        else{
            const dbPassword = user.password;

            bcrypt.compare(password, dbPassword).then((match)=>{
            if(!match){
                response.status(400).json({error: "wrong_password"});
            }
            else{

                const accessToken = createTokens(user);

                response.cookie('access-token',accessToken,{
                    maxAge: 60*60*24*30*1000,  //30 günde expire olacak
                    httpOnly: true,
                })

                response.json("Logged in");

                //response.send("200");

            }
        })
        }
        
        
        
    })
    
})

app.post('/logout',validateToken,(request,response)=>{



    const temp = {name: 'asd', id: 0}
    const accessToken = createTokens(temp);
    response.cookie('access-token',accessToken,{
        maxAge: 1,  
        httpOnly: true,
    })

    response.json("Loged out");



 
})


app.get('/islogedin',validateToken,(request, response)=>{
    response.status(200).json('User_already-logedin');
})



app.get('/getNotes', validateToken, (request, response)=>{
    dbOperation.getNotes().then(res=>{
        response.send(res.recordset);
    })
} )










app.listen(API_PORT, ()=> console.log('server started on 5000 port...'));