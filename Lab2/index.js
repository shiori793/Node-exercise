import http from 'http';
import fs from 'fs';

const server = http.createServer();
server.on('request', (req, res) => {
    // console.log(req)
    const url = req.url;
    if (url === '/'){
        res.setHeader('Content-type', 'text/html');
        res.write(`
            <h1>Hello Node!</h1>
            <ul>
                <li><a href="/read-message">Read Message</a></li>
                <li><a href="/write-message">Write Message</a></li>
            </ul>
        `);
    } else if (url === '/read-message') {
        const text = fs.readFileSync('text.txt','utf8', err => {
            if (err){
                console.error(err)
            }
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/write-message">Write Message</a></li>
        </ul>
            <h1>${text}</h1>
        `);
    } else if (url === '/write-message') {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/read-message">Read Message</a></li>
            </ul>
                <form action='/write-message' method='post'>
                    <input type='text' name='text'/>
                    <button type='submit'>Submit</button>
                </form>
            `);
        } else if (req.method === 'POST') {
            const chunks = [];
            req.on('data', chunk => chunks.push(chunk))
            req.on('end', () => {
                const data = Buffer.concat(chunks).toString();
                const text = data.substring(data.indexOf('=')+1);
                fs.writeFile('text.txt', text, err => {
                    if(err){
                        console.error(err)
                    }
                });
            });
            res.writeHead(301, {
                Location: '/'
            })
        }
    }
    res.end();
});

server.listen(8000, function(){
    console.log('Server start at port 8000');
});