import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import iconCopy from './icon-copy.png';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  min-height: 44px;
`;

const UserInfoImg = styled.img`
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserInfoName = styled.p`
  color: #393a3a;
  font-weight: bold;
`;

const CopyUrlToFeed = styled.div`
  display: flex;
  margin-top: 16px;
`;

const CopyUrlInput = styled.input`
  padding: 10px;

  background: #fff;
  border: 1px solid #edeff5;
`;

const CopyUrlButton = styled.button`
  background: #fff;
  border: 1px solid #edeff5;
  margin-left: -1px;
  padding: 6px 10px;
  cursor: pointer;

  img {
    height: 25px;
  }
`;

const urlToFeed = 'https://storage.cloud.google.com/rublevka-export-384da.appspot.com/cian-feed.xml';

export default function ({ currentUser }) {
  return (
    <Footer>
      <UserInfo>
        {currentUser && (
          <>
            <UserInfoImg src={currentUser.photoURL} />

            <UserInfoName>{currentUser.displayName}</UserInfoName>
          </>
        )}
      </UserInfo>

      <CopyUrlToFeed>
        <CopyUrlInput type="text" defaultValue={urlToFeed} disabled />

        <CopyToClipboard text={urlToFeed}>
          <CopyUrlButton>
            <img src={iconCopy} alt="" />
          </CopyUrlButton>
        </CopyToClipboard>
      </CopyUrlToFeed>
    </Footer>
  );
}
