const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const http = require("http")
const mysql = require("mysql")
const cors = require("cors")

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

app.listen(3001, () => {
	console.log("running on port 3001")
})

// const server = http.createServer(app)
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id)

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	})

// 	socket.on("callUser", (data) => {
// 		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
// 	})

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	})
// })

// server.listen(5000, () => console.log("server is running on port 5000"))