import styles from "./category.module.css";
import {useState} from "react";
import {toast} from "react-toastify";



const Category = ({addCategory}) => {

    const [isShow , setIsShow] = useState(false);
    const [categoryValue , setCategoryValue] = useState({title : "" , description : ""});


    const changeHandler = ({target : {value , name}}) => {
        setCategoryValue({...categoryValue , [name] : value})
    }

    const addClickHandler = (e) => {
        e.preventDefault();
        if(categoryValue.title && categoryValue.description) {
            addCategory(categoryValue)
            setCategoryValue({title : "" , description : ""})
        }else {
            toast.error("Please enter all values!!!")
        }
    }

    const cancelHandler = () => {
        setIsShow(false);
        setCategoryValue({title : "" , description : ""})
    }

    return (
        <>
            <button onClick={() => setIsShow(true)} style={{display : isShow ? "none" : "inline-block"}} className={styles.addCategory}>Add Category?</button>
            <section className={styles.category} style={{display : isShow ? "flex" : "none"}}>
            <form className={styles.form}>
                <label htmlFor="title">Title:</label>
                <input type="text" value={categoryValue.title} name="title" placeholder="title..." onChange={changeHandler} id="title"/>
                <label htmlFor="description">Description:</label>
                <textarea type="text" value={categoryValue.description} name="description" placeholder="description..." onChange={changeHandler}  id="description"></textarea>
                <div className={styles.buttons}>
                    <button type="button" onClick={cancelHandler}>Cancel</button>
                    <button type="Submit" onClick={addClickHandler}>Add</button>
                </div>
            </form>
        </section>
        </>
    );
}
 
export default Category;