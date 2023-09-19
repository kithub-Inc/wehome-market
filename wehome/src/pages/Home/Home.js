import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";

import character from '../../imgs/character.svg';

import './Home.css';

export const Home = () => {
	const navigate = useNavigate();

    const moveHandle = () => {
        const script = document.createElement(`script`);
        script.text = `document.querySelector('[alt="character"]').style.transform = 'translate(-100px, 200px)'; document.querySelector('[alt="character"]').style.opacity = '1';`;
        document.body.appendChild(script);

        setTimeout(() => {
            const script = document.createElement(`script`);
            script.text = `document.querySelector('[alt="character"]').style.marginLeft = '700px'; document.querySelector('[alt="character"]').style.marginTop = '-800px';`;
            document.body.appendChild(script);

            setTimeout(() => {
                navigate(`/tutorial`);
            }, 500);
        }, 1000);
    }

	return (
		<div className="home-page">
        	<Header className="overflow" />

			<div className="contents">
                <img draggable="false" style={{ marginLeft: `225px`, transition: `margin-left .5s ease-in, margin-top .5s ease-in, transform 1s, opacity .5s`, opacity: 0 }} src={character} alt="character" onClick={moveHandle} />

                <div style={{ paddingRight: `225px`, marginRight: `200px`, height: `100%`, background: `linear-gradient(to right, transparent, white)`, width: `1000px`, display: `flex`, justifyContent: `center`, flexDirection: `column` }}>
                    <p className="home-page-title">WEHOME<br />MARKET</p>
                    <p className="home-page-desc mt25">집 안에서<br />중고거래 하기</p>
                </div>
			</div>
		</div>
	)
}

export default Home;