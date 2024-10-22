const express = require("express"); // Express modülünü import ettik. (CORE)
const mongoose = require('mongoose') // Mongodb için (NPM)
const pageRoute = require('./routes/pageRoute') // Sayfa Yönlendirme Routes Import
const courseRoute = require('./routes/courseRoute') // Course Routes Import
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
.then(() => console.log('Connected!'));

//Template Engine
app.set("view engine", "ejs");


//Middlewares
app.use(express.static("public")); // Statik dosyalarımızı kullanmamızı sağlıyor.
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Routes
app.use("/", pageRoute);
app.use("/courses", courseRoute);



//Port
const port = 3000;
app.listen(port, () => {
  console.log("Server Başlatıldı. -->", port);
});
