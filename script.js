const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter= document.getElementById('filter')


function displayItems() {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));

    checkUI()
}






function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //Input validation
    if (newItem === '') {
        alert('Hello! Please add an Item ');
        return; } 
   
    //create item Dom element
    addItemToDom(newItem);

    //Add item to local storage
    addItemToStorage(newItem);


    checkUI()

    itemInput.value = '';
}
 



//adding item to dom

function addItemToDom(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    

    const button = createButton('.remove-item btn-link text-red');
    li.appendChild(button);
    
    //Add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    return button;

    
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //Add new item to array
    itemsFromStorage.push(item)

    //convert to json string and store to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
      let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    
    return itemsFromStorage
}

// making the icon button functional
function removeItem(e) {
    
    if (e.target.parentElement.classList.contains('.remove-item')) {
      if (confirm('Are you sure?') ) {
          e.target.parentElement.parentElement.remove();   
        checkUI()  
      }
    
  }
}

//Making the clear all btn functional

function clearItems(e) {
//    itemList.innerHTML = '' // this is a method that can do it but it's not so advisable
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);

         checkUI()  
    }
}


function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const filterText = e.target.value.toLowerCase(); //tolowercse()will ensure any input changes to lowercase

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        console.log(itemName);

        if (itemName.indexOf(filterText) != -1) {
            item.style.display = 'flex';
        } else {
             item.style.display = 'none'
        }
    });
}
function checkUI() {
const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block'; 
         itemFilter.style.display = 'block';
    }
}


//Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI()