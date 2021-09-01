var retryEl = $("#btn-retry");
var highScores= $("#high-scores");

function retry(){
    window.open("./index.html","_self");
}

function init(){
    var storedhighScoresList = JSON.parse(localStorage.getItem("HighScores"));
    // sorts the scores to display in decending order  
    storedhighScoresList.sort(function(a, b){return b.score - a.score});
    
    for (var i=0; i<storedhighScoresList.length;i++){;
        var highScoreInitials=storedhighScoresList[i].initials;
        var newHighScore = $("<tr>");
        newHighScore.append(
            $("<td>").text(highScoreInitials),
            $("<td>").text(storedhighScoresList[i].score),
        )
        highScores.append(newHighScore);
    }
}
retryEl.on("click", retry);
init();