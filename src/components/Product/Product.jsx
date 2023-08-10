import styles from "./product.module.css";
import { useState } from "react";
import {toast} from "react-toastify";



const Product = ({addProduct , categories}) => {

    const [productValue , setProductValue] = useState({title : "" , quantity : "" , category :""})


    const changeHandler = ({target : {name , value}}) => {
        setProductValue({...productValue , [name] : value})
    }

    const addClickHandler = (e) => {
        e.preventDefault();
        if(productValue.title && productValue.quantity && productValue.category) {
            addProduct(productValue)
            setProductValue({title : "" , quantity : "" , category :""});
        }else {
            toast.error("Please enter all values!!!")
        }
    }

    const cancelHandler = () => {
        setProductValue({title : "" , quantity : "" , category :""})
    }


    return (
        <section className={styles.product}>
        <form className={styles.form}>
            <label htmlFor="title">Title:</label>
            <input type="text" placeholder="title..." value={productValue.title} name="title" onChange={changeHandler} id="title" />
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" placeholder="quantity..." value={productValue.quantity} name="quantity" onChange={changeHandler} id="quantity" min="0"/>
            <label htmlFor="category">category</label>
            <select id="category" value={productValue.category} name="category" onChange={changeHandler}>
                <option value="">select category</option>
                {categories.map(c => <option value={c.title} key={c.id}>{c.title}</option>)}
            </select>
            <div className={styles.buttons}>
                <button type="button" onClick={cancelHandler}>Cancel</button>
                <button type="Submit" onClick={addClickHandler}>Add</button>
            </div>
        </form>
        </section>
    );
}

export default Product;