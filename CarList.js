import { useContext, useState } from "react";
import { CarListContext } from "./CarListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import CarCard from "./CarCard.js";
import CarForm from "./CarForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline} from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function CarList() {
  const { carList } = useContext(CarListContext);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showRideForm, setShowRideForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const carlist = carList.filter(
    (car) => car.id
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowCarForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nový
          vůz
        </Button>
        <Button variant="success" onClick={() => setShowRideForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} />{" "}
          Nová jízda
        </Button>
      </div>
      {!!showRideForm ? (
        <CarForm car={showRideForm} setShowCarForm={setShowRideForm} />
      ) : null}
      {!!showCarForm ? (
        <CarForm car={showCarForm} setShowCarForm={setShowCarForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          car={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {carlist.map((car) => {
        return (
          <CarCard
            key={car.id}
            car={car}
            setShowCarForm={setShowCarForm}
            setShowRideForm={setShowRideForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default CarList;
