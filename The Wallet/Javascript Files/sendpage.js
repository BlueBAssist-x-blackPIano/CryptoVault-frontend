  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import {getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

  import {getFirestore,getDoc, doc,updateDoc,arrayUnion,Timestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDP4btGjNJxxWGN9uf7oVXAUuXfgk-kbLk",
    authDomain: "crypto-wallet-7ad44.firebaseapp.com",
    projectId: "crypto-wallet-7ad44",
    storageBucket: "crypto-wallet-7ad44.firebasestorage.app",
    messagingSenderId: "112210890136",
    appId: "1:112210890136:web:c848d95fd723af3cb7afed",
    measurementId: "G-TCM4GFZY1W"
  };
let apiUrl='https://api.coincap.io/v2/assets';


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
onAuthStateChanged(auth,(user)=>{
    console.log(user.uid);
})
let demoCart = [0,0,0,0];

function addListeners(id,index){
    document.querySelector(`#${id}`).addEventListener('click',async()=>{
        demoCart[index]++
        console.log(demoCart);
        document.querySelector(`.${id}`).innerHTML=demoCart[index];
    })
}
addListeners('_0',0);
addListeners('_1',1);
addListeners('_2',2);
addListeners('_3',3);
document.querySelector('.buy').addEventListener("click",async()=>{
    const response = await fetch(apiUrl);
    let data = await response.json();
    let prices = [];    
    
    prices.push(parseFloat(data.data[5].priceUsd).toFixed(2));
    prices.push(parseFloat(data.data[0].priceUsd).toFixed(2));
    prices.push(parseFloat(data.data[1].priceUsd).toFixed(2));
    prices.push(parseFloat(data.data[66].priceUsd).toFixed(2));

    console.log(prices);
    
    let wallets = parseFloat(prices[0])*demoCart[0]+parseFloat(prices[1])*demoCart[1]+parseFloat(prices[2])*demoCart[2]+parseFloat(prices[3])*demoCart[3]
    console.log(wallets);
    let userDocument = await getDoc(doc(db,'users',auth.currentUser.uid))
    userDocument=userDocument.data()
    let dummyOwned = userDocument.cryptoOwned
    let dummyWallet =userDocument.wallet;
    console.log(typeof(wallets));
    console.log(parseFloat(dummyWallet));
    console.log(parseFloat(dummyWallet).toFixed(2));
    
    let total =   parseFloat(wallets.toFixed(2)) + parseFloat(parseFloat(dummyWallet).toFixed(2))     
    console.log(total);
    let time = Date().split(" ").splice(0,5).join(" ")
    let obj={
        bnb:demoCart[0],
        bit:demoCart[1],
        eth:demoCart[2],
        pol:demoCart[3],
        price:prices,
        created_At:time,
    }

    for(let i=0;i<4;i++){
        dummyOwned[i]+=demoCart[i]
    }
    console.log(obj);
    
    await updateDoc(doc(db,'users',auth.currentUser.uid),{
        wallet:total ,
        cryptoOwned:dummyOwned,
        history:arrayUnion(obj)
    })
    demoCart=[0,0,0,0]
    window.location.href="../HTML Docs/index.html";
})

// let updateDoc = await updateDoc(doc(db,'users',auth.currentUser.uid),{
        
// })
