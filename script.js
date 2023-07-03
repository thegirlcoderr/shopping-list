const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    //Input validation
    if (newItem === '') {
        alert('Hello! Please add an Item ');
        return; } 
   
    
    //create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    console.log(li)

    const button = createButton('.remove-item btn-link text-red');
    li.appendChild(button);
    
    itemList.appendChild(li);
    itemInput.value === '';
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


// making the icon button functional

function removeItem (e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
  
}

//Making the clear all btn functional

function clearItems(e) {
//    itemList.innerHTML = '' // this is a method that can do it but it's not so advisable
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}


//Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',clearItems);
