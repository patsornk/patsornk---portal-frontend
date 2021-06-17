import { DataPrePage } from './types/TableType'

export const DataPrePageList: DataPrePage[] = [
  { value: '10' },
  { value: '25' },
  { value: '50' },
  { value: '100' }
]

export enum OrganizationManagementStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  HOLD = 'hold',
  DELETE = 'delete'
}
