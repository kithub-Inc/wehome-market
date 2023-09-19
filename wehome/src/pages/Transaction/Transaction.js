import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";

import './Transaction.css';

import NoImage from '../../imgs/no_image.jpg';

export const Transaction = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [stockData, setStockData] = useState({});

    useEffect(() => {
        if (!cookies.get(`__UR`)) navigate(`/login`);

        else {
            fetch(`http://127.0.0.1:1234/transaction/list`, {
                method: `POST`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    family_name: cookies.get(`__UR`).family_name
                })
            })
            .then(data => data.json())
            .then(data => {
                if (data?.status !== 400) {
                    setTransactions(data);
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadData = () => {
        fetch(`http://127.0.0.1:1234/stock`)
        .then(data => data.json())
        .then(data => {
            setStockData(data);
        });
    }

    useEffect(() => {
        loadData();
        
        setInterval(() => {
            loadData();
        }, 5000);
    }, []);

    const getTimeAgo = timestamp => {
        const now = new Date();
        const past = new Date(timestamp);
        const elapsed = Math.round((now - past) / 1000);
    
        if (elapsed < 60) return `${elapsed}초 전`;
        if (elapsed < 3600) return `${Math.floor(elapsed / 60)}분 전`;
        if (elapsed < 86400) return `${Math.floor(elapsed / 3600)}시간 전`;
        if (elapsed < 2592000) return `${Math.floor(elapsed / 86400)}일 전`;
        if (elapsed < 31536000) return `${Math.floor(elapsed / 2592000)}달 전`;
        return `${Math.floor(elapsed / 31536000)}년 전`;
    }

	return (
		<div className="transact-page">
        	<Header />

			<div className="contents">
				<div className="container">
                    <p className="transact-page-title">현재 울집코인 시세</p>
                    <p className="transact-page-subtitle">{stockData.price ? `${stockData.price}분` : `불러오는중`} {stockData.percent ? `(${stockData.percent}%` : ``} {stockData.percent ? (stockData.percent < 0 ? `⬇)` : `⬆)`) : ``}</p>
                    <p className="transact-page-subtext">{stockData.percent ? `어제보다 ${stockData.percent}% ${stockData.percent < 0 ? `떨어졌어요` : `올랐어요`}!` : `...`}</p>

                    <hr />

                    <div className="transact-page-items">
                        {
                            transactions.map((transaction, idx) => (
                                <div className={`transact-page-item ${transaction.state === `거래완료` ? `disabled` : ``}`} key={idx}>
                                    <div className="transact-page-item-image">
                                        <img src={transaction.image.trim() === `` ? NoImage : transaction.image} alt="no_image" />
                                    </div>

                                    <div className="ml25">
                                        <p className="transact-page-item-title" onClick={() => navigate(`/transaction/${transaction.node_id}`)}>{transaction.title}</p>
                                        <p className="transact-page-item-date mt5">{`${transaction.email.split(`@`)[0]} - ${getTimeAgo(transaction.date)}`}</p>
                                        {
                                            transaction.coin === 0 ?
                                            <p className="transact-page-item-coin mt10" style={{ textDecoration: `red wavy underline` }}>나눔중 ;)</p>
                                            :
                                            <p className="transact-page-item-coin mt10">{transaction.coin} 울집코인 ({stockData.price ? `${transaction.coin * stockData.price}분` : `...`}) - {transaction.state}</p>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
				</div>
			</div>
		</div>
	)
}

export default Transaction;