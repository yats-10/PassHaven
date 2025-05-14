import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
      
      <div className='logo font-bold text-white text-2xl '>
      <span className='text-green-700'>&lt;</span><span></span>
        Pass<span className='text-green-500'>Haven/&gt;</span>
      
      </div>
      <div className='flex justify-center items-center'>
      Created with <img className='px-2' src="icons/heart.png" alt="" /> by Yatharth
      </div>
    </div>
  )
}

export default Footer