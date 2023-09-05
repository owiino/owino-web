/** Please don't change code
 * It auto generates chatRoomId using userIds
 * generated chatRoomId is same across between two devices chatting */

export const generateChatRoomId = (
  currentUserId: number,
  recipientId: number
) => {
  const areParametersNumbers =
    Number.isInteger(currentUserId) && Number.isInteger(recipientId);
  if (areParametersNumbers === false) return;
  if (currentUserId > recipientId) {
    return "ctRib#td@owino" + recipientId + "&" + currentUserId + "#cvsn";
  } else {
    return "ctRib#td@owino" + currentUserId + "&" + recipientId + "#cvsn";
  }
};
