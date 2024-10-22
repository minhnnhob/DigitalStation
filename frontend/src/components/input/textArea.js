const TextArea = ({ name, label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-400 text-lg" >{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="border-2  h-32  bg-gray-900 rounded-sm px-2 py-1 outline-none"
      />
    </div>
  );
};

export default TextArea;
