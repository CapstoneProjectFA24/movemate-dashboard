"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal";
import Image from "next/image";
import { useSendUserMessage } from "@/features/chat-realtime/react-query/query";
import {
  Message,
  StaffRole,
  FirestoreConverter,
} from "@/features/chat-realtime/types/chat-type";
import { useSession } from "next-auth/react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import LoadingSpinner from "@/components/shared/custom-ui/loading-spinner";
import { useGetUserById } from "@/features/users/react-query/query";
import { Skeleton } from "@/components/ui/skeleton";
import ChatMessage from "./chat-message";

export const ChatUserModal = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "chatWithUserModal";

  const { data: user, isLoading: userLoading } = useGetUserById(
    data.booking?.userId?.toString()!
  );

  const { data: session } = useSession();

  const userId = data.booking?.userId;
  const bookingId = data.booking?.id;

  const currentUserId = session?.user.id;
  const currentUserRole = session?.user.roleName.toLowerCase();

  useEffect(() => {
    if (currentUserId && userId) {
      setIsLoading(true);
      setConversationId(null);

      const conversationsRef = collection(
        db,
        "bookings",
        bookingId?.toString()!,
        "conversations"
      );
      console.log(conversationsRef);

      const q = query(
        conversationsRef,
        where("participants.staff.id", "==", currentUserId.toString()),
        where("participants.user.id", "==", userId.toString())
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const conversationDoc = snapshot.docs[0];
          setConversationId(conversationDoc.id);
        }
        setIsLoading(false);
      });

      return unsubscribe;
    }
  }, [currentUserId, userId, bookingId]);

  useEffect(() => {
    if (isOpenModal && conversationId) {
      setIsLoading(true);
      const messagesRef = collection(
        db,
        "bookings",
        bookingId?.toString()!,
        "conversations",
        conversationId,
        "messages"
      );

      const q = query(messagesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) =>
          FirestoreConverter.messageFromFirestore({
            id: doc.id,
            data: () => doc.data(),
          })
        );
        setMessages(messages);
        setIsLoading(false);
      });
      return unsubscribe;
    }
  }, [isOpen, conversationId, isOpenModal, bookingId]);

  const handleClose = () => {
    onClose();
  };

  const { mutateAsync: sendMessage } = useSendUserMessage();

  const handleSendMessage = async (): Promise<void> => {
    if (newMessage.trim() && conversationId) {
      await sendMessage({
        bookingId: bookingId?.toString()!,
        conversationId: conversationId,
        messageData: {
          content: newMessage,
          senderId: currentUserId?.toString()!,
          senderRole: currentUserRole?.toString()! as StaffRole,
        },
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpenModal) return null;

  return (
    <div className="fixed bottom-0 right-4 z-50 max-w-[400px] w-full">
      <Card className="shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between rounded-t-lg py-3 px-4">
          <div className="flex items-center space-x-3">
            {userLoading ? (
              <>
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </>
            ) : user?.data ? (
              <>
                {user.data.avatarUrl ? (
                  <Image
                    src={user.data.avatarUrl}
                    width={32}
                    height={32}
                    alt={`${user.data.name}'s avatar`}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <div>
                  <div className="font-medium">{user.data.name}</div>
                  <div className="text-sm text-primary-foreground/80">
                    Vai trò: {user.data.roleName}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">Không có user</div>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="hover:bg-primary-foreground/20"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[300px] p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-3 flex flex-col-reverse">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.senderId === currentUserId}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="flex p-4 border-t">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="mr-2 flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !conversationId}
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
