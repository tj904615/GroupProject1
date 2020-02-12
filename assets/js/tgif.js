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
$(".movCatInputBtn").submit(function(e) {
    e.preventDefault();
});
$(".musCatInputBtn").submit(function(e) {
    e.preventDefault();
});
$(".booCatInputBtn").submit(function(e) {
    e.preventDefault();
});

/* =====================================================
-------------- PATH SELECTION --------------------------
===================================================== */
$(".todo-select").on("click",function(){
    $(".todo-select").removeClass("inactive");
    $(".dinner-select").addClass("inactive");
    $(".todo-selection").css("display","block");
    $(".dinner-selection").css("display","none");
});
$(".dinner-select").on("click",function(){
    $(".dinner-select").removeClass("inactive");
    $(".todo-select").addClass("inactive");
    $(".todo-selection").css("display","none");
    $(".dinner-selection").css("display","block");
});

/* =====================================================
-------------- DELIVERY PATH ---------------------------
===================================================== */
// -- On Choosing "DELIVER IT" on main page; Enter Zip field appears in place of the button.
$("#deliverIt").on("click", function(){
    $(".hideOnClick").css("display","none");
    $("#enterZip").css("display","flex");
    $("#enterZip").animate({opacity: 1.0});
    $(".zipVarStore").css("display","block");
});
$(".zipVarStore").on("click",function(){
    $("#enterZip").css("display","none");
    $("#deliverIt").css("display","block");
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
        var Url = "https://www.grubhub.com/search?" + userZip + "&queryText=" + deliveryCategory;
        var link = $('<a href="' + Url + '"target="_blank"><button id="order" class="deliverCat btn circle-btn">'+"Find <span class='deliveryCatSpan'>"+deliveryCategory+" food</span> near <span class='userZipSpan'> "+userZip+" </span> "+'</button></a>');
        $('.order').append(link);
    });
// -- IF user enters specific search criteria, that data is stored in the 'deliveryCategory' variable     
    $(".delCatInputBtn").on("click",function(){
        let deliveryCategory = $("#delCatInput").val().trim().toLowerCase(); 
        varStore(userZip,deliveryCategory);
        $(".row.deliver-options").css("display","none");
        $(".deliver-api.row").animate({opacity:1.0});
        var Url = "https://www.grubhub.com/search?" + userZip + "&queryText=" + deliveryCategory;
        var link = $('<a href="' + Url + '"target="_blank"><button id="order" class="deliverCat btn circle-btn">Order</button></a>');
        $('.order').append(link);
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
        var cuisine = $(this).attr("data-value"); 
        var randomNum = Math.floor(Math.random()*30);
    var queryURL = "https://api.spoonacular.com/recipes/search?apiKey=adc5dcc46e89413bbe01d5e48609c886gi&cuisine=" + cuisine + "&offset=" +randomNum;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (i=0;i<6;i++){
            var newRecipe = $('<div>');
            newRecipe.addClass("col-md-4 api-object recipes");
            newRecipe.attr("data-value", response.results[i].id);
            var recipeNames = $("<h3>");
            var recipeName = response.results[i].title;
            recipeNames.append(recipeName);
            newRecipe.append(recipeNames);
          
            var imgWrap = $('<div class="recImg">');
            var imageURL = (response.baseUri + response.results[i].image);
            var recipeImages = $("<img>").attr("src", imageURL);
            imgWrap.append(recipeImages);
            newRecipe.prepend(imgWrap);

            $("#recipeOptionsAPI").prepend(newRecipe);
        }
        $(".recipes").on("click",function(){
            var recipeId = $(this).attr('data-value')
            var queryUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=adc5dcc46e89413bbe01d5e48609c886";
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function(answer){
                console.log(answer);
                var title = answer.title;
                console.log(title);
                var instructions = answer.instructions;
                console.log('instructions: ' + instructions);
                var servings = answer.servings;
                console.log('servings: ' + servings);
                var readyTime = answer.readyInMinutes;
                console.log('ready in: ' + readyTime + ' minutes');
                var ingredientsArr = answer.extendedIngredients;
                $(".singleRecipe").css("display","flex");
                $(".recipes").css("display","none");
                $(".singleRecipe").append("<h3 class=\"recipeTitle\">");
                    $(".recipeTitle").text(title);
                $(".singleRecipe").append("<div class='singleImgWrap'>");
                    $(".singleImgWrap").append("<img class=\"recipeThumb\">");
                        $(".recipeThumb").attr("src",imageURL);
                $(".singleRecipe").append("<ul>");
                    $(".singleRecipe ul").append("<b>Ingredients: </b><br>")
                for (var j=0;j<ingredientsArr.length;j++){
                    var item = answer.extendedIngredients[j].original;
                    $(".singleRecipe ul").append("<li class='recipeLi"+j+"'>");
                    $(".recipeLi"+j+"").append(item); 
                }
                $(".singleRecipe").append("<p class='recipeInstructions'>");
                    $(".recipeInstructions").append("<b>Instructions:</b> "+instructions);
                $(".singleRecipe").append("<p class='recipeServings'>");
                    $(".recipeServings").append("<b>Serves: </b> "+servings);
                $(".singleRecipe").append("<p class='recipeReady'>");
                    $(".recipeReady").append("<b>Ready in:</b> "+readyTime);
            });
        })
    })
    });
