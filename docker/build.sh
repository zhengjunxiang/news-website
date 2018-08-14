#!/usr/bin/env bash
#
set -xe

build="$(cd $(dirname $0); pwd)"

project="ant-news"
tag="v1-$(git rev-parse --short HEAD)"
namespace="ap-hk"
registry="registry.cn-hongkong.aliyuncs.com"
port="8080"


cd $(dirname ${build})

sudo docker build -t ${registry}/${namespace}/${project}-api -f ${build}/Dockerfile-api .
sudo docker build -t ${registry}/${namespace}/${project}-nginx -f ${build}/Dockerfile-nginx .

sudo docker tag ${registry}/${namespace}/${project}-api ${registry}/${namespace}/${project}-api:${tag}
sudo docker tag ${registry}/${namespace}/${project}-nginx ${registry}/${namespace}/${project}-nginx:${tag}

sudo docker login -u youqing.han@bitmain -p YXNkZndlMjNzZAo1 ${registry}

#sudo docker rmi ${registry}/${namespace}/${project}
sudo docker push ${registry}/${namespace}/${project}-api
sudo docker push ${registry}/${namespace}/${project}-api:${tag}
sudo docker push ${registry}/${namespace}/${project}-nginx
sudo docker push ${registry}/${namespace}/${project}-nginx:${tag}

#
#sudo docker ps | grep ${project} && sudo docker stop -t 0  ${project}
#sudo docker ps -a | grep ${project} && sudo docker rm ${project}
#sudo docker run -d --name ${project} --hostname ${project} --restart always -p ${port}:${port} ${registry}/${namespace}/${project}
#sudo docker ps -a
#sudo docker images|grep none|awk '{print $3}'|xargs sudo docker rmi > /dev/null 2>&1 &
