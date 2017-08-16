(function() {

  var btnReset = document.getElementById("btn_reset"),
      btnResult = document.getElementById("btn_result"),
      btnComment = document.getElementById("btn_comment"),
      btnSolution = document.getElementById("btn_solution"),
      radioButtons = document.querySelectorAll("input[type=radio]");

  var codeOfError  = document.getElementById("codeOfError "),
      typeOfOrder = document.getElementById("typeOfOrder"),
      numberOfOrder = document.getElementById("numberOfOrder"),
      count = document.getElementById("count"),
      other = document.getElementById("other"),
      login = document.getElementById("login"),
      tp = document.getElementById("tp"),
      ap = document.getElementById("ap"),
      apAction = document.getElementById("apAction");

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
      newList.innerHTML = newList.innerHTML.replace(/:х/g, ":" + count.value);
    }

    newList.style.display = "block";
    document.querySelector(".information").insertBefore(newList, document.getElementById("tmpCommentsForTpr"));

  });


  btnComment.addEventListener("click", function(){

    var list = document.getElementById("tmpCommentsForTpr");
    var newList = document.createElement("ul");
    newList.className = "temp_comment comments";
    newList.innerHTML = list.innerHTML;
    newList.innerHTML = newList.innerHTML.replace(/number_order/g, numberOfOrder.value);
    newList.innerHTML = newList.innerHTML.replace(/something/g, other.value);
    newList.innerHTML = newList.innerHTML.replace(/number/g, login.value);
    newList.innerHTML = newList.innerHTML.replace(/tp/g, tp.value);
    newList.innerHTML = newList.innerHTML.replace(/apl/g, ap.value);
    newList.innerHTML = newList.innerHTML.replace(/action/g, apAction.value);

    if (document.querySelector(".temp_comment")) {
      document.querySelector(".temp_comment").remove();
    }

    newList.style.display = "block";
    document.querySelector(".information").insertBefore(newList, document.getElementById("tmpSolution"));

  });

  btnSolution.addEventListener("click", function(){
    document.getElementById("tmpSolution").style.display = "block";
  });

  btnReset.addEventListener("click", function(){

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

  });

})();



/**var direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    btn_comment = document.getElementById("btn_comment"),
    inputs = document.querySelectorAll("input[type=radio]"),
    err = document.querySelector(".error"),
    codeOfError  = document.getElementById("codeOfError "),
    typeOfOrder = document.getElementById("typeOfOrder"),
    count = document.getElementById("count"),
    agentFio = document.getElementById("agentFio"),
    login = document.getElementById("login"),
    tp = document.getElementById("tp"),
    ap = document.getElementById("ap"),
    idList = oldIdList = tprList = tprComment ="";

    isCheck(inputs);
  /*  isCheck(direction);
    isCheck(system);
    isCheck(category);
    isCheck(classification); */


/*
var d = document.getElementsByName("direction");
d.forEach(function(item, d){if (item.checked) {console.log(item.value)}});

//просто выводит чекнутый элемент
*/

/**function isCheck(arr, elem){
  for (var i = 0; i < arr.length; i++)
    arr[i].addEventListener("change", function(){
      this.setAttribute("checked", true);
      idList = idList + this.value;

      if (this.value == "tpr"){
        if (idList) idList = "tpr";
        document.getElementById("btn_comment").classList.remove("invisible");
        document.getElementById("classification").classList.add("invisible");
        document.getElementById("forEdit").classList.remove("invisible");
      }
      if (idList && this.value == "tpl"){
        idList = "tpl";
        document.getElementById("btn_comment").classList.add("invisible");
        document.getElementById("classification").classList.remove("invisible");
        document.getElementById("forEdit").classList.add("invisible");
      }
      if (this.value == "_hpsa"){
        document.getElementById("classification").classList.add("invisible");
      }
      if (this.value == "_setup"){
        console.log("тип "+ this.value + "весь ид" + idList);
      }
  });

}

count.addEventListener("change", function(){
  console.log(count.value);
});

typeOfOrder.addEventListener("change", function(){
  console.log(count.value);
});

codeOfError .addEventListener("change", function(){
  console.log(count.value);
});

agentFio.addEventListener("change", function(){
  console.log(agentFio.value);
});

tp.addEventListener("change", function(){
  console.log(tp.value);
});

ap.addEventListener("change", function(){
  console.log(ap.value);
});

login.addEventListener("change", function(){
  console.log(login.value);
});

btn_result.addEventListener("click", function(){
  if (!idList) idList = "sasp";
  var list = document.getElementById(idList);
  //var count = 1;
  if (list){
    document.querySelector(".information").style.backgroundPosition = "-1000px";
    if (document.querySelector(".information .temp_block")) {
      document.querySelector(".information .temp_block").remove();
    }
    var n = count.value;
    if (count.value || codeOfError .value || typeOfOrder.value) {
      //tprList =  list.innerHTML;
      var newList = document.createElement("ul");
      newList.className = "temp_block";
      //newList.innerHTML = tprList;
      newList.innerHTML = list.innerHTML;
      if (count.value) {
        newList.innerHTML = newList.innerHTML.replace(/:х/g, ":" + count.value);
      }
      if (codeOfError .value) {
        newList.innerHTML = newList.innerHTML.replace(/error_code/g, codeOfError .value);
      }
      if (typeOfOrder.value) {
        newList.innerHTML = newList.innerHTML.replace(/order/g, typeOfOrder.value);
      }
      newList.style.display = "block";
      document.querySelector(".information").insertBefore(newList, document.getElementById("comments"));
    } else {
        list.style.display = "block";
      }
      oldList = idList;
  } else {
    err.style.display = "block";
  }
});

btn_comment.addEventListener("click", function(){
  var n = count.value;
  var list = document.getElementById("comments");
  if (document.querySelector(".information .temp_comment")){
    document.querySelector(".information .temp_comment").remove();
  }
    if (n) {
        tprComment =  list.innerHTML;
        var newBlock = document.createElement("ul");
        newBlock.className = "temp_comment comments";
        newBlock.innerHTML = tprComment.replace(/something/g, agentFio.value);
        newBlock.innerHTML = newBlock.innerHTML.replace(/number/g, login.value);
        newBlock.innerHTML = newBlock.innerHTML.replace(/tp/g, tp.value);
        newBlock.innerHTML = newBlock.innerHTML.replace(/apl/g, ap.value);
        newBlock.style.display = "block";
        document.querySelector(".information").appendChild(newBlock);
      } else {
        list.style.display = "block";
      }
});


btn_reset.addEventListener("click", function(){
  console.log("idList " + idList);
  console.log("oldList " + oldList);
  idList = "";
  var list = document.getElementById(oldList);
  if (oldList){
      list.style.display = "none";
      //list.innerText = tprList;
      document.querySelector(".information").style.backgroundPosition = "center"
  } else {
      err.style.display="none";
      console.log("была ошибка ");
  }
  for (var i = 0; i < inputs.length; i++)
    inputs[i].removeAttribute("checked");

  document.getElementById("btn_comment").classList.add("invisible");
  document.getElementById("classification").classList.remove("invisible");
  document.getElementById("forEdit").classList.add("invisible");
  if (count.value || codeOfError .value) {
    document.querySelector(".information .temp_block").remove();
    if (count.value) document.querySelector(".information .temp_comment").remove();
  }  else {
    document.getElementById("comments").style.display = "none";
  }
});**/
