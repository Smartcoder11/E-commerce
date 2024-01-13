const express = require("express");
const path = require("path");
const app = express(); //this line means iss variable 'app' me express ke saare methods,powers aa gye
const hbs = require("hbs");

require("./db/conn")
const Signup = require("./models/signup");

const port = process.env.PORT || 3000; //This means ki hum jab bhi website host karenge tab port woh apne aap le le uske liye ye line h

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("credential")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/signin", (req, res) => {
    res.render("signin")
})

app.post("/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            const signuser = new Signup({
                firstname: req.body.firstname,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cassword,
            })

            const registered = await signuser.save();
            res.status(201).render("index");

        }else{
            res.send("Password are not matching")
        }

    }
    catch (error) {
        res.status(400).send(error);
    }
})

app.post("/signin", async (req, res) => {
    try{

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Signup.findOne({email:email});
        
        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("Invalid login details");
        }

    }catch(error){
        res.status(400).send("Invalid login details")
    }
})

app.get("/", (req, res) => {
    res.render("signin")
})

app.get("/index.html", (req, res) => {
    res.render("index")
})
app.get('/blog.html', (req, res) => {
    res.render("blog");
});
app.get("/about.html", (req, res) => {
    res.render("about")
})
app.get("/shop.html", (req, res) => {
    res.render("shop")
})
app.get("/contact.html", (req, res) => {
    res.render("contact")
})
app.get("/cart.html", (req, res) => {
    res.render("cart")
})



app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
})











