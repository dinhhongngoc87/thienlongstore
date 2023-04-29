import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "Confirmed",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Done",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "New",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Done",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Cancel",
    },
  ],
};

const orderStatus = {
  Confirmed: "primary",
  New: "warning",
  Done: "success",
  Cancel: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  // const [categories, setCategories] = useState([]);
  // const [suppliers, setSuppliers] = useState([]);
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({
    totalSales: 0,
    totalIncomes: 0,
    totalOrder: 0,
  });
  const [topcategories, setTopCategories] = useState({
    categoryId: [],
    categoryName: [],
    value: [],
  });
  const [topProducts, setTopProduct] = useState({
    head: ["product", "total orders", "total spending"],
    body: [{}],
  });
  const statusCards = [
    {
      icon: "bx bx-shopping-bag",
      count: state.totalSales,
      title: "Đơn đã bán",
    },
    {
      icon: "bx bx-cart",
      count: products.length,
      title: "Tổng sản phẩm",
    },
    {
      icon: "bx bx-dollar-circle",
      count: state.totalIncomes,
      title: "Doanh thu",
    },
    {
      icon: "bx bx-receipt",
      count: state.totalOrder,
      title: "Tổng đơn hàng",
    },
  ];
  useEffect(() => {
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        // setCategories(data.categories);
        // setSuppliers(data.suppliers);
      });

    // Lấy top sản phẩm từ bảng order_detail
    fetch(`/api/top-seller?limit=5`)
      .then((response) => response.json())
      .then((data) => {
        setTopProduct({
          ...topProducts,
          body: [...data],
        });
      });
  }, []);
  useEffect(() => {
    fetch(`/api/top-category`)
      .then((response) => response.json())
      .then((data) => {
        let catName = data.map((item) => item.catName);
        let catId = data.map((item) => item.catId);
        let catValue = data.map((item) => item.totalProductOfCategory);
        setTopCategories({
          categoryId: catId,
          categoryName: catName,
          value: catValue,
        });
      });

    fetch(`/api/get-total-sale`)
      .then((response) => response.json())
      .then((response) => {
        setState({
          ...state,
          totalSales: response.data.totalSales,
          totalIncomes: response.data.totalIncomes,
          totalOrder: response.data.totalOrder,
        });
      });
  }, []);
  const chartOptions = {
    series: [...topcategories.value], //total product of category
    options: {
      series: [...topcategories.value],
      labels: [...topcategories.categoryName],
      options: {
        chart: {
          width: 380,
          type: "donut",
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: true,
        },
        fill: {
          type: "gradient",
        },
        legend: {
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex];
          },
        },
        title: {
          text: "Gradient Donut with custom Start-angle",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  };

  const renderCusomerBody = (item, index) => {
    return (
      <tr key={index}>
        <td style={{ width: "300px", overflow: "hidden" }}>
          {products.map((product) => {
            if (product.id === item.product_Id) return product.productName;
          })}
        </td>
        <td>{item.totalQty}</td>
        <td>
          {products.map((product) => {
            if (product.id === item.product_Id)
              return parseFloat(product.price * item.totalQty).toLocaleString();
          })}
        </td>
      </tr>
    );
  };
  const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;
  return (
    <div>
      <h2 className="page-header">Tổng quan</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <div className="card__header">
              <h3>Cơ cấu sản phẩm</h3>
            </div>
            <div className="card__body">
              <Chart
                options={
                  themeReducer === "theme-mode-dark"
                    ? {
                        ...chartOptions.options,
                        theme: { mode: "dark" },
                      }
                    : {
                        ...chartOptions.options,
                        theme: { mode: "light" },
                      }
                }
                series={chartOptions.series}
                type="donut"
                height="185px"
              />
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Sản phẩm bán chạy</h3>
            </div>
            <div className="card__body">
              {/* <Table>
                {topProducts.header.map((product) => (
                  <th>{product.header}</th>
                ))}
              </Table> */}
              <Table
                headData={topProducts.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topProducts.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              {/* <Link to="/">view all</Link> */}
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
