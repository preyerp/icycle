import React from 'react'
import styled from "styled-components";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';


const Wrapper=styled.div`
display:flex;
align-items:center;
`

const Menubutton=styled.button`
background: 0;
border: 0;
color:#757575;
padding: 10px 6px;
`

function Icontext() {
  return (
    <Wrapper>
          <Menubutton className="sidenav_button">
              <BookmarkAddOutlinedIcon/>
          </Menubutton>

          <Menubutton className="sidenav_button">
              <MoreHorizOutlinedIcon/>
          </Menubutton>
    </Wrapper>
  )
}

export default Icontext
