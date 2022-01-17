import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddToCart } from "../../actions/addToCart";
import { fetchAddProduct } from "../../actions/addProduct";
import { fetchDeleteProduct } from "../../actions/deleteProduct";
import { IState } from "../../store";
import { GET_PRODUCT } from "../../reducers/typesOfReducers";
import ProductEdit from "../layouts/ProductEdit";

const AdminDashboard: React.FC = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [productDes, setProductDes] = React.useState("");
  const [productPrice, setProductPrice] = React.useState(0);
  const [EditableProduct, setEditableProduct] = React.useState<{
    _id: string;
    name: string;
    price: number;
    details: string;
    img: string;
  }>({ _id: "", name: "", details: "", price: 0, img: "" });

  const [file, setFile] = React.useState<any>();
  const [showEdit, setShowEdit] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/products", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie.split("=")[1],
          },
        });
        const data: {
          products: {
            _id: string;
            name: string;
            price: number;
            details: string;
            img: string;
          }[];
        } = await res.json();
        const newProduct: {
          id: string;
          name: string;
          price: number;
          details: string;
          img: string;
        }[] = [];
        data.products.map((product) => {
          newProduct.push({
            id: product._id,
            name: product.name,
            price: product.price,
            img: product.img,
            details: product.details,
          });
        });
        (() => {
          dispatch({
            type: GET_PRODUCT,
            payload: newProduct,
          });
        })();
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Hello from admin dashboard</h1>
      <h2>you are admin. you should have all controls of this website </h2>
      <button onClick={() => setShowAddProduct(true)}>add product</button>
      {showAddProduct && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fromData = new FormData();
              setLoading(true);
              fromData.append("productImg", file);
              fromData.append("name", productName);
              fromData.append("price", JSON.stringify(productPrice));
              fromData.append("des", productDes);
              dispatch(fetchAddProduct(fromData));
              setLoading(false);
              setShowAddProduct(false);
              console.log(state);
            }}
          >
            <input
              type="text"
              placeholder={"enter name of product"}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => {
                //@ts-ignore
                setFile(e.target.files[0]);
              }}
              placeholder={"choose product image"}
              name="productImg"
            />
            <input
              type="number"
              onChange={(e) => setProductPrice(parseInt(e.target.value))}
              placeholder={"enter your price"}
            />
            <textarea
              cols={30}
              rows={10}
              placeholder={"enter details of product"}
              onChange={(e) => setProductDes(e.target.value)}
            ></textarea>
            <button type="submit" disabled={loading}>
              create product
            </button>
          </form>
        </>
      )}
      {loading && <h1>Loading</h1>}
      {state.product.length > 0 &&
        state.product.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <img
              src={`http://localhost:5000/${product.img}`}
              alt={product.name}
              width="200px"
              height="200px"
            />
            <h3>Price: {product.price}</h3>
            <p>{product.details}</p>
            <button
              onClick={() => {
                setShowEdit(true);
                setEditableProduct({
                  _id: product.id,
                  name: product.name,
                  price: product.price,
                  details: product.details,
                  img: product.img,
                });
              }}
            >
              edit product
            </button>
            <button
              onClick={() => {
                dispatch(fetchDeleteProduct(product.id));
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                dispatch(fetchAddToCart(product.id));
              }}
            >
              add to cart
            </button>
          </div>
        ))}
      <ProductEdit
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        product={EditableProduct}
      />
    </>
  );
};

export default AdminDashboard;
