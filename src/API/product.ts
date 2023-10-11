import { url, goUrl } from "../store";
// import { goUrl } from "../store";

export const validateProductImages = async ({
  formData,
  accessToken,
}: {
  formData: any;
  accessToken: string;
}) => {
  const response = await fetch(`${goUrl}/products/validate-product-images`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const postProduct = async ({
  formData,
  accessToken,
}: {
  formData: any;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/products/post-product`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${url}/products/get-all-products`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};
