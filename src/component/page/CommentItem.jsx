import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Avatar } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { db } from "../../firebase";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding-bottom: 20px;
  cursor:pointer;
  background:white;
  margin-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
`;

const ConetentText = styled.p`
  font-size:16px;
  white-space:pre-wrap;
`;

const ProfileText = styled.p`
  font-size:14px;
  font-weight:500;
  display:flex;
  align-items:center;
  margin-bottom:12px;
`;

const Profilebutton = styled.button`
  margin-right:8px;
  background: 0;
  border: 0;  
`;

const NameText = styled.p`
  margin-right:8px;
  color:#292929;
`;

const TimeText = styled.p`
  color:#757575;
  margin-left:8px;
`;

const Commentwrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Likebtn = styled.button`
  background: 0;
  border: 0;
  color:#757575;
  cursor: pointer;
  padding: 10px 18px;
`;

const RedFavoriteOutlinedIcon = styled(FavoriteOutlinedIcon)`
  color: #d10000;
`;

function CommentItem(props) {
  const { comment } = props;
  const [liked, setLiked] = useState(false);
  const postId = useParams().id;

  useEffect(() => {
    db.collection('post').doc(postId).get().then((doc) => {
      const postData = doc.data();
      setLiked(postData.like || false);
    });
  }, [postId]);

  const handleLikeToggle = () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);

    db.collection('post').doc(postId).update({
      like: newLikeStatus
    }).then(() => {
      console.log('Like status updated successfully!');
    }).catch((error) => {
      console.error('Error updating like status:', error);
    });
  };

  return (
    <Wrapper>
      <Commentwrapper>
        <ProfileText>
          <Profilebutton>
            <Avatar sx={{ width: 24, height: 24 }}>
              <img src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg" alt="" />
            </Avatar>
          </Profilebutton>
          <NameText>석상현</NameText>
          <TimeText>7min ago</TimeText>
        </ProfileText>
        <ConetentText>{comment.content}</ConetentText>
      </Commentwrapper>
      <Likebtn onClick={handleLikeToggle}>
        {liked ? <FavoriteBorderOutlinedIcon /> : <RedFavoriteOutlinedIcon />}
      </Likebtn>
    </Wrapper>
  );
}

export default CommentItem;
