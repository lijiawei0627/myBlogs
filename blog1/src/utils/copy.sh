#!/bin/sh
# 此处具体地址根据实际项目目录地址而定
cd ~/online
# $(data + %Y-%m-%d)为当前日期
# 拷贝access.log文件，并将得到的文件1命名为$(data + %Y-%m-%d).access.log
cp ~/online/logs/access.log ~/online/logs/$(date +%Y-%m-%d).access.log
# 清空access.log文件
echo "" > ~/online/logs/access.log
