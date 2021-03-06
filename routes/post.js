const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');

router.get('/', (req, res) =>
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得貼文'
   */
  /**
    #swagger.parameters['q'] = {
      in: 'query',
      description: '關鍵字',
      type: 'string',
    }
    #swagger.parameters['sort'] = {
      in: 'query',
      description: '排序方式，desc 為新至舊，asc 為舊至新',
      type: 'string',
    }
   */
  /**
    #swagger.responses[200] = {
      description: '成功取得貼文',
      schema: { $ref: '#/definitions/Posts' }
    }
   */
  PostController.getPosts(req, res)
);
router.post('/', (req, res, next) =>
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '新增貼文'
   */
  /**
    #swagger.parameters['parameter_name'] = {
      in: 'body',
      description: '貼文資料',
      schema: {
        $content: '貼文內容',
        image: '貼文圖片連結'
      }
    }
  */
  /**
    #swagger.responses[200] = {
      description: '新增貼文成功',
      schema: { $ref: '#/definitions/Posts' }
    }
    #swagger.responses[400] = {
      description: '新增貼文失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  PostController.postOnePost(req, res, next)
);

module.exports = router;
