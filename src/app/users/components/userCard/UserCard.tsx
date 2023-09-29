'use client';

import { useState } from 'react';
import styles from './UserCard.module.css';
import LabeledValue from '../../../../global_components/labeledValue/LabeledValue';
import classNames from 'classnames';
import Button from '@/global_components/button/Button';
import { Address } from '@/app/api/users/types';
import ChevronSvg from '@/global_components/chevronSvg/ChevronSvg';

interface Props {
  fullName: string;
  userName: string;
  userId: number;
  emailAddress: string;
  phoneNumber: string;
  location: Address;
}

export default function UserCard(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className={classNames(styles.userCard, { [styles.active]: active })}>
      <div className={styles.primaryInformation}>
        <LabeledValue label={'Name'} value={props.fullName} primary />

        <div className={styles.endSection}>
          <LabeledValue
            label={'User Id'}
            value={props.userId.toString()}
            className={styles.labeledValue}
          />
          <Button
            className={styles.showHideDetailBtn}
            onClick={() => setActive((v) => !v)}
          >
            <span className="srOnly">
              {active ? 'Hide Details' : 'Show Details'}
            </span>

            <ChevronSvg />
          </Button>
        </div>
      </div>

      <div className={styles.secondaryInformation}>
        <LabeledValue label={'User Name'} value={props.userName} />
        <LabeledValue label={'Phone Number'} value={props.phoneNumber} />
        <LabeledValue label={'Email Address'} value={props.emailAddress} />
        <LabeledValue
          label={'Location'}
          value={`${props.location.street} ${props.location.suite} ${props.location.city} ${props.location.zipcode} `}
        />
      </div>
    </div>
  );
}
