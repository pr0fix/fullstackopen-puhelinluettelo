const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"

    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"

    }
];

// get all persons
app.get("/api/persons", (request, response) => {
    response.json(persons);
});

// get person by id
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    };
});

// delete person
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});

// generate id for new person
const generatePersonId = () => {
    const personId = Math.floor(Math.random() * 100000)
    return personId;
}

// add person
app.post("/api/persons", (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name information missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number information missing'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            id: generatePersonId(),
            name: body.name,
            number: body.number
        };

        persons = persons.concat(person);

        response.json(person);
    }

})

// show info page
app.get("/info", (request, response) => {
    const timestamp = new Date();
    response.send(
        `Phonebook has info for ${persons.length} people <br/>
        ${timestamp}`
    );
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
