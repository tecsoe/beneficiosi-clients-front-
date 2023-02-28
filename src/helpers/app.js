const app = new Vue({
    el: '#app',
    data: {
        message: '',
        messages: [],
        socket: null,
    },
    created() {
        this.socket = io('http://localhost:3000', { transports: ['websocket'] });
        this.socket.on('messageToClient', (msg) => this.messages.push(msg));
        this.socket.on('CLIENT', (data) => console.log('CLIENT', data));
        this.socket.on('ADMIN', (data) => console.log('ADMIN', data));
        this.socket.on('STORE', (data) => console.log('STORE', data));
        this.socket.on('user.50', (data) => console.log('store 50', data));
        this.socket.on('user.44', (data) => console.log('client 44', data));
    },
    methods: {
        sendMessage() {
            this.socket.emit('messageToServer', this.message);
            this.message = '';
        }
    }
});