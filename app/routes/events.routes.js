// api/events
//GET
//POST
//PUT
 const controller = require('../controllers/events.controller');
const db = require("../models");
const { upload , authJwt} = require("../middlewares");

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
app.get("/api/events",[authJwt.verifyToken],controller.fetchAll);
app.get("/api/events/:id",[authJwt.verifyToken],controller.fetchOne);
app.delete("/api/events/:id",[authJwt.verifyToken],controller.delete);
app.patch("/api/events/:id",[authJwt.verifyToken],controller.update);
// app.put("api/events");
}
