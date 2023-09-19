const express = require(`express`);
const cors = require(`cors`);
const mysql = require(`mysql2`);
const crypto = require(`crypto`);
const pako = require(`pako`);
const fs = require(`fs`);
const dotenv = require(`dotenv`);

dotenv.config();

const connection = mysql.createConnection({
    host: `127.0.0.1`,
    user: process.env.SQL_USER_NAME,
    password: process.env.SQL_USER_PASSWORD,
    database: process.env.SQL_USER_DATABASE,
    port: 3306
});

connection.connect();

const app = express();

app.use(express.json());
app.use(cors());

// oauth
app.post(`/oauth/ls`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.email || !req.body.password) { res.send(JSON.stringify({ status: 400, message: `이메일 또는 비밀번호가 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.email.trim() === `` || req.body.password.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `이메일 또는 비밀번호가 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`SELECT email, family_name FROM users WHERE email = ? AND password = ?`, [req.body.email, crypto.createHash(`sha256`).update(req.body.password).digest(`hex`)], (error, rows, field) => {
        if (rows.length === 0) {
            connection.query(`SELECT email, family_name FROM users WHERE email = ?`, [req.body.email], (error, rows, field) => {
                if (rows.length === 0) {
                    connection.query(`INSERT INTO users (email, password, family_name) VALUES (?, ?, ?)`, [req.body.email, crypto.createHash(`sha256`).update(req.body.password).digest(`hex`), ``], (error, rows, field) => {
                        connection.query(`SELECT email, family_name FROM users WHERE email = ?`, [req.body.email], (error, rows, field) => {
                            res.send(JSON.stringify(rows, null, 4));
                        });
                    });
                } else {
                    res.send(JSON.stringify([], null, 4));
                }
            });
        } else {
            res.send(JSON.stringify(rows, null, 4));
        }
    });
});

app.post(`/oauth/google`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.email) { res.send(JSON.stringify({ status: 400, message: `이메일이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.email.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `이메일이 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`SELECT email, family_name FROM users WHERE email = ?`, [req.body.email], (error, rows, field) => {
        if (rows.length === 0) {
            connection.query(`INSERT INTO users (email, password, family_name) VALUES (?, ?, ?)`, [req.body.email, crypto.createHash(`sha256`).update(req.body.email).digest(`hex`), ``], (error, rows, field) => {
                connection.query(`SELECT email, family_name FROM users WHERE email = ?`, [req.body.email], (error, rows, field) => {
                    res.send(JSON.stringify(rows, null, 4));
                });
            });
        } else {
            res.send(JSON.stringify(rows, null, 4));
        }
    });
});

app.post(`/oauth/family`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.family_name) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.family_name.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`SELECT email FROM users WHERE family_name = ?`, [req.body.family_name], (error, rows, field) => {
        res.send(JSON.stringify(rows, null, 4));
    });
});

app.post(`/oauth/family/modify`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.email) { res.send(JSON.stringify({ status: 400, message: `이메일이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.email.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `이메일이 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`SELECT family_name FROM users WHERE email = ?`, [req.body.email], (error, rows, field) => {
        if (rows[0]?.family_name === ``) {
            if (!req.body.family_name) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 존재하지 않습니다.` }, null, 4)); return; }
            if (req.body.family_name.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 공백 상태 입니다.` }, null, 4)); return; }

            connection.query(`UPDATE users SET family_name = ? WHERE email = ?`, [req.body.family_name, req.body.email], (error, rows, field) => {
                res.send(JSON.stringify(rows, null, 4));
            });
        } else {
            res.send(JSON.stringify([], null, 4));
        }
    });
});

