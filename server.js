const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");


const app = express();

var corsOption = {
origin : "http://localhost:8081"
};

//cors provides Express middleware to enable CORS
// app.use(cors(corsOption));

app.use(cors());


// parse request of content-type - application/json
app.use(express.json());

//parse request content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//cookie-session helps to stores the session data on the client 
//within a cookie without requiring any database/resources on the server side

app.use(cookieSession({
    name:"lazyDeveloper-session",
    secret:"COOKIE_SECRET",
    httpOnly:true,
}));

const db = require('./app/models');
const Role = db.role;

db.mongoose.connect(`mongodb+srv://allence97:allenceJesus@cluster0.ga7muou.mongodb.net/?retryWrites=true&w=majority` ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connect to MongoDB.");
   // initial() function helps us to create 3 important rows in roles collection.
    initial();
}).catch((err)=>{
    console.error("Connection error", err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

//simple route 

app.get("/" , (req,res)=>{
    res.json({message:"Hello from Lazy Developer"})
});

// ROUTES
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app); 
require('./app/routes/events.routes')(app); 


// set port and listen

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`App running on port  ${PORT}`);
});
