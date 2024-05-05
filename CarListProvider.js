import { useEffect, useState } from "react";
import { CarListContext } from "./CarListContext.js";

function CarListProvider({ children }) {
  const [carLoadObject, setCarLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setCarLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/car/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setCarLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setCarLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setCarLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/car/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setCarLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setCarLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setCarLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/car/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setCarLoadObject((current) => {
        const carIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[carIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setCarLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setCarLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/car/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setCarLoadObject((current) => {
        const carIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(carIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setCarLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: carLoadObject.state,
    carList: carLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete},
  };

  return (
    <CarListContext.Provider value={value}>
      {children}
    </CarListContext.Provider>
  );
}

export default CarListProvider;
