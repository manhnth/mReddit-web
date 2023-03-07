import { axiosWToken } from '@/lib/axios';

export const createCmt = async ({
  self,
  text,
}: {
  self: string;
  text: string;
}) => {
  return await axiosWToken.post(`${self}/comment`, {
    text,
  });
};

export const deleteCmt = async (self: string) => {
  return await axiosWToken.delete(`${self}`);
};
