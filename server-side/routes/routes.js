module.exports = function (app) {
  
  const user = require("../controller/controller");
  // Create a new book
  app.post("/api/user", user.create);

  // Retrieve all book
  //app.get("/api/allUsers", user.findAll);
  app.get("/api/allUsers", user.find);

  // Retrieve a single book by Id
  app.get("/api/users/:id", user.findByPk);

  // Update a book with Id
  app.put("/api/users/:id", user.update);

  // Delete a book with Id
  app.delete("/api/users/:id", user.delete);
  app.use("/api/users", user.findAllWithFilter);
  app.get("/api/users", user.getStaticCompanies);
};