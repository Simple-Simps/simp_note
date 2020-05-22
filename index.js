const express = require('express')
const Datastore = require('nedb')
const mailer = require('nodemailer')
const transporter = mailer.createTransport({
	'service': 'gmail',
	'auth': {
		'user': 'simpnote07@gmail.com',
		'pass': '0unittests'
	}
});

const app = express()

const database = new Datastore('database.db')

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

database.loadDatabase()

app.get('/allNotes', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end()
    }
    res.json(data)
  })
})

app.get('/oneNote', (req, res) => {
  const noteTitle = req.query.note
  database.find({ title: noteTitle }, (err, data) => {
    if(err) {
      res.end()
    }
    res.json(data)
  })
})

app.post('/newNote', (req, res) => {
  const data = req.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  database.insert(data)
  res.json(data)
})

app.post('/shareNotes', (req, res) => {
	const data = req.body;

	let mailOptions = {
		  from: 'simpnote07@gmail.com',
		  to: data.email,
		  subject: 'Sending you my notes!',
		  text: ''
	};

	let result = {
		error: true,
		message: ""
	};

	if (!data.email) {
		result.message = "No Email Set!";
		res.json(result);
	}

	database.find({}, (err, notes) => {
		if (err) {
			result.message = "No Notes Found";
		} else {
			for (let key in notes) {
				mailOptions.text = `${mailOptions.text}

				${notes[key]['title']}
				- ${notes[key]['note']}`;
			}

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					result.message = error;
				} else {
					result.error = false;
					result.message = info.response;
				}

				res.json(result);
			});
		}
	});
})

app.listen(3000, () => console.log('go to http://localhost:3000'))
