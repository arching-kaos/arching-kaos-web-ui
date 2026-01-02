// Arching Kaos Donation Section
//
// Kaotisk Hund - 2024
//
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL v3.0
//

import { makeElement } from "../../arching-kaos-generator.js";

export async function freighterWalletConnect()
{
    if ( await window.freighterApi.isConnected() )
    {
        let publicKey = "";
        let error = "";
        const accessObj = await window.freighterApi.requestAccess();
        if (accessObj.error) {
            return accessObj.error;
        } else {
            document.querySelector("#freighter-connect-button").innerText = accessObj.address;
            document.querySelector("#freighter-connect-button").onclick = '';
            // putKeyToField(accessObj.address);
            return accessObj.address;
        }
        return publicKey;
    }
    else
    {
        console.log("fr fail");
    }
}

function putKeyToField(k){
    const address = k;
    var base = document.querySelector("#freighter-connect-button");
    base.innerText=address;
    base.onclick='';
    // stellar_connection_status = 1;
    //    checkAddressForConfigurationVariable(k);
}

export async function triggerDonation()
{
    // try {
    // ...................................................  this element where the address should go when you connect the
    var sourcePublicKey = document.querySelector("#freighter-connect-button").innerHTML; // extension with
    //                                            ^ the id of the element we query                      // the page.
    const SERVER_URL = "https://horizon.stellar.org";
    const server = new StellarSdk.Horizon.Server(SERVER_URL);
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const receiverPublicKey = "GAEVVR57OWKRXH2WLTEVTNT3NFSXN7MIZNJH2NFNPBJF4MYT4BNKJGXA"

    const amount_to_send = document.querySelector("#donation-amount").value;
    const kh_min = 20000000*amount_to_send;
    const transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase: StellarSdk.Networks.PUBLIC, })
    /* The part that changes */
        .addOperation(StellarSdk.Operation.pathPaymentStrictSend({
            destination: receiverPublicKey,
            sendAsset: new StellarSdk.Asset("XLM"),
            sendAmount: String(amount_to_send),
            destAsset: new StellarSdk.Asset("KAOTISKHUND","GDLJKMETTIXAVTZ2XXR2LHUITT7GZBNWEKQDN7V7SP4MURVY6266BIMO"),
            destMin: String(kh_min),
            path: [new StellarSdk.Asset("XLM"),new StellarSdk.Asset("KAOTISKHUND","GDLJKMETTIXAVTZ2XXR2LHUITT7GZBNWEKQDN7V7SP4MURVY6266BIMO")]
        }))
    /* End of part that changes */
        .setTimeout(30)
    // .addMemo(StellarSdk.Memo.text('Hello world!'))
        .build();
    const xdr = transaction.toXDR();
    const userSignTransaction = async (
        xdr,
        network,
        signWith
    ) => {
        let signedTransaction = "";
        let error = "";
        try
        {
            signedTransaction = await window.freighterApi.signTransaction(
                xdr,
                {
                    address:signWith,
                    network
                });
            console.log(signTransaction);
        }
        catch (e)
        {
            error = e;
        }
        if (error)
        {
            return error;
        }
        return signedTransaction;
    };
    // const userSignedTransaction = await userSignTransaction(xdr, "PUBLIC", sourcePublicKey);
    const userSignedTransaction = await window.freighterApi.signTransaction(xdr, {address: sourcePublicKey, network:"PUBLIC"});
    console.log(userSignedTransaction);


    const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR( userSignedTransaction.signedTxXdr, StellarSdk.Networks.PUBLIC );
    try {
        const response = await server.submitTransaction(transactionToSubmit);
        // console.log(transaction.toEnvelope().toXDR('base64'));
        console.log(JSON.stringify(response, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(response._links.transaction.href);
        makeElement(
            {
                element:"iframe",
                onLoad:"var c=this;window.addEventListener('message',function({data,source}){if(c&&source===c.contentWindow&&data.widget===c.src)c.style.height=data.height+'px'},false);",
                src:`https://stellar.expert/widget/public/tx/info/${response.id}`,
                style:"border:none;overflow:hidden;max-width:100%; min-width:300px;max-height:100%;min-height:200px;width:100%"
            },
            document.querySelector("#donation-section").querySelector(".content")
        );
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

export function donationSection()
{
    var whereAmI = {
        element: "div",
        className: "where-am-i",
        innerHTML: [
            { element: "img", src:"./img/logo.png", onclick:"menusel({id:'#/welcome-section'})"},
            { element: "span", innerText:">"},
            { element: "h2", innerText:"Donation"}
        ]
    };

    var content = {
        element: "div",
        className: "content",
        style: "display: flex; flex-direction: column; gap: 10px;",
        innerHTML: [
            { element: "p", innerText:"If you like what you see and you want to contribute some memecoins you are free to do so using the XLM Freighter wallet."},
            { element: "p", innerText:"To donate, press the connect button below to connect your wallet."},
            {
                element:"button",
                id:"freighter-connect-button",
                onclick:"freighterWalletConnect()",
                innerText: "Connect Freighter wallet"
            },
            { element: "p", innerText:"You can enter the amount you want to donate in XLM on the input box below."},
            {
                element: "div",
                style: "display: flex; gap: 5px;",
                innerHTML: [
                    { element: "input", type:"number", value:"1.0", placeholder:"1.0", step:"0.01", min:"0.01", max:"10", id:"donation-amount" },
                    {
                        element:"button",
                        id:"donate-button",
                        onclick:"triggerDonation()",
                        innerText: "Donate"
                    }
                ]
            }
        ]
    };
    var donationSection = {
        element: "div",
        hidden: true,
        id:"donation-section",
        innerHTML: [
            whereAmI,
            content
        ]
    };

    makeElement(donationSection, document.querySelector('.main'));
}
// @license-end
