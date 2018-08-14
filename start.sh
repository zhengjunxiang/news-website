#!/usr/bin/env bash

cd $(pwd)


antnews_status() {
    ps aux | grep mongo 
    ps aux | grep nginx
}
antnews_start () {
    sudo systemctl start mongod
    sudo /usr/sbin/nginx -c $(pwd)/nginx.conf
    pm2 start app.json
    antnews_status
}

antnews_stop () {
    sudo systemctl stop mongod
    sudo /usr/sbin/nginx -s stop
    pm2 stop api
    antnews_status
}

antnews_restart() {
    antnews_stop
    antnews_start
}


if [ "$1" == "" ]; then
    echo -e  "\n$0 [start|stop|restart|status]\n"
    exit 1
fi

antnews_$1
