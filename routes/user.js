const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../model/user')
const jwt = require('jsonwebtoken')


// 회원목록



// 회원가입
router.post('/signUp', (req, res) => {

  userModel
    .findOne({ email : req.body.useremail })
    .then(user => {

      if (user) {
        return res.json({
          message : 'user existed...'
        })
      }

      bcrypt.hash(req.body.userpassword, 10, (err, hash) => {
        if (err) {
          return res.status(422).json(err)
        }

        const newUser = new userModel({
          name : req.body.username,
          email : req.body.useremail,
          password : hash
        })

        newUser
          .save()
          .then(user => {
            res.json({
              message : 'user create...',
              userInfo : user
            })
          })
          .catch(err => {
            res.status(500).json(err)
          })
      })


    })
    .catch(err => {
      res.status(500).json(err)
    })

})

// 로그인
router.post('/login', (req, res) => {

  // 회원정보검색
  userModel
    .findOne({email : req.body.useremail})
    .then(user => {

      console.log(user)
      if (!user) {
        return res.json({
          message : 'user is not existed...'
        })
      }

      // 암호 복호화
      bcrypt.compare(req.body.userpassword, user.password, (err, isMatch) => {
        // console.log(isMatch)
        if (err || isMatch === false) {
          return res.json({
            message : 'password incorrected...'
          })
        }

        // 토큰생성
        const token = jwt.sign(
          {id : user._id},
          "jungjuyoung",
          { expiresIn : '1d'}
        )

        res.json({
          message : 'user login...',
          success : isMatch,
          token : token
        })


      })

    })
    .catch(err => {
      res.status(500).json(err)
    })

  // 유정정보 불러오기


})


module.exports = router
