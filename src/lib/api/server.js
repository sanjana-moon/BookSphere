import { headers } from "next/headers";
import { auth } from "../auth";
import { baseURL } from "./baseUrl";

const getToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  return token;
};

export const serverMutation = async (path, method, data) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteMutation = async (path) => {
  const token = await getToken();
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const serverFetch = async (path, isProtected = false) => {
  const options = {
    cache: "no-store",
  };
  if (isProtected) {
    const token = await getToken();
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const res = await fetch(`${baseURL}${path}`, options);
  return res.json();
};