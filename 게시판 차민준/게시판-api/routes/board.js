const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Board, Member } = require('../models')
const { isLoggedIn } = require('./middlewares')

try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads 폴더가 없어서 만들었어요')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)

         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/write', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      console.log('파일정보 : ', req.file)
      console.log('formData : ', req.body)

      if (!req.file) {
         const error = new Error('파일 업로드에 실패했습니다.')
         error.status = 400
         return next(error)
      }

      const board = await Board.create({
         content: req.body.content,
         img: `/${req.file.filename}`,
         member_id: req.user.id,
         title: req.body.title,
      })

      res.status(200).json({
         success: true,
         board: {
            id: board.id,
            content: board.content,
            img: board.img,
            member_id: board.member_id,
            title: board.title,
         },
         message: '게시물이 등록됐습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = `게시물 등록 중 오류가 발생했습니다. ${error}`
      next(error)
   }
})

router.get('/read', async (req, res, next) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 100

      const offset = (page - 1) * limit

      const count = await Board.count()

      const boards = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: Member,
               attributes: ['id', 'name', 'email'],
            },
         ],
      })
      console.log('boards : ', boards)

      res.status(200).json({
         success: true,
         boards,
         pagination: {
            totalBords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 게시물 리스트를 불러왔습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 리스트를 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

router.delete('/delete/:id', isLoggedIn, async (req, res, next) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id, member_id: req.user.id },
      })

      if (!board) {
         const error = new Error(`게시물을 찾을 수 없습니다. ${req.params.id} , ${req.user.id}`)
         error.status = 404
         return next(error)
      }

      await board.destroy()

      res.status(200).json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = '게시물 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

router.put('/edit/:id', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      const board = await Board.findOne({
         where: { id: req.params.id, member_id: req.user.id },
      })
      if (!board) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }

      await board.update({
         content: req.body.content,
         title: req.body.title,
         img: req.file ? `/${req.file.filename}` : board.img,
      })

      const updatedBoard = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
         ],
      })

      res.status(200).json({
         success: true,
         post: updatedBoard,
         message: '게시물이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      error.status = 500
      error.message = `게시물 수정 중 오류가 발생했습니다. ${error}`
      next(error)
   }
})

module.exports = router
