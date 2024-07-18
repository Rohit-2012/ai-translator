interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextArea = ({ id, value, onChange, placeholder }: TextAreaProps) => {
  return (
    <textarea
      name=""
      rows={5}
      id={id}
        className="py-2.5 px-4 border-none focus:outline-none block w-full border-transparent 
    rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;
