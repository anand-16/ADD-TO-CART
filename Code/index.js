import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-df319-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database,"shoppingList");


const inputFieldEl = document.getElementById("input-field");
const buttonFieldEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

buttonFieldEl.addEventListener("click",function(){
    
    let inputValue = inputFieldEl.value //We are taking the va;ue  from input field
    
    push(shoppingListInDB, inputValue); //Pushing the data into database

    //Refactoring these two
   
    // inputFieldEl.value=""; //for the input field clearing

   // shoppingListEl.innerHTML += `<li>${inputValue}</li>`

    //console.log(inputValue);

    clearInputFieldEl();

    //appendItemToShoppingList(inputValue); //Below we are adding same function in another way



})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){


    let itemArray = Object.entries(snapshot.val());//converting snapshot to array

    //shoppingListEl.innerHTML = ""; //clearing previous items in ul
    
    clearShoppingListEl();

    for(let i = 0;i < itemArray.length; i++)
    {
        let currItem = itemArray[i];

        let currItemID = currItem[0];
        let currItemValue = currItem[1];

        appendItemToShoppingList(currItem);
      //  console.log(itemArray[i]);
    }
    //console.log(itemArray);
    }
    else{
        shoppingListEl.innerHTML = "No item available";
    }

})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}

function clearInputFieldEl(){
    inputFieldEl.value = "";
}

function appendItemToShoppingList(item){

    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`);
        
        remove(exactLocationInDB);
    })

     shoppingListEl.append(newEl);

}
