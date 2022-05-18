This API serves the purpose of DML operation with JSON flat file.
Following are the API and body. 

1 Get all the record of API
    Action : GET
    URL : http://localhost:3000/api/Proposal

2. Get a single record behalf of id
    Action : GET
    URL : http://localhost:3000/api/Proposal/4

3. Save a record with POST stream.
    Action : POST
    URL : http://localhost:3000/api/Proposal
    Body : {
         "client": "Chetan Pal",
          "monthly_cost": 200,
          "oneoff_cost": 0,
          "status": "live"
}

4. Update a new record with the existing record based on unique id.
     Acton Type: PUT
     URL: http://localhost:3000/api/Proposal
     Body : {
	    "id":2,
        "client": "Chetan Pal",
        "monthly_cost": 40,
        "oneoff_cost": 0,
        "status": "live"
     }

 5. Delete a record with the id parameter.
    Action Type: DELETE
    URL : http://localhost:3000/api/Proposal/7

