import { useSelector , useDispatch } from "react-redux";
const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch()
  const handleIncreaseCounter = () => {
    dispatch({
        type: "INCREMENT"
    })
  }
  const handleDecreaseCounter = () => {
    dispatch({
        type: "DECREMENT"
    })
  }
  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={handleIncreaseCounter}>Increase Count</button>

      <button onClick={handleDecreaseCounter}>Decrease Count</button>
    </>
  );
};
export default Counter;
