const express = require("express"); // Express modülünü import ettik. (NPM)
const mongoose = require('mongoose') // Mongodb için (NPM)
const session = require("express-session"); // Session için (NPM)
const MongoStore = require('connect-mongo'); // Giriş Çıkışı DBde tutmak (NPM)
const pageRoute = require('./routes/pageRoute') // Sayfa Yönlendirme Routes Import
const courseRoute = require('./routes/courseRoute'); // Course Routes Import
const categoryRoute = require('./routes/categoryRoute'); // Category Routes Import
const userRoute = require('./routes/userRoute'); // Category Routes Import
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db')
.then(() => console.log('Connected!'));

//Template Engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static("public")); // Statik dosyalarımızı kullanmamızı sağlıyor.
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
}))

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);



//Port
const port = 3000;
app.listen(port, () => {
  console.log("Server Başlatıldı. -->", port);
});
