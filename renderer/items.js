let items = document.getElementById('items');

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

exports.select = (e) => {
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected');

    e.currentTarget.classList.add('selected');
}

exports.changeSelection = direction => {

    // Get selected item
    let currentItem = document.getElementsByClassName('read-item selected')[0]
  
    // Handle up/down
    if (direction === 'ArrowUp' && currentItem.previousSibling) {
      currentItem.classList.remove('selected')
      currentItem.previousSibling.classList.add('selected')
  
    } else if (direction === 'ArrowDown' && currentItem.nextSibling) {
      currentItem.classList.remove('selected')
      currentItem.nextSibling.classList.add('selected')
    }
  }


exports.addItem = (item, isNew=false) => {
    let itemNode = document.createElement('div');
    itemNode.setAttribute('class', 'read-item');
    itemNode.innerHTML = `<img src=${item.screenshot}><h2>${item.title}</h2>`;
    itemNode.setAttribute('data-url', item.url);
    items.appendChild(itemNode);


    itemNode.addEventListener('click', this.select);


    if (document.getElementsByClassName('read-item').length === 1){
        itemNode.classList.add('selected');
    }
    if (isNew){
        this.storage.push(item);
        this.save();
    }
    
}

exports.open = () => {
    if (!this.storage.length) return;

    let selectedItem = document.getElementsByClassName('read-item selected')[0].classList.remove('selected')[0];
    let contentUrl = selectedItem.dataset.url;
    console.log(contentUrl);



};

this.storage.forEach((item) => {
    this.addItem(item);
})