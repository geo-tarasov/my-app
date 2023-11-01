const pool = require("../db/db");

class PostService {
  async getAllPosts() {
    const [posts] = await pool.execute('SELECT * FROM `native_posts_v2`');
    return posts;
  }
  async getPost(id) {
    const [post] = (await pool.execute('SELECT * FROM `native_posts_v2` WHERE id = ?', [id]))[0];
    return post;
  }
}

module.exports = new PostService();