
# Contact Application

  

This application can store and search personal contacts.

  

## Features

- User can register himself/herself

- User can add contact info. A contact info consists of `Name`, `DoB` and `Email`. A single contact can have multiple emails

- User can search contact info.

  

## Database Schema

### `users` Table

|Column|Data Type|Nullable|Description|
|------|---------|--------|-----------|
|userId|int(11)|No|Primary Key and Auto Increment|
|username|varchar(50)|No|Username. Should be unique|
|password|varchar(100)|No|Password |
<hr/>
  

### `contacts` Table

|Column|Data Type|Nullable|Description|
|------|---------|--------|-----------|
|contactId|int(11)|No|Primary Key and Auto Increment|
|name|varchar(50)|No|Full name of the contact|
|nick|varchar(20)|Yes|Nick name of the contact|
|dob|date|Yes|Birthday of the contact|
|userId|int(11)|No|Foreign Key to the `users` table|
<hr/>
  

### `emails` Table

|Column|Data Type|Nullable|Description|
|------|---------|--------|-----------|
|contactId|int(11)|No|Primary Key. Foreign Key to the `contacts` table|
|email|varchar(50)|No|Primary Key. Email address of the contact|
  <hr/>
  
  
> The above schema is only for reference. Required SQL scripts are already provided in the **sql** folder to create the tables

## Endpoints
### POST /register
#### Request
|Name|Type|Required|Description|
|----|----|--------|-----------|
|username|string|Yes|Username|
|password|string|Yes|Password|
#### Example
```json
{
	"username": "stan.lee@example.com",
	"password": "P@$$w0rd"
}
```
#### Response
|Name|Type|Description|
|----|----|-----------|
|success|boolean|Specifies if the request is completed successfully|
|message|string|Response message|
#### Example
```json
{
	"success": true,
	"message": "User registered successfully"
}
```

### POST /contacts
#### Request
|Name|Type|Required|Description|
|----|----|--------|-----------|
|name|string|Yes|Full name of the contact|
|nick|string|No|Nick name of the contact|
|dob|date|No|Birthdate of the contact in `YYYY-MM-DD` format|
|userId|integer|Yes|Owner of the contact|
#### Example
```json
{
	"name": "Anthony Edward Stark",
	"nick": "Tony"
	"dob": "1970-05-29"
	"userId": 1
}
```
#### Response
|Name|Type|Description|
|----|----|-----------|
|success|boolean|Specifies if the request is completed successfully|
|message|string|Response message|
|contactId|integer|Insert ID of the contact|
#### Example
```json
{
	"success": true,
	"message": "Contact added successfully",
	"contactId": 1
}
```

### POST /contacts/emails
#### Request
|Name|Type|Required|Description|
|----|----|--------|-----------|
|contactId|integer|Yes|Contact ID|
|email|string|Yes|Email|
#### Example
```json
{
	"contactId": 1,
	"email": "tony@mcu.net"
}
```
#### Response
|Name|Type|Description|
|----|----|-----------|
|success|boolean|Specifies if the request is completed successfully|
|message|string|Response message|
#### Example
```json
{
	"success": true,
	"message": "Email added successfully"
}
```

### POST /contacts/search
#### Request
|Name|Type|Required|Description|
|----|----|--------|-----------|
|userId|integer|Yes|User ID|
|search|string|No|Search keyword. Match with `name` and `nick` property of the contact. If not given, return all the contacts|
#### Example
```json
{
	"userId": 1,
	"search": "nt"
}
```
#### Response
|Name|Type|Description|
|----|----|-----------|
|success|boolean|Specifies if the request is completed successfully|
|contacts|array of objects|List of contacts|
|contacts[].name|string|Name of the contact|
|contacts[].nick|string|Nickname of the contact (*if exist*)|
|contacts[].dob|string|Birthdate of the contact (*if exist*)|
|contacts[].emails|array of strings|List of emails of the contact|
#### Example
```json
{
	"success": true,
	"contacts": [
		{
			"name": "Anthony Edward Stark",
			"nick": "Tony",
			"dob": "1970-05-29",
			"emails": [
				"tony@mcu.net",
				"admin@starkindustries.com"
			]
		},
		{
			"name": "Clinton Francis Barton",
			"nick": "Clint",
			"emails": [
				"clint@mcu.net"
			]
		},
		{
			"name": "Steven Grant Rogers",
			"nick": "Steve",
			"dob": "1918-07-04",
			"emails": [
				"steve@mcu.net",
				"steven.rogers@military.gov"
			]
		}
	]
}
```

## Error Responses
All the error responses will have the following structure. The `message` property and HTTP Status Code will provide further details about the error.
#### Response
|Name|Type|Description|
|----|----|-----------|
|success|boolean|`false` to specify that the request failed|
|message|string|Error message|
#### Example
```json
{
	"success": false,
	"message": "Email already exists"
}
```