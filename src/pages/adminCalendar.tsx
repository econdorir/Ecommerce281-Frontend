import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import DataTable from "@/components/DataTable";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined); // Use undefined instead of null
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ date: Date; task: string }[]>([]);

  const handleAddTask = () => {
    if (date && task) {
      setTasks([...tasks, { date, task }]);
      setTask(""); // Clear the input after adding
    }
  };

  // Define the columns for the DataTable
  const columns = [
    { header: "Fecha", accessor: "date" },
    { header: "Tarea", accessor: "task" },
  ];

  // onDelete function (can be a no-op for now)
  const handleDelete = (taskToDelete: string) => {
    setTasks(tasks.filter((t) => t.task !== taskToDelete));
  };

  // idAccessor could just be a constant or a function returning a unique key
  const idAccessor = "task"; // Assuming task is unique for simplicity

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex flex-col p-10">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

        <div className="mb-6">
          <Calendar
            mode="single"
            selected={date} // Now this will be Date or undefined
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Agregar nueva tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border rounded-md p-2 flex-grow"
          />
          <button
            onClick={handleAddTask}
            className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Agregar Tarea
          </button>
        </div>

        <h2 className="text-xl font-semibold">Tareas Agregadas</h2>
        <div className="mt-4 overflow-x-auto">
          <DataTable
            data={tasks.map((t) => ({
              date: t.date.toLocaleDateString(),
              task: t.task,
            }))}
            columns={columns}
            onDelete={handleDelete}
            idAccessor={idAccessor}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminCalendar;
