let apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,polygon&vs_currencies=inr";
apiUrl='https://api.coincap.io/v2/assets';
let data;
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {getFirestore,getDoc, doc,updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
async function fetchCryptoPrices() {
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        // console.log(data.data[0]);
        // console.log(data.data[1]);
        // console.log(data.data[5]);
        // console.log(data.data[66]);
        changeData(0,document.querySelector('.bitcoinPrice'),document.querySelector('.bit'))
        changeData(1,document.querySelector('.ETH'),document.querySelector('.eth'))
        changeData(5,document.querySelector('.BNB'),document.querySelector('.bnb'))
        changeData(66,document.querySelector('.POL'),document.querySelector('.pol'))


        // let arr2 = data.data[1].priceUsd.split(".")
        // document.querySelector('.ETH').innerText=`$${arr2[0]}.${arr2[1].slice(0,2)}`;
        // let arr22 = data.data[1].changePercent24Hr.split(".");
        // document.querySelector('.eth').innerText=`$${arr22[0]}.${arr22[1].slice(0,2)}`;

        // let arr3 = data.data[5].priceUsd.split(".")
        // document.querySelector('.BNB').innerText=`$${arr3[0]}.${arr3[1].slice(0,2)}`;
        // let arr33 = data.data[5].changePercent24Hr.split(".");
        // document.querySelector('.bnb').innerText=`$${arr33[0]}.${arr33[1].slice(0,2)}`;

        // let arr4 = data.data[66].priceUsd.split(".");
        // document.querySelector('.POL').innerText=`$${arr4[0]}.${arr4[1].slice(0,2)}`;    
        // let arr44 = data.data[66].changePercent24Hr.split(".");
        // document.querySelector('.pol').innerText=`$${arr44[0]}.${arr44[1].slice(0,2)}`;
        
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    }
}
fetchCryptoPrices()

function changeData(index,Parent,Child){
    if( !Parent ){
        return
    }
    Parent.innerText=`$${parseFloat(data.data[index].priceUsd).toFixed(2)}`;
    let percentage = parseFloat(data.data[index].changePercent24Hr).toFixed(2);
    if(percentage>0){
        Child.style.color=`#2ecc71`
    }else{
        Child.style.color=`red`
    }     
    Child.innerText=`%${percentage}`;
}
function changeDataTotal(index,Parent,Child,Quantity){
    if( !Parent ){
        return
    }
    Parent.innerText=`$${parseFloat(data.data[index].priceUsd * Quantity).toFixed(2)}`;
    let percentage = parseFloat(data.data[index].changePercent24Hr).toFixed(2);
    if(percentage>0){
        Child.style.color=`#2ecc71`
    }else{
        Child.style.color=`red`
    }     
    Child.innerText=`%${percentage}`;
}
onAuthStateChanged(auth,(user)=>{
    displayWallet(user.uid)

})
async function displayWallet(id){
        let userDocument = await getDoc(doc(db,'users',id))
        userDocument=userDocument.data();
        document.querySelector('.wallet-balance').innerText=`$${userDocument.wallet}`
        let quantitySpans = document.querySelectorAll('.quantity');

        for(let j=0;j<4;j++){
            quantitySpans[j].innerText=`( Quantity: ${userDocument.cryptoOwned[j]})`
        }
        console.log(userDocument.cryptoOwned);
        
        changeDataTotal(0,document.querySelector('.bitcoinPriceTotal'),document.querySelector('.bit'),userDocument.cryptoOwned[1])
        changeDataTotal(1,document.querySelector('.ETHTotal'),document.querySelector('.eth'),userDocument.cryptoOwned[2])
        changeDataTotal(5,document.querySelector('.BNBTotal'),document.querySelector('.bnb'),userDocument.cryptoOwned[0])
        changeDataTotal(66,document.querySelector('.POLTotal'),document.querySelector('.pol'),userDocument.cryptoOwned[3])

}
