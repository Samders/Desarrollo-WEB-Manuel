// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { body } from "express-validator";
import { FacultyController } from "../controllers/FacultyController.js";

class FacultyRoutes {
  constructor() {
    this.router = Router();
    this.controller = new FacultyController();

    /**
     * @openapi
     * components:
     *  schemas:
     *    Error:
     *      type: object
     *      properties:
     *        code:
     *          type: string
     *          example: 20359
     *        message:
     *          type: string
     *          example: there are item depending on it
     *    Faculty:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the serial id
     *          example: 109
     *          required: false
     *        name:
     *          type: string
     *          description: the course name
     *          example: matemáticas I
     *        dean_id:
     *          type: string
     *          description: the dni of the faculty dean
     *          example: 1010101010
     * /faculties:
     *  get:
     *    description: get all faculties
     *    responses:
     *      200:
     *        description: Returns a list of objects
     *        content:
     *           application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Facultty'
     *  post:
     *    description: Creates a new course
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Faculty'
     *    responses:
     *      201:
     *        description: Returns the newly created faculty
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Faculty'
     *      500:
     *        description: Some error ocurred
     * /faculties/{id}:
     *  parameters:
     *    - name: id
     *      in: path
     *      required: true
     *  put:
     *    description: Edit an existing faculty
     *    responses:
     *      200:
     *        description: Returns the updated course
     *  delete:
     *    description: Deletes a given course
     *    responses:
     *      204:
     *        description: resource successfully deleted
     *      404:
     *        description: resource not found
     *      500:
     *        description: cannot delete resource due to some error
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Error'
     */
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(
        [body("name").trim().notEmpty(), body("dean_id").trim().notEmpty()],
        this.controller.createFaculty
      );

    this.router
      .route("/:id")
      .put(this.controller.updateFaculty)
      .get(this.controller.getOne)
      .delete(this.controller.deleteFaculty);
  }
}
export { FacultyRoutes };