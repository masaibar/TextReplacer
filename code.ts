// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
import has = Reflect.has;

figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.

    if (msg.type === 'tsv') {
        const allTexts = figma.currentPage.findAll().filter(item => {
            return item.type === "TEXT"
        }) as TextNode[]

        let hash: { [index: string]: string } = {}

        for (const line of msg.lines) {
            const pair = line.split("\t")
            hash[pair[0]] = pair[1]
        }

        const targetTexts = allTexts.filter(text => {
            return hash[text.name]
        })

        for (let target of targetTexts) {
            const beforeCharacters = target.characters
            await figma.loadFontAsync({family: target.fontName["family"], style: target.fontName["style"]})
            target.characters = hash[target.name]

            console.log(target.name + " replaced: " + beforeCharacters + " -> " + target.characters)
        }
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
