const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

async function listEnglishVoices() {
	const [result] = await client.listVoices({});
	const voices = result.voices;

	// Filter voices that include English language codes
	const englishVoices = voices.filter(voice => {
		return voice.languageCodes.some(code => code.startsWith('en'));
	});

	englishVoices.forEach(voice => {
		console.log(`Name: ${voice.name}`);
		console.log(`SSML Gender: ${voice.ssmlGender}`);
		console.log(`Language Codes: ${voice.languageCodes.join(', ')}`);
		console.log(`Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
		console.log('---');
	});
}

listEnglishVoices();

