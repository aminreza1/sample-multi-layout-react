import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { Link, useNavigate } from "react-router-dom";
import ProductListInterface from "../../dto/admin/product-list.interface";
import http, { apis } from "../../infrastructures/http-service";
import { AuthContext } from "../../store/auth-context";

const ProductListPageContent: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [products, setProducts] = useState<ProductListInterface[]>([]);
  useEffect(() => {
    http<ProductListInterface[]>({
      method: "GET",
      url: `${apis["product_admin"]}?page=1`,
      headers: {
        Authorization: `Bearer ${authCtx.authData.token}`,
      },
    })
      .then((resp) => {
        if (resp.data.length > 0) setProducts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dateToString = (input: Date): string => {
    return new Date(input).toDateString()
  };

  return (
    <div className="flex flex-col p-4">
      <div className="breadcrumbs text-sm alert mb-2">
        <ul>
          <li>
            <Link to="/dashboard">Admin Panel</Link>
          </li>
          <li>Products</li>
        </ul>
      </div>
      <div>
        <button
          onClick={() => navigate("/dashboard/products/create")}
          className="btn btn-outline btn-success btn-sm"
        >
          Create New Products
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Real Price</th>
            <th>Sales Price</th>
            <th>Qty</th>
            <th>Published</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.categoryTitle}</td>
              <td>{item.realPrice}</td>
              <td>{item.salesPrice}</td>
              <td>{item.qty}</td>
              <td>{item.isPublished ? (
                <span className="text-green-600">Yes</span>
              ) : (
                <span className="text-red-600">No</span>
              )}</td>
              <td>{dateToString(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductListPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ProductListPageContent />
    </DashboardLayout>
  );
};

export default ProductListPage;
