const express = require('express');
const app = express();
const port = process.env.PORT || 4444;
const fanOperations = require('./fan');

app.get('/api/fan/living-room/actions/turnOn', (req, res) => {
  fanOperations.turnOnFan().then(() => {
    res.send('Successful');
  }).catch(error => {
    res.send(error);
  });
});
app.get('/api/fan/living-room/actions/turnOff', (req, res) => {
  fanOperations.turnOffFan().then(() => {
    res.send('Successful');
  }).catch(error => {
    res.send(error);
  });
});

app.listen(port, () => console.log(`Fan controller listening on port ${port}!`));
