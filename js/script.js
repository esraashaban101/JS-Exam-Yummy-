$(function () {
   $(".loader").fadeOut(1000);
   $(".loading").fadeOut(1000);
   $('body').css('overflow', 'auto')
   $('loading').romove()
})
let open_icon = document.getElementById("open_icon")
let aside_content = document.getElementById("aside_content")
let search_page = document.getElementById("search")
let categories_page = document.getElementById("categories")
let ingredients_page = document.getElementById("ingredients")
let area = document.getElementById("arae")
let contact = document.getElementById("contact")
let row_data = document.getElementById("row-data");

open_icon.addEventListener('click', function () {

      
   if ($(open_icon).hasClass("fa-bars")) {
      $(open_icon).removeClass("fa-bars").addClass("fa-xmark")
      open_nav()
   }
   
   else if($(open_icon).hasClass("fa-xmark"))
   {
      $(open_icon).removeClass("fa-xmark").addClass("fa-bars")
      close_nav()
   }
   
 

});
function open_nav()
{
   $('#aside_content').addClass("expand");
   for (let i = 0; i < 5; i++) {
   $("li").eq(i).animate({
       
   }, (i + 5) * 100)
}
   
}
function close_nav()
{
   $('#aside_content').removeClass("expand")
   $(open_icon).removeClass("fa-xmark").addClass("fa-bars")
   $("li").animate({
      top: 350
  }, 500)
}

const baseurl = `https://www.themealdb.com/api/json/v1/1`;
let all_meals;
async function getmeals() {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
   let data = await response.json();
   //   console.log(data)
   display(data.meals)
   all_meals = data.meals;
}

getmeals()

function display(data) {
   let cartona = "";

   //   console.log(data)
   for (let i = 0; i < data.length; i++) {

      cartona += `<div class="col-sm-6 col-md-4 col-lg-3  gy-4">
    <div class="box rounded-3 g-2 " onclick="get_meal_details('${data[i].idMeal}')">
      <div class="meal-img">
        <img src="${data[i].strMealThumb}"  class= "w-100" alt="">
      </div>
      <div class="layout ">
      <div class="name">
          <p class="text-center text-black my-auto fw-bold fs-4" >${data[i].strMeal}</p>
      </div>
       </div>
      </div>
  
  
  </div>`


   }
   row_data.innerHTML = cartona;


}
async function get_meal_details(meal_id) {

   row_data.innerHTML = "";
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let meal_response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`);
   let meal_data = await meal_response.json();
   // console.log(meal_data.meals)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   Meal_details(meal_data.meals[0]);
}

function Meal_details(meal) {
   console.log(meal)

   let tags = meal.strTags?.split(",");

   let tag_container = "", reciepe_container = "";

   if (!tags) {
      tags = [];

   }
   for (let i = 0; i < tags.length; i++) {
      tag_container += `<p class="alert alert-danger m-2 p-2">${tags[i]}</p>`
   }

   for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`])
         reciepe_container += `<span class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`
   }
   row_data.innerHTML = "";
   let content = ``;
   content += `
  <div class="details-img py-4 text-white ">
        <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="${meal.strMealThumb}">
        <h2 class="my-2 text-center">${meal.strMeal}</h2>

      </div>
      <div class="dtails-text py-4 text-white">
      <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>

        <h2>Area : ${meal.strArea}</h2>
        <h2>Category : ${meal.strCategory}</h2>
        <h2>Reciepes:</h2>
        <div class="d-flex flex-wrap g-3">
          ${reciepe_container}
        </div>
        <h2>Tags:</h2>
        <div class="d-flex flex-wrap g-3">
          ${tag_container}
        </div>
          
        <a target="_blank" href="${meal.strSource}" class="btn btn-success d-inline-block mt-2">Source</a>
       <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mx-2 mt-2">Youtube</a>

      </div>
   `
   row_data.innerHTML = content;
}


