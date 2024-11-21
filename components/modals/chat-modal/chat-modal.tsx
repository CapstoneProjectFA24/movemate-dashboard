"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSendStaffMessage } from "@/features/chat-realtime/react-query/query";
import {
  Message,
  StaffRole,
  FirestoreConverter,
} from "@/features/chat-realtime/types/chat-type";
import { useSession } from "next-auth/react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import LoadingSpinner from "@/components/shared/custom-ui/loading-spinner";

export const ChatModal: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose, type, data } = useModal();

  const { data: session } = useSession();

  const staffInfo = data.user;
  const currentUserId = session?.user.id;
  const currentUserRole = session?.user.roleName.toLowerCase();

  useEffect(() => {
    if (currentUserId && staffInfo?.id) {
      setIsLoading(true);
      setConversationId(null);
      const conversationsRef = collection(db, "staff_conversations");
      const q = query(
        conversationsRef,
        where("participantIds", "array-contains", currentUserId.toString())
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const participantIds = doc.data().participantIds || [];
          if (participantIds.includes(staffInfo.id.toString())) {
            setConversationId(doc.id);
            setIsLoading(false);
          }
        });
      });

      return unsubscribe;
    }
  }, [currentUserId, staffInfo?.id]);

  useEffect(() => {
    if (isOpenModal && conversationId) {
      setIsLoading(true);
      const messagesRef = collection(
        db,
        "staff_conversations",
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
  }, [isOpen, conversationId]);

  const { mutateAsync: sendMessage } = useSendStaffMessage();

  const isOpenModal = isOpen && type === "chatWithStaffModal";

  const handleClose = () => {
    onClose();
  };

  const handleSendMessage = async (): Promise<void> => {
    if (newMessage.trim() && conversationId) {
      await sendMessage({
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
            <Image
              src={staffInfo?.avatarUrl!}
              width={32}
              height={32}
              alt="staff info"
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{staffInfo?.name}</div>
              <div className="text-sm text-black">
                Vai trò: {staffInfo?.roleName}
              </div>
            </div>
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
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.senderId === currentUserId?.toString()
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-2 rounded-lg",
                        msg.senderId === currentUserId?.toString()
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
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

export default ChatModal;
