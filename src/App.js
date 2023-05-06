import logo from './logo.svg';
import './App.css';
import {ethers} from "ethers";
import GreetingContract from "./abis/Hellosolidity.json";
import React, {useState, useEffect} from "react";

const greetingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const[greet, setGreet] = useState("");
  const[newGreet, setNewGreet] = useState("");

  useEffect(()=>{
    getGreeting();
  }, [])


  async function requestAccount(){
    await window.ethereum.request({method: "eth_requestAccounts"})
  }
  
  async function getGreeting(){
    if(typeof window.ethereum !== "undefined"){
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(greetingAddress,GreetingContract,provider);

      try{
        const greeting =await contract.greet();

        setGreet(greeting);
        console.log("Greeitng", greeting);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  async function setGreeting(){
    if(typeof window.ethereum !== "undefined"){
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greetingAddress,GreetingContract,provider.getSigner());

      const transaction = await contract.setGreeting(newGreet);

      await transaction.wait();

      setGreet(newGreet);
      setNewGreet("");

    }
  }
  return (
    <div className="App" >
      <header className="App-Header">
        <h1>{greet}</h1>
        <button onClick={getGreeting}>Get Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input type="text" value={newGreet} onChange={(e)=> setNewGreet(e.target.value)}/>

      </header>
    
    </div>
  );
}

export default App;
