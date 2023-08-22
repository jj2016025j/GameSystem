public class ChatRoom
{
    private List<Message> messages = new List<Message>();

    public void SendMessage(string sender, string content)
    {
        Message message = new Message(sender, content);
        messages.Add(message);
        DisplayMessage(message);
    }

    public void DisplayMessage(Message message)
    {
        Console.WriteLine($"[{message.Timestamp.ToShortTimeString()}] {message.Sender}: {message.Content}");
    }

    public void DisplayAllMessages()
    {
        foreach (var message in messages)
        {
            DisplayMessage(message);
        }
    }
}