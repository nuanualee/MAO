
const AWS = require('aws-sdk')

const Polly = new AWS.Polly({
	// update region'
    region: "ap-southeast-1"
})
async function polly(input) {
    const text = input.text;
    
    return {
        'statusCode': 200,
        'body': text
    }
    // const input = {
    // 	Text: "Hola, Buenas dias.",
    // 	VoiceId: "Mia",
    // 	LanguageCode: "en-US" 
    // }
    
    // Polly.synthesizeSpeech(input, (err, data) => {
    // 	if (err) {
    // 		console.log(err)
    // 		return
    // 	}
    // 	return data.AudioStream
    // // 	if (data.AudioStream instanceof Buffer) {
    // // 		fs.writeFile('hello.mp3', data.AudioStream, (fsErr) => {
    // // 			if (fsErr) {
    // // 				console.error(fsErr)
    // // 				return
    // // 			}
    // // 			console.log('Success')
    // // 		})
    // // 	}
    // })
}
module.exports.polly = polly;