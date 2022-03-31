
// Matheus Mauricio Rodrigues da Silva RA:52124299
const express = require("express");
const { get } = require("express/lib/response");
const app = express();
app.use(express.json());
module.exports = app;


//Json Array
let clientes = [
{"id": 1, "nome": "Ednaldo Dorivaldo","endereco":"R, Augusta 123", "email": "ednaldovasco@gmail.com"},
{"id": 2, "nome": "João Carlos","endereco":"R, Peixeira 234", "email": "joaocarlos@gmail.com"},
{"id": 3, "nome": "Ednaldo Pereira","endereco":"R, Batatais 126", "email": "pereira@gmail.com"},
{"id": 4, "nome": "Peixoto Delgado","endereco":"R, Boreal 425", "email": "peixoto@gmail.com"},
{"id": 5, "nome": "Linharez Silva","endereco":"R, Flor 234", "email": "linharez@gmail.com"},
]
//Pagina inicial
app.get("/", (req, res) => {
    res.send("<h1>Bem vindo a pagina inicial</h1>")
});

// Mostrar todos os clientes
app.get("/clientes/", (req, res) => {    
    return res.json(clientes)
});

// Mostrar um único cliente
app.get("/clientes/:index", (req, res) => {
    const { index } = req.params;

    return res.json(clientes[index]);
    
});

//Cadastrar um novo cliente
app.post('/clientes', function (req, res) {
    let itemIds = clientes.map(item => item.id);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newItem = {
        id: newId,
        nome:  req.body,
        endereco: req.body.body,
        email: req.body.body
       }; 
    clientes.push(newItem);
    res.status(201).json(newItem);   
});

//Atualizar um cliente
app.patch('/clientes/:index', (req, res) => {
    const { index } = req.params;
    if (index === -1) {
        return res.status(404).send('Cliente não encontrado')
    }
    const updatedclient = {
        id: clientes[index].id,                                                
        nome: req.body.nome,                                                
        endereco: req.body.endereco,
        email: req.body.email
    }
    clientes[index] = updatedclient
    res.status(200).json('Cliente atualizado')
})
//Deletar um cliente
app.delete("/clientes/:index", (req, res) => {
    const { index } = req.params;

    clientes.splice(index, 1);
    
    return res.json({message: "O cliente foi deletado."})
});    

app.listen(3000);

