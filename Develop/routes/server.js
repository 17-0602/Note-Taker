const express = require('express');
const htmlRoutes = require('./HTMLroutes');
const path = require('path');
const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, '../public'));

require('./APIroutes')(app);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);