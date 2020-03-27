const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  // express中的req自带了query，不用再去手动解析query
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  // 从数据库获取数据，注意返回的result为一个promise
  const result = getList(author, keyword)
  result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

module.exports = router;
