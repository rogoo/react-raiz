import { useActionState } from "react";

const incre = async (prevValue: number) => {
  await new Promise((res) => setTimeout(res, 1000));
  return prevValue + 1;
};

const AbaCount = () => {
  const [count, formAction, isPending] = useActionState(incre, 0);

  return (
    <form action={formAction}>
      <p style={{ fontWeight: "bold" }}>Count: {count}</p>
      <button disabled={isPending} className={isPending ? "gray" : ""}>
        {isPending ? "Incrementing..." : "Increment"}
      </button>
    </form>
  );
};

export default AbaCount;
