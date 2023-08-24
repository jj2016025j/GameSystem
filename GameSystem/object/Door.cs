//OK
public class Door : IInteractable
{
    private bool isOpen = false;

    public void Interact()
    {
        if (isOpen)
        {
            Close();
        }
        else
        {
            Open();
        }
    }

    private void Open()
    {
        isOpen = true;
        Program.TypeTextWithThreadSleep($"門打開了。");
    }

    private void Close()
    {
        isOpen = false;
        Program.TypeTextWithThreadSleep($"門關上了。");
    }
}