// -- IF user enters specific search criteria, that data is stored in the 'deliveryCategory' variable     
    $(".recCatInputBtn").on("click",function(){
        let recipeCategory = $("#recCatInput").val().trim().toLowerCase(); 
        $(".row.recipe-options").css("display","none");
        $(".recipe-api.row").animate({opacity:1.0});
        recipeVarStore(recipeCategory);
        var cuisine = $("#recCatInput").val().trim().toLowerCase(); 
        var randomNum = Math.floor(Math.random()*30);
    var queryURL = "https://api.spoonacular.com/recipes/search?apiKey=bcb15887544740359f1fe80f670949a7&cuisine=" + cuisine + "&offset=" +randomNum;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (i=0;i<6;i++){
            var newRecipe = $('<div>');
            newRecipe.addClass("col-md-4 api-object recipes");
            newRecipe.attr("data-value", response.results[i].id);
            var recipeNames = $("<h3>");
            var recipeName = response.results[i].title;
            recipeNames.append(recipeName);
            newRecipe.append(recipeNames);

            var imgWrap = $('<div class="recImg">');
            var imageURL = (response.baseUri + response.results[i].image);
            var recipeImages = $("<img>").attr("src", imageURL);
            imgWrap.append(recipeImages);
            newRecipe.prepend(imgWrap);

            $("#recipeOptionsAPI").prepend(newRecipe);
        }
        $(".recipes").on("click",function(){
            var recipeId = $(this).attr('data-value')
            var queryUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=adc5dcc46e89413bbe01d5e48609c886";
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function(answer){
                console.log(answer);
                var title = answer.title;
                console.log(title);
                var instructions = answer.instructions;
                console.log('instructions: ' + instructions);
                var servings = answer.servings;
                console.log('servings: ' + servings);
                var readyTime = answer.readyInMinutes;
                console.log('ready in: ' + readyTime + ' minutes');
                var ingredientsArr = answer.extendedIngredients;
                $(".singleRecipe").css("display","flex");
                $(".recipes").css("display","none");
                $(".singleRecipe").append("<h3 class=\"recipeTitle\">");
                    $(".recipeTitle").text(title);
                $(".singleRecipe").append("<div class='singleImgWrap'>");
                    $(".singleImgWrap").append("<img class=\"recipeThumb\">");
                        $(".recipeThumb").attr("src",imageURL);
                $(".singleRecipe").append("<ul>");
                    $(".singleRecipe ul").append("<b>Ingredients: </b><br>")
                for (var j=0;j<ingredientsArr.length;j++){
                    var item = answer.extendedIngredients[j].original;
                    $(".singleRecipe ul").append("<li class='recipeLi"+j+"'>");
                    $(".recipeLi"+j+"").append(item); 
                }
                $(".singleRecipe").append("<p class='recipeInstructions'>");
                    $(".recipeInstructions").append("<b>Instructions:</b> "+instructions);
                $(".singleRecipe").append("<p class='recipeServings'>");
                    $(".recipeServings").append("<b>Serves: </b> "+servings);
                $(".singleRecipe").append("<p class='recipeReady'>");
                    $(".recipeReady").append("<b>Ready in:</b> "+readyTime);
            })
        })
    })

