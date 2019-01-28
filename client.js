var net = require('net');

var client = new net.Socket();
client.connect(<server port>, '<node.js server address>', function() {
    console.log('Writing to server!');
	//Example with json example
	//client.write('{"target":{"_id":{"$oid": "56f18b25fc13ae3b0e00048b"},"tags": [{"category": "Food \u0026 Drinks","tag": "desserts","_id": {"$oid": "56f18b25fc13ae3b0e00048c"}}, {"category": "Jobs","tag": "solicitor","_id": {"$oid": "56f18b25fc13ae3b0e00048d"}}, {"category": "Hobbies \u0026 Interests","tag": "art","_id": {"$oid": "56f18b25fc13ae3b0e00048e"}}, {"category": "Arts \u0026 Culture","tag": "opera","_id": {"$oid": "56f18b25fc13ae3b0e00048f"}}, {"category": "Jobs","tag": "interpreter","_id": {"$oid": "56f18b25fc13ae3b0e000490"}}, {"category": "Public Services","tag": "reprography","_id": {"$oid": "56f18b25fc13ae3b0e000491"}}, {"category": "Arts \u0026 Culture","tag": "stadiums","_id": {"$oid": "56f18b25fc13ae3b0e000492"	}}, {"category": "Public Services","tag": "accomodation","_id": {"$oid": "56f18b25fc13ae3b0e000493"}}, {"category": "Outdoor Venues","tag": "monuments","id": {"$oid": "56f18b25fc13ae3b0e000494"}}]},"usersInRange": [{"_id": {"$oid": "56f18af1fc13ae3b0e0002f6"},"tags": [{"category": "Jobs","tag": "architect","_id": {"$oid": "56f18af1fc13ae3b0e0002f7"}}, {"category": "Public Services","tag": "police","_id": {"$oid": "56f18af1fc13ae3b0e0002f8"}}, {"category": "Food \u0026 Drinks","tag": "desserts","_id": {"$oid": "56f18af1fc13ae3b0e0002f9"}}, {"category": "Jobs","tag": "tourist guide","_id": {"$oid": "56f18af1fc13ae3b0e0002fa"}}, {"category": "Shopping","tag": "shopping","_id": {"$oid": "56f18af1fc13ae3b0e0002fb"}}, {"category": "Arts \u0026 Culture","tag": "stadiums","_id": {	"$oid": "56f18af1fc13ae3b0e0002fc"}}, {	"category": "Food \u0026 Drinks","tag": "spirits","_id": {"$oid": "56f18af1fc13ae3b0e0002fd"}}]}]}');
	client.write(ExampleInputJSON.json);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
