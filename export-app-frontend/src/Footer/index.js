import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { media } from '../UI';
import iconCopy from './icon-copy.png';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${media.greaterThan('sm')`
    flex-direction: row;
  `}
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
  margin-right: -1px;
  padding: 6px 10px;
  cursor: pointer;

  img {
    height: 25px;
  }
`;

const CopiedText = styled.p`
  font-size: 14px;
  color: #23cc79;
  margin-right: 6px;
`;

const urlToFeed = 'https://firebasestorage.googleapis.com/v0/b/rublevka-export-384da.appspot.com/o/cian-feed.xml?alt=media';

export default function ({ currentUser }) {
  const [copied, toggleCopy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleCopy(false);
      clearTimeout(timer);
    }, 3000);

    return () => clearTimeout(timer);
  }, [copied]);

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
        {copied && <CopiedText>Скопировано</CopiedText>}
        <CopyToClipboard text={urlToFeed} onCopy={() => toggleCopy(true)}>
          <CopyUrlButton>
            <img src={iconCopy} alt="" />
          </CopyUrlButton>
        </CopyToClipboard>
        <CopyUrlInput type="text" defaultValue={urlToFeed} disabled />
      </CopyUrlToFeed>
    </Footer>
  );
}
