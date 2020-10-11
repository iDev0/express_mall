const userModel = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.user_create = (req, res) => {

  const { name, email, password } = req.body

  userModel
    .findOne({ email })
    .then(user => {

      if (user) {
        return res.json({
          message : 'user existed...'
        })
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(422).json(err)
        }

        const newUser = new userModel({
          name,
          email,
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

};

exports.user_login = (req, res) => {

  const { email, password } = req.body

  // 회원정보검색
  userModel
    .findOne({email})
    .then(user => {

      console.log(user)
      if (!user) {
        return res.json({
          message : 'user is not existed...'
        })
      }

      // 암호 복호화
      bcrypt.compare(password, user.password, (err, isMatch) => {
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

};