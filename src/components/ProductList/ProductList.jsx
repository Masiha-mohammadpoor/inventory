import styles from "./productList.module.css";



const ProductList = ({products , deleteHandler}) => {

    return ( 
        <section className={styles.productList}>

            {products.map(p => {

                const date = new Date(p.createdAt).toLocaleDateString();
                const index = products.findIndex(item => item.id === p.id);

                return <article className={styles.product}>
                    <div className={styles.title}>
                        <span className={styles.index}>{index + 1}</span>
                        <span>{p.title}</span>
                    </div>
                    <div className={styles.categoryContain}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.quantity}>{p.quantity}</span>
                        <span className={styles.category}>{p.category}</span>
                        <button className={styles.deleteBtn} onClick={() => deleteHandler(p.id)}>delete</button>
                    </div>
                </article>
            })}
        </section>
    );
}
 
export default ProductList;