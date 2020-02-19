

const { remote, shell } = require('electron');

const template = [
    {
        label: 'Items', 
        submenu: [
            {
                label: 'Add New',
                click: window.newItem,
                accelerator: 'CmdOrCtrl+N'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help', 
        submenu: [
            {
                label: 'Learn more',
                click: () => { shell.openExternal('https://github.com/CaseyInHaengsin') }
            }
        ]
    }
]

if (process.platform == 'darwin'){
    template.unshift({
        label: remote.app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { role: 'services' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { role: 'services' },
            { role: 'quit' },

        ]
    })
}

const menu = remote.Menu.buildFromTemplate(template);


remote.Menu.setApplicationMenu(menu);