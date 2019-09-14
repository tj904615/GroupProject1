




$("#enterZip").submit(function(e) {
    e.preventDefault();
});

$("#deliverIt").on("click", function(){
    $(".hideOnClick").css("display","none");
    $("#enterZip").css("display","block");
    $("#enterZip").animate({opacity: 1.0});
    $(".zipVarStore").css("display","block");
});

$(".zipVarStore").on("click",function(){
    const userZip = $("#zipSearch").val();
    $(".deliverOptionsWrap").css("display","flex");
    $(".deliverOptionsWrap").animate({opacity: 1.0});
    varStore(userZip);
});

function varStore(zipCode){
    console.log(zipCode);
}



// LOGGING VARIABLES TO VIEW VALUES
