const express = require('express');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT || 5000;
const cors=require('cors');
const authRoutes=require('./routes/authRoutes');
const app = express();
const cookieParser=require('cookie-parser');
// const {URI}=require('./keys');
const uri=process.env.uri;
const {requireAuth , checkUser }=require('./middleware/authMiddleware');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then((result)=>{
  app.listen(port,()=>{
    console.log("Backen server is successfully connected to DB and running on port",port);
  })
}).catch((err)=>{ 
  console.log(err);
});

app.use(cookieParser());

app.get('*',checkUser);

app.use(authRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
