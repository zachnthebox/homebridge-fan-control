const express = require('express');
const app = express();
const port = process.env.PORT || 4444;
const fanOperations = require('./fan');

app.use(express.json());

app.get('/api/fan/living-room', (req, res) => {
  fanOperations.isFanOn().then(isActive => {
    res.json({
      isActive,
    });
  });
});

app.put('/api/fan/living-room', (req, res) => {
  console.dir(req.body);
  if (req.body.isActive) {
    fanOperations
      .turnOnFan()
      .then(() => {
        res.send('Successful');
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    fanOperations
      .turnOffFan()
      .then(() => {
        res.send('Successful');
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

app.listen(port, () =>
  console.log(`Fan controller listening on port ${port}!`)
);
