// Pagination type
export interface Pagination {
  count: number;
  page: number;
  pages: number;
  previous: string | null;
  next: string | null;
  size: number;
}

// Section type
export interface Section {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Class item type
export interface ClassItem {
  id: number;
  school: number;
  name: string;
  description: string;
  academic_session: number;
  sections: Section[];
  created_at: string;
  updated_at: string;
}

// Data wrapper
export interface ClassListData {
  pagination: Pagination;
  results: ClassItem[];
}
