function CarSPZVINBadge({ car }) {
  return (
    <div className={"rounded"} style={componentStyle()}>
      <div className={"rounded"} style={textStyle()}>
        <div>{car.SPZ}</div>
      </div>
        <div className={"rounded-bottom"} style={VINStyle()}>
        <div>{car.VIN}</div>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    width: "300px",
    backgroundColor: "#3FA7D6",
    display: "grid",
    height: "max-content",
  };
}

function textStyle() {
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
    background: "#000000",
    color: "white",
  };
}

export default CarSPZVINBadge;
