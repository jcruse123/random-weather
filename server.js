const express = require('express');
const app = express();
const path = require('path');

const weather = require('./routes/api/weather');

app.use(express.json());
app.use(express.urlencoded());

// Use routes
app.use('/api/weather', weather);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
