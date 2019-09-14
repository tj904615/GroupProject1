/*
    -- Project 1 (API) 
*/

// -- User enters zipcode for delivery API; Prevent page reload on form button click - SLF
$("#enterZip").submit(function(e) {
    e.preventDefault();
});
$(".delCatInputBtn").submit(function(e) {
    e.preventDefault();
});
$(".recCatInputBtn").submit(function(e) {
    e.preventDefault();
});

/* =====================================================
-------------- DELIVERY PATH ---------------------------
===================================================== */
// -- On Choosing "DELIVER IT" on main page; Enter Zip field appears in place of the button.
$("#deliverIt").on("click", function(){
    $(".hideOnClick").css("display","none");
    $("#enterZip").css("display","block");
    $("#enterZip").animate({opacity: 1.0});
    $(".zipVarStore").css("display","block");
});
// -- User's entered zipcode is stored in the 'userZip' variable. Clicking also displays Delivery Categories
$(".zipVarStore").on("click",function(){
    const userZip = $("#zipSearch").val();
    $(".deliverOptionsWrap").css("display","flex");
// -- Once user selects a category (via button click), the API displays available results; stores zip and category the in the 'varStore' function as arguments, and hides the Delivery Categories - SLF    
    $(".deliverOptionsWrap").animate({opacity: 1.0});
    $(".deliverCat.btn").on("click",function(){
        let deliveryCategory = $(this).attr("data-value");
        $(".row.deliver-options").css("display","none");
        $(".deliver-api.row").animate({opacity:1.0});
        varStore(userZip,deliveryCategory);
    });
// -- IF user enters specific search criteria, that data is stored in the 'deliveryCategory' variable     
    $(".delCatInputBtn").on("click",function(){
        let deliveryCategory = $("#delCatInput").val().trim().toLowerCase(); 
        varStore(userZip,deliveryCategory);
        $(".row.deliver-options").css("display","none");
        $(".deliver-api.row").animate({opacity:1.0});
    });    
});

/* =====================================================
-------------- RECIPE PATH ---------------------------
===================================================== */
// -- On Choosing "GET ME A RECIPE." on main page, recipe categories display.
$("#getRecipe").on("click",function(){   
    $(".recipeOptionsWrap").css("display","block"); 
    $(".recipeOptionsWrap").animate({opacity: 1.0});
    $(".recipeCat.btn").on("click",function(){
        let recipeCategory = $(this).attr("data-value");
        $(".row.recipe-options").css("display","none");
        $(".recipe-api.row").animate({opacity:1.0});
        recipeVarStore(recipeCategory);
    });
// -- IF user enters specific search criteria, that data is stored in the 'deliveryCategory' variable     
    $(".recCatInputBtn").on("click",function(){
        let recipeCategory = $("#recCatInput").val().trim().toLowerCase(); 
        $(".row.recipe-options").css("display","none");
        $(".recipe-api.row").animate({opacity:1.0});
        recipeVarStore(recipeCategory);
    });    
});

// -- Close various modals with "x" span - SLF
$(".closeModal").on("click",function(){
    $(".optionsModalDel1").css("display","none");
    $(".optionsModalDel1").animate({opacity:0.0});
});
$(".closeModal2").on("click",function(){
    $(".deliverOptionsWrap").css("display","none");
    $(".deliverOptionsWrap").animate({opacity:0.0});
});
$(".closeModal3").on("click",function(){
    $(".optionsModalRec2").css("display","none");
    $(".optionsModalRec2").animate({opacity:0.0});
});
$(".closeModal4").on("click",function(){
    $(".recipeOptionsWrap").css("display","none");
    $(".recipeOptionsWrap").animate({opacity:0.0});
});

// -- This function holds variables created through user selections on the DELIVERY PATH, and passes them as arguments here - SLF
function varStore(zipCode,delCategory){
    console.log("User Zipcode is: " + zipCode);
    console.log("Selected Delivery Category is: " + delCategory);
}
// -- This function holds variables created through user selections on the RECIPE PATH, and passes them as arguments here - SLF
function recipeVarStore(userRecipeCategory){
    console.log("Selected Recipe Category is: " + userRecipeCategory);
}