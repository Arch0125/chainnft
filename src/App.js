import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const axios = require('axios');

  const[file,setFile]=useState('');
  const[fileName,setFileName]=useState('');
  const[desc,setDesc]=useState('');

  var nftmeta={
    "name":fileName,
    "description":desc,
  };

  const header={
    "x-api-key":'1ca942ab-2b6d-401e-881e-5aa536c9487b',
  }

  const uploadipfs=async()=>{
    await axios.post('https://api.mintnft.today/v1/upload/single',{
      "metadata":nftmeta,
      "image":file,
      "asset":file
    },{
      headers: {
        'x-api-key': `1ca942ab-2b6d-401e-881e-5aa536c9487b` 
      }
    }).then(res=>{
      console.log(res);
    }
    ).catch(err=>{
      console.log(err);
    }
    );
  }

  return (
    <div className='flex flex-row w-screen h-screen bg-white' >
      <div className=' flex flex-col bg-blue-900 w-[20%] text-white p-6 m-4 rounded-3xl ' >
        <label className='text-5xl font-extrabold mt-5' >Chains <br/> NFT</label>
        <p className='text-xl mt-10 '>The marketplace where you can mint NFTs without even connecting your wallet</p>
        <button className='bg-white text-blue-900 p-3 text-xl rounded-2xl mt-10 ' >Start Creating 👉</button>
      </div>
      <div className='flex flex-col bg-blue-900 w-[40%] text-white p-6 m-4 rounded-3xl ' >
        <label className='text-xl font-extrabold bg-white text-blue-900 w-fit-h-fit p-3 rounded-xl' >1. Uploading your Image </label>
        <div className='flex flex-col w-full h-fit border-2 border-white mt-5 p-4 rounded-2xl ' >
          <label className='text-xl font-medium mb-2' >Choose your image :</label>
        <input type="file" onChange={(e)=>setFile(e.target.value)} />
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
        </div>
      </div>
      <div className='flex flex-col bg-blue-900 w-[40%] text-white p-6 m-4 rounded-3xl ' >
      <label className='text-xl font-extrabold bg-white text-blue-900 w-fit-h-fit p-3 rounded-xl' >3. Mint your NFT </label>
      <div className='flex flex-col w-full h-fit border-2 border-white bg-white mt-5 p-4 rounded-2xl ' >
        <label className='text-2xl text-blue-900 font-extrabold'>Preview NFT</label>
        <p className='text-xl text-blue-900 font-bold' >Name</p>
        <p className='text-xl text-blue-900 font-bold' >Description</p>
      </div>
      <div className='flex flex-col w-full h-fit border-2 border-white mt-10 p-4 rounded-2xl ' >
        <label className='text-xl text-white font-bold'>Connect Wallet</label>
        <p className='text-xl text-white font-bold'>Or Enter Wallet Address</p>
        <input className='w-full p-3 font-medium rounded-2xl mt-2 text-black' placeholder='0x0AD34' />
        <button className='w-full p-3 text-blue-900 bg-white mt-3 rounded-2xl'>Mint NFT 🎉</button>
      </div>
      <div className='flex flex-col w-full h-fit border-2 border-white mt-10 p-4 rounded-2xl ' >
        <label className='text-2xl text-white font-extrabold'>Gift NFT</label>
        <p className='text-xl text-white font-bold'>Enter recepient address</p>
        <input className='w-full p-3 font-medium rounded-2xl mt-2 text-black' placeholder='0x0AD34' />
        <button className='w-full p-3 text-blue-900 bg-white mt-3 rounded-2xl'>Gift NFT 🎉</button>
      </div>
      </div>
    </div>
  );
}

export default App;