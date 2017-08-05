var showList,
    direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    btn_comment = document.getElementById("btn_comment"),
    inputs = document.getElementsByTagName("input"),
    err = document.querySelector(".error"),
    count = document.querySelector("#count input[type=text]"),
    idList = oldList = tprList = "";

    isCheck(direction);
    isCheck(system);
    isCheck(category);
    isCheck(classification);

function isCheck(arr, elem){
  for (var i = 0; i < arr.length; i++)
    arr[i].addEventListener("change", function(){
      this.setAttribute("checked", true);
      idList = idList + this.value;

      if (this.value == "tpr"){
        document.getElementById("btn_comment").classList.remove("invisible");
        document.getElementById("classification").classList.add("invisible");
        document.getElementById("count").classList.remove("invisible");
      }
  });

}

count.addEventListener("change", function(){
  console.log(count.value);
});

btn_result.addEventListener("click", function(){
  if (!idList) idList = "sasp";
  var list = document.getElementById(idList);
  //var count = 1;
  if (list){
    document.querySelector(".information").style.backgroundPosition = "-1000px";
    var n = count.value;
    if (n) {
      tprList =  list.innerText;
      list.innerText = tprList.replace(/:х./g, ":" + n + ".");
      list.style.display = "block";

    } else {
      list.style.display = "block";
    }
  }
    oldList =idList;
});

btn_reset.addEventListener("click", function(){
  idList = "";
  var list = document.getElementById(oldList);
  if (oldList){
      list.style.display = "none";
      list.innerText = tprList;
      document.querySelector(".information").style.backgroundPosition = "center"
  } else{
      err.style.display="none";
      console.log("была ошибка ");
  }
  for (var i = 0; i < inputs.length; i++)
    inputs[i].removeAttribute("checked");

    document.getElementById("btn_comment").classList.add("invisible");
    document.getElementById("classification").classList.remove("invisible");
    document.getElementById("count").classList.add("invisible");
    document.getElementById("comments").style.display = "none";

});

btn_comment.addEventListener("click", function(){
  document.getElementById("comments").style.display = "block";
});
