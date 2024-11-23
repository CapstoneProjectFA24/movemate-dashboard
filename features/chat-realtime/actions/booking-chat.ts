'use server';

import { 
  collection, 
  query, 
  where, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  orderBy,
  limit
} from 'firebase/firestore';

import { revalidatePath } from 'next/cache';
import { 
  Message, 
  Conversation, 
  StaffRole, 
  FirestoreConverter 
} from '../types/chat-type';
import { db } from '@/firebase/firebase';

export async function findExistingConversation(
  bookingId: string, 
  customerId: string, 
  currentUserId: string
): Promise<string | null> {
  try {
    const conversationsRef = collection(
      db, 
      'bookings', 
      bookingId, 
      'conversations'
    );

    const q = query(
      conversationsRef,
      where('participants.user.id', '==', customerId),
      where('participants.staff.id', '==', currentUserId),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.empty 
      ? null 
      : querySnapshot.docs[0].id;
  } catch (error) {
    console.error('Find existing conversation error:', error);
    throw new Error('Failed to find conversation');
  }
}

export async function getOrCreateConversation(
  bookingId: string,
  customerId: string, 
  currentUserId: string, 
  currentUserRole: string
): Promise<string> {
  try {
    // Check existing conversation
    const existingConversationId = await findExistingConversation(
      bookingId, 
      customerId, 
      currentUserId
    );
    console.log(`first ${currentUserId} + ${currentUserRole} + ${bookingId} + ${customerId}`);
    if (existingConversationId) {
      return existingConversationId;
    }

    // Create new conversation
    const conversationsRef = collection(
      db, 
      'bookings', 
      bookingId, 
      'conversations'
    );

    const conversationRef = await addDoc(conversationsRef, {
      createdAt: serverTimestamp(),
      participants: {
        user: {
          id: customerId,
          role: 'customer',
        },
        staff: {
          id: currentUserId,
          role: currentUserRole.toString(),
        },
      },
      lastMessage: null,
      status: 'active',
    });

    return conversationRef.id;
  } catch (error) {
    console.error('Get or create conversation error:', error);
    throw new Error('Failed to get or create conversation');
  }
}

// export async function getAllConversations(
//   bookingId: string
// ): Promise<Conversation[]> {
//   try {
//     const conversationsRef = collection(
//       db, 
//       'bookings', 
//       bookingId, 
//       'conversations'
//     );

//     const q = query(
//       conversationsRef, 
//       orderBy('lastMessage.timestamp', 'desc')
//     );

//     const snapshot = await getDocs(q);

//     return snapshot.docs.map(doc => 
//       FirestoreConverter.conversationFromFirestore({
//         id: doc.id, 
//         data: () => doc.data()
//       })
//     );
//   } catch (error) {
//     console.error('Get all conversations error:', error);
//     throw new Error('Failed to retrieve conversations');
//   }
// }

export async function sendMessage(
  bookingId: string,
  conversationId: string, 
  messageData: {
    content: string,
    senderId: string,
    senderRole: string,
    attachments?: string[]
  }
): Promise<void> {
  try {
    const messagesRef = collection(
      db,
      'bookings',
      bookingId,
      'conversations',
      conversationId,
      'messages'
    );

    const message = {
      ...messageData,
      attachments: messageData.attachments || [],
      timestamp: serverTimestamp(),
      status: 'sent',
    };

    // Add message
    const docRef = await addDoc(messagesRef, message);

    // Update last message in conversation
    const conversationDocRef = doc(
      db,
      'bookings',
      bookingId,
      'conversations',
      conversationId
    );

    await updateDoc(conversationDocRef, {
      lastMessage: {
        ...message,
        id: docRef.id
      },
      lastMessageAt: serverTimestamp(),
    });

    revalidatePath(`/bookings/${bookingId}/conversations/${conversationId}`);
  } catch (error) {
    console.error('Send message error:', error);
    throw new Error('Failed to send message');
  }
}

export async function getMessages(
  bookingId: string,
  conversationId: string
): Promise<Message[]> {
  try {
    const messagesRef = collection(
      db,
      'bookings',
      bookingId,
      'conversations',
      conversationId,
      'messages'
    );

    const q = query(
      messagesRef, 
      orderBy('timestamp', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => 
      FirestoreConverter.messageFromFirestore({
        id: doc.id, 
        data: () => doc.data()
      })
    );
  } catch (error) {
    console.error('Get messages error:', error);
    throw new Error('Failed to retrieve messages');
  }
}

// Staff Chat Actions
export async function findExistingStaffConversation(
  currentUserId: string, 
  otherStaffId: string
): Promise<string | null> {
  try {
    const conversationsRef = collection(db, 'staff_conversations');

    const q = query(
      conversationsRef,
      where('participantIds', 'array-contains', currentUserId)
    );

    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const participantIds = doc.data().participantIds || [];
      if (participantIds.includes(otherStaffId)) {
        return doc.id;
      }
    }

    return null;
  } catch (error) {
    console.error('Find staff conversation error:', error);
    throw new Error('Failed to find staff conversation');
  }
}

export async function getOrCreateStaffConversation(
  currentUserId: string, 
  currentUserRole: string,
  otherStaffId: string,
  otherStaffRole: string
): Promise<string> {
  try {
    const existingConversationId = await findExistingStaffConversation(
      currentUserId, 
      otherStaffId
    );

    console.log(`first ${currentUserId} + ${currentUserRole} + ${otherStaffId} + ${otherStaffRole}`);
    if (existingConversationId) {
      return existingConversationId;
    }

    const conversationsRef = collection(db, 'staff_conversations');

    const conversationRef = await addDoc(conversationsRef, {
      createdAt: serverTimestamp(),
      participantIds: [currentUserId, otherStaffId],
      participants: {
        [currentUserId]: { 
          role: currentUserRole, 
          userId: currentUserId 
        },
        [otherStaffId]: { 
          role: otherStaffRole, 
          userId: otherStaffId 
        }
      },
      lastMessage: null,
      status: 'active',
    });

    return conversationRef.id;
  } catch (error) {
    console.error('Get or create staff conversation error:', error);
    throw new Error('Failed to get or create staff conversation');
  }
}

export async function sendStaffMessage(
  conversationId: string, 
  messageData: {
    content: string,
    senderId: string,
    senderRole: string,
    attachments?: string[]
  }
): Promise<void> {

  console.log(messageData);
  try {
    const messagesRef = collection(
      db,
      'staff_conversations',
      conversationId,
      'messages'
    );

    const message = {
      ...messageData,
      attachments: messageData.attachments || [],
      timestamp: serverTimestamp(),
      status: 'sent',
    };

    // Add message
    const docRef = await addDoc(messagesRef, message);

    // Update last message in conversation
    const conversationDocRef = doc(
      db, 
      'staff_conversations', 
      conversationId
    );

    await updateDoc(conversationDocRef, {
      lastMessage: {
        ...message,
        id: docRef.id
      },
      lastMessageAt: serverTimestamp(),
    });

    revalidatePath(`/dashboard/users`);
  } catch (error) {
    console.error('Send staff message error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to send staff message: ${error.message}`);
    } else {
      throw new Error('Failed to send staff message');
    }
  }
}

export async function getStaffMessages(
  conversationId: string
): Promise<Message[]> {
  try {
    const messagesRef = collection(
      db,
      'staff_conversations',
      conversationId,
      'messages'
    );

    const q = query(
      messagesRef, 
      orderBy('timestamp', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => 
      FirestoreConverter.messageFromFirestore({
        id: doc.id, 
        data: () => doc.data()
      })
    );
  } catch (error) {
    console.error('Get staff messages error:', error);
    throw new Error('Failed to retrieve staff messages');
  }
}