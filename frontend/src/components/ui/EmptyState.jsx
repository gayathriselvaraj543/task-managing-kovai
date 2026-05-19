import Button from './Button';

function EmptyState({ title, description, buttonLabel, onButtonClick }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-700">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">No content</p>
      <h3 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      {buttonLabel && (
        <Button type="button" className="mt-8" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
