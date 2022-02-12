const Article = require("../models/Article");
const Reference = require("../models/Reference");
Article.hasMany(Reference, { onDelete: 'Cascade' })

class Controller {
  addArticle(res, data) {
    Article.create(data, () => {
      
    }).then((err,newArticle) => {
      res.status(200).json({
        status: 200,
        message: "Created",
        user: newArticle,
      });
  })
}
  updateArticle(res, _id, data) {
   Article.update(
      {
        title: data.body.title,
        abstract: data.body.abstract,
      },
      { where: { _id: data.params.id_article } }
    ).then(() => {
      res.status(200).json({
          status: true,
          message: "Book updated successfully with id = " + _id
      });
    });
  }
  getArticle(res, id) {
    Article.findOne(
      {
        _id: id,
      },
      (err, article) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "ok",
          article,
        });
      }
    );
  }
  getArticles(res, data) {
    Article.find({}, data, (err, getArticles) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "ok",
        article: getArticles,
      });
    });
  }
  deleteArticle(res, id) {
    Article.deleteOne(
      {
        _id: id,
      },
      (err) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Deleted",
        });
      }
    );
  }
  addReference(res, data) {
    Reference.create(data, (err, newReference) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Created",
        reference: newReference,
      });
    });
  }
  getReferences(res, referenceId) {
    Reference.find(
      {
        id_reference: referenceId,
      },
      (err, references) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "ok",
          references,
        });
      }
    );
  }
  updateReference(res, id, data) {
    Reference.updateOne(
      {
        _id: id,
      },
      data,
      (err, updateReference) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Updated",
          reference: updateReference,
        });
      }
    );
  }
  deleteReference(res, id) {
    Reference.deleteOne(
      {
        _id: id,
      },
      (err) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Deleted",
        });
      }
    );
  }
}
exports.db = new Controller();
