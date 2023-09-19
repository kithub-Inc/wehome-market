import { Link, useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useEffect, useState } from "react";

import './Header.css';

import LOGO from '../../imgs/LOGO.png';
import Upload from '../../imgs/upload.png';
import Bell from '../../imgs/bell.png';

// eslint-disable-next-line no-undef
export const Header = (param = { className } = { className: `` }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);
    const [isSettingModalOpened, setIsSettingModalOpened] = useState(false);
    const [isNotificationModalOpened, setIsNotificationModalOpened] = useState([false, -1]);

    const [email, setEmail] = useState(``);

    const [title, setTitle] = useState(``);
    const [desc, setDesc] = useState(``);
    const [coin, setCoin] = useState(0);
    const [base64Text, setBase64Text] = useState(``);

    const [family, setFamily] = useState([]);
    const [notification, setNotification] = useState([]);

    const handleFileInputChange = event => {
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            const base64Image = fileContent.split(',')[1];

            setBase64Text(base64Image);
        }

        reader.readAsDataURL(file);
    }

    const handleSubmit = () => {
        if (title.trim() !== `` && desc.trim() !== ``) {
            fetch(`http://127.0.0.1:1234/transaction/new`, {
                method: `POST`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    image: base64Text,
                    email: cookies.get(`__UR`).email,
                    family_name: cookies.get(`__UR`).family_name,
                    title: title,
                    description: desc,
                    coin: coin
                })
            }).then(data => data.json())
            .then(data => {
                setIsUploadModalOpened(false);
                navigate(`/transaction/${data[0].node_id}`);
            });
        }
    }

    const handleAddOnclick = () => {
        fetch(`http://127.0.0.1:1234/oauth/family/modify`, {
            method: `POST`,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                family_name: cookies.get(`__UR`).family_name,
                email: email
            })
        }).then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                navigate(0);
            }
        });
    }

    const handleDeleteOnclick = () => {
        fetch(`http://127.0.0.1:1234/oauth/family/exit`, {
            method: `POST`,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: cookies.get(`__UR`).email
            })
        }).then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                if (cookies.get(`__UR`)) cookies.remove(`__UR`);
                navigate(`/login`);
            }
        });
    }

    const handleNewOnclick = () => {
        fetch(`http://127.0.0.1:1234/oauth/family/new`, {
            method: `POST`,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                family_name: title,
                email: cookies.get(`__UR`).email
            })
        }).then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                if (cookies.get(`__UR`)) cookies.remove(`__UR`);
                navigate(`/login`);
            }
        });
    }

    const handleModify = () => {
        fetch(`http://127.0.0.1:1234/transaction/update`, {
            method: `POST`,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                type: `state`,
                state: `예약중`,
                node_id: notification[isNotificationModalOpened[1]].node_id
            })
        })
        .then(data => data.json())
        .then(data => {
            if (data?.status !== 400) {
                const script = document.createElement(`script`);
                script.text = `document.querySelector('.ticket-btns').style.transform = 'rotateZ(25deg)';`;
                document.body.appendChild(script);
        
                setTimeout(() => {
                    const script = document.createElement(`script`);
                    script.text = `document.querySelector('.ticket-btns').style.transform = 'rotateZ(20deg) translateY(150px)'; document.querySelector('.ticket-btns').style.opacity = '0';`;
                    document.body.appendChild(script);
        
                    setTimeout(() => {
                        setIsNotificationModalOpened([false, -1]);
                        navigate(0);
                    }, 750);
                }, 750);
            }
        });
    }

    useEffect(() => {
        if (cookies.get(`__UR`)) {
            fetch(`http://127.0.0.1:1234/oauth/family`, {
                method: `POST`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    family_name: cookies.get(`__UR`).family_name
                })
            }).then(data => data.json())
            .then(data => {
                if (data?.status !== 400) {
                    setFamily(data);
                }
            });

            fetch(`http://127.0.0.1:1234/notification/list`, {
                method: `POST`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    seller: cookies.get(`__UR`).email
                })
            }).then(data => data.json())
            .then(data => {
                if (data?.status !== 400) {
                    setNotification(data);
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	return (
        <>
            <div className={ `header ${param.className}` }>
                <div className="container">
                    <div className="header-items">
                        <div className="header-item">
                            <Link to="/"><img src={LOGO} alt="logo" /></Link>
                        </div>

                        <div className="header-item">
                            <Link to="/">홈</Link>
                        </div>

                        <div className="header-item">
                            <Link to="/introduce">소개</Link>
                        </div>

                        <div className="header-item">
                            <Link to="/tutorial">튜토리얼</Link>
                        </div>

                        {
                            cookies.get(`__UR`) && (
                                <div className="header-item">
                                    <Link to="/transaction" className="point">거래</Link>
                                </div>
                            )
                        }
                    </div>

                    <div className="header-items">
                        {
                            cookies.get(`__UR`) ? (
                                <>
                                    <div className="header-item">
                                        <div className="dropdown">
                                            <Link className="dropdown-title"><img src={Bell} alt="bell" /></Link>
                
                                            <div className="dropdown-main" style={{ right: `auto` }}>
                                                <div className="dropdown-items">
                                                    {
                                                        notification.map((notice, idx) => (
                                                            <div className="dropdown-item" key={idx}>
                                                                <Link onClick={() => setIsNotificationModalOpened([true, idx])}>[{notice.title}] 거래 요청 알림</Link>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="header-item">
                                        <Link onClick={() => setIsUploadModalOpened(true)}><img src={Upload} alt="upload" /></Link>
                                    </div>

                                    <div className="header-item">
                                        <div className="dropdown">
                                            <Link className="dropdown-title">{cookies.get(`__UR`).email.split(`@`)[0]}</Link>
                
                                            <div className="dropdown-main">
                                                <div className="dropdown-items">
                                                    <div className="dropdown-item">
                                                        <Link onClick={() => setIsSettingModalOpened(true)}>가족 구성원</Link>
                                                    </div>
                
                                                    <div className="dropdown-item">
                                                        <Link onClick={() => setIsSettingModalOpened(true)}>설정</Link>
                                                    </div>
                
                                                    <div className="dropdown-item">
                                                        <Link to="/logout">로그아웃</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="header-item">
                                    <Link to="/login">로그인</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                isUploadModalOpened && (
                    <div className="modal-bg">
                        <div className="modal">
                            <input type="file" accept="image/*" onChange={handleFileInputChange} /><br />
                            <input className="mt10" type="text" placeholder="제목" onChange={e => setTitle(e.target.value)} /><br />
                            <textarea className="mt10" type="text" placeholder="설명" onChange={e => setDesc(e.target.value)} style={{ resize: `vertical` }}></textarea><br />
                            {/* <input className="mt10" type="text" placeholder="설명" onChange={e => setDesc(e.target.value)} /><br /> */}
                            <input className="mt10" min="0" max="100" type="number" placeholder="울집코인" onChange={e => setCoin(e.target.value)} /><br />
                            <button className="mt10 primary" onClick={handleSubmit}>게시</button><br />
                            <button className="mt10" onClick={() => setIsUploadModalOpened(false)}>취소</button>
                        </div>
                    </div>
                )
            }

            {
                isSettingModalOpened && (
                    <div className="modal-bg">
                        <div className="modal">
                            <p className="modal-subtext">표시되는 이름: {cookies.get(`__UR`).email.split(`@`)[0]}</p>

                            <p className="modal-subtext mt20">이메일</p>
                            <input type="text" readOnly value={cookies.get(`__UR`).email} />

                            {
                                cookies.get(`__UR`).family_name !== `` ? (
                                    <>
                                        <p className="modal-subtext mt20">가족 이름</p>
                                        <input type="text" readOnly value={cookies.get(`__UR`).family_name} /><br />
            
                                        <p className="modal-subtext mt20">가족 구성원</p>
                                        {
                                            family.map((fam, idx) => <p key={idx} className="modal-subtext mt10">{fam.email.split(`@`)[0]}: {fam.email.split(`@`)[1]}</p>)
                                        }
            
                                        <p className="modal-subtext mt20">이메일로 가족 구성원 추가</p>
                                        <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} /><br />
                                        <button className="mt5 primary" onClick={handleAddOnclick}>가족 구성원 추가</button><br />
            
                                        <button className="mt5 warning" onClick={handleDeleteOnclick}>독립</button><br />
                                    </>
                                ) : (
                                    <>
                                        <p className="modal-subtext mt20">가족 만들기</p>
                                        <input type="text" placeholder="가족(그룹) 이름" onChange={e => setTitle(e.target.value)} /><br />
                                        <button className="mt5 primary" onClick={handleNewOnclick}>가족 만들기</button><br />
                                    </>
                                )
                            }

                            <button className="mt20" onClick={() => setIsSettingModalOpened(false)}>닫기</button>
                        </div>
                    </div>
                )
            }

            {
                isNotificationModalOpened[0] && (
                    <div className="modal-bg">
                        <div className="modal modal-ticket">
                            <div className="ticket-body">
                                <p className="modal-title">{notification[isNotificationModalOpened[1]].title}</p>
                                <p className="modal-subtext">{notification[isNotificationModalOpened[1]].description}</p><br />

                                <p className="modal-subtext">판매: {notification[isNotificationModalOpened[1]].seller.split(`@`)[0]}</p>
                                <p className="modal-subtext">구매: {notification[isNotificationModalOpened[1]].purchaser.split(`@`)[0]}</p><br />
                            </div>

                            <hr />

                            <div className="ticket-btns">
                                <button className="mt10 primary" onClick={handleModify}>거래 예약</button><br />
                                <button className="mt10" onClick={() => setIsNotificationModalOpened(false)}>취소</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
	)
}

export default Header;