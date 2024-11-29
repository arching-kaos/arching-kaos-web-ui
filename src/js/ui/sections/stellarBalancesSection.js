import { makeElement } from "../../arching-kaos-generator.js";

var stellarBalancesSection = {
    element: "div",
    id: "stellar-balances",
    innerHTML: `
        <div class="where-am-i">
            <img src="./img/logo.png" onclick="menusel({id:'#/welcome-section'})"/>
            <span>&gt;</span>
            <h2>Stellar</h2>
            <span>&gt;</span>
            <h2>Balances</h2>
        </div>
        <em id="stellar-balances-not-found">No data found (yet?)!</em>
        <table id="stellar-balances-table"></table>
        `
};

makeElement(stellarBalancesSection, document.querySelector('.main'));
