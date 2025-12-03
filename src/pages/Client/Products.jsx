import React from 'react'
import styles from "./styles/Products.module.css"
import {productsData} from "../../configs/ecommerce";
import Slider from '@mui/material/Slider';
import { HiOutlineChevronRight } from "react-icons/hi";
import ProductCard from '../../components/ProductCard';


function valuetext(value) {
  return `${value}°C`;
}

const Products = () => {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={styles.products_container}>
      <div className={styles.product_left}>
        <div className={styles.search_bar}>
        <input type="search" placeholder="Search..." />
        <button type="submit">
        <HiOutlineChevronRight />
          </button>
        </div>
        <div>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </div>
      </div>
    <div className={styles.products_main}> 
    <div>
    <div className={styles.products__titl}>Everything</div>
        <div className={styles.products_grid}>
          <div className={styles.products_item}>
            {productsData.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
    </div>
  </div>
  </div>
  )
}

export default Products