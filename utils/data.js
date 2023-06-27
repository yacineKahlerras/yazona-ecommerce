import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Adidas Shirt",
      slug: "adidas-shirt",
      category: "Shirts",
      image: "/images/products/adidas-shirt.jpg",
      price: 70,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description:
        "Sporty sophistication meets performance in this iconic Adidas shirt.",
      isFeatured: true,
    },
    {
      name: "Emporio Pants",
      slug: "emporio-pants",
      category: "Shirts",
      image: "/images/products/emporio-pants.jpg",
      price: 80,
      brand: "Emporio",
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: "Unparalleled style and comfort define these Emporio pants.",
      isFeatured: true,
    },
    {
      name: "Guess Jacket",
      slug: "guess-jacket",
      category: "Jacket",
      image: "/images/products/guess-jacket.jpg",
      price: 90,
      brand: "Guess",
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description:
        "Unleash your fashion-forward attitude with this trend-setting Guess jacket.",
    },
    {
      name: "Hugo Boss Shirt",
      slug: "hugo-shirt",
      category: "Shirts",
      image: "/images/products/hugo-shirt.jpg",
      price: 90,
      brand: "Hugo Boss",
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description:
        "Elevate your wardrobe with timeless elegance in this Hugo Boss shirt.",
    },
    {
      name: "Lacoste Shirt",
      slug: "lacoste-shirt",
      category: "Shirts",
      image: "/images/products/lacoste-shirt.jpg",
      price: 95,
      brand: "Lacoste",
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description:
        "Effortless chic meets athletic heritage in this iconic Lacoste shirt.",
    },
    {
      name: "Nike Shirt",
      slug: "nike-shirt",
      category: "Shirts",
      image: "/images/products/nike-shirt.jpg",
      price: 75,
      brand: "Nike",
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description:
        "Unleash your inner athlete with the iconic style of this Nike shirt.",
    },
  ],
};

export default data;
