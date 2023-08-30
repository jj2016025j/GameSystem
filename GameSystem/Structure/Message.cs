public class Message
{
    public string Sender { get; private set; }
    public string Content { get; private set; }
    public DateTime Timestamp { get; private set; }

    public Message(string sender, string content)
    {
        Sender = sender;
        Content = content;
        Timestamp = DateTime.Now;
    }
}