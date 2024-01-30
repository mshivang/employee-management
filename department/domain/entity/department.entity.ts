export interface DepartmentBase {
  name: string;
  desc: string;
}

export interface Department extends DepartmentBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}
