import React, { useState, useEffect, useRef } from 'react';


import { db } from '../firebase'; // Firebase Firestore 설정 파일
import { collection, setDoc, doc } from 'firebase/firestore';
import designerData from '../data/designers.json'; // 80명의 디자이너 정보를 담고 있는 JSON 파일




function UploadDesign() {
    const UploadGuest = async () => {
        const designersCollectionRef = collection(db, "designers");

        try {
            for (let designer of designerData) {
                const docRef = doc(designersCollectionRef, designer.id);
                await setDoc(docRef, {
                    name: designer.name
                });
            }
            console.log("디자이너 정보를 Firestore에 성공적으로 업로드했습니다.");
        } catch (error) {
            console.error("Firestore 업로드 중 오류 발생: ", error);
        }
    };
    UploadGuest();

    return (
        <></>
    );
}

export default UploadDesign;
