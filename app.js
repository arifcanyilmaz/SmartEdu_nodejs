const express = require("express"); // Express modülünü import ettik. (CORE)

const app = express();

app.get("/", (req, res) => {

  res.status(200).send("Hello Nodejs");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server Başlatıldı. -->", port);
});
