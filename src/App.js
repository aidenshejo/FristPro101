import { useState , useEffect} from "react"



  export default function App() {
    const [list , setList] = useState('');
    const [name , setName] = useState(
      () => {
        const savedTodos = localStorage.getItem('name');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });    

    useEffect(() => {
      localStorage.setItem('name', JSON.stringify(name));
    }, [name]);

    const handleSub = (e)=>{
      e.preventDefault();
      setName([
        ...name , 
        {
          name:list,
          id: Date.now()

        }
      ])
      setList('');
     
    }
    const handleChange = (e)=>{
      setList(e.target.value)
      
    
    }
    const handled =(id)=>{
     setName(name.filter(e => e.id !== id))
    }
 
  return (
    <>
     <main>
        <h1>My list of todays work</h1>
        <div id="all">
           <form onSubmit={handleSub} id="myform">
              <div id="allinput">
                <input type="text"
                 placeholder="What you think About"
                 value={list}
                 onChange={handleChange}
                 />
                <button
                 type="submit"
                 disabled= {list.length === 0}
                 >ADD</button>
              </div>
            </form>
            <ul className="mylist">
              {name.map((e)=>(
                <li key={e.id}>
                  {e.name}
                  <span><button className="myDBTN" onClick={()=> handled(e.id)}>Delete</button></span>
                </li>
    
              ))}
            </ul>
        </div>
     </main>
    </>
  )
}





