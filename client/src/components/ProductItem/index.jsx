import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Link to={`/products/${_id}`}>
          <img alt={name} src={`/images/${image}`} className="w-[100%]" />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {/* {(quantity===99999)?'max':'# not displayed'}
        <p className="text-sm">{quantity} {pluralize("item", quantity)} in stock</p> */}
        <span className="text-2xl font-bold">${price}</span>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
