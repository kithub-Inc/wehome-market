"use client";

import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import Header from "../../components/Header/Header";

import './Login.css';

export const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [email, setEmail] = useState(``);
    const [pass, setPass] = useState(``);

    const [text, setText] = useState(``);

    const clientId = `587848217633-7m1n5409dgehq7vgculc99gf1m849hk7.apps.googleusercontent.com`;
    
    const login = () => {
        if (email.trim() !== `` && pass.trim() !== ``) {
            fetch(`http://127.0.0.1:1234/oauth/ls`, {
                method: `POST`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pass
                })
            }).then(data => data.json())
            .then(data => {
                if (data?.status === 400) {
                    setText(data?.message);
                    return;
                }

                if (cookies.get(`__UR`)) cookies.remove(`__UR`);
                cookies.set(`__UR`, data[0]);
                navigate(`/`);
            });
        } else {
            setText(`이메일 또는 비밀번호가 공백 상태 입니다.`);
        }
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-page">
                <Header />

                <div className="contents">
                    <div className="container">
                        <div className="login-page-form">
                            <input placeholder="이메일" type="email" onInput={e => setEmail(e.target.value)} /><br />
                            <input placeholder="비밀번호" className="mt10" type="password" onInput={e => setPass(e.target.value)} /><br />
                            <p className="warning mt10 mb5">{text}</p>
                            <button className="primary mb10" onClick={login}>로그인 / 회원가입</button>
                            <GoogleLogin onSuccess={credentialResponse => {
                                const data = jwtDecode(credentialResponse.credential);
                                
                                // eslint-disable-next-line no-unused-expressions
                                fetch(`http://127.0.0.1:1234/oauth/google`, {
                                    method: `POST`,
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email: data.email
                                    })
                                }).then(res => res.json())
                                .then(res => {
                                    if (res?.status === 400) {
                                        setText(res?.message);
                                        return;
                                    }

                                    if (cookies.get(`__UR`)) cookies.remove(`__UR`);
                                    cookies.set(`__UR`, res[0]);
                                    navigate(`/`);
                                });
                            }} width='250px' useOneTap />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login;