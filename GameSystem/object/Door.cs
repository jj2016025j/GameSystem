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
        Program.TypeTextWithThreadSleep($"�����}�F�C");
    }

    private void Close()
    {
        isOpen = false;
        Program.TypeTextWithThreadSleep($"�����W�F�C");
    }
}