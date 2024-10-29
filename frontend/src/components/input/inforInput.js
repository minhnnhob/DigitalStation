const InforInput = ({ label, value, onChange, type, name }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white text-md">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border-2  bg-bg-pf rounded-sm px-2 py-1 outline-none"
      />
    </div>
  );
};

export default InforInput;
