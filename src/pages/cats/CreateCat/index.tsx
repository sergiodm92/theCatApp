import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCat, getFavourites } from "../../../store/actions";
import { NewCat } from "../../../models/Cat";
import styles from "./CreateCat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Redux_State } from "../../../models/global_types";
import { Button, FormControl, TextField } from "@mui/material";
import ImageSelector from "../../../components/ModalImage";

const CatForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");

  const dispatch: any = useDispatch();
  const favourites = useSelector((state: Redux_State) => state.favoutites);

  const handleGuardar = async () => {
    const newCat: NewCat = {
      name: name,
      breed: breed,
      age: age,
      photo_url: photoUrl,
    };
    dispatch(createCat(newCat));
    navigate("/cats");
  };

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  const handleCancelar = () => {
    navigate("/cats");
  };

  return (
    <div className={styles.container}>
      <h1>Crear Gato</h1>
      <div className={styles.divForm}>
        <FormControl className={styles.form}>
          <div className={styles.formGroup}>
            <TextField
              type="text"
              id="name"
              value={name}
              label="Nombre"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              inputProps={{ style: { backgroundColor: "white" } }}
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              type="text"
              id="breed"
              label="Raza"
              variant="filled"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              inputProps={{ style: { backgroundColor: "white" } }}
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              type="number"
              id="age"
              label="Edad"
              variant="filled"
              value={age ? age : ""}
              onChange={(e) => setAge(parseInt(e.target.value))}
              inputProps={{ style: { backgroundColor: "white" } }}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.selectImage}>
              <ImageSelector data={favourites} setPhotoUrl={setPhotoUrl} />
            </div>
            {photoUrl ? (
              <img src={`${photoUrl}`} className={styles.photo} />
            ) : null}
          </div>
        </FormControl>
        <div className={styles.buttonGroup}>
          <Button variant="contained" onClick={handleGuardar}>
            Guardar
          </Button>
          <Button variant="contained" onClick={handleCancelar}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CatForm;
