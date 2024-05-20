const express = require ("express");
const app =express();

const port = 5000;




app.use(express.json());  
app.use("/api/",require("./routes/adminRoutes"))


app.listen(port ,()=>{
  console.log(`server running on port ${port}`)
})
