const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require("cors")
const app = express()
const mongoose = require("mongoose");
mongoose.connect("mongodb://prathamesh:prathamesh@ac-rovb9yg-shard-00-00.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-01.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-02.9fh8spg.mongodb.net:27017/2_codies?ssl=true&replicaSet=atlas-w4n73x-shard-0&authSource=admin&retryWrites=true&w=majority");
const customer = require("./models/customer");
const owner = require("./models/owner");


let port = 5000;
let secret_key = "secret-key";
// parse application/json
app.use(bodyParser.json())
app.use(cors());

//Validation Function
function isValid(name, email, password) {
    let valid = true;
    if (name.length < 2 || name.length > 40) {
        valid = false;
    } else if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) == -1) {
        valid = false;
    }
    else if (password.length < 8) {
        valid = false;
    }
    return valid;
}


app.get('/', (req, res) => {
    res.send('Welcome this is the home endpoint');
})


//User Creation Module
app.post('/signup', async (req, res) => {
    try {
        if (isValid(req.body.name, req.body.email, req.body.password)) {
            data = await customer.findOne({ email: req.body.email });
            if (data != null) {
                res.send({ error: true, message: `User with Email Id- ${req.body.email} already exists` });
                return;
            }

            if (req.body.role === "customer") {
                const custInstance = new customer({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    ratedMess: ""
                });
                await custInstance.save();
                // console.log("user added");
                data = {
                    time: Date(),
                    name: req.body.name,
                    email: req.body.email
                }
                const token = jwt.sign(data, secret_key);
                res.send({ error: false, "auth_token": token });
            }
            else {
                data = await owner.findOne({ email: req.body.email });
                if (data != null) {
                    res.send({ error: true, message: `User with Email Id- ${req.body.email} already exists` });
                    return;
                }
                const ownerInstance = new owner({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    description: "",
                    location: "",
                    menu: "",
                    address: "",
                    price: "",
                    rating: 0,
                    review: []
                })
                data = await ownerInstance.save();
                // console.log("user added");
                data = {
                    time: Date(),
                    name: req.body.name,
                    email: req.body.email
                }
                const token = jwt.sign(data, secret_key);
                res.send({ error: false, "auth_token": token });
            }
        }
        else {
            res.send({ error: true, message: "Please fill the form properly!" });
        }
    }
    catch (err) {
        console.log(err);
        res.send({ error: "true", message: "An error occurred" });
    }
})


//Login Module
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (req.body.role === "customer") {
            customer.findOne({ email: email, password: password }).then((data) => {
                if (data) {
                    const token_data = {
                        time: Date(),
                        name: data.name,
                        email: data.email
                    };
                    const token = jwt.sign(token_data, secret_key);
                    res.send({ error: false, "auth_token": token, "role": "customer" });
                } else {
                    res.send({ error: true, message: "Invalid Credentials" });
                }
            });
        }
        else {
            owner.findOne({ email: email, password: password }).then((data) => {
                if (data) {
                    const token_data = {
                        time: Date(),
                        name: data.name,
                        email: data.email
                    };
                    const token = jwt.sign(token_data, "secret-key");
                    res.send({ error: false, "auth_token": token, "role": "owner" });
                } else {
                    res.send({ error: true, message: "Invalid Credentials" });
                }
            });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
});

