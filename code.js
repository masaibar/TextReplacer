// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'tsv') {
        const allTexts = figma.currentPage.findAll().filter(item => {
            return item.type === "TEXT";
        });
        let hash = {};
        for (const line of msg.lines) {
            const pair = line.split("\t");
            hash[pair[0]] = pair[1];
        }
        console.log(hash);
        const targetTexts = allTexts.filter(text => {
            return hash[text.name];
        });
        for (const target of targetTexts) {
            console.log("[Start] id: " + target.id + ", name: " + target.name + ", characters: " + target.characters);
            let beforeCharacters = target.characters;
            console.log("[Hash]: " + hash[target.name]);
            if (beforeCharacters === hash[target.name]) {
                continue;
            }
            else {
                try {
                    yield figma.loadFontAsync({ family: target.fontName["family"], style: target.fontName["style"] });
                }
                catch (error) {
                    console.log("loadFontAsync failed. " + target.id + " , " + error);
                }
                target.characters = hash[target.name];
            }
            console.log("[End] id: " + target.id);
        }
    }
    // for (const item of targetTexts) {
    //     console.log("id: " + item.id + ", name: " + item.name + ", characters: " + item.characters)
    //     await figma.loadFontAsync({family: item.fontName["family"], style: item.fontName["style"]})
    //     item.characters = hash[item.name]
    // }
    // for (let target of targetTexts) {
    //     const beforeCharacters = target.characters
    //     if (beforeCharacters === hash[target.name]) {
    //         console.log("[" + target.id + "] " +  target.name + " skipped. ====")
    //         continue
    //     } else {
    //         console.log("[" + target.id + "] " + target.name + " has difference.")
    //     await figma.loadFontAsync({family: target.fontName["family"], style: target.fontName["style"]})
    //     target.characters = hash[target.name]
    //
    //     console.log(target.name + " replaced: " + beforeCharacters + " -> " + hash[target.name])
    //     }
    // }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
});
