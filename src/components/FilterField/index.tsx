export interface FilterFieldProps {
  onSubmit: () => void;
}

export function FilterField({ onSubmit }: FilterFieldProps) {
  return (
    <div>
      <div>FilterField</div>
      <button type="button" onClick={onSubmit}>
        送出
      </button>
    </div>
  );
}
