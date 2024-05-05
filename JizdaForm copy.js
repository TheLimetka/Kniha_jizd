import { useContext, useState } from "react";
import { CarListContext } from "./CarListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function CarForm({ setShowCarForm, car }) {
  const { state, handlerMap } = useContext(CarListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowCarForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          formData.date = new Date(formData.date).toISOString();
          try {
            if (car.id) {
              formData.id = car.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowCarForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            car.id ? "Upravit" : "Vytvořit"
          } událost`}</Modal.Title>
          <CloseButton onClick={() => setShowCarForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit událost</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Datum jízdy</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              required
              defaultValue={
                car.date ? carDateToInput(car.date) : undefined
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Název událost</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              defaultValue={car.id}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCarForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {car.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

function carDateToInput(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default CarForm;
