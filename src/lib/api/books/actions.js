'use server';

import { revalidatePath } from 'next/cache';
import { deleteMutation, serverMutation } from '../server';

export const addBooks = async (data) => {
  const resData = await serverMutation('/api/books', 'POST', data);
  return resData;
};

export const updateBooks = async (data, id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await serverMutation(`/api/books/${id}`, 'PATCH', data);
  return resData;
};

export const deleteBooks = async (id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await deleteMutation(`/api/books/${id}`);
  revalidatePath('/dashboard/librarian/inventory');
  return resData;
};