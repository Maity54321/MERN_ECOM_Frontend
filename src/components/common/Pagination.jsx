import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
  const[isActive, setIsActive] = useState(false);
  // console.log(pageNumbers);
  const nextPage = ()=>{
    if(currentPage !== totalPages){
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = ()=>{
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const setPage = (num)=> {
    setCurrentPage(num);

  }

 
  return (
    <>
      
    <div className="flex flex-row justify-center items-center mt-5">

    <div className="flex flex-row text-center border border-solid border-gray-400 cursor-pointer  rounded-tl-lg rounded-bl-lg">
    <a href="#products" onClick={prevPage} className='no-underline text-black font-bold hover:text-white hover:bg-purple-800 p-3 text-lg rounded-tl-lg rounded-bl-lg' >Previous</a>
     </div>

{pageNumbers.map((pgNum, index) =>(
    <div key={pgNum} className="flex flex-row text-center border border-solid border-gray-400 cursor-pointer">
    <a href="#products" onClick={()=>setPage(pgNum)} className={`no-underline text-black font-bold hover:text-white hover:bg-purple-800 p-3 text-lg`} >{pgNum}</a>
     </div>
))}
<div className="flex flex-row text-center border border-solid border-gray-400 cursor-pointer  rounded-tr-lg rounded-br-lg">
    <a href="#products" className=' no-underline text-black font-bold hover:text-white hover:bg-purple-800 p-3 text-lg ps-8 pe-8 rounded-tr-lg rounded-br-lg' onClick={nextPage} >Next</a>
     </div>
</div>
    
    </>
  );
};

export default Pagination;
