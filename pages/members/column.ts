import { h } from "vue";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name", // This column will show both name and studentId
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }: any) => {
      const name = row.getValue("name");
      const studentId = row.original.schoolId;

      return h("div", { class: "text-left font-medium" }, [
        h("div", name), // Display the student's name
        h("div", { class: "text-sm text-gray-500" }, `${studentId}`), // Display the student's ID below the name
      ]);
    },
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-left" }, "Email"),
    cell: ({ row }: any) => {
      const email = row.getValue("email");

      return h("div", { class: "text-left font-medium" }, email);
    },
  },
  {
    accessorKey: "yearLevel",
    header: () => h("div", { class: "text-left" }, "Year Level"),
    cell: ({ row }: any) => {
      const yearLevel = row.getValue("yearLevel");

      return h("div", { class: "text-left px-5 font-medium" }, yearLevel);
    },
  },
  {
    accessorKey: "attendance",
    header: () => h("div", { class: "text-left" }, "Attendance"),
    cell: ({ row }: any) => {
      const attendance = row.getValue("attendance");

      const textColor =
        attendance === "Present"
          ? "text-green-800 w-[90px]  px-5"
          : "text-red-800 w-[90px] px-5";
      const bgColor = attendance === "Present" ? "bg-green-200" : "bg-red-200";

      return h(
        "div",
        { class: `p-2 border rounded ${textColor} ${bgColor}` },
        attendance
      );
    },
  },
];