categories_page.addEventListener('click', function () {
   getcategories()
});
async function getcategories() {
   close_nav()
   row_data.innerHTML = "";
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let categories_response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let categories_data = await categories_response.json();
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   displaycategories(categories_data.categories)

}
function displaycategories(categories_data) {

   let cartona = "";
   for (let i = 0; i < categories_data.length; i++) {

      cartona += `<div class="col-sm-6 col-md-4 col-lg-3  gy-4">
    <div class="box  rounded-3 g-2 " onclick="filter_with_category('${categories_data[i].strCategory}')">
      <div class="meal-img">
        <img src="${categories_data[i].strCategoryThumb}"  class= "w-100" alt="">
      </div>
      <div class="layout text-center">
      <div class="name text-black ">
         <h3 class=text-center>${categories_data[i].strCategory}</h3>
          <p class="text-center text-black my-auto">${categories_data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
       </div>
      </div>
  
  
  </div>`


   }

   row_data.innerHTML = cartona;


}
async function filter_with_category(category) {
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   let data = await response.json();

   all_meals = data.meals
   console.log(all_meals)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   display(all_meals)


}
area.addEventListener("click", function () {
   getareas()
})

async function getareas() {
   close_nav()
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   let data = await response.json();
   console.log(data)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   displayareas(data.meals)


}
function displayareas(data) {
   row_data.innerHTML = "";
   let cartona = ``;
   for (let i = 0; i < data.length; i++) {
      cartona += `
       
      <div class="col-md-3 d-flex flex-wrap justify-content-between ">
        <div class="content m-auto text-center mb-3" onclick="filter_with_area('${data[i].strArea}')">
      <i class="fa-solid fa-house-laptop fa-4x mb-2 "></i>
      <h3>${data[i].strArea}</h3>
    </div>
    </div>
     
      `
   }
   row_data.innerHTML = cartona;
}
async function filter_with_area(area) {
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   let data = await response.json();
   console.log(data.meals)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   display(data.meals)


}
ingredients_page.addEventListener("click", function () {
   getingredients()
})

async function getingredients() {
   close_nav()
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   let data = await response.json();
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   displayingredients(data.meals.slice(0, 20))

}

function displayingredients(data) {

   row_data.innerHTML = "";
   console.log(data)
   let cartona = ``;
   for (let i = 0; i < data.length; i++) {
      cartona += ` <div class="col-md-3">
    <div class="content text-center" onclick="filter_with_ingredient('${data[i].strIngredient}')">
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${data[i].strIngredient}</h3>
      <p>${data[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
    </div>
  </div>`
   }
   row_data.innerHTML = cartona
}


async function filter_with_ingredient(ingredient) {
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   row_data.innerHTML = ""
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
   response = await response.json()
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   display(response.meals)

}

search_page.addEventListener("click", function () {
   close_nav()
   dislay_search_container()
})
let seach_container = document.getElementById("search_container")
function dislay_search_container() {
   row_data.innerHTML = ""
   seach_container.innerHTML = `
      <div class="row ">
        <div class="col-md-6">
          <input type="text" class="form-control " oninput="search_by_letter(this.value)" id="" placeholder="search by first character">
          
        </div>
     <div class="col-md-6">
      <input type="text" class="form-control " id="search_by_name" oninput="search_by_name(this.value)" placeholder="search by name">
     </div>
    </div>
     `
}

async function search_by_name(name) {
   row_data.innerHTML = ""
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
   response = await response.json()
   // console.log(response)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   display(response.meals)

}
async function search_by_letter(letter) {
   row_data.innerHTML = "";
   $('.loading').fadeIn(100)
   $('.loader').fadeIn(100)
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
   response = await response.json()
   // console.log(response.meals)
   $('.loading').fadeOut(100)
   $('.loader').fadeOut(100)
   display(response.meals)

}
let contact_container = document.getElementById("contact_container")
contact.addEventListener('click', function () {
   row_data.innerHTML = "";
   close_nav()
   row_data.innerHTML += `
    <div class="row p-5">
      <div class="col-md-6 g-5">
        <input type="text" class="form-control " oninput="name_validation(this.value);total_validation();" id="name" placeholder="Enter Your Name">
        <p class="d-none alert alert-danger" id="namealert">Special characters and numbers not allowed</p>
        
      </div>
   <div class="col-md-6 g-5">
    <input type="email" class="form-control " id="mail"  oninput="email_validation(this.value);total_validation();" placeholder="Enter Your Email">
    <p class="d-none alert alert-danger" id="mailalert">Email not valid *exemple@yyy.zzz</p>
   </div>
   <div class="col-md-6 g-5">
    <input type="text" class="form-control " id="Phone"  oninput="phone_validation(this.value);total_validation();" placeholder="Enter Your Phone">
    <p class="d-none alert alert-danger" id="phonealert">Enter valid Phone Number</p>
   </div>
   <div class="col-md-6 g-5">
    <input type="number" class="form-control " id="age"  oninput="age_validation(this.value);total_validation();" placeholder="Enter Your Age">
    <p class="d-none alert alert-danger " id="agealert">Enter valid age</p>
   </div>
   <div class="col-md-6 g-5">
    <input type="password" class="form-control " id="pass"  oninput="pass_validation(this.value);total_validation();" placeholder="Enter Your Password">
    <p class="d-none alert alert-danger" id="passalert">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
   </div>
   <div class="col-md-6 g-5">
    <input type="password" class="form-control" id="repass"  oninput="repass_validation(this.value);total_validation();" placeholder="Repassword">
     <p class="d-none alert alert-danger" id="repassalert">Enter valid repassword</p>
   </div>
   <button type="button" class="btn  btn-outline-danger d-block mx-auto mt-4 disabled" id="submit_btn">Submit</button>
  </div>
  
   `
})
input_name = document.getElementById("name")
input_mail = document.getElementById("mail")
input_phone = document.getElementById("Phone")
input_age = document.getElementById("age")
input_pass = document.getElementById("pass")
input_repass = document.getElementById("repass")

