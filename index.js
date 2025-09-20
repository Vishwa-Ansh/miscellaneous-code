const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require('cookie-parser');

app.use(cookieParser("secretcode"));
app.get("/cookies",(req,res)=>{
    let {username } = req.params;

    res.cookie("name", "username" , {signed:true});
res.send("save cookies")
})
app.get('/test', function (req, res) {
    
  // Cookies that have not been signed
  console.dir( req.cookies)

  // Cookies that have been signed
  res.send(req.signedCookies);
})

// app.get("/cookies",(req,res)=>{
//     res.cookies("greet", "vishwakarma")
// })

app.listen(port, ()=>{
    console.log(`listning on port ${port}`);
});