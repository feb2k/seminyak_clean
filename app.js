var express 	= require("express"),
	app			= express(),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser");
	

// APP CONFIG
mongoose.connect("mongodb://localhost/seminyak_clean");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL_CONFIG
var customerSchema = new mongoose.Schema({
	photo: String,
	firstName: String,
	lastName: String,
	phone: String,
	email: String,
	address1: String,
	address2: String,
	district: String,
	subdistrict: String,
	village: String,
	picture: String,
	created: {type: Date, default: Date.now}
});

var Customer = mongoose.model("Customer", customerSchema);

// RESTful ROUTES

app.get("/", function(req, res){
	res.redirect("/customers");
});


//INDEX ROUTES
app.get("/customers", function(req, res){
	Customer.find({}, function(err, customers){
		if(err){
			console.log("ERROR!");
		}else{
			res.render("customers", {customers: customers});
		}
	});
});

//NEW ROUTE
app.get("/customers/new", function(req, res){
	res.render("newcustomer");
});

//CREATE ROUTE
app.post("/customers", function(req, res){
	//create new customer
	Customer.create(req.body.customer, function(err, newCustomer){
		if(err){
			res.render("newcustomer");
		}else{
			res.redirect("/customers");
		}
	});
});

//SHOW ROUTE
app.get("/customers/:id", function(req, res){
	Customer.findById(req.params.id, function(err, foundCustomer){
		if(err){
			res.redirect("/customers");
		}else{
			res.render("show", {customer: foundCustomer});
		}
	});
});

app.listen(3000, function(){
	console.log("The server has started!");
});