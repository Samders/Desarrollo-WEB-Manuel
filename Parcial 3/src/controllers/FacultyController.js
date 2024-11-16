import { validationResult } from "express-validator";
import { FacultyService } from "../services/FacultyService.js";
import { ProfessorService } from "../services/ProfessorService.mjs";
import { CustomError } from "../utils/CustomError.js";
// Manipulo el request/response
// llamo a los servicios
class FacultyController {
  #facultyService;
  #professorService;
  constructor() {
    this.#facultyService = new FacultyService();
    this.#professorService = new ProfessorService();
  }

  getAll = async (req, res) => {
    const faculties = await this.#facultyService.getAll();
    res.send(faculties);
  };

  createFaculty = async (req, res) => {
    const { name, dean_id } = req.body;
    const result = validationResult(req);
    // if (!name || !dean_id) {
    //   return res.status(400).send({ code: 400, message: "some data missing" });
    // }
    if (!result.isEmpty()) {
      console.log(result);
      return res.status(400).send({ errors: result.array() });
    }

    try {
      const createdFaculty = await this.#facultyService.createFaculty(
        name,
        dean_id
      );
      const dean = await this.#professorService.getOne(dean_id);
      createdFaculty.setDirector(dean);
      res.status(201).send(createdFaculty);
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    try {
      const updated = await this.#facultyService.updateFaculty(id, name);
      res.status(200).send(updated);
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  deleteFaculty = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    try {
      const deleted = await this.#facultyService.deleteFaculty(id);
      res.status(deleted ? 204 : 404).end();
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    console.log("getOne faculty", req.params);
    if (!id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const faculty = await this.#facultyService.getOne(id);
    if (!faculty) return res.status(404).end();
    res.status(200).send(faculty);
  };
}
export { FacultyController };