import { useState } from 'react';
import { Role } from '@/types';
import { AccountUserTable } from './AccountUserTable';
import { AccountAdminTable } from './AccountAdminTable';
import { ModalButton } from '../Modal/ModalButton';
import { useSynchronizeAccountUser } from '@/hooks';

export const Accounts = () => {
  const { mutate: synchronizeAccountUser, isPending: isSynchronizing } =
    useSynchronizeAccountUser();
  const tabLists = [Role.USER, Role.ADMIN];

  const [tabActive, setTabActive] = useState<Role>(Role.USER);
  const isUserActive = tabActive === Role.USER;

  const onChangeTabe = (tab: Role) => {
    setTabActive(tab);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        List {isUserActive ? 'User' : 'Admin'}
      </h1>
      <p className="text-info text-justify mb-2">
        The default password for user is <code>{`<username>tsel889900!`}</code>
      </p>
      <div className="flex justify-end mb-2">
        {isUserActive && (
          <button
            className="btn btn-accent btn-md mr-4"
            onClick={() => {
              synchronizeAccountUser();
            }}
            disabled={isSynchronizing}
          >
            {isSynchronizing && (
              <span className="loading loading-spinner"></span>
            )}
            Synchronize
          </button>
        )}
        {!isUserActive && (
          <ModalButton
            id={'create-admin-modal'}
            text={'Create Admin'}
            className="btn-primary btn-md"
          />
        )}
      </div>
      <div role="tablist" className="tabs tabs-boxed my-4">
        {tabLists.map((tab) => (
          <a
            role="tab"
            className={`tab ${tab === tabActive ? 'tab-active' : ''}`}
            onClick={() => onChangeTabe(tab)}
            key={tab}
          >
            {tab}
          </a>
        ))}
      </div>

      <div className="overflow-x-auto mb-4">
        {isUserActive ? <AccountUserTable /> : <AccountAdminTable />}
      </div>
    </div>
  );
};
