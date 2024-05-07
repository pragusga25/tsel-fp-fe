import { useUpdateUserPassword, useUpsertIdentityInstance } from '@/hooks';

export const Settings = () => {
  const {
    isUpdatingPassword,
    passwordPayload,
    onChangePassword,
    onSubmitPassword,
  } = useUpdateUserPassword();

  const {
    payload: identityPayload,
    onChange: onChangeIdentity,
    onSubmit: onSubmitIdentity,
    isPending: isPendingIdentity,
    isUpsert: isUpsertIdentity,
  } = useUpsertIdentityInstance();

  return (
    <section className="pb-4">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="flex flex-col space-x-0 lg:flex-row lg:space-x-4 items-center lg:justify-between">
        <form
          className="flex flex-col max-w-lg w-full lg:w-1/2 mx-auto lg:mx-0"
          onSubmit={onSubmitPassword}
        >
          <h3>Change Password</h3>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Current Password</span>
            </div>
            <input
              value={passwordPayload.oldPassword}
              onChange={onChangePassword}
              type="password"
              className="grow input input-bordered w-full"
              name="oldPassword"
              placeholder="Your current password"
              autoComplete="current-password"
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">New Password</span>
            </div>
            <input
              value={passwordPayload.newPassword}
              onChange={onChangePassword}
              type="password"
              className="grow input input-bordered w-full"
              name="newPassword"
              placeholder="Your new password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-control mt-3">
            <button
              className="btn btn-primary"
              disabled={isUpdatingPassword}
              type="submit"
            >
              {isUpdatingPassword && (
                <span className="loading loading-spinner"></span>
              )}
              Change Password
            </button>
          </div>
        </form>

        <form
          className="max-w-lg w-full mt-8 lg:mt-0 lg:w-1/2 mx-auto lg:mx-0"
          onSubmit={onSubmitIdentity}
        >
          <h3>Update Identity & Instance</h3>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Identity Store ID</span>
            </div>
            <input
              value={identityPayload.identityStoreId}
              onChange={onChangeIdentity}
              type="text"
              className="grow input input-bordered w-full"
              name="identityStoreId"
              placeholder="Identity Store ID"
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Instance ARN</span>
            </div>
            <input
              value={identityPayload.instanceArn}
              onChange={onChangeIdentity}
              type="text"
              className="grow input input-bordered w-full"
              name="instanceArn"
              placeholder="Instance ARN"
            />
          </div>

          <div className="form-control mt-3">
            <button className="btn btn-primary" disabled={isPendingIdentity}>
              {isPendingIdentity && (
                <span className="loading loading-spinner"></span>
              )}
              {isUpsertIdentity
                ? 'Update Identity & Instance'
                : 'Add Identity & Instance'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
