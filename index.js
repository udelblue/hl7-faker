var faker = require('faker');
var hl7Standard = require('hl7-standard')
var fs  = require('fs');

// It produces each time different data
for (i = 0; i < 20; i++) {

		// Initializing our variables with a different random data each time it is run
	var randomLastName = faker.name.lastName();
	var randomFirstName = faker.name.firstName();
	var randomGender = faker.name.gender();
	var randomEmail = faker.internet.email(); 
	var randomPhoneNumber = faker.phone.phoneNumber();
	var randomCity = faker.address.city();
	var randomZip = faker.address.zipCode();
	var randomDatePast = faker.date.past();
	var randomStreetName = faker.address.streetName();
	var randomStreetAddress = faker.address.streetAddress();
	var randomCountry = faker.address.country();
	var randomstateAbbr = faker.address.stateAbbr();
	var randomcityName = faker.address.cityName();


	var hl7 = new hl7Standard();
	hl7.createSegment('MSH');
	hl7.set('MSH', {
	'MSH.2': '^~\\&',
	'MSH.3': 'Example',
	'MSH.4': '123456',
	'MSH.5': '',
	'MSH.6': '',
	'MSH.7': "timestamp",
	'MSH.8': '',
	'MSH.9': {
		'MSH.9.1': 'ADT',
		'MSH.9.2': 'A08'
	},
	'MSH.10': '',
	'MSH.11': 'T',
	'MSH.12': '2.3'
	});

	hl7.createSegment('PID');

	hl7.set('PID.5.1', randomLastName);
	
	hl7.set('PID.15', { 'PID.15.1':'en', 'PID.15.2':'English' });
	

	hl7.set('PID.11', [{
		'PID.11.1': randomStreetAddress + ' ' + randomStreetName,
		'PID.11.2': '',
		'PID.11.3': randomcityName,
		'PID.11.4': randomstateAbbr,
		'PID.11.4': randomZip,
		'PID.11.5': randomCountry
	}, {
		'PID.11.1': randomStreetAddress + ' ' + randomStreetName,
		'PID.11.2': '',
		'PID.11.3': randomcityName,
		'PID.11.4': randomstateAbbr,
		'PID.11.4': randomZip,
		'PID.11.5': randomCountry
	}]);
	

	const finalizedHL7 = hl7.build();
	var messageID = (i + 1);
	console.log("-----------------HL7 Message " + messageID + "--------------------");
	console.log(finalizedHL7);

	

	/*
	fs.writeFile('HL7-Message-'+ messageID + '.hl7', finalizedHL7, function (err) {
		if (err) return console.log(err);
		console.log('ERROR writing - HL7-Message-'+ messageID + '.hl7');
	  });
	  */

	
}