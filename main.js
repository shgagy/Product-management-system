// بسم الله الرحمن الرحيم

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adsa = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("btn");

let mood = "create";
let tmp;

// get total function
function getTotal(){
   if(price.value != ""){
    let result = (+price.value + +taxes.value + +adsa.value ) - discount.value;
    total.innerHTML=(result);
   total.style.background = "green";
   }else{
    total.style.background = "#b42b2b";
    total.innerHTML=" ";
   }
}

// Save Data in Array 
let PushProducts = [];
if(localStorage.getItem("product")){
   PushProducts = JSON.parse(localStorage.getItem("product"));
   console.log("Found local Storage");
}else{
  PushProducts = [];
  console.log(" unfined local Storage ");
}



create.onclick = function(){
  let product = {
   title:title.value.toLowerCase(),
   price:price.value,
   adsa:adsa.value,
   taxes:taxes.value,
   discount:discount.value,
   total:total.innerHTML,
   count:count.value,
   category:category.value.toLowerCase(),
  }
  if(title.value != '' && price.value != '' && adsa.value != '' && category.value != ''){
if(mood === "create"){
    if(count.value >= 2 ){
      for(let i=0;i<count.value;i++){
        PushProducts.push(product);
        localStorage.setItem("product", JSON.stringify(PushProducts));
      }
    }else{PushProducts.push(product);
  localStorage.setItem("product", JSON.stringify(PushProducts));}} else {

          PushProducts[tmp]= product;
          create.innerHTML="create";
          create.style.background="#a78d19c7";
          mood = "create";
          count.style.display = "block";

  }
  } 
  else{
    console.log('no product saved in local storage'); 
  }
  cleanD();
  ShowData();
}
function cleanD() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  adsa.value = "";
  discount.value = "";
  total.innerHTML = "";
  total.style.background = "#b42b2b";
  count.value = "";
  category.value = "";
}

function ShowData(){
let c=0;

 
  let table='';
 
  if(PushProducts.length > 0 ){
  for(let i = 0 ; i<PushProducts.length; i++) {
    
 table += 
`<tr>
            <td>${i}</td>
            <td>${PushProducts[i].title}</td>
            <td>${PushProducts[i].price}<span id="totGr">$</span></td>
            <td>${PushProducts[i].taxes}<span id="totGr">$</span></td>
            <td>${PushProducts[i].adsa}<span id="totGr">$</span></td>
            <td>${PushProducts[i].discount}<span id="totGr">$</span></td>
            <td>${PushProducts[i].total}<span id="totGr">$</span></td>
            <td>${PushProducts[i].category}</td>
            <td><button onclick="update(${i})" ><span>u</span><span>p</span><span>d</span><span>a</span><span>t</span><span>e</span></button></td>
            <td><button onclick="delOnePro(${i})"><span>d</span><span>e</span><span>l</span><span>e</span><span>t</span><span>e</span></button></td>
</tr>`;
c++;
  }
  
  document.getElementById("tbody").innerHTML = table;
}
else{
   
    let boxEmpty = `
           <div id="boxEm">
           
          <h2 id="Emp">
          <span>T</span>here are no products !
          </h2>
          
           
           </div>
    `;
    document.getElementById("tbody").innerHTML = boxEmpty;
  }

  let dall = document.getElementById("lll");
  if(PushProducts.length > 0){

  dall.innerHTML = `
     
  <button id="h" onclick="delAll()" >Delete All <${c}></button>

  `;
  
}else{
  dall.innerHTML= "";
}
  
}

 function delOnePro(i){
  
  PushProducts.splice(i,1);
  localStorage.product = JSON.stringify(PushProducts);
        ShowData();
 }

function delAll(){
  PushProducts.splice(0,PushProducts.length);
  localStorage.clear();
ShowData();
}
function update(i) {
  tmp=i;
  mood = "update";
  title.value=PushProducts[i].title;
  price.value=PushProducts[i].price;
  taxes.value=PushProducts[i].taxes;
  adsa.value=PushProducts[i].adsa;
  discount.value=PushProducts[i].discount;
  total.innerHTML=PushProducts[i].total;
  count.style.display="none";
  category.value=PushProducts[i].category;
  getTotal();
  create.style.background="green";
  create.innerHTML="Update";
  
}
ShowData();

// serch

let searchMood = "title";
let searchBtn = document.getElementById("serch");
function GetSearchID(id){

if(id === "serchTibtn")
{
searchMood = "title";
searchBtn.placeholder = "Search by title";
}else{
  searchMood = "category";
  searchBtn.placeholder = "Search by category";
}
searchBtn.focus();
}
function Search(value) {



     {
      if(searchMood == "title")
     {
      let table = "";
      for(let i=0;i<PushProducts.length;i++){
     
         if(PushProducts[i].title.toLowerCase().includes(value.toLowerCase())){
           table += 
           `<tr>
                       <td>${i}</td>
                       <td>${PushProducts[i].title}</td>
                       <td>${PushProducts[i].price}<span id="totGr">$</span></td>
                       <td>${PushProducts[i].taxes}<span id="totGr">$</span></td>
                       <td>${PushProducts[i].adsa}<span id="totGr">$</span></td>
                       <td>${PushProducts[i].discount}<span id="totGr">$</span></td>
                       <td>${PushProducts[i].total}<span id="totGr">$</span></td>
                       <td>${PushProducts[i].category}</td>
                       <td><button onclick="update(${i})" ><span>u</span><span>p</span><span>d</span><span>a</span><span>t</span><span>e</span></button></td>
                       <td><button onclick="delOnePro(${i})"><span>d</span><span>e</span><span>l</span><span>e</span><span>t</span><span>e</span></button></td>
           </tr>`;
         }
   
      }
     
      document.getElementById("tbody").innerHTML = table;
     }else{
       let table = "";
       for(let i=0;i<PushProducts.length;i++){
      
          if(PushProducts[i].category.toLowerCase().includes(value.toLowerCase())){
            table += 
            `<tr>
                        <td>${i}</td>
                        <td>${PushProducts[i].title}</td>
                        <td>${PushProducts[i].price}<span id="totGr">$</span></td>
                        <td>${PushProducts[i].taxes}<span id="totGr">$</span></td>
                        <td>${PushProducts[i].adsa}<span id="totGr">$</span></td>
                        <td>${PushProducts[i].discount}<span id="totGr">$</span></td>
                        <td>${PushProducts[i].total}<span id="totGr">$</span></td>
                        <td>${PushProducts[i].category}</td>
                        <td><button onclick="update(${i})" ><span>u</span><span>p</span><span>d</span><span>a</span><span>t</span><span>e</span></button></td>
                        <td><button onclick="delOnePro(${i})"><span>d</span><span>e</span><span>l</span><span>e</span><span>t</span><span>e</span></button></td>
            </tr>`;
          }
            
    
       }
       document.getElementById("tbody").innerHTML = table;
     }
   
   
      }
  
}




