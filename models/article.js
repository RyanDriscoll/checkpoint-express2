'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

let schema = {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
};

let config = {
  getterMethods: {
    snippet: function() {
      if (this.content) {
        return this.content.slice(0, 23) + '...';
      }
      return '';
    }
  },
  instanceMethods: {
    truncate: function(num) {
      this.content = this.content.slice(0, num);
    }
  },
  classMethods: {
    findByTitle: function(title) {
      return this.findOne({
        where: {
          title: title
        }
      });
    }
  },
  hooks: {
    afterUpdate: function(article, options) {
      article.version++;
    }
  }
};

var Article = db.define('article', schema, config);

Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
