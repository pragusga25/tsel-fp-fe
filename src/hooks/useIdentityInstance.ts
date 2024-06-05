import { getIdentityInstance, upsertIdentityInstance } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { UpsertIdentityInstancePayload } from '@/types';
import toast from 'react-hot-toast';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export const useGetIdentityInstance = () => {
  const {
    auth: { accessToken },
  } = useAuth();
  const query = useQuery({
    queryKey: ['identity-instance.get'],
    queryFn: () => getIdentityInstance(accessToken),
  });

  return query;
};

export const useUpsertIdentityInstance = () => {
  const queryClient = useQueryClient();
  const {
    auth: { accessToken },
  } = useAuth();

  const { data } = useGetIdentityInstance();

  const mutation = useMutation({
    mutationFn: (data: UpsertIdentityInstancePayload) =>
      toast.promise(upsertIdentityInstance(data, accessToken), {
        loading: 'Upserting identity instance...',
        success: 'Identity instance upserted successfully',
        error: 'Error upserting identity instance',
      }),
    mutationKey: ['identity-instance.upsert'],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['identity-instance.list'],
      });
    },
  });

  const { isPending, isSuccess, mutate } = mutation;

  const [payload, setPayload] = useState({
    identityStoreId: data?.identityStoreId ?? '',
    instanceArn: data?.instanceArn ?? '',
    schedulerTargetArn: data?.schedulerTargetArn ?? undefined,
    schedulerRoleArn: data?.schedulerRoleArn ?? undefined,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(payload);

    if (isSuccess) {
      setPayload({
        identityStoreId: '',
        instanceArn: '',
        schedulerTargetArn: undefined,
        schedulerRoleArn: undefined,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setPayload({
        identityStoreId: data.identityStoreId,
        instanceArn: data.instanceArn,
        schedulerTargetArn: data.schedulerTargetArn ?? undefined,
        schedulerRoleArn: data.schedulerRoleArn ?? undefined,
      });
    }
  }, [data]);

  return {
    mutation,
    isPending,
    isSuccess,
    onChange,
    onSubmit,
    payload,
    isUpsert: !!data?.identityStoreId && !!data?.instanceArn,
  };
};
