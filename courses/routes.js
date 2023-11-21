import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.course
          .find((c) => c._id === id);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(course);
      });

      
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.course = Database.course.map((c) =>
          c._id === id ? { c, ...course } : c
        );
        res.sendStatus(204);
      });
    
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.course = Database.course
          .filter((c) => c._id !== id);
        res.sendStatus(204);
      });
    

    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
          _id: new Date().getTime().toString() };
        Database.course.push(course);
        res.send(course);
      });

      
  app.get("/api/courses", (req, res) => {
    const courses = Database.course;
    res.send(courses);
  });
}
export default CourseRoutes;
