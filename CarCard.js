import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import CarSPZBadge from "./CarSPZBadge";
import CarDetail from "./CarDetail";
import CarVINBadge from "./CarVINBadge";
import CarSPZVINBadge from "./CarSPZVINBadge";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function CarCard({ car, setShowCarForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
{/*       <CarSPZBadge car={car} />
      <CarVINBadge car={car} /> */}
      <CarSPZVINBadge car={car} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "right",
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
        <Button
          onClick={() => setShowConfirmDeleteDialog(car)}
          size={"sm"}
          variant="danger"
        >
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div>
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
    maxWidth: "700px",
  };
}

export default CarCard;
