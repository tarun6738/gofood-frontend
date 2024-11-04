import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});
  const [foodItem, setFoodItem] = useState([]);
  const url = "https://gofood-backend-sbj4.onrender.com";
  const loadData = async () => {
    try {
      const response = await fetch(url + "/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setFoodItem(data[0]); // Update food items state
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  
  const fetchMyOrder = async () => {
    
    
    await fetch(url + "/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };
  

  useEffect(() => {
    loadData();
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData &&
          orderData.orderData &&
          orderData.orderData.order_data ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  {item[0].order_date ? (
                    <div className="m-auto mt-5">
                      
                      {item[0].order_date}{" "}
                      
                      <hr />
                    </div>
                  ) : null}
                  {item.slice(1).map((arrayData, idx) => (
                    <div key={idx}>
                      <div
                        className="col-12 col-md-6 col-lg-3"
                        key={arrayData._id}
                      >
                        <div
                          className="card mt-3"
                          style={{ width: "16rem", maxHeight: "360px" }}
                        >
                          
                          {foodItem.find((food) => food._id === arrayData.id) && (
                          <img
                            src={
                              foodItem.find(
                                (food) => food._id === arrayData.id
                              ).img
                            }
                            className="card-img-top"
                            alt="Food item"
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                        )}
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "38px" }}
                            >
                              <span className="m-1">{arrayData.qty}</span>
                              <span className="m-1">{arrayData.size}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p>No order data found.</p>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

