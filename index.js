const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]



app.get('/info',(request,response) => {
  const currentTime = new Date().toLocaleString()

  const numberOfEntries = persons.length

  response.send(`<p>Phonebook has info for ${numberOfEntries} people </br> ${currentTime}<p/>`)
})


app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find(person => person.id === id);
  console.log(person);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== person)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const randomId = Math.floor(Math.random() * 10000)

  const body = request.body
  console.log(request.body)

  if(!body.number){
    return response.status(404).json({error:"Name or Number is missing"})
  }

  const newPerson = {
    id: randomId,
    name: body.name,
    number: body.number,
  }

  persons.push(newPerson)

  response.json(newPerson)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})