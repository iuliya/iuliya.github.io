var showList,
    direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    btn_comment = document.getElementById("btn_comment"),
    inputs = document.getElementsByTagName("input"),
    err = document.querySelector(".error"),
    count = document.getElementById("count"),
    agentFio = document.getElementById("agentFio"),
    login = document.getElementById("login"),
    tp = document.getElementById("tp"),
    ap = document.getElementById("ap"),
    idList = oldList = tprList = tprComment ="";

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
  });

}

count.addEventListener("change", function(){
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
    if (count.value) {
      tprList =  list.innerHTML;
      var newList = document.createElement("ul");
      newList.className = "temp_block";
      newList.innerHTML = tprList.replace(/:х/g, ":" + count.value);
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
  if (tprComment != ""){document.querySelector(".information .temp_comment").remove();}
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
  console.log(idList);
  console.log(oldList);
  idList = "";
  var list = document.getElementById(oldList);
  if (oldList){
      list.style.display = "none";
      list.innerText = tprList;
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
  if (count.value) {
    document.querySelector(".information .temp_comment").remove();
    document.querySelector(".information .temp_block").remove();
  }  else {
    document.getElementById("comments").style.display = "none";
  }
});
