import React , {useState} from "react";





const Modal = (props) => {

    const [formValue, setformValue] = useState({name: props.name});


    const handleUpdateData =  async (e) => {
        console.log(formValue.name,props.name);
        if (formValue.name!==props.name){

            e.preventDefault();
            props.func(props.test,formValue.name);
            props.close();
        }
    }

    const onTodoChange =(e) =>  {
        setformValue({
            name: e.target.value
        });
    }

    return(
        <div className="modal">
            <div className="header"> Modal Title </div>
            <div className="content">
                <form onSubmit={handleUpdateData}>
                    <input required type="text" className="w-100" placeholder="name" name="name" onChange={onTodoChange} value={formValue.name}/>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;