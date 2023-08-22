public class ExploreState : FSMState
{
    private BehaviorTree bt;

    /*public override void Enter()
    {
        bt = new BehaviorTree(new Selector(
            new MoveToRandomLocation(),
            new PerformAction(),
            new Wait(),
            new ReturnToOriginalPosition()
        ));
    }*/

    public override void Update()
    {
        bt.Tick();
    }

    public override void Exit()
    {
        // Cleanup or reset behaviors if needed
    }
}