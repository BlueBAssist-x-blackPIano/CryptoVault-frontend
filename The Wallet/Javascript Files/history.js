import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {getFirestore,getDoc, doc,updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDP4btGjNJxxWGN9uf7oVXAUuXfgk-kbLk",
  authDomain: "crypto-wallet-7ad44.firebaseapp.com",
  projectId: "crypto-wallet-7ad44",
  storageBucket: "crypto-wallet-7ad44.firebasestorage.app",
  messagingSenderId: "112210890136",
  appId: "1:112210890136:web:c848d95fd723af3cb7afed",
  measurementId: "G-TCM4GFZY1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const token_list =document.querySelector('.token-list');

onAuthStateChanged(auth,(user)=>{
    renderHistory(user.uid)
})

async function renderHistory(id) {
    let userDocument = await getDoc(doc(db,'users',id))
    userDocument = userDocument.data()
    let history =userDocument.history;
    console.log(history);
    for(let histo of history){
        if(histo.bnb){
            token_list.innerHTML = `
            <div style="font-size:12px;transform:translateY(65%)" class="token-balance">
                    ${histo.created_At}
                </div>
            <div class="token-item">
                <img src="../Images/bnb-bnb-logo.png" alt="BNB">
                <div class="token-details">
                    <span class="token-name">BNB</span>
                    <span class="token-network">BNB Smart Chain</span>
                </div>
                <div class="token-balance">
                    <span>Total: $${parseFloat(histo.price[0])*histo.bnb}</span>
                    
                </div>&nbsp;
                <div class="token-balance">
                    <span> Bought: ${histo.bnb}</span>
                    
                </div>
            </div>` + token_list.innerHTML;
        }
        if(histo.bit){
            token_list.innerHTML = `
            <div style="font-size:12px;transform:translateY(65%)" class="token-balance">
                    ${histo.created_At}
                </div><div class="token-item">
                <img src="../Images/bitcoin-btc-logo.png" alt="BTC">
                <div class="token-details">
                    <span class="token-name">BTC</span>
                    <span class="token-network">Bitcoin</span>
                </div>
                <div class="token-balance">
                    <span>Total: $${parseFloat(histo.price[1])*histo.bit}</span>
                    
                </div>&nbsp;
                <div class="token-balance">
                    <span>Bought: ${histo.bit}</span>
                    
                </div>
            </div>` + token_list.innerHTML;
        }
        if(histo.eth){
            token_list.innerHTML = `
            <div style="font-size:12px;transform:translateY(65%)" class="token-balance">
                    ${histo.created_At}
                </div><div class="token-item">
                <img src="../Images/ethereum-eth-logo.png" alt="ETH">
                <div class="token-details">
                    <span class="token-name">ETH</span>
                    <span class="token-network">Ethereum</span>
                </div>
                <div class="token-balance">
                    <span>Total: $${parseFloat(histo.price[2])*histo.eth} </span>
                    
                </div>&nbsp;
                <div class="token-balance">
                    <span>Bought: ${histo.eth}</span>
                    
                </div>
            </div>` + token_list.innerHTML;
        }
        if(histo.pol){
            token_list.innerHTML = `
                <div style="font-size:12px;transform:translateY(65%)" class="token-balance">
                    ${histo.created_At}
                </div>
                <div class="token-item">
                <img src="../Images/polygon-matic-logo.png" alt="POL">
                <div class="token-details">
                    <span class="token-name">POL</span>
                    <span class="token-network">Polygon</span>
                </div>
                <div class="token-balance">
                    <span>Total: $${parseFloat(histo.price[3])*histo.pol} </span>
                    
                </div>&nbsp;
                <div class="token-balance">
                    <span>Bought: ${histo.pol}</span>
                    
                </div>
            </div>` + token_list.innerHTML;
        }
    }

}