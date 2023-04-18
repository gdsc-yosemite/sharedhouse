const express = require('express')
const cors = require('cors')
// const path = require('path')
const app = express() // an express application

app.use(cors()); // adds cors middleware to express application
app.use(express.json()) // for parsing incoming requests with JSON payloads

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });

require('./firebase')(app);

app.get('/api', (req, res) => {
    res.json({ message: "HI" })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})