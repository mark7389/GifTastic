$(document).ready(function() {

var x;
var topics =["work","animals","babies","parents","college"];

function renderButtons(){

    $(".buttons").empty();

    for(var i = 0; i<topics.length ; i++){
        
        x = topics[i];
        $("<a>").addClass("list-group-item")
            .addClass("query")
            .text(x)
            .attr("value", x)
            .attr("index", i)
        .appendTo(".buttons");
    }

}///use form and use preventDefault(); instead

function displayNP(btn){
    console.log(topics[$(btn).attr("index")]);
    console.log(topics[$(btn).attr("index")]);
    console.log(topics[($(btn).attr("index"))]);
    $("<button>").addClass("btn btn-default lP").attr("id", "goto").text("previous").attr("value", topics[($(btn).attr("index"))-1]).appendTo(".move");
    $("<span>").addClass("cM").text($(btn).attr("value")).attr("value", topics[$(btn).attr("index")]).appendTo(".move");
    $("<button>").addClass("btn btn-default rN").attr("id", "goto").text("next").attr("value", topics[($(btn).attr("index"))+1]).appendTo(".move");
    console.log("hi");
    

};

$("#clk").on("click", function(event){

    event.preventDefault();
    topics.push($("#term").val().trim());
    renderButtons();

});
function getImg(btn){
    $(".images").empty();
    $(".move").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(btn).attr("value") + "&api_key=a2eeedb4bc4946a780638b54a8e96e03&limit=15";
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

};

$(".reload").on("click", function(){

    window.location.reload(true);

});
renderButtons();

function displayGifs(){

    
    getImg(this); 
    displayNP(this);

}



$(document).on("click", ".query", displayGifs);


});
