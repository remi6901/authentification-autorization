const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
  constructor() {
    super({ table: "movies" });
  }

  insert(movie) {
    return this.connection.query(
      `insert into ${this.table} (title) values (?)`,
      [movie.title]
    );
  }

  update(movie) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [movie.title, movie.id]
    );
  }
}

module.exports = MovieManager;
