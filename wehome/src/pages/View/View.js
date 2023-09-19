import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

import Header from '../../components/Header/Header';

import './View.css';

import NoImage from '../../imgs/no_image.jpg';

export const View = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [view, setView] = useState([]);
    const [selected, setSelected] = useState();

    const [title, setTitle] = useState(``);
    const [desc, setDesc] = useState(``);
    const [coin, setCoin] = useState(0);

    const [app, setApp] = useState(false);

    const [isModifyModalOpened, setIsModifyModalOpened] = useState(false);

    const { node_id } = useParams();

    useEffect(() => {
        if (!cookies.get(`__UR`)) navigate(`/login`);

        else {
            fetch(`http://127.0.0.1:1234/transaction/info`, {
                method: `POST`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    node_id: node_id
                })
            })
            .then(data => data.json())
            .then(data => {
                if (data?.status === 400) {
                    navigate(`/`);
                    return;
                }

                if (data?.[0].family_name !== cookies.get(`__UR`).family_name) {
                    navigate(`/`);
                    return;
                }

                setView(data);
                setSelected(data[0]?.state);
                
                setTitle(data[0]?.title);
                setDesc(data[0]?.description);
                setCoin(data[0]?.coin);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const useHandleSubmit = () => {
        fetch(`http://127.0.0.1:1234/transaction/update`, {
            method: `POST`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                type: `state`,
                state: selected,
                node_id: view[0]?.node_id
            })
        })
        .then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                navigate(0);
            }
        });
    }

    const useHandleDelete = () => {
        fetch(`http://127.0.0.1:1234/transaction/delete`, {
            method: `POST`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                node_id: view[0]?.node_id
            })
        })
        .then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                navigate(`/transaction`);
            }
        });
    }

    const useHandleModify = () => {
        fetch(`http://127.0.0.1:1234/transaction/update`, {
            method: `POST`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                type: `modify`,
                title: title,
                description: desc,
                coin: coin,
                node_id: view[0]?.node_id
            })
        })
        .then(data => {
            if (data?.status !== 400) {
                navigate(0);
            }
        });
    }

    const useHandleApplication = () => {
        fetch(`http://127.0.0.1:1234/notification/new`, {
            method: `POST`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                seller: view[0]?.email,
                purchaser: cookies.get(`__UR`).email,
                transaction_id: view[0]?.node_id
            })
        })
        .then(data => {
            if (data?.status !== 400) {
                setApp(true);
                
                setTimeout(() => {
                    setApp(false);    
                }, 2000);
            }
        });
    }

    return (
        <div className="view-page">
            <Header />
            
            <div className="contents">
                <div className="view-page-visual">
                    <img src={view[0]?.image === `` ? NoImage : view[0]?.image} alt="no_image" />
                </div>

                <div className="container">
                    <p className="view-page-title">{view[0]?.title}</p>
                    <p className="view-page-date">{`${view[0]?.email.split(`@`)[0]} - ${getTimeAgo(view[0]?.date)}`}</p>
                    <p className="view-page-coin">{view[0]?.coin === 0 ? `(무료 나눔) - ` : ``}{view[0]?.coin} 울집코인</p>

                    <hr />

                    <p className="view-page-desctitle">{view[0]?.email.split(`@`)[0]}님의 설명</p>
                    <p className="view-page-desc">{view[0]?.description}</p>

                    <hr />

                    {
                        view[0]?.email === cookies.get(`__UR`).email ? (
                            <>
                                <select className="view-page-select" onChange={e => setSelected(e.target.value)} value={selected}>
                                    <option value={`판매중`}>판매중</option>
                                    <option value={`예약중`}>예약중</option>
                                    <option value={`거래완료`}>거래완료</option>
                                </select>

                                <button onClick={useHandleSubmit} style={{ width: `auto` }} className="view-page-button primary ml5">변경</button><br />
                                <button onClick={useHandleDelete} style={{ width: `auto` }} className="view-page-button warning mt5">삭제</button>
                                <button onClick={() => setIsModifyModalOpened(true)} style={{ width: `auto` }} className="view-page-button modify ml5">수정</button>
                            </>
                        ) : (
                            <>
                                <br />
                                <button onClick={useHandleApplication} className={`view-page-button ${view[0]?.state === `거래완료` ? `disabled` : `primary`}`} disabled={view[0]?.state === `거래완료` ? true : false} style={app ? {width: `auto`} : {}}>{app ? `신청 알림이 전송되었습니다.` : `거래 신청`}</button>
                            </>
                        )
                    }
                </div>
            </div>

            {
                isModifyModalOpened && (
                    <div className="modal-bg">
                        <div className="modal">
                            <input defaultValue={view[0]?.title} className="mt10" type="text" placeholder="제목" onChange={e => setTitle(e.target.value)} /><br />
                            <input defaultValue={view[0]?.description} className="mt10" type="text" placeholder="설명" onChange={e => setDesc(e.target.value)} /><br />
                            <input defaultValue={view[0]?.coin} className="mt10" min="0" max="100" type="number" placeholder="울집코인" onChange={e => setCoin(e.target.value)} /><br />
                            <button className="mt10 primary" onClick={useHandleModify}>수정</button><br />
                            <button className="mt10" onClick={() => setIsModifyModalOpened(false)}>취소</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default View;