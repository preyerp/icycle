import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase 설정이 들어있는 파일을 불러옴


// 학생 고유번호 데이터
const studentIds = {
    "강나연": 1,
    "강서영": 2,
    "강슬기": 3,
    "강유민": 4,
    "강해청": 5,
    "고지현": 6,
    "김규리": 7,
    "김도연": 8,
    "김동근": 9,
    "김동현": 10,
    "김미승": 11,
    "김상혁": 12,
    "김수민": 13,
    "김윤아": 14,
    "김윤정": 15,
    "김정혁": 16,
    "김준오": 17,
    "김지유": 18,
    "김태준": 19,
    "김태환": 20,
    "김현민": 21,
    "김희선": 22,
    "김희찬": 23,
    "나하율": 24,
    "문서해": 25,
    "문희배": 26,
    "민예은": 27,
    "민지원": 28,
    "박라은": 29,
    "박서연": 30,
    "박수진": 31,
    "박우진": 32,
    "박유진": 33,
    "박윤희": 34,
    "박제연": 35,
    "배서연": 36,
    "백건하": 37,
    "서여림": 38,
    "서주형": 39,
    "석상현": 40,
    "손주희": 41,
    "송의혁": 42,
    "송현석": 43,
    "신수민": 44,
    "신유담": 45,
    "신은지": 46,
    "안주희": 47,
    "양희경": 48,
    "염정훈": 49,
    "오혜지": 50,
    "원예린": 51,
    "유성환": 52,
    "윤수빈": 53,
    "윤승훈": 54,
    "이가윤": 55,
    "이가을": 56,
    "이민규": 57,
    "이민기": 58,
    "이민지": 59,
    "이상원": 60,
    "이수민": 61,
    "이수연": 62,
    "이연재": 63,
    "이유나": 64,
    "이은경": 65,
    "이은서": 66,
    "이정찬": 67,
    "이정호": 68,
    "이지원": 69,
    "이지은": 70,
    "이창영": 71,
    "이태현": 72,
    "임병모": 73,
    "임세찬": 74,
    "임혜지": 75,
    "장소은": 76,
    "장준호": 77,
    "전예훈": 78,
    "전재민": 79,
    "전지민": 80,
    "정한경": 81,
    "최세린": 82,
    "최수헌": 83,
    "최아영": 84,
    "최진아": 85,
    "최혜지": 86,
    "한다영": 87,
    "허재호": 88,
    "홍성주": 89,
    "황지현": 90
};

// 새로운 컬렉션 생성 함수
const UploadNewProj = async () => {
  const projectsCollection = collection(db, 'projects');  // 기존 projects 컬렉션
  const querySnapshot = await getDocs(projectsCollection);

  querySnapshot.forEach(async (docSnapshot) => {
    const projectData = docSnapshot.data();
    const newTeamMembers = projectData.teamMembers.map((member) => {
      const studentId = studentIds[member.name] || null;  // 해당 팀원의 고유번호
      return {
        ...member, // 기존 정보 복사
        sId: studentId, // 고유번호 추가
      };
    });

    // 이미지를 제외한 프로젝트 정보로 새로운 문서 생성
    const newProjectData = {
      ...projectData,
      teamMembers: newTeamMembers, // 수정된 팀원 정보
    };

    // 이미지 필드 제거
    delete newProjectData.images;
    newProjectData.teamMembers.forEach(member => {
      delete member.profilePic;
    });

    // Firestore에 새로운 컬렉션으로 저장
    await setDoc(doc(db, 'newProjects', docSnapshot.id), newProjectData);
  });

  console.log('newProjects 컬렉션 생성 완료!');
};

export default UploadNewProj();

