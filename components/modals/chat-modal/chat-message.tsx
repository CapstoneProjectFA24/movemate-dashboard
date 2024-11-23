'use client'

import { Message } from "@/features/chat-realtime/types/chat-type";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage = ({ message, isOwnMessage }: ChatMessageProps) => {
  const messageTime = new Date(message.timestamp).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getFormattedDate = (timestamp: Date) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDateOnly = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );

    if (messageDateOnly.getTime() === todayOnly.getTime()) {
      return "Hôm nay";
    } else if (messageDateOnly.getTime() === yesterdayOnly.getTime()) {
      return "Hôm qua";
    } else {
      return messageDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isOwnMessage ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[80%] items-end gap-2",
          isOwnMessage && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            isOwnMessage
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          <p className="whitespace-pre-wrap break-words text-sm">
            {message.content}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        <span>{messageTime}</span>
        <span>•</span>
        <span>{getFormattedDate(message.timestamp)}</span>
        <span>•</span>
        <span className="capitalize">{message.senderRole}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
