import React from "react";
import { useState } from "react";

function App() {
 
const [message,setMessage] = useState({text:"",id:""});
const [list,setList] = useState([]);
const [editingItem,setEditingItem] = useState({
  id:"",
  isEditing:false
});
const handleMessage = (e)=>{
  
  setMessage({...message,text:e.target.value});
}
const handleAdd = (e)=>{
  e.preventDefault();
  let newToDo = {
    text:message.text,
    id:new Date().getTime().toString()
    };
  setList([
    ...list,
   newToDo
  ]);
  
    setMessage({text:"",id:""});
  
}
const handlesDelete = (id)=>{
  
   const newToDos = list.filter((eachItem)=>{
     return eachItem.id!==id;
   });
   setList(newToDos);
}
const changeEditState = (e,id) => {
  e.preventDefault();
   setEditingItem({
    ...editingItem,
    id:id, 
    isEditing:true,
   });
   let editableItem = list.find((eachItem)=>
    eachItem.id === id
   );
   setMessage({
    ...message,
    text:editableItem.text,
    id:editableItem.id
   });
}
const handleEdit =(e)=>{
e.preventDefault();
let newToDos = list.map((eachItem)=>{
  if(eachItem.id === editingItem.id){
    return {
      text:message.text,
      id:editingItem.id
    }
  }
  else{
    return eachItem;
  }
});
setList(newToDos);
setMessage({
  text:"",
  id:""
});
setEditingItem({
  id:"",
  isEditing:false
})
}
       return(
        <div>
          <form>
            <input type="text" name="message" id="message" value={message.text} placeholder="Enter some text" onChange={handleMessage}/>
            {editingItem.isEditing ? (<button onClick={handleEdit}>Edit</button>) :  (<button onClick={handleAdd}>Add</button>)}
            
           
            <hr/>
            {
              list.length===0 && <h4>There is no item in the list</h4>
            }
            
               <ul>
              {list.map((eachItem) =>{
                const {text,id} = eachItem
                return(
                 
                    <li key={id}>
                  <span>{text}</span>
                  <button onClick={(e)=>changeEditState(e,id)}>Edit</button>
                  <button onClick={()=>handlesDelete(id)}>Delete</button>
                  </li>
                 
                );
              })}
              </ul>

              
            
          </form>
        </div>
       );
      
  
}


export default App;