app.post(`/oauth/family/exit`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.email) { res.send(JSON.stringify({ status: 400, message: `이메일이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.email.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `이메일이 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`UPDATE users SET family_name = ? WHERE email = ?`, [``, req.body.email], (error, rows, field) => {
        res.send(JSON.stringify(rows, null, 4));
    });
});

app.post(`/oauth/family/new`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (!req.body.family_name) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.family_name.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 공백 상태 입니다.` }, null, 4)); return; }
    
    connection.query(`SELECT email FROM users WHERE family_name = ?`, [req.body.family_name], (error, rows, field) => {
        if (rows.length === 0) {
            if (!req.body.email) { res.send(JSON.stringify({ status: 400, message: `이메일이 존재하지 않습니다.` }, null, 4)); return; }
            if (req.body.email.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `이메일이 공백 상태 입니다.` }, null, 4)); return; }

            connection.query(`UPDATE users SET family_name = ? WHERE email = ?`, [req.body.family_name, req.body.email], (error, rows, field) => {
                res.send(JSON.stringify(rows, null, 4));
            });
        }
    });
});

// transaction
app.post(`/transaction/list`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (!req.body.family_name) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.family_name.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `가족 이름이 공백 상태 입니다.` }, null, 4)); return; }

    connection.query(`SELECT * FROM transactions WHERE family_name = ? ORDER BY node_id DESC`, [req.body.family_name], (error, rows, field) => {
        rows.forEach(row => {
            if (row.image) {
                const data = fs.readFileSync(row.image);
                const base64ImageData = data.toString('base64');
                row.image = `data:image/png;base64,${base64ImageData}`;
            }
        });
        
        res.send(JSON.stringify(rows, null, 4));
    });
});

app.post(`/transaction/info`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (!req.body.node_id) { res.send(JSON.stringify({ status: 400, message: `게시물이 존재하지 않습니다.` }, null, 4)); return; }

    connection.query(`SELECT * FROM transactions WHERE node_id = ?`, [req.body.node_id], (error, rows, field) => {
        if (rows[0].image) {
            const data = fs.readFileSync(rows[0].image);
            const base64ImageData = data.toString('base64');
            rows[0].image = `data:image/png;base64,${base64ImageData}`;
        }

        res.send(JSON.stringify(rows, null, 4));
    });
});

app.post(`/transaction/new`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    let path = ``;

    if (req.body.image !== ``) {
        const binaryImageData = Buffer.from(req.body.image, 'base64');
        path = `./imgs/${Math.random().toString(36)}${Math.random().toString(36)}${Math.random().toString(36)}${Math.random().toString(36)}.png`;
        fs.writeFileSync(path, binaryImageData);
    }

    connection.query(`INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES (?, ?, ?, ?, ?, ?, ?)`, [path, req.body.email, req.body.family_name, req.body.title, req.body.description, req.body.coin, `판매중`], (error, rows, field) => {
        console.log(error);
        connection.query(`SELECT * FROM transactions WHERE email = ? AND family_name = ? AND title = ?`, [req.body.email, req.body.family_name, req.body.title], (error, rows, field) => {
            res.send(JSON.stringify(rows, null, 4));
        });
    });
});

app.post(`/transaction/update`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (req.body.type === `state`) {
        if (!req.body.state || !req.body.node_id) { res.send(JSON.stringify({ status: 400, message: `존재하지 않는 항목이 있습니다.` }, null, 4)); return; }
        if (req.body.state.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `공백 상태인 항목이 있습니다.` }, null, 4)); return; }

        connection.query(`UPDATE transactions SET state = ? WHERE node_id = ?`, [req.body.state, req.body.node_id], (error, rows, field) => {
            res.send(JSON.stringify(rows, null, 4));
        });
    } else if (req.body.type === `modify`) {
        if (!req.body.title || !req.body.description || !req.body.coin || !req.body.node_id) { res.send(JSON.stringify({ status: 400, message: `존재하지 않는 항목이 있습니다.` }, null, 4)); return; }
        if (req.body.title.trim() === `` || req.body.description.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `공백 상태인 항목이 있습니다.` }, null, 4)); return; }

        connection.query(`UPDATE transactions SET title = ?, description = ?, coin = ? WHERE node_id = ?`, [req.body.title, req.body.description, req.body.coin, req.body.node_id], (error, rows, field) => {
            res.send(JSON.stringify(rows, null, 4));
        });
    }
});

app.post(`/transaction/delete`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (!req.body.node_id) { res.send(JSON.stringify({ status: 400, message: `게시물이 존재하지 않습니다.` }, null, 4)); return; }

    connection.query(`DELETE FROM transactions WHERE node_id = ?`, [req.body.node_id], (error, rows, field) => {
        res.send(JSON.stringify(rows, null, 4));
    });
});

// stock
let stockData = { price: 20, percent: undefined };

setInterval(() => {
    if (stockData.price < 10) {
        stockData.price += Math.floor(Math.random() * 2);
    } else if (stockData.price > 60) {
        stockData.price -= Math.floor(Math.random() * 2);
    } else {
        if (Math.floor(Math.random() * 2) === 1) {
            stockData.price += Math.floor(Math.random() * 2);
        } else {
            stockData.price -= Math.floor(Math.random() * 2);
        }
    }
}, 5000);

const calculatePercentageChange = (baseTime, currentTime) => {
    const percentageChange = ((currentTime - baseTime) / baseTime) * 100;
    return parseFloat(percentageChange.toFixed(2));
}

app.get(`/stock`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    const percentageChange = calculatePercentageChange(20, stockData.price);
    stockData.percent = percentageChange;
    
    res.send(JSON.stringify(stockData, null, 4));
});

// notification
app.post(`/notification/new`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);

    if (!req.body.seller || !req.body.purchaser || !req.body.transaction_id) { res.send(JSON.stringify({ status: 400, message: `존재하지 않는 항목이 있습니다.` }, null, 4)); return; }
    if (req.body.seller.trim() === `` || req.body.purchaser.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `공백 상태인 항목이 있습니다.` }, null, 4)); return; }
    
    connection.query(`INSERT INTO notifications (seller, purchaser, transaction_id) VALUES (?, ?, ?)`, [req.body.seller, req.body.purchaser, req.body.transaction_id], (error, rows, field) => {
        res.send(JSON.stringify(rows, null, 4));
    });
});

app.post(`/notification/list`, (req, res) => {
    res.setHeader(`Content-type`, `application/json`);
    
    if (!req.body.seller) { res.send(JSON.stringify({ status: 400, message: `판매자가 존재하지 않습니다.` }, null, 4)); return; }
    if (req.body.seller.trim() === ``) { res.send(JSON.stringify({ status: 400, message: `판매자가 없습니다.` }, null, 4)); return; }
    
    connection.query(`SELECT * FROM notifications AS N INNER JOIN transactions AS T ON N.transaction_id = T.node_id AND N.seller = ? ORDER BY N.node_id DESC`, [req.body.seller], (error, rows, field) => {
        res.send(JSON.stringify(rows, null, 4));
    });
});

app.listen(1234, () => {
    console.log(`[ ! ] Server Started`);
});