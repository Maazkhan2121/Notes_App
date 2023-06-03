const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')


connectToMongo();

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())
// app.get('/hello', query('person').notEmpty(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     return res.send(`Hello, ${req.query.person}!`);
//   }

//   res.send({ errors: result.array() });
// });

app.use('/api/auth', require('./routes/auth') )
app.use('/api/notes', require('./routes/notes') )

app.listen(port, () => {
  console.log(`i Note-Book listening at http://127.0.0.1:${port}`)
})
