'use client';

import { useState } from "react";
import './page.css';

export default function TodoList() {
    const [userInput, setUserInput] = useState(''); 
    const [list, setList] = useState([]); 
  
    // Set a user input value 
    const updateInput = (value: string) => { 
        setUserInput(value); 
    }; 
  
    // Add item if user input is not empty 
    const addItem = (item) => { 
        if (item !== '') { 
            const userInputItem = { 
                // Add a random id which is used to delete 
                id: Math.random(), 
                // Add a user value to list 
                value: item, 
            }; 
  
            // Update list by adding the new item
            setList([...list, userInputItem]); 
  
            // Reset the user input state 
            setUserInput(''); 
        } 
    }; 
  
    // Function to delete item from list using id to delete 
    const deleteItem = (key: string) => { 
        /**
         * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
         */
        const updatedList = list.filter((item) => item.id !== key); 
        setList(updatedList); 
    }; 
  
    const editItem = (index: number) => { 
        /**
         * The prompt() method displays a dialog box that prompts the user for input.
         * The prompt() method returns the input value if the user clicks "OK", otherwise it returns null.
         */
        const editedTodo = prompt('Edit the todo:'); 

        if (editedTodo !== null && editedTodo.trim() !== '') { 
            const updatedTodos = [...list]; 
            updatedTodos[index].value = editedTodo; 
            setList(updatedTodos); 
        } 
    }; 
  
    return ( 
        <div className="todoListContainer"> 
            <div className="title">TODO List</div> 
            <div className="inputContainer"> 
                <input
                    className="inputField"
                    placeholder="New item..."
                    value={userInput} 
                    onChange={(item) => updateInput(item.target.value)} 
                /> 
                <button 
                    className="addButton"
                    onClick={() => addItem(userInput)} 
                > 
                    ADD 
                </button> 
            </div> 
            <div className="listContainer"> 
                {/* Handle if the list is empty */}
                {list.length > 0 ? ( 
                    list.map((item, index) => ( 
                        <div key={index} className="listItem"> 
                            <span className="listItemText">{item.value}</span> 
                            <span> 
                                <button 
                                    className="deleteButton"
                                    onClick={() => deleteItem(item.id)} 
                                > 
                                    Delete 
                                </button> 
                                <button 
                                    className="editButton"
                                    onClick={() => editItem(index)} 
                                > 
                                    Edit 
                                </button> 
                            </span> 
                        </div> 
                    )) 
                ) : ( 
                    <div className="emptyListMessage">No items in the list</div> 
                )} 
            </div> 
        </div> 
    ); 
}
