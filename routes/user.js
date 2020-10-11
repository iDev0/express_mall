const express = require('express');
const router = express.Router();

const {
  user_create,
  user_login
} = require('../controllers/user')


// 회원가입
router.post('/signUp', user_create)

// 로그인
router.post('/login', user_login)


module.exports = router
