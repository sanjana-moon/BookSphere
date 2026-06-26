"use server";

import { revalidatePath } from "next/cache";
import {
  deleteMutation,
  serverMutation,
} from "../server";

export const addBooks = async (data) => {
  return await serverMutation("/api/books", "POST", data);
};

export const updateBooks = async (data, id) => {
  return await serverMutation(`/api/books/${id}`, "PATCH", data);
};

export const deleteBooks = async (id) => {
  const res = await deleteMutation(`/api/books/${id}`);
  revalidatePath("/dashboard/librarian/inventory");
  return res;
};

export const updateStatus = async (data, id) => {
  const result = await serverMutation(`/api/admin/books/${id}`, "PATCH", data);
  revalidatePath("/api/admin/books")
  return result;
};

export const toggleBookPublish = async (data, id) => {
    const result = await serverMutation(
        `/api/admin/books/${id}/publish`,
        "PATCH", data
    );

    revalidatePath("/dashboard/admin/manage-books");

    return result;
};