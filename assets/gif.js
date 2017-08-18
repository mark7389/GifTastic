$(document).ready(function() {

var x;
var topics =["work","animals","babies","parents","college"];

function renderButtons(){

    $(".buttons").empty();

    for(var i = 0; i<topics.length ; i++){
        
        x = topics[i];
        $("<button>")
            .addClass("btn btn-danger navbar-btn query")
            .text(x)
            .attr("value", x)
            .appendTo(".buttons")
    }

}///use form and use preventDefault(); instead

$("#clk").on("click", function(event){

    event.preventDefault();
    topics.push($("#term").val().trim());
    renderButtons();

});

$(".reload").on("click", function(){

    window.location.reload(true);

});
renderButtons();

function displayGifs(){

    $(".images").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).attr("value") + "&api_key=a2eeedb4bc4946a780638b54a8e96e03&limit=15";
    console.log(queryURL);
    $.ajax({
          url: queryURL,
          method: "GET",
    }).done(function(response){
            console.log(response);
          for(var i=0; i < response.data.length ; i++){
         
            var k=$("<img>").addClass("still").attr("kind","stop").attr("value", i).attr("src",response.data[i].images.original_still.url);
            var v= $("<div>").addClass("container").append(k,"Rating: "+response.data[i].rating);
            $(".images").append(v);
                    
          }
          $(".still").on("click", function(){
                    
                     if($(this).attr("kind") === "stop"){
                            $(this).attr("kind","start");
                            var v = $(this).attr("value");
                            $(this).attr("src", response.data[v].images.downsized.url);
                        }

                    else if($(this).attr("kind") === "start"){
                                $(this).attr("kind","stop");
                            var v = $(this).attr("value");
                            $(this).attr("src", response.data[v].images.original_still.url);

                        }

    });
});
}



$(document).on("click", ".query", displayGifs);


});
