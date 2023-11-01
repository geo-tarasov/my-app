const postService = require("../service/post-service");

class PostController {
  async getPosts(req, res, next) {
    try {
      const users = await postService.getAllPosts();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getPost(req, res, next) {
    try {
      const id = req.params.id;
      const post = await postService.getPost(id);
      return res.json(post);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostController();