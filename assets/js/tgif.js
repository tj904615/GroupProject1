/*

    -- Project 1 (API) 

*/

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

$(".closeModal").on("click",function(){
    $(".optionsModalDel1").css("display","none");
    $(".optionsModalDel1").animate({opacity:0.0});
});

function varStore(zipCode){
    console.log(zipCode);
}
