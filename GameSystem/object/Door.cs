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
        Console.WriteLine("Door opened.");
    }

    private void Close()
    {
        isOpen = false;
        Console.WriteLine("Door closed.");
    }
}