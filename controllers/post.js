const Post = require('../models/post');
const { getHttpResponseContent } = require('../utils/response');
const { validationError } = require('../services/error');
const asyncHandleError = require('../services/async-handle-error');

const post = {
  getPosts: asyncHandleError(async (req, res) => {
    /**
     * #swagger.tags = ['Posts']
     * #swagger.summary = '取得貼文'
     */
    /**
     * #swagger.parameters['q'] = {
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
    const {
      query: { q, sort = 'desc' },
    } = req;
    const filter = q ? { content: new RegExp(q, 'i') } : {};
    const posts = await Post.find(filter)
      .populate({ path: 'user', select: 'name avatar' })
      .sort({
        createdAt: sort === 'desc' ? -1 : 1,
      });
    /**
      #swagger.responses[200] = {
        description: '成功取得貼文',
        schema: { $ref: '#/definitions/Posts' }
      }
     */
    res.status(200).json(getHttpResponseContent(posts));
  }),
  postOnePost: asyncHandleError(async (req, res, next) => {
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
    const {
      body: { content, image },
    } = req;
    if (!content)
      return next(validationError(400, 'content', '請填寫貼文內容'));

    if (image && !image.startsWith('https'))
      return next(validationError(400, 'image', '貼文圖片網址錯誤'));
    // 先寫固定的使用者編號
    const userId = '626fa289b74a64eeba707e84';
    const post = await Post.create({ content, image, user: userId });
    /**
      #swagger.responses[200] = {
        description: '新增貼文成功',
        schema: { $ref: '#/definitions/Posts' }
      }
     */
    res.status(200).json(getHttpResponseContent(post));
    /**
      #swagger.responses[400] = {
        description: '新增貼文失敗',
        schema: { $ref: '#/definitions/Error' }
      }
     */
  }),
};

module.exports = post;
