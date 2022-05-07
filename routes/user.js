const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post(
  '/register',
  (req, res, next) =>
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
    /**
    #swagger.responses[200] = {
      description: '註冊會員成功',
      schema: { $ref: '#/definitions/Users' }
    }
    #swagger.responses[400] = {
      description: '註冊會員失敗',
      schema: { $ref: '#/definitions/Error' }
    }
  */
    UserController.register
);

module.exports = router;
