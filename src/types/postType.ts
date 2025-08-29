export type PostType =
  | "schools"
  | "academic-sessions"
  | "sections"
  | "classes"
  | "employees"
  | "students"
  | "subjects"
  | "subject-groups";

export function getPostTitle(type: PostType): string {
  const mapping: Record<PostType, string> = {
    schools: "School",
    "academic-sessions": "Academic Session",
    sections: "Section",
    classes: "Class",
    employees: "Employee",
    students: "Student",
    subjects: "Subject",
    "subject-groups": "Subject Group",
  };

  return mapping[type] || type;
}
