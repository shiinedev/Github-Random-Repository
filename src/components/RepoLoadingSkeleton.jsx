import React from 'react'

const RepoLoadingSkeleton = () => {

 
  return (
    <div>
       <div
         className={` bg-gradient-to-r from-gray-500 to-gray-600 w-full p-3 rounded mt-2   animate-pulse `}
          
        >
          <div className={`w-1/2 bg-gradient-to-r from-gray-400 to-gray-500 mb-2`}></div>
          <div className={`w-full h-6 bg-gradient-to-r from-gray-400 to-gray-500 mb-2`}></div>
          <div className={`w-full h-6 bg-gradient-to-r from-gray-400 to-gray-500 mb-2`}></div>
          <div className={`w-full h-6 bg-gradient-to-r from-gray-400 to-gray-500 mb-2`}></div>

          <div
          className={` flex justify-between items-center my-2`}
           
          >
            <div className=" w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400"></div>
            <div className=" w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400"></div>
            <div className=" w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400"></div>
            <div className=" w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400"></div>

          </div>

          <div
          
            className="w-1/2 h-6 bg-gradient-to-r from-gray-300 to-gray-400"
            
          >

          </div>
        </div>
    </div>
  )
}

export default RepoLoadingSkeleton
