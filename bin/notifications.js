'use strict';

const Notification = require('../models/notification');

class Routes{

    constructor(app,socket){
        this.app = app;
        this.io = socket;

        /*
            Array to store the list of users along with there respective socket id.
        */        this.users = [];
    }

    socketEvents(){

        this.io.on('connection', (socket) => {
            console.log('connected')
            console.log(socket.id);

            socket.on('username', (userName) => {
                console.log(userName);

                this.users.push({
                    id : socket.id,
                    userName : userName
                });

                let len = this.users.length;
                len--;

                this.io.emit('userList',this.users,this.users[len].id);
            });

            socket.on('getMsg', (data) => {
                const from = data.from;
                const to = data.toid;
                const text = data.msg;
                const readBy = [];

                new Notification(({to, from, text, readBy})).save();

                console.log(this.users);
                for (let userId of to) {
                    const userIndex = this.users.findIndex(user => new String(user.userName).trim() === new String(userId).trim());
                    if (userIndex >= 0) {
                        const socketId = this.users[userIndex].id;
                        console.log(socketId);
                        this.io.to(socketId).emit('sendMsg', {
                            msg: data.msg,
                            name: data.name
                        });
                        console.log('finished sending back');
                    }
                }
            });

            socket.on('disconnect',()=>{

                for(let i=0; i < this.users.length; i++){

                    if(this.users[i].id === socket.id){
                        this.users.splice(i,1);
                    }
                }
                this.io.emit('exit',this.users);
            });

        });
    }

    routesConfig(){
        this.socketEvents();
    }
}
module.exports = Routes;
