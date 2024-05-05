function CarSPZBadge({ car }) {

  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={VINStyle()}>
        <div>{car.SPZ}</div>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    width: "125px",
    backgroundColor: "#d63232",
    display: "grid",
    height: "max-content",
  };
}

function dateStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    padding: "8px",
    fontSize: "22px",
    color: "white",
    lineHeight: 1,
  };
}

function VINStyle() {
  return {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: 1,
    padding: "4px 4px 8px 4px",
    background: "#3FA7D6",
    color: "white",
  };
}

export default CarSPZBadge;
