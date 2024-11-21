import { Timestamp } from "firebase/firestore";

export enum StaffRole {
  Reviewer = "reviewer",
  Driver = "driver",
  Porter = "porter",
  Manager = "manager",
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderRole: StaffRole | string;
  attachments?: string[];
  timestamp: Date;
  readAt?: Date | null;
  status: string;
}

export interface Conversation {
  id: string;
  participants: Record<string, unknown>;
  createdAt: Date;
  status: string;
  lastMessage?: Message;
}

// Utility functions for Firestore conversion
export class FirestoreConverter {
  static messageFromFirestore(doc: {
    id: string;
    data: () => Record<string, unknown>;
  }): Message {
    const data = doc.data();
    return {
      id: doc.id,
      content: data["content"] as string,
      senderId: data["senderId"] as string,
      senderRole: data["senderRole"] as StaffRole,
      attachments: data["attachments"] as string[] | undefined,
      timestamp: (data["timestamp"] as Timestamp)?.toDate() ?? new Date(),
      readAt: data["readAt"]
        ? (data["readAt"] as Timestamp).toDate()
        : undefined,
      status: data["status"] as string,
    };
  }

  static conversationFromFirestore(doc: {
    id: string;
    data: () => Record<string, unknown>;
  }): Conversation {
    const data = doc.data();
    return {
      id: doc.id,
      participants: data["participants"] as Record<string, unknown>,
      createdAt: (data["createdAt"] as Timestamp)?.toDate() ?? new Date(),
      status: data["status"] as string,
      lastMessage: data["lastMessage"]
        ? this.messageFromFirestore(
            data["lastMessage"] as {
              id: string;
              data: () => Record<string, unknown>;
            }
          )
        : undefined,
    };
  }
  static messageToFirestore(message: Message): Record<string, unknown> {
    return {
      content: message.content,
      senderId: message.senderId,
      senderRole: message.senderRole,
      attachments: message.attachments ?? [],
      timestamp: message.timestamp,
      readAt: message.readAt ?? null,
      status: message.status,
    };
  }
}
