const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 8080;

const admin = require('firebase-admin');
const credentials = require('./key.json');

class Activity {
  constructor(sl,name, list, networkingDone, networkingTarget, infosDone, infosTarget,reinfosDone, reinfosTarget, meetupsDone, 
      meetupsTarget, invisDone, invisTarget, plans, pendingPlans, remarks) {
      (this.sl = sl),
      (this.name = name),
      (this.list = list),
      (this.networkingDone = networkingDone),
      (this.networkingTarget = networkingTarget),
      (this.infosDone = infosDone),
      (this.infosTarget = infosTarget),
      (this.reinfosDone = reinfosDone),
      (this.reinfosTarget = reinfosTarget),
      (this.meetupsDone = meetupsDone),
      (this.meetupsTarget = meetupsTarget),
      (this.invisDone = invisDone),
      (this.invisTarget = invisTarget),
      (this.plans = plans),
      (this.pendingPlans = pendingPlans),
      (this.remarks = remarks);
  }
}

admin.initializeApp({
  credential : admin.credential.cert(credentials)
});

const db = admin.firestore();

app.set('view engine', 'ejs');

app.use(session({
  secret: 'Sapphire2025',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
      next(); // User is authenticated, continue to next middleware
  } else {
      res.redirect('/login'); // User is not authenticated, redirect to login page
  }
}


app.use(express.static(path.join(__dirname, 'public')));


app.post("/addUser",requireAuth, async (req,res)=>{
  // console.log(req);
  try{
    const name = req.body.name;
    const userJson = {
      list : 0,
      networkingDone : 0,
      networkingTarget : 0,
      infosDone : 0,
      infosTarget : 0,
      reinfosDone : 0,
      reinfosTarget : 0,
      meetupsDone : 0,
      meetupsTarget :0,
      invisDone :0,
      invisTarget :0,
      plans : 0,
      pendingPlans :0,
      remarks : ""
    };

    const d = new Date();
    let year = d.getFullYear();
    // console.log(year + 1);

    for(let i=1; i<=53; i++){
      db.collection("users").doc(name).collection(year.toString()).doc(i.toString()).set(userJson);
      db.collection("users").doc(name).collection((year + 1).toString()).doc(i.toString()).set(userJson);
    }
    // const response = db.collection("users").doc(name).collection("2025").doc(week).set(userJson);
    res.send("success");
  }catch(err){
    res.send(err);
  }
});

app.post("/updateUser",requireAuth, async (req,res)=>{
  // console.log(req);
  try{
    const name = req.body.name;
    const week = req.body.week;
    const year = req.body.year;
    const fieldName = req.body.fieldName;
    const value = req.body.value;

    // console.log(name);
    // console.log(week);
    // console.log(year);
    // console.log(fieldName);
    // console.log(value);

    

    var userJson = '{"' + fieldName + '" : ' + value + '}';
    if(fieldName == "remarks"){
      userJson = '{"' + fieldName + '" : "' + value + '"}';
    }
    // console.log(userJson);
    const obj = JSON.parse(userJson);
    // console.log(obj);


      db.collection("users").doc(name).collection(year).doc(week).update(obj);

    // const response = db.collection("users").doc(name).collection("2025").doc(week).set(userJson);
    res.send("success");
  }catch(err){
    res.send(err);
  }
});

app.post("/getData",requireAuth, async (req,res) => {
  // console.log(req);
  try{
      const year = req.body.year;
      const week = req.body.week;
      const data = await getCollectionData('users', year, week);
      res.send(data);
  }catch(err){
    res.send(err);
  }
});


app.post("/analyzeData",requireAuth, async (req,res) => {
  // console.log(req);
  try{
      const year = req.body.year;
      const weekFrom = req.body.weekFrom;
      const weekTo = req.body.weekTo;
      const name = req.body.name;

      const data = await getAnalyzeData('users', year, weekFrom, weekTo, name);
      res.send(data);
  }catch(err){
    res.send(err);
  }
});

app.post("/getNames",requireAuth, async(req,res) =>{
  
  const docArray = await getUserNames();
 
  res.send(docArray);
});

app.get("/delete",requireAuth, async (req,res) => {
  // console.log(req.query);
  // res.send(req.query.name);


  const name = req.query.name;
  // console.log(name);
  await db.recursiveDelete(db.collection("users").doc(name));
  // console.log("done");

  res.redirect('/add');
});

async function getAnalyzeData(collection, year, weekFrom, weekTo, name) {

  const snapshot = await db.collection(collection).doc(name.toString()).collection(year.toString()).listDocuments();
  const docArray = [];
  const idArray = [];

  let sl = 1;

  for(let i =1; i <= snapshot.length; i++){
    if(parseInt(snapshot[i-1].id)>= parseInt(weekFrom) && parseInt(snapshot[i-1].id) <= parseInt(weekTo)){
      idArray.push(parseInt(snapshot[i-1].id));
    }
  }

  idArray.sort(function(a, b){return a - b});

  for(let j =0; j < idArray.length; j++){
      const snap = await db.collection(collection).doc(name.toString()).collection(year.toString()).doc(idArray[j].toString()).get();

      const activity = new Activity(
      sl,parseInt(idArray[j]), snap.data().list, snap.data().networkingDone, snap.data().networkingTarget, snap.data().infosDone, snap.data().infosTarget,
      snap.data().reinfosDone, snap.data().reinfosTarget, snap.data().meetupsDone, snap.data().meetupsTarget,
      snap.data().invisDone, snap.data().invisTarget, snap.data().plans, snap.data().pendingPlans, snap.data().remarks
      );

      sl++;

      docArray.push(activity);
  }

  // for(let i =1; i <= snapshot.length; i++)
  // {
  //   // console.log(parseInt(snapshot[i].id));
  //   // docArray.push(parseInt(snapshot[i].id));

  //   if(parseInt(snapshot[i-1].id)>= parseInt(weekFrom) && parseInt(snapshot[i-1].id) <= parseInt(weekTo)){
      
  //     const snap = await db.collection(collection).doc(name.toString()).collection(year.toString()).doc(snapshot[i-1].id.toString()).get();

  //     const activity = new Activity(
  //     sl,parseInt(snapshot[i-1].id), snap.data().list, snap.data().networkingDone, snap.data().networkingTarget, snap.data().infosDone, snap.data().infosTarget,
  //     snap.data().reinfosDone, snap.data().reinfosTarget, snap.data().meetupsDone, snap.data().meetupsTarget,
  //     snap.data().invisDone, snap.data().invisTarget, snap.data().plans, snap.data().pendingPlans, snap.data().remarks
  //     );

  //     sl++;

  //     docArray.push(activity);
  //   }
  // }

  // docArray.sort(function(a, b){return a - b});

  return docArray;
}

async function getUserNames(){
  const snapshot = await db.collection("users").listDocuments();
  const docArray = [];
  for(let i =0; i < snapshot.length; i++)
    {
      docArray.push(snapshot[i].id);
    }
  return docArray;
}

async function getCollectionData(collection, year, week) {

  const snapshot = await db.collection(collection).listDocuments();
  const docArray = [];


  for(let i =0; i < snapshot.length; i++)
  {
    
    const snap = await db.collection(collection).doc(snapshot[i].id).collection(year).doc(week).get();
      
    const activity = new Activity(
      i+1,snapshot[i].id, snap.data().list, snap.data().networkingDone, snap.data().networkingTarget, snap.data().infosDone, snap.data().infosTarget,
      snap.data().reinfosDone, snap.data().reinfosTarget, snap.data().meetupsDone, snap.data().meetupsTarget,
      snap.data().invisDone, snap.data().invisTarget, snap.data().plans, snap.data().pendingPlans, snap.data().remarks
    );

    docArray.push(activity);

  }

  return docArray;
}


// sendFile will go here
app.get('/',requireAuth, function(req, res) {
  res.render('dashboard', {userName : req.session.userId, page : 'dash'});
});

app.get('/Login', function(req, res) {
  res.render( 'login');
});

app.post('/Login', function(req, res) {

  if (req.body.userID == "Sayantan" && req.body.pass == "123") {
    req.session.userId = req.body.userID; // Set session identifier
    res.redirect('/');
    } else {
      res.render( 'login');
  }
  
});

app.get('/logout',requireAuth, function(req,res){
  req.session.destroy(function(err){
    res.redirect('/');
  });
});

app.get('/view',requireAuth, function(req, res) {
  res.render('view', {page : 'view'});
});

app.get('/add',requireAuth, async function(req, res) {
  res.render('add',{page : 'add'});
});

app.get('/profile',requireAuth, function(req, res) {
  res.render('profile',{page : 'profile'});
});

app.get('/analyze',requireAuth, async function(req, res) {

  const docArray = await getUserNames();

  res.render('analyze',{page : 'analyze', userNames : docArray});
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*',requireAuth, function(req, res){
  res.render('404',{page : '404'});
});

app.listen(port);
console.log('Server started at http://localhost:' + port);