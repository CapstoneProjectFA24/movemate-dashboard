

export type IStatisticBooking = {
    shard: string,
    totalBookings: number,
    totalInProcessBookings: number,
    totalCancelBookings: number,
    mostBookedHouseType: number,
    mostBookedTruck: number,
    mostBookedTime: number,
    mostBookedDayOfWeek: string,
    mostBookedDate: string
}