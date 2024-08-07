import React, { useContext, useEffect, useState } from "react";
import CategoryListInterface from "../../dto/admin/category-list.interface";
import ProductCreateInterface from "../../dto/admin/product-create.interface";
import http, { apis } from "../../infrastructures/http-service";
import DashboardLayout from "../../layouts/dashboard-layout";
import { AuthContext } from "../../store/auth-context";
import { Link, useNavigate } from "react-router-dom";

const CreateProductPageContent: React.FC = () => {
  const onlyNumberRegex = /^[0-9\b]+$/;

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const [categories, setCategories] = useState([] as CategoryListInterface[]);
  const [product, setProduct] = useState<ProductCreateInterface>({
    title: "",
    categoryID: 0,
    isPublished: true,
    qty: 0,
    realPrice: 0,
    salesPrice: 0,
  });

  useEffect(() => {
    http<CategoryListInterface[]>({
      method: "GET",
      url: apis["category_public"],
    })
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCreateProduct = (ev: any) => {
    ev.preventDefault();

    if (!authCtx.authData.isAuth) return;

    http({
      method: "POST",
      url: apis["product_admin"],
      data: product,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.authData.token}`,
      },
    })
      .then((resp) => {
        alert("Product Created Successfully!");
        navigate("/dashboard/products");
      })
      .catch((err) => {
        alert("An error occured! Please check console.");
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="breadcrumbs text-sm alert mb-2">
          <ul>
            <li>
              <a>Admin Panel</a>
            </li>
            <li>
              <Link to="/dashboard/products">Products</Link>
            </li>
            <li>Create New</li>
          </ul>
        </div>
        <form onSubmit={onCreateProduct}>
          <div>
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Please enter title!"
              name="title"
              className="input input-bordered w-full max-w-xs"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
            />
          </div>
          <div>
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue={0}
              onChange={(e) => {
                setProduct({
                  ...product,
                  categoryID: parseInt(e.target.value),
                });
              }}
            >
              <option disabled value={0}>
                None
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="label">
              <span className="label-text">Real Price</span>
            </div>
            <input
              type="text"
              placeholder="Please enter real price!"
              name="realPrice"
              className="input input-bordered w-full max-w-xs"
              value={product.realPrice}
              onChange={(e) => {
                if (e.target.value === "")
                  setProduct({ ...product, realPrice: 0 });
                if (onlyNumberRegex.test(e.target.value))
                  setProduct({
                    ...product,
                    realPrice: parseInt(e.target.value),
                  });
              }}
            />
          </div>
          {/* Sales Price */}
          <div>
            <div className="label">
              <span className="label-text">Sales Price</span>
            </div>
            <input
              type="text"
              placeholder="Please enter sales price!"
              name="salesPrice"
              className="input input-bordered w-full max-w-xs"
              value={product.salesPrice}
              onChange={(e) => {
                if (e.target.value === "")
                  setProduct({ ...product, salesPrice: 0 });
                if (onlyNumberRegex.test(e.target.value))
                  setProduct({
                    ...product,
                    salesPrice: parseInt(e.target.value),
                  });
              }}
            />
          </div>
          {/* QTY */}
          <div>
            <div className="label">
              <span className="label-text">Stock Qty</span>
            </div>
            <input
              type="text"
              placeholder="Please enter in stock qty!"
              name="qty"
              className="input input-bordered w-full max-w-xs"
              value={product.qty}
              onChange={(e) => {
                if (e.target.value === "") setProduct({ ...product, qty: 0 });
                if (onlyNumberRegex.test(e.target.value))
                  setProduct({ ...product, qty: parseInt(e.target.value) });
              }}
            />
          </div>
          {/* Is Published */}
          <div className="form-control">
            <div className="p-4">
              <input
                type="checkbox"
                checked={product.isPublished}
                value={product.isPublished ? 1 : 0}
                onChange={(ev) => {
                  setProduct({ ...product, isPublished: ev.target.checked });
                }}
                className="checkbox checkbox-primary"
              />
              <span className="label-text ps-2">
                Whould you like to publish product after create?
              </span>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <button className="btn btn-primary" type="submit">
              Save Product
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => navigate("/dashboard/products")}
            >
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
const CreateProductPage: React.FC = () => {
  return (
    <DashboardLayout>
      <CreateProductPageContent />
    </DashboardLayout>
  );
};

export default CreateProductPage;
