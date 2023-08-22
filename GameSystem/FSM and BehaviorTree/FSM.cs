public class FSM
{
    private Dictionary<string, FSMState> states = new Dictionary<string, FSMState>();
    private FSMState currentState;

    public FSM() { }

    public void AddState(string stateName, FSMState state)
    {
        states[stateName] = state;
    }

    public void SetState(string stateName)
    {
        if (currentState != null)
        {
            currentState.Exit();
        }

        currentState = states[stateName];
        currentState.Enter();
    }

    public void Update()
    {
        if (currentState != null)
        {
            currentState.Update();
        }
    }
}
