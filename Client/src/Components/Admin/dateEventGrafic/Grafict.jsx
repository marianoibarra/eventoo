import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosModeCategories } from "../../../Slice/Filter/categorieSlice";
import { getAllEvents } from "../../../Slice/Admin/AdminSlice";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "3rem",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  chart: {
    width: "100%",
    height: "100%",
    marginTop: "-1rem",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Grafict() {
  const categories = useSelector(
    (state) => state.categories.categories.categories
  );
  const { events } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    dispatch(axiosModeCategories());
    dispatch(getAllEvents());
  }, [dispatch]);
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  useEffect(() => {
    if (events.length && categories.length) {
      const data = categories
        .map((category) => {
          const results = events.filter((event) =>
            JSON.stringify(event).includes(category.name)
          );
          return {
            name: category.name,
            value: results.length,
            color: getRandomColor(),
          };
        })
        .sort((a, b) => b.value - a.value);
      setChartData(data);
      setLoading(false);
    }
  }, [events, categories]);

  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="custom-tooltip">
          <p className="tooltip-name">{name}</p>
          <p className="tooltip-value">{`${value} eventos`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classes.chartContainer}>
      <h2 className={classes.title}>Events for Category</h2>
      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <PieChart className={classes.chart} width={800} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
            activeIndex={activeIndex}
            activeShape={{ r: 120 }}
            onMouseEnter={onPieEnter}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={entry.color} />
              ))}
              <Tooltip content={renderCustomTooltip} />
              </Pie>
              <Legend
                       layout="vertical"
                       align=""
                       verticalAlign="bottom"
                     />
              </PieChart>
      )}
    </div>
  );
}

export default Grafict;
