import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.send("server is ready.")
})

app.get('/api/jokes', (req, res) => {
    const jockes = [
        {
            id: 1,
            title: "A joke",
            content: "This is a joke",
        },
        {
            id: 2,
            title: "B joke",
            content: "This is a joke",
        },
        {
            id: 3,
            title: "C joke",
            content: "This is a joke",
        },
        {
            id: 4,
            title: "D joke",
            content: "This is a joke",
        },
        {
            id: 5,
            title: "E joke",
            content: "This is a joke",
        },
    ];
    res.send(jockes);
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})