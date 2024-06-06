import { useListPrincipalGroups } from '@/hooks';
import { Modal } from '../Modal';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

type GroupMembershipModal = {
  userFieldDesc?: string;
  submitText?: string;
  mutate: UseMutateFunction<
    unknown,
    Error,
    { principalUserIds: string[] },
    unknown
  >;
  mutateSuccess: boolean;
  mutateLoading: boolean;
  modalId: string;
  modalTitle: string;
  existingUserIds?: Set<string>;
};

export const GroupMembershipModal = ({
  mutate,
  mutateSuccess,
  mutateLoading,
  submitText = 'Create',
  userFieldDesc = 'Select the users you want to make admin.',
  modalId,
  modalTitle,
  existingUserIds,
}: GroupMembershipModal) => {
  const { data: principalGroups, isLoading: isLoadingPrincipalGroups } =
    useListPrincipalGroups();

  const [groupId, setGroupId] = useState(principalGroups?.[0]?.id ?? '');
  const [principalUserIds, setPrincipalUserIds] = useState<string[]>([]);

  const selectedMemberships = useMemo(() => {
    const theMems =
      principalGroups?.find((group) => group.id === groupId)?.memberships ?? [];
    if (existingUserIds) {
      return theMems.filter((mem) => !existingUserIds.has(mem.userId));
    }

    return theMems;
  }, [groupId, principalGroups, existingUserIds]);

  const isSelectedMembershipEmpty = selectedMemberships.length === 0;
  const notSelectedGroup = groupId.length === 0;

  const onChangeGroup = (e: FormEvent<HTMLSelectElement>) => {
    setGroupId(e.currentTarget.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ principalUserIds: principalUserIds });
  };

  useEffect(() => {
    if (mutateSuccess) {
      setPrincipalUserIds([]);
    }
  }, [mutateSuccess]);

  useEffect(() => {
    setPrincipalUserIds(selectedMemberships.map((mem) => mem.userId));
  }, [selectedMemberships]);

  return (
    <>
      <Modal id={modalId} title={modalTitle}>
        <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Select Group</span>
            </div>
            {isLoadingPrincipalGroups && (
              <span className="loading loading-dots mx-auto loading-sm"></span>
            )}
            {!isLoadingPrincipalGroups && (
              <select
                value={groupId}
                onChange={onChangeGroup}
                name="groupId"
                className="select select-bordered w-full"
              >
                <option value="" className="hidden">
                  Select Group
                </option>
                {principalGroups?.map((principal) => (
                  <option key={principal.id} value={principal.id}>
                    {principal.displayName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text">Select Users</span>
            </div>
            <div className="text-justify ml-1 text-sm">
              <span>{userFieldDesc}</span>
            </div>
          </div>

          <div className="overflow-x-auto mt-2">
            {notSelectedGroup && 'Please select group first.'}
            {isSelectedMembershipEmpty &&
              !notSelectedGroup &&
              'No users can be selected in this group.'}
            {!isSelectedMembershipEmpty && !notSelectedGroup && (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPrincipalUserIds(
                                selectedMemberships.map(
                                  (membership) => membership.userId
                                )
                              );
                            } else {
                              setPrincipalUserIds([]);
                            }
                          }}
                          checked={
                            principalUserIds.length ===
                              selectedMemberships?.length &&
                            selectedMemberships.length !== 0
                          }
                        />
                      </label>
                    </th>
                    <th>Id</th>
                    <th>Display Name</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMemberships.map((membership) => (
                    <tr key={membership.membershipId}>
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPrincipalUserIds((prev) => [
                                  ...prev,
                                  membership.userId,
                                ]);
                              } else {
                                setPrincipalUserIds((prev) =>
                                  prev.filter((p) => p !== membership.userId)
                                );
                              }
                            }}
                            checked={
                              !!principalUserIds.find(
                                (pu) => pu === membership.userId
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>{membership.userId}</td>
                      <td>{membership.userDisplayName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="form-control">
            <button className="btn btn-primary" disabled={mutateLoading}>
              {mutateLoading && (
                <span className="loading loading-spinner"></span>
              )}
              {submitText}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
