import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store";
import { fetchEditProduct } from "../../actions/editProduct";

interface IProps {
  showEdit: boolean;
  setShowEdit: (a: boolean) => void;
  product: {
    _id: string;
    name: string;
    price: number;
    details: string;
    img: string;
  };
}

const ProductEdit: React.FC<IProps> = ({
  showEdit,
  setShowEdit,
  product,
}): JSX.Element => {
  const [editProductName, setEditProductName] = React.useState(product.name);
  const [editProductDes, setEditProductDes] = React.useState(product.details);
  const [editProductPrice, setEditProductPrice] = React.useState(product.price);
  const [file, setFile] = React.useState<any>();

  const state = useSelector((state: IState) => state);
  const dispatch = useDispatch();
  return (
    <>
      {state.auth.auth ? (
        <>
          {showEdit && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEdit(false);
                const fromData = new FormData();
                if (file !== undefined) {
                  fromData.append("productImg", file);
                }
                fromData.append("name", editProductName);
                fromData.append("price", JSON.stringify(editProductPrice));
                fromData.append("des", editProductDes);
                dispatch(fetchEditProduct(fromData, product._id));
              }}
            >
              <input
                type="text"
                defaultValue={product.name}
                onChange={(e) => setEditProductName(e.target.value)}
                placeholder={"enter name of product"}
                required
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
              <textarea
                cols={30}
                rows={10}
                defaultValue={product.details}
                onChange={(e) => setEditProductDes(e.target.value)}
                placeholder={"enter details of product"}
                required
              ></textarea>
              <input
                type="number"
                defaultValue={product.price}
                onChange={(e) => setEditProductPrice(parseInt(e.target.value))}
                placeholder={"enter price of product"}
                required
              />
              <button type="submit">save</button>
            </form>
          )}
        </>
      ) : (
        <>
          <h1>you are not logged in</h1>
        </>
      )}
    </>
  );
};

export default ProductEdit;
