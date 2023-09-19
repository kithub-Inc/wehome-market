import Header from "../../components/Header/Header";

import '../Tutorial/Tutorial.css';

export const Introduce = () => {
	return (
		<div className="tutor-page">
        	<Header />

			<div className="contents mt50">
				<div className="container">
                    <h1 className="tutor-page-title"><span className="primary">소개</span></h1>

					<p className="tutor-page-text mt50">울집마켓의 취지</p>
					<p className="tutor-page-text mt10">
                        울집마켓은 가족 구성원들끼리 가깝고 따뜻한 관계를 형성하며,<br />
                        서로의 생활을 더욱 풍요롭게 만들고 소통하는데 초점을 맞춘 특별한 가상화폐 거래 플랫폼입니다.<br />
                        이 서비스를 통해 가족 구성원들은 울집코인을 사용하여 집에서 간단하게 물건이나 서비스를 거래할 수 있으며,<br />
                        그 과정에서 서로를 더 알아가고 소통하는 기회를 얻을 수 있습니다.<br />
                        <br />
                        가족 구성원들은 게시글을 올릴때 울집코인을 설정할 수 있으며,<br />
                        이 코인의 시세가 항상 변동합니다.<br />
                        그렇기 때문에 거래 게시글을 올릴 때 울집코인의 시세를 고려하여<br />
                        적절한 가격으로 거래를 진행할 수 있습니다.<br />
                        <br />
                        우리집마켓은 단순히 상품 거래의 플랫폼을 넘어서, <br />
                        가족 구성원들 간의 소통과 커뮤니케이션을 촉진하는 역할을 합니다.<br />
                        가족 구성원이 거래 게시글을 통해 서로의 관심사를 이해하고<br />
                        소중한 순간을 함께 나눌 수 있습니다.<br />
                        또한, 가족 그룹 내에서 소소한 경쟁이나 이벤트를 진행하여<br />
                        가족 구성원들 간의 유대감을 강화할 수 있습니다.<br />
                        <br />
                        울집마켓은 따뜻하고 안전한 가족 공간을 지향하며,<br />
                        거래와 소통을 통해 가족 구성원들 간의 유대감을 극대화합니다.<br />
                        또한, 울집코인을 통해 가족 구성원들이 집안에서<br />
                        필요로 하는 서비스나 물건을 더욱 효율적으로 구매하고 판매할 수 있어<br />
                        가정 생활의 질을 높이는데 기여하고자 합니다.<br />
                        이를 통해 가족 구성원들이 더 가깝고 소중한 관계를 형성하며,<br />
                        행복한 가정을 만들어 나갈 수 있기를 바랍니다.<br />
                    </p>
				</div>
			</div>
		</div>
	)
}

export default Introduce;