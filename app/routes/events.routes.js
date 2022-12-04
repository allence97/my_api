// api/events
//GET
//POST
//PUT
 const controller = require('../controllers/events.controller');
const db = require("../models");
const { upload } = require("../middlewares");

// SET STORAGE
module.exports = function (app) {
   app.use(function (req, res , next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    
// app.post("/api/events",upload.single('file'),);

app.post("/api/events",upload.array('image'), controller.addEvent);
app.get("/api/events",controller.fetchAll);
app.get("/api/events/:id",controller.fetchOne);
app.delete("/api/events/:id",controller.delete);
app.patch("/api/events/:id",controller.update);
// app.put("api/events");
}
