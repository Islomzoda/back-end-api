const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

let nextMemoId = 1;
let memos = [
    { id: nextMemoId++, type: 'car', price: '50', description:'BMW AG — немецкий производитель автомобилей, мотоциклов, двигателей, а также велосипедов. Председателем компании на сегодняшний день является Норберт Райтхофер, а главным дизайнером — Карим Хабиб. Девиз компании — «Freude am Fahren»,. Для англоязычных стран был придуман также «The Ultimate Driving Machine». ' },
    { id: nextMemoId++, type: 'car', price: '50', description:'BMW AG — немецкий производитель автомобилей, мотоциклов, двигателей, а также велосипедов. Председателем компании на сегодняшний день является Норберт Райтхофер, а главным дизайнером — Карим Хабиб. Девиз компании — «Freude am Fahren»,. Для англоязычных стран был придуман также «The Ultimate Driving Machine». ' },
    { id: nextMemoId++, type: 'car', price: '50', description:'BMW AG — немецкий производитель автомобилей, мотоциклов, двигателей, а также велосипедов. Председателем компании на сегодняшний день является Норберт Райтхофер, а главным дизайнером — Карим Хабиб. Девиз компании — «Freude am Fahren»,. Для англоязычных стран был придуман также «The Ultimate Driving Machine». ' },
    { id: nextMemoId++, type: 'car', price: '50', description:'BMW AG — немецкий производитель автомобилей, мотоциклов, двигателей, а также велосипедов. Председателем компании на сегодняшний день является Норберт Райтхофер, а главным дизайнером — Карим Хабиб. Девиз компании — «Freude am Fahren»,. Для англоязычных стран был придуман также «The Ultimate Driving Machine». ' },
    { id: nextMemoId++, type: 'car', price: '50', description:'BMW AG — немецкий производитель автомобилей, мотоциклов, двигателей, а также велосипедов. Председателем компании на сегодняшний день является Норберт Райтхофер, а главным дизайнером — Карим Хабиб. Девиз компании — «Freude am Fahren»,. Для англоязычных стран был придуман также «The Ultimate Driving Machine». ' },
];

server.get('/api/memos', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.2) {
            res.send(memos);
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);
});

server.get('/api/memos/:id', (req, res) => {

    setTimeout(() => {
        if (Math.random() > 0.2) {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.statusCode = 400;
                res.send();
                return;
            }

            const memoExpended = memos.find(o => o.id === id);
            if (memoExpended === undefined) {
                res.statusCode = 404;
                res.send();
            }

            memos = memos.filter(o => o.id !== id); // truthy -> !0, !'', !false, !undefined, !null
            res.statusCode = 204; 
            res.send();
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);
});

server.post('/api/memos', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.2) {
            const memo = req.body;

            if (memo.id === 0) {
                memos = [{...memo, id: nextMemoId++}, ...memos];
                res.send();
                return;
            }

            if (memos.find(o => memo.id === o.id) === undefined) {
                res.statusCode = 404;
                res.send();
                return;
            }

            memos = memos.map(o => memo.id === o.id ? memo : o);
            res.send();

        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 5000);
});

server.delete('/api/memos/:id', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.2) {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.statusCode = 400;
                res.send();
                return;
            }

            const memoToRemove = memos.find(o => o.id === id);
            if (memoToRemove === undefined) {
                res.statusCode = 404;
                res.send();
            }

            memos = memos.filter(o => o.id !== id); // truthy -> !0, !'', !false, !undefined, !null
            res.statusCode = 204; // No content
            res.send();
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);


});

server.listen(9999);