var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    Marker                = require("./models/marker"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")


//Setting up MongoDB    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/municipal_app", { useMongoClient: true });

//Initializing required apps
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "This is a municipal App",
    resave: false,
    saveUninitialized: false
}));

//Authentication Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Home Route
app.get("/", function(req, res){
    res.render("home");
});

//Map Routes
app.get("/map",isLoggedIn, function(req, res){
   res.render("map"); 
});

app.post("/map", function(req, res){
     // get data from form and add to DB
    var long = req.body.lat;
    var lat = req.body.lat;
    var newMarker = {name: name, image: image, description: desc}
    // Create a new marker for the marker schema
    Marker.create(newMarker, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/map");
        }
    });
})

//Authentication Form
//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home");
        });
    });
});

//Login Form Route
app.get("/login", function(req, res){
   res.render("login"); 
});

//Login Post Route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/Report",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/driverreport", function(req, res){
    res.render("DriverReport"); 
 });

 app.get("/getlocation", function(req, res){
    res.render("GetLocation"); 
 });


//Listening for server startup
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
})
