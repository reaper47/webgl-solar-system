import http from 'http';

http.createServer( (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let t = "WORLD";
    res.end(`Hello ${t} \n`);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337');
