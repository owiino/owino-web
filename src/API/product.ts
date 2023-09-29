import { url } from "../store";

export const validateProductImages = async ({
  formData,
  accessToken,
}: {
  formData: any;
  accessToken: string;
}) => {
  const response = await fetch(`${url}/products/validate-product-images`, {
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
