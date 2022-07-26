import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function App() {

  const axios = require('axios');

  const errnotify = (err) => {
    toast.error(`${err.response.data.message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const sucnotify = (res) => {
    toast.success(`Token ID : ${res.data.data.tokenId}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      toast.success(<div>
        <a href={"https://opensea.io/assets/matic/0x03e055692e77e56abf7f5570d9c64c194ba15616/"+res.data.data.tokenId} >View NFT</a>
      </div>, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  }


  const[file,setFile]=useState(null);
  const[fileName,setFileName]=useState('');
  const[desc,setDesc]=useState('');
  const[nfturi,setNfturi]=useState('');
  const[nftname,setNftname]=useState('');
  const[nftdesc,setNftdesc]=useState('');
  const[nftimage,setNftimage]=useState('');
  const[walletaddress,setWalletAddress]=useState('');
  const[gift,setGift]=useState('');

  var nftmeta={
    "name":fileName,
    "description":desc,
  };

  useEffect(()=>{
    getipfs();
  });

  var metadata = JSON.stringify(nftmeta);
  let axiosConfig = {
    headers: {
        'x-api-key':'1ca942ab-2b6d-401e-881e-5aa536c9487b',
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
    }
  };

  let formdata = new FormData();

  const uploadipfs=async()=>{
    formdata.set('metadata', metadata);
    formdata.append('image', file);
    formdata.append('asset', file);
    console.log(formdata.get('image'));
    axios.post('https://api.mintnft.today/v1/upload/single', formdata, axiosConfig)
    .then((res) => {
      setNfturi(res.data.data.url);
      getipfs();
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      errnotify(err);
      console.log("AXIOS ERROR: ", err);
    })
  }

  const getipfs=async()=>{
    axios.get('https://ipfs.io/ipfs/'+nfturi.slice(7))
    .then((res) => {
      setNftname(res.data.name);
      setNftdesc(res.data.description);
      setNftimage('https://ipfs.io/ipfs/'+(res.data.image).slice(7));
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("IPFS ERROR: ", err);
    })
  };

  const mintnft={
    "wallet": `${walletaddress}`,
    "type": "ERC721",
    "network" : "mainnet",
    "amount": 1,
    "tokenUri" : nfturi
}

const giftmintnft={
  "wallet": `${gift}`,
  "type": "ERC721",
  "network" : "mainnet",
  "amount": 1,
  "tokenUri" : nfturi
}


  const mint=async()=>{
    axios.post('https://api.mintnft.today/v1/mint/single', mintnft, {
      headers: {
        'x-api-key':'ce929521-4a6e-4edc-8891-85090cc98f95',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      sucnotify(res);
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      errnotify(err);
      console.log("AXIOS ERROR: ", err);
    })
  }

  const giftmint=async()=>{
    axios.post('https://api.mintnft.today/v1/mint/single', giftmintnft, {
      headers: {
        'x-api-key':'ce929521-4a6e-4edc-8891-85090cc98f95',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      sucnotify(res);
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      errnotify(err);
      console.log("AXIOS ERROR: ", err);
    })
  }

  return (
    <div className='flex flex-row w-screen h-screen bg-white' >
        <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className=' flex flex-col bg-blue-900 w-[20%] text-white p-6 m-4 rounded-3xl ' >
        <label className='text-5xl font-extrabold mt-5' >Chains <br/> NFT</label>
        <p className='text-xl mt-10 '>The marketplace where you can mint NFTs without even connecting your wallet</p>
        <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-10 ' >Start Creating 👉</button>
      </div>
      <div className='flex flex-col bg-blue-900 w-[40%] text-white p-6 m-4 rounded-3xl ' >
        <label className='text-xl font-extrabold bg-white text-blue-900 w-fit-h-fit p-3 rounded-xl' >1. Uploading your Image </label>
        <div className='flex flex-col w-full h-fit border-2 border-white mt-5 p-4 rounded-2xl ' >
          <label className='text-xl font-medium mb-2' >Choose your image :</label>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        </div>
        <div className='flex flex-col w-full h-fit border-2 border-white mt-10 p-4 rounded-2xl ' >
          <label className='text-xl font-medium mb-2' >Or even draw using our editors :</label>
          <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-5 ' >Pixel Editor👉</button>
          <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-2 ' >Paint Editor👉</button>

        </div>
        <label className='text-xl font-extrabold bg-white text-blue-900 w-fit-h-fit p-3 mt-10 rounded-xl' >2. Uploading your IPFS </label>
        <div className='flex flex-col w-full h-full border-2 border-white mt-5 p-4 rounded-2xl ' >
          <label className='text-2xl font-medium ' >Enter details about Image : </label>
          <input className='w-full mt-5 h-fit p-2 rounded-xl text-black' placeholder='NFT Name' onChange={(e)=>setFileName(e.target.value)} />
          <input className='w-full mt-5 h-fit p-2 rounded-xl text-black' placeholder='NFT Description' onChange={(e)=>setDesc(e.target.value)} />
          <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-5 ' onClick={uploadipfs} >Upload to IPFS</button>
          <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-5 ' onClick={getipfs} >Get IPFS</button>
        </div>
      </div>
      <div className='flex flex-col bg-blue-900 w-[40%] h-fit text-white p-6 m-4 rounded-3xl ' >
      <label className='text-xl font-extrabold bg-white text-blue-900 w-fit-h-fit p-3 rounded-xl' >3. Mint your NFT </label>
      <div className='flex flex-col w-full h-fit border-2 border-white bg-white mt-5 p-4 rounded-2xl ' >
        <label className='text-2xl text-blue-900 font-extrabold'>Preview NFT</label>
        <img src={nftimage} className=' border-2 p-4 rounded-2xl' />
        <p className='text-xl text-blue-900 font-bold' >Name : {nftname}</p>
        <p className='text-xl text-blue-900 font-bold' >Description : {nftdesc}</p>
      </div>
      <div className='flex flex-col w-full h-fit border-2 border-white mt-10 p-4 rounded-2xl ' >
        <label className='text-xl text-white font-bold'>Connect Wallet</label>
        <p className='text-xl text-white font-bold'>Or Enter Wallet Address</p>
        <input className='w-full p-3 font-medium rounded-2xl mt-2 text-black' placeholder='0x0AD34' onChange={(e)=>setWalletAddress(e.target.value)} />
        <button className='w-full p-3 text-blue-900 bg-white mt-3 rounded-2xl' onClick={mint}>Mint NFT 🎉</button>
      </div>
      <div className='flex flex-col w-full h-fit border-2 border-white mt-10 p-4 rounded-2xl ' >
        <label className='text-2xl text-white font-extrabold'>Gift NFT</label>
        <p className='text-xl text-white font-bold'>Enter recepient address</p>
        <input className='w-full p-3 font-medium rounded-2xl mt-2 text-black' placeholder='0x0AD34' onChange={(e)=>setGift(e.target.value)} />
        <button className='w-full p-3 text-blue-900 bg-white mt-3 rounded-2xl' onClick={giftmint}>Gift NFT 🎉</button>
      </div>
      </div>
    </div>
  );
}

export default App;