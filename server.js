const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//Init The APP
const app = express();

//Body Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes File
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect To MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch((err => console.log(err)));


//passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


//Use Routes
app.use('/api/users' , users);
app.use('/api/profile' , profile);
app.use('/api/posts' , posts);

//Server Static assets if in production
if(process.env.NODE_ENV === 'production'){
	//Set Static Folder
	app.use(express.static('client/build'));

	app.get('*',(req , res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
}

const port = process.env.PORT || 5000;
app.listen(port , () => {
	console.log(`Server Running On Port ${port}`);
});
