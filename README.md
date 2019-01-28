#Simple Recommender API with R and Node.js

This is a simple recommender of connections in a network of users. The recommender simply calculates the similarity between the users, with respect for their interests (tags).

The R code implements a socket server, receives inputs from Node.js server, and outputs similarity between users.

The Node.js server receives a json with information about the network from a client, and sends the information to R server.

Please check the JSON formatting and understand that the R code should change accordingly to the input format of the JSON file. Nonetheless, the javascript server and client code, and also the R part implementing a socket server do not have to change.

Enjoy!