console.log(input_age, input_mail, input_phone, input_name, input_pass, input_repass)

function name_validation(name) {
   let regex = /^[a-zA-Z]+$/;

   if (regex.test(name)) {

      document.getElementById("namealert").classList.replace("d-block", "d-none");
      total_validation()
      return true;

   }
   else {
      document.getElementById("namealert").classList.replace("d-none", "d-block")
      return false;
   }

}
function email_validation(email) {
   let regex = /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/;

   if (regex.test(email)) {

      document.getElementById("mailalert").classList.replace("d-block", "d-none")
      total_validation()
      return true;
   }
   else {
      document.getElementById("mailalert").classList.replace("d-none", "d-block")
      return false;
   }
}
function phone_validation(phone) {
   let regex = /^(010|011|012|015)[0-9]{8}$/;

   if (regex.test(phone)) {

      document.getElementById("phonealert").classList.replace("d-block", "d-none")
      total_validation()
      return true;
   }
   else {
      document.getElementById("phonealert").classList.replace("d-none", "d-block")
      return false;
   }
}
// let password1;

function name_validation(name) {
   let regex = /^[a-zA-Z]+$/;
   if (regex.test(name)) {
       document.getElementById("namealert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("namealert").classList.replace("d-none", "d-block");
       return false;
   }
}

function email_validation(email) {
   let regex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/;
   if (regex.test(email)) {
       document.getElementById("mailalert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("mailalert").classList.replace("d-none", "d-block");
       return false;
   }
}

function phone_validation(phone) {
   let regex = /^(010|011|012|015)[0-9]{8}$/;
   if (regex.test(phone)) {
       document.getElementById("phonealert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("phonealert").classList.replace("d-none", "d-block");
       return false;
   }
}

function pass_validation(password) {
   let regex = /^[a-zA-Z0-9]{8,}$/;
   password1 = password;
   if (regex.test(password)) {
       document.getElementById("passalert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("passalert").classList.replace("d-none", "d-block");
       return false;
   }
}

function age_validation(age) {
   if (age > 0) {
       document.getElementById("agealert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("agealert").classList.replace("d-none", "d-block");
       return false;
   }
}

function repass_validation(repass) {
   if (password1 === repass) {
       document.getElementById("repassalert").classList.replace("d-block", "d-none");
       return true;
   } else {
       document.getElementById("repassalert").classList.replace("d-none", "d-block");
       return false;
   }
}

function total_validation() {
   const name = document.getElementById("name").value;
   const email = document.getElementById("mail").value;
   const phone = document.getElementById("Phone").value;
   const age = document.getElementById("age").value;
   const password = document.getElementById("pass").value;
   const repass = document.getElementById("repass").value;

   if (name_validation(name) && email_validation(email) && phone_validation(phone) && age_validation(age) && pass_validation(password) && repass_validation(repass)) {
       document.getElementById("submit_btn").classList.remove("disabled");
   } else {
       document.getElementById("submit_btn").classList.add("disabled");
   }
}
