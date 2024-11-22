"use server";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Conversation, FirestoreConverter } from "../types/chat-type";

interface ConversationResponse {
  conversations: Conversation[];
  type: "booking" | "staff";
}

interface BaseConversation {
  id: string;
  status: string;
  createdAt: any;
  type: "booking" | "staff";
}

interface BookingConversation extends BaseConversation {
  type: "booking";
  bookingId: string;
  participants: {
    user: {
      id: string;
      role: string;
    };
    staff: {
      id: string;
      role: string;
    };
  };
}

interface StaffConversation extends BaseConversation {
  type: "staff";
  participantIds: string[];
  participants: {
    [key: string]: {
      role: string;
      userId: string;
    };
  };
  lastMessageAt: any;
}

type ConversationType = BookingConversation | StaffConversation;

async function getAllBookingConversationsForUser(
  userId: string,
  userRole: string
): Promise<Conversation[]> {
  try {
    const bookingRef = collection(db, "bookings");
    const bookingSnapshot = await getDocs(bookingRef);

    let allConversations: Conversation[] = [];

    for (const bookingDoc of bookingSnapshot.docs) {
      const conversationsRef = collection(
        db,
        "bookings",
        bookingDoc.id,
        "conversations"
      );

      let q;
      if (userRole === "customer") {
        try {
          q = query(
            conversationsRef,
            where("participants.user.id", "==", userId),
            // orderBy("createdAt", "desc")
          );
        } catch (error) {
          console.error(
            `Index required for querying user conversations in booking ${bookingDoc.id}.`
          );
          continue;
        }
      } else {
        try {
          q = query(
            conversationsRef,
            where("participants.staff.id", "==", userId),
            orderBy("createdAt", "desc")
          );
        } catch (error) {
          console.error(
            `Index required for querying staff conversations in booking ${bookingDoc.id}.`
          );
          continue;
        }
      }

      const conversationsSnapshot = await getDocs(q);
      const conversations = conversationsSnapshot.docs.map((doc) =>
        FirestoreConverter.conversationFromFirestore({
          id: doc.id,
          data: () => ({
            ...doc.data(),
            bookingId: bookingDoc.id,
          }),
        })
      );

      allConversations = [...allConversations, ...conversations];
    }

    return allConversations;
  } catch (error) {
    console.error("Get booking conversations error:", error);
    throw new Error("Failed to retrieve booking conversations");
  }
}

async function getAllStaffConversationsForUser(
  userId: string
): Promise<Conversation[]> {
  try {
    const conversationsRef = collection(db, "staff_conversations");

    let q;
    try {
      q = query(
        conversationsRef,
        where("participantIds", "array-contains", userId),
        orderBy("lastMessageAt", "desc")
      );
    } catch (error) {
      console.error(
        "Index required for querying staff conversations. Ensure an index exists for `participantIds` and `lastMessageAt`."
      );
      throw error;
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      FirestoreConverter.conversationFromFirestore({
        id: doc.id,
        data: () => ({
          ...doc.data(),
          type: "staff",
        }),
      })
    );
  } catch (error) {
    console.error("Get staff conversations error:", error);
    throw new Error("Failed to retrieve staff conversations");
  }
}

export async function getAllUserConversations(
  userId: string,
  userRole: string
): Promise<ConversationResponse[]> {
  try {
    const results: ConversationResponse[] = [];

    console.log(`Log User ID: ${userId}`);
    console.log(`Log User Role: ${userRole}`);

    // 1. Lấy booking conversations
    const bookingConversations = await getAllBookingConversationsForUser(
      userId,
      userRole
    );
    if (bookingConversations.length > 0) {
      results.push({
        conversations: bookingConversations,
        type: "booking",
      });
    }

    // 2. Lấy staff conversations (chỉ áp dụng cho staff members)
    if (userRole !== "customer") {
      const staffConversations = await getAllStaffConversationsForUser(userId);
      if (staffConversations.length > 0) {
        results.push({
          conversations: staffConversations,
          type: "staff",
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Get all conversations error:", error);
    throw new Error("Failed to retrieve conversations");
  }
}
