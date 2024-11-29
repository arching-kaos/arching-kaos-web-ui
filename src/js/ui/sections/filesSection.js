import { makeElement } from "../../arching-kaos-generator.js";

export function filesSection()
{
    var filesSection = {
        element: 'div',
        id: "files-section",
        innerHTML: `
        <div class="where-am-i">
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Modules</h2>
            <span>&gt;</span>
            <h2>Files</h2>
        </div>
        <em id="files-sec-not-found">No data found (yet?)!</em>
                `
    };

    makeElement(filesSection, document.querySelector('.main'));
}
