

export type IStatisticPromtion = {
    totalPromotions: number,
    activePromotions: number,
    totalAmountRunningVouchers: number,
    totalUsersTakingVouchers: number,
    totalUsedVouchers: number,
    totalAmountUsedPromotions: number,
    totalActiveUsersTakingVouchers: number,
    totalActiveUsedVouchers: number,
    totalActiveAmountRunningVouchers: number,
    totalActiveAmountUsedPromotions: number
    promotionDetails: IStatisticPromtionDetails[]
}


export type IStatisticPromtionDetails ={
    promotionId: number,
    promotionName: string,
    totalUsersTakingVouchers: number,
    quantity : number,
    totalUsedVouchers: number,
    totalAmountUsedPromotions: number,
    totalAmountRunningPromotion: number
}