public abstract class Node
{
    public enum NodeStatus { SUCCESS, FAILURE, RUNNING }
    protected NodeStatus status;

    public Node() { }
    public abstract NodeStatus Tick();
}
