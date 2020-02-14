
// Modules
const {BrowserWindow} = require('electron')

// Offscreen BrowserWindow
let offscreenWindow;

// Exported readItem function
module.exports = (url, callback) => {
    console.log('called readItem');

  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: false
    }
  })

  // Load item url
  offscreenWindow.loadURL(url)
  //https://pypi.org/project/csv-diff/

  // Wait for content to finish loading
  offscreenWindow.webContents.on('did-finish-load', e => {
    
    // Get page title
    let title = offscreenWindow.getTitle()
    
    offscreenWindow.webContents.capturePage().then((image) => {
      let screenshot = image.toDataURL();
      console.log('made it')

      // Execute callback with new item object
      callback({ title, screenshot, url })

      // Clean up
      offscreenWindow.close()
      offscreenWindow = null
    })
    // Get screenshot (thumbnail)
    // offscreenWindow.webContents.capturePage((image) => {
    //     console.log(image);
    //     console.log('made it to image capture');
    //   // Get image as dataURL
    //   let screenshot = image.toDataURL()

    //   // Execute callback with new item object
    //   callback({ title, screenshot, url })

    //   // Clean up
    //   offscreenWindow.close()
    //   offscreenWindow = null
    // })
  })
}
