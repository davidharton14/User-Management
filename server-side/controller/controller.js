const db = require("../config/config.js");
const User = db.user;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: articles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, articles, totalPages, currentPage };
};

// Post a Book
exports.create = (req, res) => {
  // Save to MySQL database
  User.create({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  }).then((user) => {
    res.status(200).json({
      status: true,
      message: "User created successfully",
      user:user
    });
  });
};

exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  User.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.find = (req, res) => {
  const property_name = req.query.property_name;
  var condition = property_name ? { name: { [Op.like]: `%${property_name}%` } } : null;

 User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving properties."
      });
    });
};

// Find a book by Id
exports.findByPk = (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    res.status(200).json({
      status: true,
      data: user,
    });
  });
};

// Update a book
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(
    {
    id:req.body.id,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    },
    { where: { id: req.params.id} }
  ).then(() => {
    res.status(200).json({
        status: true,
        message: "User updated successfully with id = " + id,
    });
  });
};

// Delete a book by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "User deleted successfully with id = " + id
    });
  });
};
exports.findAllWithFilter=(req, res,)=>{
  const filters = req.query;
  const filteredUsers = User.filter(user => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
}
exports.getStaticCompanies = async (req,res)=>{
  const match = {}
  const sort  = {}
  if(req.query.sortBy && req.query.orderBy){
    sort[req.query.sortBy]   = req.query.orderBy === 'desc' ? -1 : 1
}

try {
    await req.user.populate({
        path:'/api/users/',
        match,
        options:{
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
          }
    }).execPopulate()
    res.send(req.body.articles)
} catch (error) {
    res.status(500).send()
}
};