// DISPLAY INDIVIDUAL RECIPE WHEN API-OBJECT IS CLICKED - SLF
    });  
});

/* =====================================================
-------------- MOVIE PATH ------------------------------
===================================================== */
// -- On Choosing "WATCH A MOVIE." on main page, music categories display.
$("#watchMovie").on("click",function(){   
    $(".movieOptionsWrap").css("display","block"); 
    $(".movieOptionsWrap").animate({opacity: 1.0});
    $(".movieCat.btn").on("click",function(){
        let movieCategory = $(this).attr("data-value");
        $(".row.movie-options").css("display","none");
        $(".movie-api.row").animate({opacity:1.0});
        movieVarStore(movieCategory);
    });
// -- IF user enters specific search criteria, that data is stored in the 'movieCategory' variable     
    $(".movCatInputBtn").on("click",function(){
        let movieCategory = $("#movCatInput").val().trim().toLowerCase(); 
        $(".row.movie-options").css("display","none");
        $(".movie-api.row").animate({opacity:1.0});
        movieVarStore(movieCategory);
    });    
});

/* =====================================================
-------------- MUSIC PATH ---------------------------
===================================================== */
// -- On Choosing "LISTEN TO MUSIC." on main page, music categories display.
$("#listenMusic").on("click",function(){   
    $(".musicOptionsWrap").css("display","block"); 
    $(".musicOptionsWrap").animate({opacity: 1.0});
    $(".musicCat.btn").on("click",function(){
        $('.music').hide();
        let musicCategory = $(this).attr("data-value");
        $(".row.music-options").css("display","none");
        $(".music-api.row").animate({opacity:1.0});
        musicVarStore(musicCategory);
        if ($(this).attr("data-value") == 'hip'){
            $('.hip').show();
        }
        else if ($(this).attr("data-value") == 'rock'){
            $('.rock').show();
        }
        else if ($(this).attr("data-value") == 'r-b'){
            $('.r-b').show();
        }
        else if ($(this).attr("data-value") == 'pop'){
            $('.pop').show();
        }
        else if ($(this).attr("data-value") == 'country'){
            $('.country').show();
        }
        else if ($(this).attr("data-value") == 'dance'){
            $('.dance').show();
        }
    });
// -- IF user enters specific search criteria, that data is stored in the 'musicCategory' variable     
   
});

