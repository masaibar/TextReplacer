// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }

    if (msg.type === 'rewrite') {
        for (let item of figma.currentPage.children) {
            if (item.type === "TEXT") {
                await figma.loadFontAsync({family: item.fontName["family"], style: item.fontName["style"]})
                // console.log(item.name)
                // console.log(item.characters)
                // console.log(item.fontName)
                // console.log(item.fontName["family"])
                // console.log(item.fontName["style"])
                item.characters = "fugafuga"
            }
        }
    }

    if (msg.type === 'csv') {
        console.log("csv call")
        const lines = msg.lines

        lines.forEach(line => {
            console.log(line)
        })
        console.log("csv called")
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
