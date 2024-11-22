// react-query.ts

"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  findExistingStaffConversation,
  getOrCreateStaffConversation,
  getStaffMessages,
  sendStaffMessage,
} from "../actions/booking-chat";
import { getAllUserConversations } from "../actions/get-all-chat";

// export const useGetOrCreateStaffConversation = (
//   currentUserId: string,
//   currentUserRole: string,
//   otherStaffId: string,
//   otherStaffRole: string
// ) => {
//   return useQuery<Promise<string>>({
//     queryKey: ["staff-conversations"],
//     queryFn: () =>
//       getOrCreateStaffConversation(
//         currentUserId,
//         currentUserRole,
//         otherStaffId,
//         otherStaffRole
//       ),
//   });
// };

export const useGetOrCreateStaffConversation = (
  currentUserId: string,
  currentUserRole: string,
  otherStaffId: string,
  otherStaffRole: string
) => {
  return useMutation({
    mutationFn: () =>
      getOrCreateStaffConversation(
        currentUserId,
        currentUserRole,
        otherStaffId,
        otherStaffRole
      ),
  });
};

export const useFindExistingStaffConversation = (
  currentUserId: string,
  otherStaffId: string
) => {
  return useQuery({
    queryKey: ["staff-conversations", currentUserId, otherStaffId],
    queryFn: () => findExistingStaffConversation(currentUserId, otherStaffId),
  });
};

export const useSendStaffMessage = () => {
  return useMutation({
    mutationFn: (variables: {
      conversationId: string;
      messageData: {
        content: string;
        senderId: string;
        senderRole: string;
        attachments?: string[];
      };
    }) => {
      const { conversationId, messageData } = variables;
      return sendStaffMessage(conversationId, messageData);
    },
  });
};

export const useGetStaffMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["staff-messages", conversationId],
    queryFn: () => getStaffMessages(conversationId),
  });
};

export const useGetAllUserConversations = (
  userId: string,
  userRole: string
) => {
  return useQuery({
    queryKey: ["GET_ALL_CONVERSATION", userId, userRole],
    queryFn: () => getAllUserConversations(userId, userRole),
  });
};
