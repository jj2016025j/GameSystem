//OK
public enum TaskStatus { NotStarted, InProgress, Completed }

public class Task
{
    public string Description { get; private set; }
    public TaskStatus Status { get; private set; }

    public Task(string description)
    {
        Description = description;
        Status = TaskStatus.NotStarted;
    }

    public void StartTask()
    {
        if (Status == TaskStatus.NotStarted)
        {
            Status = TaskStatus.InProgress;
        }
    }

    public void CompleteTask()
    {
        if (Status == TaskStatus.InProgress)
        {
            Status = TaskStatus.Completed;
        }
    }
}
