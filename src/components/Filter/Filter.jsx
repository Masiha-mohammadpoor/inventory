import styles from "./filter.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";


const Filter = ({categories , onSearch , search , sort , onSort , onFilterByCategory , categoryValue}) => {

    const [categoryOptions , setCategoryOption] = useState([{value : "All" , label : "All"}]);

    useEffect(() => {
        setCategoryOption([]);
        let options = [];
        categories.map(c => {
            
            options = [...options , {value : c.title , label : c.title}]
        })
        setCategoryOption([{value : "All" , label : "All"} , ...options]);
    } , [categories])


    const sortOption = [
        { value: 'oldest', label: 'oldest' },
        { value: 'newest', label: 'newest' }
    ];


    return ( 
        <section className={styles.filter}>
            <input 
            type="text" 
            placeholder="search..." 
            value={search}
            onChange={onSearch} 
            className={styles.searchField}/>

            <div className={styles.filterContainer}>
            <div className={styles.sort}>
                <p style={{color:"#fff"}}>sort :</p>
                <Select 
                value={sort}
                onChange={onSort}
                options={sortOption}
                className={styles.select}
                />
                </div>
                <div className={styles.sort}>
                <p style={{color:"#fff"}}>category :</p>
                <Select 
                value={categoryValue}
                onChange={onFilterByCategory}
                options={categoryOptions}
                className={styles.select}
                />
                </div>
            </div>
        </section>
    );
}
 
export default Filter;