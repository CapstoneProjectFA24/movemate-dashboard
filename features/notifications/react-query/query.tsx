import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { INotification } from "../types/notification-type";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const PAGE_SIZE = 5;

export const useNotification = (page: number = 1) => {
  return useQuery<INotification[], Error>({
    queryKey: ["NOTIFICATION"],
    queryFn: async () => {
      try {
        const q = query(collection(db, "bookings"));

        const startIndex = (page - 1) * PAGE_SIZE;

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        const notifications: INotification[] = [];
        querySnapshot.docs
          .slice(startIndex, startIndex + PAGE_SIZE)
          .forEach((doc) => {
            const data = doc.data() as INotification;
            notifications.push({
              ...data,
              id: doc.id.toString(),
            });
          });

        return notifications;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Failed to fetch notifications");
      }
    },
    staleTime: Infinity,
  });
};

export const useNotificationInfinity = () => {
  return useInfiniteQuery({
    queryKey: ["notification_infinity"],
    queryFn: async ({ pageParam }) => {
      try {
        const q = query(collection(db, "bookings"));
        const startIndex = (pageParam as number) * PAGE_SIZE;

        const querySnapshot: QuerySnapshot = await getDocs(q);
        const notifications: INotification[] = [];

        querySnapshot.docs
          .slice(startIndex, startIndex + PAGE_SIZE)
          .forEach((doc) => {
            const data = doc.data() as INotification;
            notifications.push({
              ...data,
              id: doc.id.toString(),
            });
          });

        return notifications;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
        // Xác định trang tiếp theo dựa trên số lượng đã fetch và PAGE_SIZE
        if (lastPage.length < PAGE_SIZE) {
          return null; // Trả về null nếu không còn dữ liệu nữa
        }
        return lastPage.length; // Trang tiếp theo là trang sau cùng đã lấy
      },
    initialPageParam: 0,
    staleTime: Infinity,
  });
};
