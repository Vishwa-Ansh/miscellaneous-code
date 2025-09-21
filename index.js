const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser("secretcode"));
  app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.get("/cookies", (req, res) => {
  let { username } = req.params;
  res.cookie("name", "username", { signed: true });
  res.cookie("age", 22, { signed: true });
  res.cookie("city", "indore");
  res.send("save cookies")
})
app.get("/session", (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;

  } else {
    req.session.page_views = 1;

  }
  res.send(`you visited this page ${req.session.page_views} times`)
})
app.get('/test', function (req, res) {

  // Cookies that have not been signed
  // console.dir( res.cookie())
  console.log(req.session)
 // Cookies that have been signed
  // console.dir(req.signedCookie
})

app.get('/flash', (req, res) => {
  req.flash('info', 'Flash is back!');
  
  res.redirect('/display')
})
app.get('/display', (req, res) => {
  res.locals.message = req.flash("info");
  res.render('flash.ejs')
})    
// app.get("/cookies",(req,res)=>{
//     res.cookies("greet", "vishwakarma")
// })

app.listen(port, () => {
  console.log(`listning on port ${port}`);
});