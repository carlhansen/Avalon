const express = require('express'),
      gun = require('gun');

const app = express(),
      port = 6969;

app.use(gun.serve);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

gun({
  web: server
});