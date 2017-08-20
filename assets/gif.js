$(document).ready(function() {

var x;
var topics =["work","animals","babies","parents","college"];
// var mySelect="";
// var next;
var center;
// var prev;
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
    // mySelect = $(btn).attr("value");
    // prev = $("<button>").addClass("btn btn-default lP query").attr("go", "prev").attr("id", "goto").text("prev").appendTo(".move");
    center = $("<span>").addClass("cM").text($(btn).attr("value")).attr("current",$(btn).attr("value")).appendTo(".move");
    // next = $("<button>").addClass("btn btn-default rN query").attr("go", "next").attr("id", "goto").text("next").appendTo(".move");
    // console.log(mySelect);
    

};

$("#clk").on("click", function(event){

    event.preventDefault();
    topics.push($("#term").val().trim());
    renderButtons();

});
// function getNext(){

    // if(topics.indexOf($(".cM").attr("current")) === 0 || topics.indexOf($(".cM").attr("current")) === topics.length-1){
    //     //

    // }
    // else 
    // if($(this).attr("go") === "next"){
        
        // console.log(mySelect);
        // // var x =topics.indexOf(mySelect);
        // console.log(x);
        // var ntopic = topics[x+1];
        // console.log(ntopic);
        // var b = $("<button>").attr("value", ntopic);
        // // getImg(b);
        // displayNP(b);

    // }

// }
function getImg(btn){
    $(".images").empty();
    $(".move").empty();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(btn).attr("value") + "&api_key=a2eeedb4bc4946a780638b54a8e96e03&limit=10";
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
// $(document).on("click", "#goto", getNext);


});
