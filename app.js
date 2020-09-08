const shopForm = document.querySelector('.shop-form')
const shopList = document.querySelector('.shop-list')
const shopInput = shopForm.querySelector('input')
const shopSubmit = shopForm.querySelector('.form-submit')
const checkBtn = document.querySelector('.check')
const deleteBtn = document.querySelector('.delete')

let listItems =  JSON.parse(localStorage.getItem('items')) || [];

function addItem(e){
    e.preventDefault();
    const text = (this.querySelector('[name=list-item]')).value;
    
    if(text === '') return
    const item = {
        text, 
        checked: false
    }
    listItems.push(item)
    localStorage.setItem('items', JSON.stringify(listItems))
    populateList(listItems, shopList)
    this.reset();
}

function populateList(items, shopList){
    shopList.innerHTML = items.map((item, id) => {
        return `
        <li class='added-item'>
            <input type="checkbox" data-index=${id} id=item${id} ${item.checked ? 'checked' : ''}/>
            <label for=item${id}> ${item.text} </label>
            <button id=${id} class='delete-item'>x</button>
        </li>
        `
    }).join('');
}

function checkedState(e){
    if(!e.target.matches('input')) return
    const idx = e.target.dataset.index;
    listItems[idx].checked = !listItems[idx].checked; 
    localStorage.setItem('items', JSON.stringify(listItems))
    populateList(listItems, shopList)
}

function deleteAll(){
    listItems = listItems.filter(item => {
        return item.checked === false;
    })
    populateList(listItems, shopList)
    localStorage.setItem('items', JSON.stringify(listItems))
}

function checkAll(){
    listItems.forEach(item => item.checked = true)
    populateList(listItems, shopList)
}

function deleteSingleItem(e){
    if(e.target.tagName === 'BUTTON'){
        const singleId = e.target.parentElement;
        buttonId = parseInt((singleId.querySelector('button')).id)
        listItems = listItems.filter((item, id) => {
            return  id !== buttonId
        })
        populateList(listItems, shopList)
        localStorage.setItem('items', JSON.stringify(listItems))
    }
}

shopForm.addEventListener('submit', addItem)
populateList(listItems, shopList)
shopList.addEventListener('click', checkedState)
shopList.addEventListener('click', deleteSingleItem)

checkBtn.addEventListener('click', checkAll)
deleteBtn.addEventListener('click', deleteAll)