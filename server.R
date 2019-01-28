library("rjson")
library("jsonlite")
library("tm")
library("lsa")

validate <- jsonlite::validate
fromJSON <- rjson::fromJSON 

server <- function(){
  while(TRUE){
    writeLines("Listening...")
    con <- socketConnection(host="localhost", port = <listen port>, blocking=FALSE,
                            server=TRUE, open="w+")
    data <- readLines(con, 1)
       
    if (validate(paste(data, collapse=""))== TRUE){
    json_data <- fromJSON(paste(data, collapse=""))
    
	#This part changes with input json format
	#change it according to your needs
    #please see json input example to understand this part of code
	x <- json_data$target
    ids <- c()
    tags.vec <<- c()
    lapply(x$tags, FUN = function(y){
      tags.vec <<- c(tags.vec,y$tag)
    })
    df.tags <- data.frame(id = json_data$target$'_id'$'$oid', tags = paste(tags.vec,collapse = " "))
    ids <- c(x$'_id'$'$oid')
    
    #make matrix
    lapply(json_data$usersInRange, FUN= function(x){
      tags.vec <<- c()
      lapply(x$tags, FUN = function(y){
        tags.vec <<- c(tags.vec,y$tag)
      })
      
      df.tags <<- rbind(df.tags, data.frame(id = x$'_id'$'$oid', tags= paste(tags.vec,collapse = " ")))
      ids <<- c(ids, x$'_id'$'$oid')
    })
    
    myReader <- readTabular(mapping=list(content="tags", id="id"))
    corpus <- Corpus(DataframeSource(df.tags), readerControl=list(reader=myReader))
    
    dtm.tags <- DocumentTermMatrix(corpus)
    
    #make costable
    costable.dtm.tags <- cosine(t(as.matrix(dtm.tags)))
    costable.dtm.tags <- round(costable.dtm.tags, digits = 2)
    colnames(costable.dtm.tags) <- ids
    row.names(costable.dtm.tags) <- ids
    
    #order similarity for user
    df.result <- names(costable.dtm.tags[1,order(costable.dtm.tags[1,], decreasing = TRUE)])
    df.result <- cbind(df.result,costable.dtm.tags[1,order(costable.dtm.tags[1,], decreasing = TRUE)])
    
    #calculate response for user
    response <- toJSON(df.result) 
    
    print(response)
    
    writeLines(response, con) 
    close(con)
    }else{
    	response <- "Please provide a json with the expected format!"
    	writeLines(response, con)
     	close(con)		
    }
  }
}
server()
