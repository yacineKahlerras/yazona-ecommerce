import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };

  return (
    <Layout title="Home Page">
      <div
        className={`mx-auto relative min-h-[20rem] rounded-lg overflow-hidden isolate grid place-items-center`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black z-0 opacity-50"></div>
        <img
          src="/images/banner.jpg"
          className="absolute object-cover object-center w-full h-full -z-10"
        />
        <h1 className="max-w-sm md:max-w-3xl text-white font-semibold text-3xl md:text-5xl lg:text-6xl z-10 text-center px-5 md:px-0">
          level up your style with our summer collections
        </h1>
      </div>
      <h2 className="h2 text-lg md:text-2xl my-4 text-my-blue font-semibold">
        Latest Products
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();

  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
