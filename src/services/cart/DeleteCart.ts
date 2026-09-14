export async function removeFromCart(
  productId: string,
  token: string
) {
  const resp = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const payload = await resp.json()

  if (!resp.ok) {
    throw new Error(payload.message || "Failed to remove item")
  }

  return payload
}