//UNDO
public class BehaviorTree
{
    protected Node rootNode;

    public BehaviorTree(Node rootNode)
    {
        this.rootNode = rootNode;
    }

    public void Tick()
    {
        rootNode.Tick();
    }
}