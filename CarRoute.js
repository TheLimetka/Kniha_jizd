import { useContext } from "react";
import { CarContext } from "./CarContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import CarSPZBadge from "./CarSPZBadge";
import CarDetail from "./CarDetail";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function CarRoute({ setShowCarForm }) {
  const navigate = useNavigate();
  const { car } = useContext(CarContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {car ? (
        <>
          <CarSPZBadge car={car} />
          <CarDetail car={car} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/carDetail?id=" + car.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowCarForm(car)} size={"sm"}>
              <Icon path={mdiPencil} size={0.7} />
            </Button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default CarRoute;
