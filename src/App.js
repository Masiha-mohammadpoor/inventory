import Navigation from "./components/Navigation/Navigation";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import ProductList from "./components/ProductList/ProductList";
import Filter from "./components/Filter/Filter";
import {useState , useEffect} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash";


const App = () => {

  const [categories , setCategories] = useState([]);
  const [products , setProducts] = useState([]);
  const [filteredProduct , setFilterProduct] = useState([]);
  const [sort , setSort] = useState({ value: 'oldest', label: 'oldest' });
  const [categoryValue , setCategoryValue] = useState({value : "All" , label : "All"});
  const [search , setSearch] = useState("");


  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) ||  [];
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCategories);
    setProducts(savedProducts);
  } , []);

  useEffect(() => {
    if(products.length){
      localStorage.setItem("products" , JSON.stringify(products));
    }
  } , [products]);


  useEffect(() => {
    if(categories.length){
      localStorage.setItem("categories" , JSON.stringify(categories));
    }
  } , [categories]);

  
  useEffect(() => {
    let result = products;
    result = searchOnProduct(result);
    result = sortOnProduct(result);
    result = filterByCategoryOnProduct(result);
    setFilterProduct(result)
  } , [products , search , sort , categoryValue]);


  const addCategory = value => {
    const newCategory = {
      ...value,
      id:Date.now(),
      createdAt : new Date()
    }
    setCategories([...categories , newCategory]);
  }

  const addProduct = value => {
    const newProduct = {
      ...value,
      id:Date.now(),
      createdAt : new Date()
    }
    setProducts([...products , newProduct]);
  }

  const deleteHandler = (id) => {
    const filterProduct = products.filter(p => p.id !== id);
    setProducts(filterProduct)
  }

  const searchHandler = (e) => {
    setSearch(e.target.value.trim().toLowerCase());
  }

  const sortHandler = (e) => {
    setSort(e);
  }

  const searchOnProduct = (array) => {
    return array.filter(item => item.title.toLowerCase().includes(search))
  }

  const sortOnProduct = (array) => {
    if(sort.value === "oldest") {
      return _.orderBy(array , ["createdAt"] , ["asc"]);
    }else {
      return _.orderBy(array , ["createdAt"] , ["desc"]);
    }
  }

  const filterByCategoryHandler = (e) => {
    setCategoryValue(e)
  }

  const filterByCategoryOnProduct = (array) => {
    if(categoryValue.value === "All") {
      return array
    }else {
      const filteredProducts = array.filter(p => p.category === categoryValue.value);
      return filteredProducts;
    }
  }



  return (
    <main className="App">
      <Navigation/>
      <Category addCategory={addCategory}/>
      <Product addProduct={addProduct} categories={categories}/>
      {products.length >= 1 ? <Filter 
      categories={categories} 
      onSearch={searchHandler} 
      search={search} 
      sort={sort} 
      onSort={sortHandler}
      onFilterByCategory={filterByCategoryHandler}
      categoryValue={categoryValue}
      /> : ""}
      <ProductList products={filteredProduct} deleteHandler={deleteHandler}/>
      <ToastContainer/>
    </main>
  );
}

export default App;
