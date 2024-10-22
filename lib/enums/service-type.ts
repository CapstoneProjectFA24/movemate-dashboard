export enum ServiceType {
  SYSTEM = "SYSTEM",
  DISASSEMBLE = "DISASSEMBLE",
  PORTER = "PORTER",
  TRUCK = "TRUCK",
}

export const ServiceTypeNames = {
  [ServiceType.SYSTEM]: "Hệ thống",
  [ServiceType.DISASSEMBLE]: "Tháo lắp",
  [ServiceType.PORTER]: "Nhân công",
  [ServiceType.TRUCK]: "Vận chuyển",
};
