import { useSelector } from "@xstate/react";

function Track({ track, onRemove }) {
  const { name } = useSelector(track, (state) => state.context);
  return (
    <div>
      <button onClick={onRemove}>x</button>
      {name}
    </div>
  );
}

export default Track;
