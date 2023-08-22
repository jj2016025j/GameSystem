public class TaskManager
{
    private List<Task> tasks = new List<Task>();

    public void AddTask(Task task)
    {
        tasks.Add(task);
    }

    public void DisplayTasks()
    {
        foreach (var task in tasks)
        {
            Console.WriteLine($"Description: {task.Description}, Status: {task.Status}");
        }
    }
}