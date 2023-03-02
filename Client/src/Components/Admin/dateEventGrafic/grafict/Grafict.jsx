import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosModeCategories } from "../../../../Slice/Filter/categorieSlice";
import { getAllEvents } from "../../../../Slice/Admin/AdminSlice";
import { makeStyles } from "@material-ui/core/styles";
import Pie from "./Pie/Pie";
import Table from "./Table/TableStadistic";
import sells from "./Table/sells.json";
import TableStadistic from "./Table/TableStadistic";
import StackedBarChart from "./Table/TableStadistic";
import StadisticsForModality from "./StadisticsForModality/StadisticsForModality";
import { dateTimePickerTabsClasses } from "@mui/x-date-pickers";

const useStyles = makeStyles({
  chartContainer: {
    display: "grid",
    gap: "50",
    alignItems: "center",
    marginTop: "3rem",
    height: "100%",
    width: "100%",
    justifyContent:'canter'
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
  const [modality, setModality] = useState(null);
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
        .map((category, index) => {
          const results = events.filter((event) =>
            JSON.stringify(event).includes(category.name)
          );
          const value = results.length;
          const id =
            category.name !== "Congresses"
              ? category.name
              : category.modality === "Presential"
              ? "Congresses Presential"
              : "congresses Virtual"; // Agrega un prefijo único
          return value === 0
            ? null
            : {
                id: id,
                label: category.name,
                value: value,
              };
        })
        .filter((category) => category !== null)
        .sort((a, b) => b.value - a.value);
        console.log(data)
      setChartData(data);
    }
    if (events.length && categories.length) {
      const resultsP = events.filter(
        (event) => event.category && event.category.modality === "Presential"
      );
      
      const resultsv = events.filter(
        (event) => event.category && event.category.modality === "Virtual"
      );
    
      setModality([
        { id: "Presential", label: "Presential", value: resultsP.length },
        { id: "Virtual", label: "Virtual", value: resultsv.length },
      ]);
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
      <Pie data={chartData} />
      <h2 className={classes.title}>Events for Modality</h2>
      <Pie data={modality}  />
      <h2 className={classes.title}>Events sold in the year</h2>
      <StackedBarChart />
    </div>
  );
}

export default Grafict;
