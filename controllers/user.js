const User = require('../models/user');
const { getHttpResponseContent } = require('../utils/response');
const { appError, validationError } = require('../services/error');
const asyncHandleError = require('../services/async-handle-error');

const user = {
  // 註冊會員
  register: asyncHandleError(async (req, res, next) => {
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

    res.status(200).json(getHttpResponseContent(user));
  }),
};

module.exports = user;
