(function() {

  var btnReset = document.getElementById("btn_reset"),
      btnResult = document.getElementById("btn_result"),
      btnComment = document.getElementById("btn_comment"),
      btnSolution = document.getElementById("btn_solution"),
      radioButtons = document.querySelectorAll("input[type=radio]");

  var codeOfError  = document.getElementById("codeOfError"),
      typeOfOrder = document.getElementById("typeOfOrder"),
      loginOrOrder = document.getElementById("loginOrOrder"),
      numberOf = document.getElementById("numberOf"),
      count = document.getElementById("count"),
      action = document.getElementById("action"),
      actionWith = document.getElementById("actionWith"),
      actionText = document.getElementById("actionText");

  var idBlock = "",
      direction = "tpl", system, category, classification;

  for (var i = 0; i < radioButtons.length; i++)
    radioButtons[i].addEventListener("change", function(){
       if (this.checked)
        switch(this.name){
          case("direction"):{
            if (direction == "tpl" && this.value == "tpr"){
              document.getElementById("forEdit").classList.remove("invisible");
              document.getElementById("classification").classList.add("invisible");
              var systems = document.querySelectorAll("#system label");
              systems[1].classList.add("invisible");
              systems[2].classList.add("invisible");
              systems[3].classList.remove("invisible");

              var categories = document.querySelectorAll("#category label");
              categories[2].classList.add("invisible");
              console.log("скрыли");
            }
            if (direction == "tpr" && this.value == "tpl"){
              document.getElementById("forEdit").classList.add("invisible");
              document.getElementById("classification").classList.remove("invisible");
              var systems = document.querySelectorAll("#system label");
              systems[1].classList.remove("invisible");
              systems[2].classList.remove("invisible");
              systems[3].classList.add("invisible");

              var categories = document.querySelectorAll("#category label");
              categories[2].classList.remove("invisible");
              console.log("открыли");
            }
            direction = this.value;
            console.log(direction);
            break;
          }
          case("system"):{
            if (system != "Hpsa" && this.value == "Hpsa"){
              document.getElementById("classification").classList.add("invisible");
            }
            if (system == "Hpsa" && this.value != "Hpsa"){
              document.getElementById("classification").classList.remove("invisible");
            }
            system = this.value;
            console.log(system);
            break;
          }
          case("category"):{
            category = this.value;
            console.log(category);
            break;
          }
          case("classification"):{
            classification = this.value;
            console.log(classification);
            break;
          }
          default:{}
        }
    });

  btnResult.addEventListener("click", function(){

    if (direction == "tpr" || system == "Hpsa") idBlock = direction + system + category;
    if (direction == "tpl" && system != "Hpsa") idBlock = direction + system + category + classification;
    //else idBlock = "unsorted";
    console.log(idBlock);

    var list = document.getElementById(idBlock);
    var newList = document.createElement("ul");
    newList.className = "temp_block";
    newList.innerHTML = list.innerHTML;


    if (document.querySelector(".temp_block")) {
      document.querySelector(".temp_block").remove();
    }
    if (codeOfError.value) {
      newList.innerHTML = newList.innerHTML.replace(/error_code/g, codeOfError.value);
    }
    if (typeOfOrder.value) {
      newList.innerHTML = newList.innerHTML.replace(/type_order/g, typeOfOrder.value);
    }
    if (count.value) {
      newList.innerHTML = newList.innerHTML.replace(/:КЛВх/g, ":" + count.value);
      newList.innerHTML = newList.innerHTML.replace(/textForNumber/g, loginOrOrder.value);
      newList.innerHTML = newList.innerHTML.replace(/numberOf_/g, numberOf.value);
      newList.innerHTML = newList.innerHTML.replace(/action_/g, action.value);
      newList.innerHTML = newList.innerHTML.replace(/actionWith_/g, actionWith.value);
      newList.innerHTML = newList.innerHTML.replace(/actionText_/g, actionText.value);
      
      var tmpPS = ps.checked?ps.value:"";
      newList.innerHTML = newList.innerHTML.replace(/withPS/g, tmpPS);
      
    }

    newList.style.display = "block";
    document.querySelector(".information").insertBefore(newList, document.getElementById("tmpSolution"));

  });

  btnSolution.addEventListener("click", function(){
    document.getElementById("tmpSolution").style.display = "block";
  });

  /*btnReset.addEventListener("click", function(){

    document.getElementById(idBlock).remove();
    document.querySelector(".temp_block").remove();
    document.querySelector(".temp_comment").remove();
    document.getElementById("tmpSolution").style.display = "none";
    document.getElementById("classification").classList.remove("invisible");
    document.getElementById("forEdit").classList.add("invisible");

    var systems = document.querySelectorAll("#system label");
    systems[1].classList.remove("invisible");
    systems[2].classList.remove("invisible");
    systems[3].classList.add("invisible");

    var categories = document.querySelectorAll("#category label");
    categories[2].classList.remove("invisible");

  });*/

})();
