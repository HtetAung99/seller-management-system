import { Input } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar({ setSearchInput }) {
  return (
    <Input
      placeholder="Search"
      onChange={(e) => setSearchInput(e.target.value)}
      suffix={<AiOutlineSearch style={{ paddingLeft: 2 }} size={18} />}
      allowClear
    />
  );
}
