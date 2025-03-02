import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FlashMessage from "../helperComponents/FlashMessage.jsx";
import { useAuthContext } from "../context/AuthProvider.jsx";
import Loader from "../helperComponents/Loader.jsx";

export default function DiceGame() {
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(0);
  const [roll, setRoll] = useState(null);
  const [result, setResult] = useState(null);
  const [hash, setHash] = useState("");
  const [rolling, setRolling] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0");
  const [flash, setFlash] = useState({
    type: "",
    message: null
  });
  const { state,dispatch } = useAuthContext();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    loadBalance();
  }, [darkMode]);

  // Load balance from localStorage or set default
  const loadBalance = async () => {
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    } else {
      localStorage.setItem("balance", balance);
    }
  };

  // Connect to MetaMask Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const ethBalance = await provider.getBalance(accounts[0]);

        setWalletBalance(ethers.formatEther(ethBalance)); // Convert balance from Wei to Ether
        setWalletConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      setFlash({
        type:"error",
        message: "Please install MetaMask to play this game"
      });
      setTimeout(() => {
        setFlash({
          type: "",
          message: null
        });
      },3000);
    }
  };

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      setFlash({
        type:"error",
        message: "Invalid or Insufficient bet amount"
      });
      setTimeout(() => {
        setFlash({
          type: "",
          message: null
        });
      },3000);
    setRolling(false);
    return;
    }
    setRolling(true);
    try {
      const res = await fetch("http://localhost:3000/api/roll-dice", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ bet }),
      });

      const data = await res.json();
      if(res.ok){
        setRolling(false);
        setTimeout(() => {
          setRoll(data.roll);
          setResult(data.result);
          setBalance(data.newBalance);
          setHash(data.hash);
          setFlash({
            message:data.message,
            type: data.result === "win" ? "success" : "error"
          });
          setTimeout(() => {
            setFlash({
              type: "",
              message: null
            });
          },3000);
          dispatch({ type:'ROLLDICE', payload: data });
        }, 500);
      }
    } catch (error) {
      setFlash({
        message:"Unexpected Error",
        type: "error"
      });
      setTimeout(() => {
        setFlash({
          type: "",
          message: null
        });
      },3000);
      setRolling(false);
    }
  };

  return (
    state.isLoggedIn ?
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex flex-col items-center justify-center min-h-screen p-5`}>
    { flash.message && <FlashMessage message={flash.message} type={flash.type}/>}
    { rolling && <Loader props={"Rolling Dice..."} />}
    <button
      className="absolute bottom-4 right-4 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>

    <h1 className="text-2xl font-bold mb-4">🎲 Provably Fair Dice Game</h1>

    {walletConnected ? (
      <p className="mb-2">Wallet Balance: <span className="font-semibold">{walletBalance} ETH</span></p>
    ) : (
      <button
        className="px-4 py-2 mb-4 rounded bg-green-600 text-white hover:bg-green-700"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    )}

    <p className="mb-2">Game Balance: <span className="font-semibold">${balance}</span></p>

    <input
      type="number"
      className={`p-2 rounded mb-4 w-40 text-center ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      value={bet}
      onChange={(e) => setBet(Number(e.target.value))}
      min="1"
    />

    <button
      className={`px-6 py-2 rounded text-white transition ${rolling ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      onClick={rollDice}
      disabled={rolling}
    >
      {rolling ? "Rolling..." : "Roll Dice"}
    </button>

    {roll && (
      <div className="mt-4 text-xl">
        <p>Rolled: <span className="font-bold">{roll}</span> → {result === "win" ? "🎉 You Win!" : "😞 You Lose"}</p>
        <p className="text-xs mt-2 break-all">Hash: {hash}</p>
      </div>
    )}
  </div>
  : 
  <h1>Dont be Too Smart Login Or Sign Up To Submit.</h1>
  );
}
