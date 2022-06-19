// ALL INSIDE EC2 INSTANCE 
// http://ec2-3-1-211-128.ap-southeast-1.compute.amazonaws.com:3001/

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const http = require("http")
const mysql = require("mysql")
const cors = require("cors")
const PORT = process.env.PORT || 3001

// create db and connection 
const db = mysql.createConnection({
	// db information
	host: "database-2.c2qaunrwtxs0.ap-southeast-1.rds.amazonaws.com", // address of server running mysql
	user: "admin", // username of mysql db
	password: "ctec2022", 
	database: "Mao" // specified db to use
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

db.connect(function(err){
	if (err) throw err;
	console.log("Connection successful")
})


app.get("/", (req, res) => {
	res.json("OK")
})

app.get("/id", (req, res) => {
	res.json("OK ID")
})

app.get("/notes", (req, res) => {
	res.json("OK Get Notes")
})

app.get("/delete", (req, res) => {
	res.json("OK Delete")
})

app.post("/", (req, res) => {

	var user_id = req.body.user_id;
	var note = req.body.note;
	var topic = req.body.topic;
	var date = req.body.date;

	// create sql statement
	const sqlInsert = "INSERT INTO notes (user_id, note, topic, date) VALUES (?, ?, ?, ?);"
	db.query(sqlInsert, [user_id, note, topic, date,], (err, result) => {
			console.log(result)
	}) 
	res.json("Insert received" + note)
})

app.post("/id", (req, res) => {

	var id = req.body.id;

	// create sql statement
	const sqlInsert = "INSERT INTO user (id) VALUES (?) ON DUPLICATE KEY UPDATE id = ?;"
	db.query(sqlInsert, [id, id], (err, result) => {
			console.log(result)
	}) 
	
	res.json("Insert received" + id)
})

app.post("/notes", (req, res) => {

	var user_id = req.body.user_id;

	// create sql statement
	const sqlInsert = "SELECT * FROM notes WHERE user_id = ? ;"
	db.query(sqlInsert, [user_id], (err, result) => {
			console.log(result)
			// alert(result)
			res.send(result)
	}) 
	
})

app.delete("/delete/:topic", (req, res) => {

	var topic = req.params.topic;

	// create sql statement
	const sqlInsert = "DELETE FROM notes WHERE topic = ?;" 
	db.query(sqlInsert, topic, (err, result) => {
			console.log(result)
			// alert(result)
			res.send(result)
	}) 
	
})

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))
