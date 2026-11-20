import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((data) => setToys(data));

  },[]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(newToy),
    })
    .then((response) => response.json())
    .then((createdToy) => {
      setToys((currentToys) => [...currentToys,createdToy])
    });
  }
/*
  function handleLikeToy(updatedToy) {
    fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },

      body: JSON.stringify({
        likes: updatedToy.likes + 1,
      }),

    })
    .then((response) => response.json())
    .then((updatedToy) => {
      setToys(
        toys.map((toy) => {
          toy.id === updatedToy.id ? updatedToy : toy
        })
      );
    });
  }*/

    function handleLikeToy(updatedToy) {
      fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          likes: updatedToy.likes + 1,
        }),
      })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) => 
          currentToys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy)
        )
      })
    }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) => 
      currentToys.filter((toy) => toy.id !== id))
    });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm  onAddToy ={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLikeToy={handleLikeToy} onDeleteToy={handleDeleteToy}  />
    </>
  );
}

export default App;
