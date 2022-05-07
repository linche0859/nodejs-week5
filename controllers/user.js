const User = require('../models/user');
const { getHttpResponseContent } = require('../utils/response');
const { appError, validationError } = require('../services/error');
const asyncHandleError = require('../services/async-handle-error');

const user = {
  register: asyncHandleError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '註冊會員'
     */
    /**
      #swagger.parameters['parameter_name'] = {
        in: 'body',
        description: '會員資料',
        schema: {
          $name: '暱稱',
          $email: 'test@gmail.com',
          $password: '123456',
        }
      }
     */
    const {
      body: { name, email, password },
    } = req;

    if (!(name || email || password))
      return next(appError(400, '請填寫註冊資訊'));
    if (name && name.length < 2)
      return next(validationError(400, 'name', '暱稱至少 2 個字元以上'));
    if (password && password.length < 8)
      return next(
        validationError(400, 'password', '密碼需至少 8 碼以上，並英數混合')
      );

    const exist = await User.findOne({ email });
    if (exist) return next(validationError(400, 'email', '此 Email 已被註冊'));

    const user = await User.create({ name, email, password });
    /**
      #swagger.responses[200] = {
        description: '註冊會員成功',
        schema: { $ref: '#/definitions/Users' }
      }
     */
    res.status(200).json(getHttpResponseContent(user));
    /**
      #swagger.responses[400] = {
        description: '註冊會員失敗',
        schema: { $ref: '#/definitions/Error' }
      }
     */
  }),
};

module.exports = user;