//Updating Owner
app.post('/update-owner', async (req, res) => {
    try {
        const data = jwt.verify(req.body.auth_token, secret_key);
        const email = data.email;
        const name = req.body.name;
        const description = req.body.description;
        const location = req.body.location;
        const address = req.body.address;
        const password = req.body.password;

        await owner.findOneAndUpdate({ email: email }, { description: description, location: location, name: name, address: address, password: password });
        res.send({ error: false, message: "Owner Updated" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
})

//Updating Menu
app.post('/update-menu', async (req, res) => {
    try {
        const data = jwt.verify(req.body.auth_token, secret_key);
        // console.log("reached")
        const email = data.email;
        const menu = req.body.menu;
        const price = req.body.price;
        const lastUpdated = new Date();
        await owner.findOneAndUpdate({ email: email }, { menu: menu, price: price, lastUpdated: lastUpdated });
        res.send({ error: false, message: "Menu Updated" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
})

//Find menu
app.post('/find-menu', async (req, res) => {
    try {
        const data = await owner.find({ menu: { "$regex": req.body.menu, "$options": "i" } });
        let resArray = []
        data.forEach((element) => {
            resArray.push({
                menu: element.menu,
                price: element.price,
                name: element.name,
                email: element.email,
                stars: element.rating
            });
        })
        if (data) {
            res.send({ error: "false", message: "Data found", data: resArray });
        }
        else {
            res.send({ error: "true", message: "Data not found", data: resArray });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
});

//Get all menu
app.post('/all-menu', async (req, res) => {
    try {
        const data = await owner.find({});
        let resArray = []
        data.forEach((element) => {
            resArray.push({
                menu: element.menu,
                price: element.price,
                name: element.name,
                email: element.email,
                stars: element.rating
            });
        })
        if (data) {
            res.send({ error: "false", message: "Data found", data: resArray });
        }
        else {
            res.send({ error: "true", message: "Data not found", data: resArray });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
});

//Get hotel
app.post('/get-hotel', async (req, res) => {
    try {
        const data = await owner.findOne({ email: req.body.email });
        if (data) {
            res.send({
                error: "false", message: "Data found", data: {
                    name: data.name,
                    menu: data.menu,
                    price: data.price,
                    description: data.description,
                    address: data.address,
                    location: data.location,
                    stars: data.rating
                }
            });
        }
        else {
            res.send({ error: "true", message: "Data not found" });
        }
    }
    catch (err) {
        res.send({ error: true, message: "Some internal error occured !" });
    }
});

//Get owner
app.post('/get-owner', async (req, res) => {
    let data = jwt.verify(req.body.auth_token, secret_key);
    let email = data.email;
    // console.log(email);
    let ownerData = await owner.findOne({ email: email });
    res.send({ error: false, data: ownerData });
})

//Get Customer
app.post('/get-customer', async (req, res) => {
    try {
        let data = jwt.verify(req.body.auth_token, secret_key)
        let email = data.email;
        let customerData = await customer.findOne({ email: email });
        res.send({ error: false, data: { name: customerData.name } });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
})


//Get Particular Menu
app.post('/get-menu', async (req, res) => {
    try {
        let data = jwt.verify(req.body.auth_token, secret_key);
        let email = data.email;
        let customerData = await owner.findOne({ email: email });
        let menu = customerData.menu;
        let price = customerData.price;
        let stars = customerData.rating;
        res.send({ error: false, menu: menu, price: price, stars:stars });
    }
    catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
});


// Rate Mess
app.post("/rate-mess", async (req, res) => {
    try {
        let tokenData = jwt.verify(req.body.auth_token, secret_key);
        let ownerEmail = req.body.email;
        let custEmail = tokenData.email;
        let ownerData = await owner.findOne({ email: ownerEmail });
        let custData = await customer.findOne({email: custEmail});
        
        let review = ownerData.review;
        let reviewObj = {
            review:req.body.review, author:custData.name
        }
        
        review.push(reviewObj);
        let rating = ownerData.rating;
        rating = rating + req.body.stars;
        //console.log(req.body.stars)
        let ratedMess = custData.ratedMess+", "+ownerEmail;
        await owner.findOneAndUpdate({ email: ownerEmail }, { rating:rating, review: review});
        await customer.findOneAndUpdate({email: custEmail}, {ratedMess: ratedMess})
        res.send({ error: false, message: "Mess Rated Successfully!" });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
});

// Check Rate
app.post("/check-rate", async (req, res) => {
    try {
        let tokenData = jwt.verify(req.body.auth_token, secret_key);
        let customerEmail = tokenData.email;
        let ownerEmail = req.body.email;
        const searchData = await customer.find({email: customerEmail, ratedMess: { "$regex": ownerEmail, "$options": "i" } });
        if(searchData.length > 0){
            res.send({error: false, hasRated: true});
        }
        else{
            res.send({error: false, hasRated: false});
        }
    }
    catch(err){
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
});

//Get reviews
app.post("/get-reviews", async (req,res)=>{
    try{
        let email = req.body.email;
        let ownerData = await owner.findOne({email:email});
        let review = ownerData.review;
        res.send({error: false, review: review})
    }
    catch(err){
        res.send({error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!"})
    }
})

app.listen(port, () => {
    console.log(`Codies Mess Backend Listening on Port ${port}...`)
})