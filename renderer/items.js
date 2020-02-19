const fs = require('fs');

let items = document.getElementById('items');
let readerJS;

fs.readFile(`${__dirname}/reader.js`, (error, data) => {
    readerJS = data.toString();
})



exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

window.addEventListener('message', (e) => {

});

exports.getSelectedItem = () => {
    let currentItem = document.getElementsByClassName('read-it selected')[0];
    let itemIndex = 0;
    let child = currentItem;

    while ((child = child.previousElementSibling) != null) itemIndex++;
};

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
    itemNode.addEventListener('dblclick', this.open);


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

    let selectedItem = document.getElementsByClassName('read-item selected')[0];
    let contentUrl = selectedItem.dataset.url;
    let readerWin = window.open(contentUrl, '', `maxWidth=2000, maxHeight=2000, width=1200, height=800, backgroundColor=#DEDEDE, nodeIntegration=0, contextIsolation=1` );
    
    readerWin.eval(readerJS)



};

this.storage.forEach((item) => {
    this.addItem(item);
})