
function CarDetail({ car }) {
  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div style={{ fontSize: "22px" }}>{car.VIN}</div>
      <div style={{ fontSize: "22px" }}>Palivo: {car.Palivo}</div> {/* Display car.VIN */}
      <div style={{ fontSize: "22px" }}>Rok výroby: {car.Rok_vyroby}</div> {/* Display car.VIN */} 
    </div>
  );
}
export default CarDetail;
