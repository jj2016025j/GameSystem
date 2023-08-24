public class ItemBox : IInteractable
{
    public void Interact()
    {
        Program.TypeTextWithThreadSleep($"物品已收集！");
    }
}