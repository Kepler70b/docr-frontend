"use client";
import { getAnswer, getFiles } from "@/utils/api";
import Dropdown from "./Dropdown";
import FileUpload from "./FileUpload";
import InputBar from "./InputBar";
import { Title } from "./Title";
import Link from "next/link";
import { useState ,useEffect} from "react";
import AnsweBox from "./AnswerBox";



const QACOmp = () => {

  const [dropdownValue, setDropdownValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [options,setOptions]=useState([]);
  const [answertext,setAnswertext]=useState("")
  const [isFetching,setFetch]=useState(false)
  // Handlers to update state from child components
  const handleDropdownChange = (value) => setDropdownValue(value);
  const handleInputChange = (value) => setInputValue(value);
  const handleFileChange = (newfile) => setFile(newfile);
  const handleQuestionQuery=async()=>{
    try{
    setFetch(true)
    const response=await getAnswer(dropdownValue,inputValue)
    console.log(response)
    setFetch(false)
    setAnswertext(response.data.answer)
    }
    catch(e){
        console.log(e)
    }
  }
  const handlenewoptions=(newfileID)=>{

    setFile(null)
    setOptions((prev)=>{
        prev.push(newfileID)
        return prev
    })
  }
  const fetchFiles = async () => {
    try{
      const response = await getFiles();
      console.log(response);  // Replace with your own logging mechanism
      const files=response.data.files.map(filename=>filename.split("/").at(-1))
      console.log(files);
      
      setOptions(files);
    }
    catch{

    }
  };
  useEffect(() => {
    
    fetchFiles();
  }, []);
  return (
    <>
     {/* <div className="flex flex-col items-center justify-center p-4 w-100 p-8  shadow-lg rounded-md ">
     <h1 className="text-3xl font-bold mb-6">DOCR</h1>
    
    <FileUpload/>
    <div className="flex">
    <Dropdown />
          <input 
            type="text" 
            className="border-t border-b rounded-l-none p-2 w-48 bg-white shadow" 
            placeholder="Search..." 
          />
          <button className="bg-blue-500 text-white rounded-r p-2 hover:bg-blue-600 transition">
            Search
          </button>
          </div>
          <div>
          <label className="block mb-2">Question:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="5"
            placeholder="Answer"
          ></textarea>
        </div>

    </div> */}
    <div className="container px-8 mx-auto  ">

        <div className="max-w-3xl mx-auto">
          <Title>DOCR</Title>

          <pre className="px-4 py-3 mt-8 font-mono text-left bg-transparent border rounded border-zinc-600 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
            <div className="flex items-start px-1 text-sm relative">
              <div aria-hidden="true" className="pr-4 font-mono border-r select-none border-zinc-300/5 text-zinc-700">
                
              </div>

              <FileUpload currfile={file} onFileChange={handleFileChange} handlenewoptions={handlenewoptions}/>
             
            </div>
          </pre>

          <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 sm:flex-row">
            <div className="w-2/6">
                <Dropdown value={dropdownValue} options={options} onChange={handleDropdownChange}/>
            </div>
            <div className="w-4/6">
                <InputBar value={inputValue} onChange={handleInputChange} onSearch={handleQuestionQuery} isFetching={isFetching}/>
            </div>
           
          </div>
          
          <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 sm:flex-row">
            {answertext!="" && <AnsweBox text={answertext}/>}
          </div>

          <div className="mt-8">
            <ul className="space-y-2 text-xs text-zinc-500">
            <li>
                <p>
                  <span className="font-semibold text-zinc-400">Context:</span> Select on which context you want to ask questions on if one already exists.
                  If no context is present upload a pdf file to create context and query it.
                </p>
              </li>
             
              <p>
                Clicking search will generate an answer based on the context selected and type of question asked.
                Asking out of context question will result in model returning no answer.
              </p>
            </ul>
          </div>
        </div>

    </div>
    </>
 );
};

export default QACOmp;
