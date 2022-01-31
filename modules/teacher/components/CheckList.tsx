
type CheckListProps = {
  title: string;
  items: Record<'key' | 'value',string>[];
};

export const CheckList = ({ items, title }: CheckListProps) => (
  <div className="eld mb-3">
    <h5 className="font-medium">{title}:</h5>
    <ul>
      {items.map(g => (
        <li key={g.key}>
          <i className="fa fa-check"></i>{g.value}
        </li>
      ))}
    </ul>
  </div>
);