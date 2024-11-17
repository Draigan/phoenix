const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const data = require('./output.json');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 9999;

function checkFileExists(dir, fileName) {
	return new Promise((resolve, reject) => {
		fs.readdir(dir, (err, files) => {
			if (err) {
				reject(err); // Handle error if directory read fails
			} else {
				resolve(files.includes(fileName)); // Check if the file exists
			}
		});
	});
}

const corsOptions = {
	origin: 'https://phoenix.draigan.com',
	optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Create a client
const client = new textToSpeech.TextToSpeechClient();

app.get('/phoenix', async (req, res) => {
	const text = req.query.text || 'No Query Text';
	// Dont do the google request if the file is already here
	const fileExists = await checkFileExists("./audio", `${text}.mp3`);
	if (fileExists) {
		const outputPath = path.join(__dirname, `audio/${text}.mp3`);
		res.sendFile(outputPath);
		return;
	}

	const request = {
		input: { text: text },
		voice: {
			languageCode: 'en-US',
			name: 'en-US-Wavenet-F',
			ssmlGender: 'FEMALE',
		},
		audioConfig: { audioEncoding: 'MP3' },
	};

	try {
		const [response] = await client.synthesizeSpeech(request);

		const outputPath = path.join(__dirname, `audio/${text}.mp3`);
		fs.writeFileSync(outputPath, response.audioContent, 'binary');
		res.sendFile(outputPath); // Send the file back to the client
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.get('/phoenixdata', async (req, res) => {
	res.json(data);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

