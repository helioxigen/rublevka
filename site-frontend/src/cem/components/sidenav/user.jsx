import React, { Component } from 'react';

import { cloudfront } from 'core/config/resources';

import UI from 'cem/components/ui';
const { Icon, Button, Text, Image } = UI;

import cn from 'classnames';
import s from 'cem/styles/components/sidebar';
import sUtils from 'cem/styles/utils';

class User extends Component {
  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { data, actions, isSignedAsUser } = this.props;
    const imageUrl =
      data.photo && data.photo.id
        ? `${cloudfront}/${data.photo.id}-256`
        : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg';

    return (
      <li
        className={cn(
          s.item,
          s.user,
          this.state.isOpen && s.isOpen,
          isSignedAsUser && s.danger,
        )}
      >
        <span className={s.block} onClick={() => this.toggle()}>
          {imageUrl && (
            <Image
              className={sUtils.pushedRight1}
              src={imageUrl}
              kind="circle"
              width="32"
              height="32"
            />
          )}
          <Text truncate={12} ellipsis>{`${data.firstName &&
            data.firstName[0]}. ${data.lastName}`}</Text>
          <Icon
            className={cn(s.iconChevron, s.iconPushedTop2_5Right2)}
            icon="chevron-down"
          />
        </span>
        <ul className={cn(s.list, s.innerList)}>
          <li
            className={cn(
              s.item,
              sUtils.resetBorder,
              sUtils.resetPaddingBottom,
            )}
          >
            <Button
              className={cn(s.link, s.logoutBtn)}
              to={`/staff/${data.id}/notifications`}
            >
              Уведомления
            </Button>
          </li>
          {!isSignedAsUser && (
            <li
              className={cn(
                s.item,
                sUtils.resetBorder,
                sUtils.resetPaddingBottom,
              )}
            >
              <Button className={cn(s.link, s.logoutBtn)} to="/logout">
                Выйти
              </Button>
            </li>
          )}
          {isSignedAsUser && (
            <li
              className={cn(
                s.item,
                sUtils.resetBorder,
                sUtils.resetPaddingBottom,
              )}
              onClick={() =>
                actions
                  .logoutAsUser()
                  .then(() =>
                    actions.pop(
                      'success',
                      `Вы вышли из под пользователя ${data.firstName} ${
                        data.lastName
                      }`,
                    ),
                  )
              }
            >
              <Button className={cn(s.link, s.logoutBtn)}>
                Выйти из пользователя
              </Button>
            </li>
          )}
        </ul>
      </li>
    );
  }
}

export default User;
