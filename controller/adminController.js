const fs=require ("fs")
const path = require ("path")

const DB_PATH= path.join(__dirname,'db.json')


const readDatabase=()=>{
  const data=fs.readFileSync(DB_PATH,'utf8')
  return JSON.parse(data);
}

const writeDatabase=(data)=>{
  fs.writeFileSync(DB_PATH,JSON.stringify(data,null,2));
}
const alldata =(req,res)=>{
  const db=readDatabase();
  res.json(db.Users)
}
const getConsumerData =(req,res)=>{
  const db=readDatabase();
  const consumers=db.Users.filter(entry => !entry.isAdmin)
  
  res.json(consumers)
}
const getAdminData =(req,res)=>{
  const db=readDatabase();
  const admins=db.Users.filter(entry => entry.isAdmin)
  res.json(admins)
}

const demoteAdminById =(req,res)=>{
  const db=readDatabase();
  const user = db.Users.find(user => user.id === parseInt(req.params.id));
  if (user) {
    user.isAdmin= !user.isAdmin
    writeDatabase(db);
    res.json(user)
  } else {
    res.status(404).send('User not found');
  }
}

const promoteUserById=(req,res)=>{
  const db=readDatabase();
  const user = db.Users.find(user => user.id === parseInt(req.params.id));
  if (user) {
    user.isAdmin= !user.isAdmin
    writeDatabase(db);
    res.json(user)
  } else {
    res.status(404).send('User not found');
  }
}



const newUser=(req,res)=>{
  const db=readDatabase();
  const newUser={
    id: db.Users.length ? db.Users[db.Users.length-1].id+1 :1,
    ...req.body
  };

  db.Users.push(newUser);
  writeDatabase(db)
}
module.exports={
  promoteUserById,demoteAdminById,getAdminData,getConsumerData,alldata,newUser
}