import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import RepoLoadingSkeleton from "./RepoLoadingSkeleton";
import useTheme from "../Hooks/useTheme";

function GithubRandomRepository() {
 const [repoLoading,setRepoLoading] = useState(false);
 const [repoError,setRepoError] = useState(null);
  const [repo, setRepo] = useState(null);

  const [theme,handleTheme] = useTheme("light");


  const {data:languages,isLoading,error} = useFetch(`https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json`)


  const handleRandomRepo = async (event) => {
    const language = event.target.value;

    setRepoLoading(true);
    setRepo(null);
    setRepoError(null);


    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
      );

      if(!response.ok){
        throw new Error(`HTTP error! status:${response.status}`);
      }

      const data = await response.json();
      console.log(data.items);
      const index = Math.floor(Math.random() * data.items.length);
      console.log(data.items[index]);
      setRepo(data.items[index]);
      setRepoLoading(false);
      
    } catch (err) {
      setRepoError(err);
      setRepoLoading(false);
      console.error(err);
    }
  };
 

  const reset = () => {
    setRepo(null);
    setRepoLoading(false);
    setRepoError(null);
  };



  return (
   <div className={`${theme === "light"? "bg-gray-50 text-black" : "bg-gray-900 text-white"} h-screen w-screen flex mx-auto items-start justify-center`}>

  
    <div
    className={`${theme === "light"?"bg-gray-300 text-black" : "bg-gray-800 text-white"}flex justify-center items-center flex-col w-lg mx-2 mt-10 p-3 rounded `}
  
    >

      <div
      className="flex justify-center items-center gap-2"
       
      >
        <a href="https://github.com/shiinedev/Github-Random-Repository" target="_blank"><i className="fa-brands fa-github text-xl"  ></i></a> 
        <h1 className="lg:text-xl text-base font-bold">Github Random Repository</h1>
  
        <i
        onClick={handleTheme}
         className={`fa-regular ${theme === "light"? "fa-moon bg-gray-50 text-black":"fa-sun bg-gray-900 text-white"} text-xl  rounded-full  p-2 text-center`}></i>
        
      </div>
      {isLoading && <p className={` ${theme === "light"? " text-black":" text-white"} text-2xl text-center font-bold`}>loading.....</p>}
      {error && <p>{error}</p>}
      <select
        onChange={handleRandomRepo}
        
        className={` ${theme === "light"?"bg-gray-50 text-black" : "bg-gray-700 text-white"} w-full p-3 my-2 rounded `}
      >
        {languages.map((lang,index) => (
          <option key={index} value={lang.value}>{lang.title}</option>
        ))}
      </select>

      {repoLoading &&<RepoLoadingSkeleton />
        }
      {repoError && (
        <div  className={`${theme === "light"?"bg-gray-50 text-black" : "bg-gray-950 text-white"} text-xl font-bold p-2 rounded mt-2 text-center`}>
          <p>Error for Fetching data...</p>
          <button
          className="bg-red-500 text-white py-1 px-2 mt-2 rounded border-none"
            onClick={reset}
          >
            Click to try
          </button>
        </div>
      )}
      {repo && (
        <div
         className={` ${theme === "light"?"bg-gray-50 text-black" : "bg-gray-950 text-white"} w-full text-xl  p-3 rounded mt-2 `}
          
        >
          <p className="font-bold text-xl">{repo.name}</p>
          <p className={`${theme === "light"?" text-gray-700" : " text-gray-400"} text-xl `}>{repo.description || "No description.."}</p>

          <div
          className={` flex justify-between items-center my-2`}
           
          >
            <span className="text-base font-medium">{repo.language}</span>

            <span
            className="text-base flex items-center gap-1"
              
            >
              <i className="fa-solid fa-star text-base" ></i>
              {repo.stargazers_count.toLocaleString("en-US")}
            </span>

            <span
            className="text-base flex items-center gap-1"
              
            >
              <i className="fa-solid fa-code-fork text-base"></i>
              {repo.forks.toLocaleString("en-US")}
            </span>

            <span
            className="text-base flex items-center gap-1"
              
            >
              <a
                href={repo.html_url}
                target="_blank"
                className=" text-base"
                
              >
                <i className="fa-brands fa-github text-xl" ></i>
              </a>
            </span>
           
          </div>

          <button
            onClick={reset}
            className={`${theme === "light"?"bg-gray-950 text-white" : "bg-gray-800 text-white"}  text-center py-1 px-2 border-none rounded`}
            
          >
            Refresh
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default GithubRandomRepository;
