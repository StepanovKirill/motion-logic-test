import { OptionT } from '../components/CustomSearchableSelect/Option';

const searchOption = (target: string, options: OptionT[]): OptionT[] =>
  options.filter((item) => item.value.toLowerCase().includes(target.toLowerCase()));

export default searchOption;
