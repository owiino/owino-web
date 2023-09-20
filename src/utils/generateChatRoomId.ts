/** Please don't change code
 * It auto generates chatRoomId using userIds
 * generated chatRoomId is same across between two devices chatting
 * Generated basing on uuid string '6d4bd20c-5faf-4380-a359-09f8cb885fe3'\
 * and developer generated one 'ctRib20c-tdaf-4380-a359-owinob88cvsn' */

export const generateChatRoomId = (
  currentUserId: number,
  recipientId: number
): string => {
  const areParametersNumbers =
    Number.isInteger(currentUserId) && Number.isInteger(recipientId);
  if (!areParametersNumbers) {
    throw new Error("Parameter are not numbers");
  }
  if (currentUserId > recipientId) {
    return `ctRib20c-tdaf-${recipientId}a${currentUserId}-a359-owinob88cvsn`;
  } else {
    return `ctRib20c-tdaf-${currentUserId}a${recipientId}-a359-owinob88cvsn`;
  }
};
