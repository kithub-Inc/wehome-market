DROP DATABASE IF EXISTS wehome_market;
CREATE DATABASE wehome_market;
USE wehome_market;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	node_id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255),
	PASSWORD VARCHAR(1000),
	family_name VARCHAR(20)
);
ALTER TABLE users convert to charset utf8;

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
	node_id INT AUTO_INCREMENT PRIMARY KEY,
	image VARCHAR(10000),
	email VARCHAR(255),
	family_name VARCHAR(20),
	title VARCHAR(100),
	description VARCHAR(500),
	coin INT,
	state VARCHAR(50),
	date DATETIME DEFAULT NOW()
);
ALTER TABLE transactions convert to charset UTF8;

DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
	node_id INT AUTO_INCREMENT PRIMARY KEY,
	seller VARCHAR(255),
	purchaser VARCHAR(255),
	transaction_id INT
);
ALTER TABLE notifications convert to charset utf8;

INSERT INTO users (email, password, family_name) VALUES ("ice1github@gmail.com", "d78b348ac71936298b83a0397bbdd9c434898f6e955495721edacd3b493d4ed7", "메롱시티");
INSERT INTO users (email, password, family_name) VALUES ("gseoon82@gmail.com", "1479fe367f207ec23715b3c6c5da882dfdf1dd2628133ad089701317c2029f2c", "메롱시티");

INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("", "gseoon82@gmail.com", "메롱시티", "뉴진스 포카 7장", "친구한테 선물받은 포토카드 팝니다. 일괄 6 개당 1", "123", "예약중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.1vwvwpztms10.hzrhhbx1b40.jq5a1gmam8m0.i2ruqstpt2q.png", "gseoon82@gmail.com", "메롱시티", "스벅 아아 깊티", "아메리카노가 너무 써요,,", "4", "거래완료");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.ohy9b42fhc0.awphmfuxs390.9ozo9dtsqgw0.z3q1t4bdf2.png", "gseoon82@gmail.com", "메롱시티", "cox ck87 풀박", "한번도 안 쓴 새 상품 입니다.", "17", "예약중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.xx9afe7pvki0.3h1xemwas5t0.eiajrfjayp70.9qsbef8rkx.png", "gseoon82@gmail.com", "메롱시티", "이세계아이돌 릴파 포토카드", "별나무카페에서 받은 아주 희귀한 물건 입니다.", "79", "거래완료");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.4nk8u8j79dv0.rkopny1ayi0.me1nbcugubq0.bmtj0bj54ze.png", "gseoon82@gmail.com", "메롱시티", "Apple Vision Pro", "아직 나오지도 않은 비전 프로 팝니다 성능은 확실해요 ^^", "201", "판매중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.b6gec9cebt60.yni0okbq2t0.u4cspx6nqv0.1z0afi6q2su.png", "gseoon82@gmail.com", "메롱시티", "고앵이 사진들", "커여운 꼬앵이들 ❤❤❤", "0", "판매중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.xx0o4otzll0.6bh7vb692kc0.v7uqkhmxmf0.alt78zupgnn.png", "gseoon82@gmail.com", "메롱시티", "폰트 제작 외주", "원하는 폰트 만들어드려요~!", "13", "판매중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("", "ice1github@gmail.com", "메롱시티", "💫 아들표 효도 마사지샵", "효도 마사지샵은 언제나 운영중입니다!", "1", "판매중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("", "ice1github@gmail.com", "메롱시티", "아빠 설거지좀 부탁해요~", "너무 귀찮고 힘들어서 한번만 쉴게요~^^", "2", "판매중");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.hrmfr2y18j0.5jte23nohky0.76l7gx48h4j0.ee4cn2zy9s.png", "ice1github@gmail.com", "메롱시티", "에어팟 프로", "프로 2 나와서 버렸습니다.", "7", "거래완료");
INSERT INTO transactions (image, email, family_name, title, description, coin, state) VALUES ("./imgs/0.85f7e70jdo0.nl17bzbwmn90.t12vooqzkt0.kwzqvaf92el.png", "ice1github@gmail.com", "메롱시티", "IPhone 15 Pro Max", "아직 나오지도 않은 신상품 아이폰 15 프로맥스 팝니다.", "42", "판매중");

SELECT * FROM users;
SELECT * FROM transactions;
SELECT * FROM notifications;