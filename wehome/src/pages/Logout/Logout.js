"use client";

import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    cookies.remove(`__UR`);
    useEffect(() => navigate(`/`));
}

export default Logout;