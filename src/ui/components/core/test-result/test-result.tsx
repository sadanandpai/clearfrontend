import classes from "./test-result.module.scss";

interface Props {
  name: string;
  status: string;
  error: string;
}

export function TestResult({ name, status, error }: Props) {
  return (
    <div className={classes.outputWrapper}>
      <h3 className={classes.title} data-status={status}>
        {status}: {name}
      </h3>
      {error && <pre className={classes.details}>{error}</pre>}
    </div>
  );
}