/* =====================================================
-------------- BOOK PATH -------------------------------
===================================================== */
// -- On Choosing "READ A BOOK." on main page, book categories display.
$("#readBook").on("click",function(){   
    $(".bookOptionsWrap").css("display","block"); 
    $(".bookOptionsWrap").animate({opacity: 1.0});
    $(".bookCat.btn").on("click",function(){
        let bookCategory = $(this).attr("data-value");
        $(".row.book-options").css("display","none");
        $(".book-api.row").animate({opacity:1.0});
        bookVarStore(bookCategory);
        var book = $(this).attr("data-value");
        var randomNum = Math.floor(Math.random()*40);
        var queryURL = "https://librivox.org/api/feed/audiobooks/?genre=" + book + "&format=jsonp&offset=" + randomNum;
        $.ajax({
            url: queryURL,
            type: 'GET',
            dataType: 'jsonp',
            cors: true ,
            contentType:'application/json',
            secure: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
            },
            success: function (response){
              console.log(response);
              for (var i=0;i<3;i++){
                var newBooks = $('<div>');
                newBooks.addClass("col-md-4 api-object books");
                var bookNames = $('<h3 class="bookTitle">');
                var bookTitle = response.books[i].title;
                bookNames.append(bookTitle);
                newBooks.append(bookNames);
                var bookDescription = $('<p class="bookDescription">')
                var bookAbout = response.books[i].description;
                bookDescription.append(bookAbout);
                newBooks.append(bookDescription);
                var buttonLink = response.books[i].url_librivox;
                var buttonDiv = $('<div>');
                var bookButton = $('<a href="' + buttonLink + '"target="_blank"><button class="btn circle-btn buttonlink">Read Me</button></a>');
                buttonDiv.append(bookButton);
                newBooks.append(buttonDiv);
                $("#bookOptionsAPI").prepend(newBooks);
            }
            }
        })
    });
// -- IF user enters specific search criteria, that data is stored in the 'bookCategory' variable     
 
});

// -- Close various modals with "x" span. These two are for DELIVERY - SLF
$(".closeModal").on("click",function(){
    $(".optionsModalDel1").css("display","none");
    $(".optionsModalDel1").animate({opacity:0.0});
});
$(".closeModal2").on("click",function(){
    $(".deliverOptionsWrap").css("display","none");
    $(".deliverOptionsWrap").animate({opacity:0.0});
    location.reload();
});
// -- Close modals for RECIPES - SLF
$(".closeModal3").on("click",function(){
    $(".optionsModalRec2").css("display","none");
    $(".optionsModalRec2").animate({opacity:0.0});
});
$(".closeModal4").on("click",function(){
    $(".recipeOptionsWrap").css("display","none");
    $(".recipeOptionsWrap").animate({opacity:0.0});
    location.reload();
});
// -- Close modals for MOVIES - SLF
$(".closeModal5").on("click",function(){
    $(".optionsModalMov3").css("display","none");
    $(".optionsModalMov3").animate({opacity:0.0});
});
$(".closeModal6").on("click",function(){
    $(".movieOptionsWrap").css("display","none");
    $(".movieOptionsWrap").animate({opacity:0.0});
    location.reload();
});
// -- Close modals for MUSIC - SLF
$(".closeModal7").on("click",function(){
    $(".optionsModalMus4").css("display","none");
    $(".optionsModalMus4").animate({opacity:0.0});
});
$(".closeModal8").on("click",function(){
    $(".musciOptionsWrap").css("display","none");
    $(".musicOptionsWrap").animate({opacity:0.0});
    location.reload();
});
// -- Close modals for BOOKS - SLF
$(".closeModal9").on("click",function(){
    $(".optionsModalBoo5").css("display","none");
    $(".optionsModalBoo5").animate({opacity:0.0});
    location.reload();
});
$(".closeModal10").on("click",function(){
    $(".bookOptionsWrap").css("display","none");
    $(".bookOptionsWrap").animate({opacity:0.0});
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
// -- This function holds variables created through user selections on the MOVIE PATH, and passes them as arguments here - SLF
function movieVarStore(userMovieCategory){
    console.log("Selected Movie Category is: " + userMovieCategory);
}
// -- This function holds variables created through user selections on the MUSIC PATH, and passes them as arguments here - SLF
function musicVarStore(userMusicCategory){
    console.log("Selected Music Category is: " + userMusicCategory);
}
// -- This function holds variables created through user selections on the BOOK PATH, and passes them as arguments here - SLF
function bookVarStore(userBookCategory){
    console.log("Selected Book Category is: " + userBookCategory);
}