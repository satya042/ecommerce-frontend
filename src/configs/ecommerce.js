import coffee_asorted from "../assets/products/coffee-asorted.jpg";
import edible_oil from "../assets/products/edible-oil-400x400.jpg";
import red_chillies from "../assets/products/red-chillies-400x400.jpg";
import sanitizer from "../assets/products/sanitizer-400x400.jpg";
import cashew_butter from "../assets/products/cashew-butter-500-400x400.jpg";
import diabetic_cookies from "../assets/products/diabetic-cookies-400x400.jpg";
import eggs from "../assets/products/eggs-400x400.jpg";
import orage_juice_kariz from "../assets/products/orage-juice-kariz-400x400.jpg";
import organic_honey from "../assets/products/organic-honey-400x400.jpg";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa6";

export const productsData = [
  {
    id: "coffee-assorted",
    image: coffee_asorted,
    title: "Assorted Coffee",
    brand: "Organic Farm",
    category: "Groceries",
    price: "£35.00",
    priceNumber: 35,
    rating: 4,
    stock: 20,
    description:
      "Rich and aromatic coffee beans, carefully sourced from organic farms.",
    specifications: ["250g pack", "Arabica blend", "Medium roast"],
  },
  {
    id: "cashew-butter",
    image: cashew_butter,
    title: "Cashew Butter",
    brand: "Nature Spread",
    category: "Groceries",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 15,
    description: "Creamy cashew butter with no added sugar or preservatives.",
    specifications: ["500g jar", "100% cashew", "No palm oil"],
  },
  {
    id: "diabetic-cookies",
    image: diabetic_cookies,
    title: "Diabetic Cookies",
    brand: "Healthy Bakes",
    category: "Groceries",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 30,
    description: "Sugar-free cookies specially crafted for diabetic patients.",
    specifications: ["200g pack", "No refined sugar", "High fiber"],
  },
  {
    id: "farm-eggs",
    image: eggs,
    title: "Farm Fresh Eggs",
    brand: "Country Side",
    category: "Groceries",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 40,
    description: "Organic free-range eggs with rich yolks and great taste.",
    specifications: ["Pack of 12", "Free-range", "High protein"],
  },
  {
    id: "orange-juice",
    image: orage_juice_kariz,
    title: "Fresh Orange Juice",
    brand: "Kariz",
    category: "Juice",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 25,
    description: "Cold-pressed orange juice with no added sugar.",
    specifications: ["1L bottle", "No added sugar", "100% juice"],
  },
  {
    id: "organic-honey",
    image: organic_honey,
    title: "Fresh Organic Honey",
    brand: "Honey Hive",
    category: "Groceries",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 18,
    description: "Raw, unfiltered honey straight from organic bee farms.",
    specifications: ["500g jar", "Unfiltered", "No additives"],
  },
  {
    id: "sanitizer",
    image: sanitizer,
    title: "Hand Sanitizer",
    brand: "Pure Hands",
    category: "Personal Care",
    price: "£15.00",
    priceNumber: 15,
    rating: 3,
    stock: 50,
    description:
      "Kills 99.9% of germs with moisturizing aloe to protect your skin.",
    specifications: ["250ml bottle", "70% alcohol", "With aloe vera"],
  },
  {
    id: "red-chillies",
    image: red_chillies,
    title: "Handpicked Red Chillies",
    brand: "Spice Route",
    category: "Groceries",
    price: "£19.00",
    priceNumber: 19,
    rating: 5,
    stock: 10,
    description: "Sun-dried red chillies with intense flavor and heat.",
    specifications: ["200g pack", "Sun-dried", "High heat"],
  },
  {
    id: "edible-oil",
    image: edible_oil,
    title: "Natural Extracted Edible Oil",
    brand: "Pure Press",
    category: "Groceries",
    price: "£34.00",
    salePrice: "£25.00",
    priceNumber: 25,
    rating: 4,
    stock: 22,
    description: "Cold-pressed edible oil that retains natural nutrients.",
    specifications: ["1L bottle", "Cold-pressed", "No preservatives"],
  },
];

export const bestSellingproducts = productsData.slice(0, 4);

export const features = [
  {
    icon: MdOutlineLocalShipping,
    title: "Free Shipping",
    description: "Above $5 Only",
  },
  {
    icon: RiContactsBookLine,
    title: "Certified Organic",
    description: "100% Guarantee",
  },
  {
    icon: FaRegMoneyBillAlt,
    title: "Huge Savings",
    description: "At Lowest Price",
  },
  {
    icon: FaRecycle,
    title: "Easy Returns",
    description: "No Questions Asked",
  },
];
