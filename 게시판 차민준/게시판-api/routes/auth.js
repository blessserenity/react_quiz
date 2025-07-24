const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const router = express.Router()
const Member = require('../models/member')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

router.post('/join', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, password } = req.body

      const exMember = await Member.findOne({
         where: { email },
      })

      if (exMember) {
         const error = new Error('이미 존재하는 사용자입니다.')
         error.status = 409
         return next(error)
      }

      const hash = await bcrypt.hash(password, 12)

      const newMember = await Member.create({
         email,
         name: name,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         member: {
            id: newMember.id,
            email: newMember.email,
            name: newMember.name,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, member, info) => {
      if (authError) {
         authError.status = 500
         authError.message = '인증 중 오류 발생'
         return next(authError)
      }
      if (!member) {
         const error = new Error(info.message || '로그인 실패')
         error.status = 401
         return next(error)
      }

      req.login(member, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }

         res.status(200).json({
            success: true,
            message: '로그인 성공',
            member: {
               id: member.id,
               name: member.nick,
            },
         })
      })
   })(req, res, next)
})

router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         logoutError.status = 500
         logoutError.message = '로그아웃 중 오류 발생'
         return next(logoutError)
      }

      res.status(200).json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {
   try {
      if (req.isAuthenticated()) {
         res.status(200).json({
            isAuthenticated: true,
            member: {
               id: req.user.id,
               name: req.user.name,
            },
         })
      } else {
         res.status(200).json({
            isAuthenticated: false,
         })
      }
   } catch (error) {
      error.status = 500
      error.message = `로그인 상태 확인 중 오류가 발생했습니다. ${error}`
      next(error)
   }
})

module.exports = router
