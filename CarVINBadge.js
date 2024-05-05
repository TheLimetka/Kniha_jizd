function CarVINBadge({ car }) {
    return (
      <div className={"rounded"} style={componentStyle()}>
        <div className={"rounded"} style={textStyle()}>
          <div>{car.VIN}</div>
        </div>
      </div>
    );
  }
  
  function componentStyle() {
    return {
      width: "250px",
      backgroundColor: "#2B4570",
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
  function timeStyle() {
    return {
      display: "flex",
      justifyContent: "center",
      fontSize: "20px",
      lineHeight: 1,
      padding: "4px 4px 8px 4px",
      background: "#187bcd",
      color: "white",
    };
  }
  export default CarVINBadge;
  