import Header from "../../components/Header/Header";

import './Tutorial.css';

export const Tutorial = () => {
	return (
		<div className="tutor-page">
        	<Header />

			<div className="contents mt50">
				<div className="container">
					<div className="flex">
						<div>
							<h1 className="tutor-page-title"><span className="primary">튜토리얼</span></h1>
							<p className="tutor-page-desc mt25">울집마켓 이용 튜토리얼</p>
						</div>

						<div>
							<p className="tutor-page-text warning">* 울집마켓 이용규칙 (간단)</p>
							<p className="tutor-page-text mt5">- 사기, 구걸, 욕설 <span className="underline">절대금지</span></p>
						</div>
					</div>

					<blockquote className="mt50">
                    	<p className="tutor-page-text">울집코인의 <code>분</code>은 주식처럼 변동해요!</p>
					</blockquote>

					<p className="tutor-page-text mt50">가족 그룹 만들기 (로그인 필요)</p>
					<p className="tutor-page-text mt10 ml10">- 헤더에 자신의 <code>이메일 앞 부분</code>탭에 마우스를 올립니다.</p>
					<p className="tutor-page-text mt10 ml10">- 메뉴 목록이 표시되면, <code>가족 구성원</code>메뉴 또는 <code>설정</code>메뉴를 클릭합니다.</p>
					<p className="tutor-page-text mt10 ml10">- 가족 이름을 결정하고 <code>가족 만들기</code>버튼을 클릭하면 해당 이름의 가족 그룹이 만들어집니다.</p>
					<p className="tutor-page-text mt10 ml10">- 이제부터 <code>이메일로 가족 구성원을 추가</code>할수 있습니다.</p>

					<p className="tutor-page-text mt50">거래 글 게시 (로그인 필요)</p>
					<p className="tutor-page-text mt10 ml10">- 헤더의 <code>거래</code>탭에 들어갑니다.</p>
					<p className="tutor-page-text mt10 ml10">- <code>울집코인</code>의 시세를 확인합니다.</p>
					<p className="tutor-page-text mt10 ml10">- 헤더의 <code>업로드</code>아이콘을 누른뒤, 이미지와 제목, 설명과 코인 갯수를 입력하고 게시합니다.</p>
					<p className="tutor-page-text mt10 ml10">- 업로드한 글이 자동으로 보이지 않는다면, 헤더의 <code>거래</code>탭에서 확인할 수 있습니다.</p>

					<p className="tutor-page-text mt50">거래 신청 (로그인 필요)</p>
					<p className="tutor-page-text mt10 ml10">- 헤더의 <code>거래</code>탭에 들어갑니다.</p>
					<p className="tutor-page-text mt10 ml10">- <code>울집코인</code>의 시세를 확인합니다.</p>
					<p className="tutor-page-text mt10 ml10">- 거래 하고싶은 글로 들어가 맨 아래 <code>거래신청</code>버튼을 클릭합니다.</p>
					<p className="tutor-page-text mt10 ml10">- 버튼을 클릭했다면, 판매자에게 알림이 전송됩니다. 판매자가 승인한다면 구매자에게 알림이 떠서 거래하실 수 있습니다.</p>
					<p className="tutor-page-text mt10 ml10">- 알림은 헤더의 <code>알림</code>탭에서 확인하실 수 있습니다.</p>

					<blockquote className="mt50">
						<p className="tutor-page-text">자꾸 뭐만하면 로그아웃이 되는 문제가 지속되고 있어요. 개선 될때까지 기다려주실거죠? ;)</p>
					</blockquote>
				</div>
			</div>
		</div>
	)
}

export default Tutorial;