const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host:'localhost',
  user:'estela',
  password:'senai123',
  database: 'users'
});

db.connect((error)=>{
    if(error){
        console.log('Erro ao conectar com banco de dados');
    } else{
        console.log('Conectado ao mysql');
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`);
})


app.get("/", (req, res)=> {
    res.sendFile(__dirname + '/views/login.html')
})


app.post ('/login', (req,res)=> {
    const username = req.body.usuario
    const password = req.body.senha

    db.query('SELECT password from user where username = ?', [username] , (error, results)=>{ 
        if(error){
            console.log('Erro ao realizar consulta', error);
        }else{
            if(results.length > 0 ){
                const passwordBD = results[0].password;
                if (passwordBD === password){
                    console.log('Login Bem Sucedido!')
    
                }else{
                    console.log('Login ou Senha Incorretos')
                }
           }else{
            console.log('Usuário Não Cadastrado')
           } 
        }
     })
    

});

app.get("/cadastro", (req, res)=> {
    res.sendFile(__dirname + '/views/cadastro.html')
})

    
app.post("/cadastro", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.passwordConfirm;


    if (password === confirm) {
        db.query('insert into user (username, password) values (?, ?)', [username, password], (error, results) =>{
            if(error){
                console.log("Erro ao realizar o cadastro", error)
            } else {
                console.log("Cadastro realizado com sucesso!")
            }
        })

    }else {
        console.log("Senhas Não Coincidem")
    }
})












