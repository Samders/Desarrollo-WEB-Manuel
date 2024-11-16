// Llamados a la DB
import { Db } from "../config/db.js";
import { Faculty } from "../models/Faculty.js";
import { CustomError } from "../utils/CustomError.js";

class FacultyService {
  getAll = async () => {
    try {
      console.log("getAll en FacultadService");
      const results = await new Db().query("SELECT * FROM faculty");
      return results.rows.map((element) => Faculty.fromObject(element));
    } catch (error) {
      console.log("error al listar facultades", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createFaculty = async (facultyName, deanId) => {
    try {
      const newFaculty = await new Db().query(
        `INSERT INTO faculty (name, dean_id) VALUES ($1, $2) RETURNING *`,
        [facultyName, deanId]
      );
      if (!newFaculty.rowCount) return null;
      const { id, name } = newFaculty.rows[0];
      return new Faculty(id, name);
    } catch (error) {
      console.log("error al crear facultades", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateFaculty = async (id, nombre) => {
    try {
      const updated = await new Db().query(
        `UPDATE faculty SET name=$1 WHERE id = $2 RETURNING id,name;`,
        [nombre, id]
      );
      if (!updated.rowCount) return null;
      const { id, name } = updated.rows[0];
      return new Faculty(id, name);
    } catch (error) {
      console.log("error al actualizar facultades", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteFaculty = async (facId) => {
    try {
      const result = await new Db().query(
        `DELETE FROM faculty WHERE id = $1 RETURNING id`,
        [facId]
      );
      if (!result.rowCount) return null;
      return result.rows[0];
    } catch (error) {
      console.log("error al eliminar facultades", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getOne = async (facultyId) => {
    try {
      console.log("getOne service");
      const client = new Db();
      const results = await client.query(
        "SELECT * FROM faculty WHERE id = $1",
        [facultyId]
      );
      if (results.rowCount === 0) return null;
      console.log(results);
      const { id, name } = results.rows[0];
      return new Faculty(id, name);
    } catch (error) {
      console.log(error);
      throw new CustomError(err.code, err.detail);
    }
  };

  setDean = async (id, idProfesor) => {
    try {
      new Db().query(
        `UPDATE faculty SET dean_id=$2 WHERE id = $1 RETURNING id,name,dean_id;`,
        [id, idProfesor]
      );
    } catch (error) {
      console.log("error al eliminar facultades", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { FacultyService };